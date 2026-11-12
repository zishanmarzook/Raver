import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {GROCERY_CATALOG, RECIPES, recipeMatch} from '../dist/data.js';

// This harness exercises the actual module and event handlers without a browser.
// It intentionally does not claim to check layout, focus behavior, or native HTML validation.
const STORAGE_KEY = 'food-saver-v1';
let importSequence = 0;
const decode = text => String(text).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const attrs = source => Object.fromEntries([...source.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(m=>[m[1],decode(m[2]??'')]));
const future = days => {const d=new Date();d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};

class Element {
  constructor(document, attributes={}) {
    this.document=document; this.attributes=attributes; this.id=attributes.id||'';
    this.name=attributes.name||''; this.value=attributes.value??''; this.type=attributes.type||'';
    this.disabled='disabled' in attributes; this.hidden='hidden' in attributes;
    this.dataset={}; this.listeners={}; this.open=false; this.textContent='';
    const classes=new Set((attributes.class||'').split(/\s+/));
    this.classList={add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle:(c,on)=>{const add=on??!classes.has(c);add?classes.add(c):classes.delete(c);return add;}};
  }
  set innerHTML(html) {this._html=html;this.document?.ingest(html,this);}
  get innerHTML(){return this._html||'';}
  addEventListener(name,fn){(this.listeners[name]??=[]).push(fn);}
  showModal(){this.open=true;}
  close(){this.open=false;}
  focus(){this.document.focused=this;}
  setSelectionRange(start,end){this.selectionStart=start;this.selectionEnd=end;}
  closest(selector){if(selector==='[data-action]')return this.dataset.action?this:null;if(selector==='#food-form')return this.form||null;return null;}
  querySelectorAll(selector){return selector==='[data-action="date-mode"]'?(this.dateButtons||[]):[];}
  get validity(){
    if(this.disabled)return {valid:true};
    if('required' in this.attributes&&!String(this.value).trim())return {valid:false};
    if(this.type==='number'&&this.value!=='') {
      const value=Number(this.value);
      if(!Number.isFinite(value))return {valid:false};
      if('min' in this.attributes&&value<Number(this.attributes.min))return {valid:false};
      if('max' in this.attributes&&value>Number(this.attributes.max))return {valid:false};
    }
    return {valid:true};
  }
  reportValidity(){return Object.values(this.elements||{}).every(element=>element.validity.valid);}
}

class Document {
  constructor(){this.elements=new Map();this.listeners={};for(const id of ['sidebar','topbar','storage-notice','main','mobile-nav','modal','toast'])this.elements.set(id,new Element(this,id==='storage-notice'?{id,hidden:''}:{id}));}
  addEventListener(name,fn){(this.listeners[name]??=[]).push(fn);}
  querySelector(selector){
    if(selector==='#shopping-form input')return this.elements.get('shopping-form')?.elements.item||null;
    return selector.startsWith('#')?this.elements.get(selector.slice(1))||null:null;
  }
  querySelectorAll(){return [];}
  createElement(){return new Element(this);}
  ingest(html){
    for(const match of html.matchAll(/<\w+\b([^>]*\bid="[^"]+"[^>]*)>/g)){
      const a=attrs(match[1]);if(a.id)this.elements.set(a.id,new Element(this,a));
    }
    for(const match of html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/g)){
      const a=attrs(match[1]),form=this.elements.get(a.id)||new Element(this,a);form.elements={};
      for(const input of match[2].matchAll(/<input\b([^>]*)>/g)){
        const element=new Element(this,attrs(input[1]));element.form=form;
        if(element.name)form.elements[element.name]=element;
        if(element.id)this.elements.set(element.id,element);
      }
      for(const select of match[2].matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/g)){
        const element=new Element(this,attrs(select[1]));element.form=form;
        const options=[...select[2].matchAll(/<option\b([^>]*)>([^<]*)<\/option>/g)];
        const selected=options.find(o=>'selected' in attrs(o[1]))||options[0];
        if(selected)element.value=attrs(selected[1]).value??decode(selected[2]);
        if(element.name)form.elements[element.name]=element;
        if(element.id)this.elements.set(element.id,element);
      }
      form.dateButtons=[...match[2].matchAll(/<button\b([^>]*data-action="date-mode"[^>]*)>/g)].map(m=>{const a=attrs(m[1]);const button=new Element(this,a);button.dataset={action:a['data-action'],value:a['data-value']};return button;});
      this.elements.set(a.id,form);
    }
  }
}

async function withApp(callback,stored=null){
  const document=new Document(),storage=new Map(stored?[[STORAGE_KEY,JSON.stringify(stored)]]:[]),windowListeners={};
  let failWrites=false;
  const localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>{if(failWrites)throw new Error('QuotaExceededError');storage.set(key,String(value));},removeItem:key=>storage.delete(key)};
  let hash='';const location={get hash(){return hash;},set hash(value){const next=value.startsWith('#')?value:'#'+value;if(next===hash)return;hash=next;for(const listener of windowListeners.hashchange||[])listener();}};
  const window={addEventListener:(name,fn)=>(windowListeners[name]??=[]).push(fn),scrollTo(){}};
  const originalSetTimeout=globalThis.setTimeout,originalSetInterval=globalThis.setInterval;
  const timers=[];
  const overrides={document,localStorage,location,window,navigator:{},setTimeout:(fn,delay,...args)=>{if([50,1000,4200,8500].includes(delay)){const timer=originalSetTimeout(()=>{},0);timer.unref();timers.push(timer);return timer;}return originalSetTimeout(fn,delay,...args);},setInterval:(fn,delay)=>{const timer=originalSetInterval(()=>{},delay);timer.unref();timers.push(timer);return timer;},FormData:class{constructor(form){this.form=form;}get(name){const input=this.form.elements[name];return input&&!input.disabled?String(input.value):null;}}};
  const prior=Object.fromEntries(Object.keys(overrides).map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
  for(const [key,value] of Object.entries(overrides))Object.defineProperty(globalThis,key,{configurable:true,writable:true,value});
  const emit=async(name,target)=>{for(const listener of document.listeners[name]||[])await listener({target,preventDefault(){}});};
  const harness={
    document,
    state:()=>JSON.parse(storage.get(STORAGE_KEY)),
    setStorageFailure:fail=>{failWrites=fail;},
    html:id=>document.querySelector('#'+id).innerHTML,
    element:id=>document.querySelector('#'+id),
    navigate:target=>{location.hash=target;},
    click:async(action,extra={})=>{const button=new Element(document);button.dataset={action,...extra};await emit('click',button);},
    submit:form=>emit('submit',form),
    input:element=>emit('input',element),
    change:async(id,value)=>{const element=document.querySelector('#'+id)||new Element(document,{id});element.value=value;await emit('change',element);},
  };
  try{await import(`../dist/app.js?smoke=${++importSequence}`);await callback(harness);}
  finally{for(const timer of timers)clearTimeout(timer);for(const [key,descriptor] of Object.entries(prior))descriptor?Object.defineProperty(globalThis,key,descriptor):delete globalThis[key];}
}

function fixture(inventory=[]){return {version:1,demo:false,inventory,shopping:[],used:0,settings:{profile:'Individual',track:'all',recipes:true,shopping:true,reminders:true,leadDays:3}};}
function inventoryItem(groceryId,extra={}){return {...GROCERY_CATALOG.find(g=>g.id===groceryId),groceryId,id:`inventory-${groceryId}`,quantity:1,unit:'pcs',expiry:future(10),source:'estimated',storage:'Fridge',addedAt:new Date().toISOString(),...extra};}

test('catalogue and recipes have valid references and matching handles full, partial, and zero quantities',async()=>{
  assert.ok(GROCERY_CATALOG.length>=60);
  assert.equal(new Set(GROCERY_CATALOG.map(g=>g.id)).size,GROCERY_CATALOG.length);
  const ids=new Set(GROCERY_CATALOG.map(g=>g.id));
  for(const grocery of GROCERY_CATALOG){assert.ok(grocery.name);assert.ok(grocery.shelfLife>0);assert.equal(typeof grocery.perishable,'boolean');}
  for(const recipe of RECIPES){assert.ok(recipe.steps.length>=2);for(const ingredient of recipe.ingredients)assert.ok(ids.has(ingredient.id),`${recipe.id}: ${ingredient.id}`);await access(new URL(`../dist/${recipe.image}`,import.meta.url));}
  const recipe=RECIPES[0],full=recipe.ingredients.map(i=>({groceryId:i.id,quantity:1}));
  assert.equal(recipeMatch(recipe,full).percent,100);
  assert.equal(recipeMatch(recipe,[]).matched,0);
  assert.equal(recipeMatch(recipe,[full[0]]).matched,1);
  assert.equal(recipeMatch(recipe,[{...full[0],quantity:0}]).matched,0);
  assert.equal(recipeMatch(recipe,full.map(f=>f.groceryId)).missing.length,0);
});

test('initial screen labels demo data and saves a usable kitchen',async()=>withApp(async app=>{
  assert.match(app.html('main'),/exploring a sample kitchen/);
  assert.equal(app.state().demo,true);
  assert.ok(app.state().inventory.length>5);
  assert.doesNotMatch(app.html('main'),/NaN|undefined/);
  app.navigate('food');assert.match(app.html('main'),/A home for your food/);
  app.navigate('recipes');assert.match(app.html('main'),/Make something good/);
  app.navigate('shopping');assert.match(app.html('main'),/A thoughtful little list/);
  app.navigate('settings');assert.match(app.html('main'),/Your kitchen, your way/);
}));

test('first personal food preserves shopping, and edit keeps catalogue identity, expiry and source',async()=>withApp(async app=>{
  app.navigate('shopping');const shopping=app.element('shopping-form');shopping.elements.item.value='Fresh bread';await app.submit(shopping);
  assert.equal(app.state().shopping[0].name,'Fresh bread');
  await app.click('add');await app.click('choose-grocery',{id:'strawberry'});
  let form=app.element('food-form');form.elements.days.value='-1';await app.click('date-mode',{value:'packaging'});
  assert.equal(form.elements.days.disabled,true,'hidden estimate cannot block packaging-date submission');
  form.elements.quantity.value='250';form.elements.expiry.value=future(8);
  await app.submit(form);
  let saved=app.state();assert.equal(saved.demo,false);assert.equal(saved.inventory.length,1);assert.equal(saved.shopping.length,1);
  const item=saved.inventory[0];assert.equal(item.groceryId,'strawberry');assert.equal(item.expiry,future(8));assert.equal(item.source,'packaging');
  await app.click('edit',{id:item.id});form=app.element('food-form');await app.click('date-mode',{value:'estimated'});
  form.elements.quantity.value='200';form.elements.expiry.value=future(12);await app.input(form.elements.expiry);
  assert.equal(Number(form.elements.days.value),12,'changing expiry updates estimate days');
  await app.submit(form);saved=app.state();assert.equal(saved.inventory[0].id,item.id);assert.equal(saved.inventory[0].groceryId,'strawberry');assert.equal(saved.inventory[0].source,'estimated');assert.equal(saved.inventory[0].expiry,future(12));assert.equal(saved.inventory[0].quantity,200);
}));

test('recipe shopping adds only missing ingredients, keeps pantry matches and avoids duplicate additions',async()=>{
  const recipe=RECIPES.find(r=>r.id==='tomato-spinach-pasta');
  const missing=recipe.ingredients.at(-1);
  const inventory=recipe.ingredients.filter(i=>i.id!==missing.id).map(i=>inventoryItem(i.id));
  const stored=fixture(inventory);stored.settings.track='perishable';
  await withApp(async app=>{
    await app.click('recipe',{id:recipe.id});assert.match(app.html('modal'),new RegExp(`${recipe.ingredients.length-1} of ${recipe.ingredients.length}`));
    await app.click('recipe-shopping',{id:recipe.id});assert.equal(app.state().shopping.length,1);assert.match(app.state().shopping[0].name,new RegExp(GROCERY_CATALOG.find(g=>g.id===missing.id).name));
    await app.click('recipe-shopping',{id:recipe.id});assert.equal(app.state().shopping.length,1);
  },stored);
});

test('marking food used and undo restores the same saved item and count',async()=>withApp(async app=>{
  const before=app.state(),item=before.inventory[0];await app.click('used',{id:item.id});
  assert.equal(app.state().inventory.length,before.inventory.length-1);assert.equal(app.state().used,1);
  await app.click('undo');assert.equal(app.state().inventory.length,before.inventory.length);assert.equal(app.state().used,0);assert.deepEqual(app.state().inventory[0],item);
}));

test('preferences persist, control navigation, and disabled routes remain usable',async()=>withApp(async app=>{
  await app.click('preferences');assert.match(app.html('main'),/Your kitchen, your way/);
  await app.change('profile-setting','Roommates');assert.equal(app.state().settings.profile,'Roommates');
  await app.click('toggle-setting',{key:'recipes'});assert.equal(app.state().settings.recipes,false);assert.doesNotMatch(app.html('sidebar'),/href="#recipes"/);
  app.navigate('recipes');assert.match(app.html('main'),/Recipe suggestions are currently switched off/);
  await app.click('preferences');await app.click('toggle-setting',{key:'recipes'});assert.match(app.html('sidebar'),/href="#recipes"/);
}));

test('catalogue accepts singular IDs, escapes search text, and rejects zero food quantity',async()=>withApp(async app=>{
  await app.click('add');let search=app.element('catalog-search');search.value='strawberry';await app.input(search);assert.match(app.html('catalog-results'),/data-id="strawberry"/);
  search.value='<img src=x onerror=bad>';await app.input(search);assert.doesNotMatch(app.html('catalog-results'),/<img src=x/);assert.match(app.html('catalog-results'),/&lt;img/);
  await app.click('choose-grocery',{id:'milk'});const form=app.element('food-form');form.elements.quantity.value='0';await app.submit(form);assert.equal(app.state().demo,true);
  form.elements.quantity.value='1';form.elements.days.value='5';await app.input(form.elements.days);assert.equal(form.elements.expiry.value,future(5));
}));

test('one-day reminders include tomorrow and exclude dates two days away',async()=>{
  const stored=fixture([inventoryItem('milk',{expiry:future(1)}),inventoryItem('egg',{expiry:future(2)})]);stored.settings.leadDays=1;
  await withApp(async app=>{await app.click('reminders');assert.match(app.html('modal'),/Milk/);assert.doesNotMatch(app.html('modal'),/>Eggs</);},stored);
});

test('failed device writes keep a persistent notice and session data until a successful save',async()=>withApp(async app=>{
  const notice=app.element('storage-notice');assert.equal(notice.hidden,true);
  app.setStorageFailure(true);
  await app.click('add');await app.click('choose-grocery',{id:'milk'});
  const form=app.element('food-form');form.elements.quantity.value='250';form.elements.expiry.value=future(4);await app.submit(form);
  assert.equal(app.state().inventory.length,0,'failed write must not appear in the persisted backup');
  assert.equal(notice.hidden,false,'save warning remains visible after entry-success toast');
  assert.match(notice.innerHTML,/Changes aren’t saved on this device/);
  assert.match(notice.innerHTML,/session only/);assert.match(notice.innerHTML,/Preferences/);assert.match(notice.innerHTML,/export a backup/);
  app.navigate('food');assert.match(app.html('main'),/Milk/,'unsaved food remains available in this session');
  assert.equal(app.element('storage-notice'),notice,'page rendering must not replace the notice');assert.equal(notice.hidden,false);
  await app.click('preferences');assert.match(app.html('main'),/Export my data/);assert.equal(notice.hidden,false);
  app.setStorageFailure(false);await app.change('profile-setting','Family');
  assert.equal(notice.hidden,true,'successful write clears the storage warning');assert.equal(notice.innerHTML,'');
  assert.equal(app.state().inventory[0].groceryId,'milk','next successful save persists the retained session changes');
  assert.equal(app.state().settings.profile,'Family');
},fixture()));
