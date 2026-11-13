// Deterministic, offline-first kitchen intelligence. No API keys or external requests.
export const STORAGE_LOCATIONS = Object.freeze(['Fridge','Freezer','Pantry']);
const valid = item => item && Number(item.quantity)>0 && typeof item.expiry==='string' && item.expiry >= new Date().toLocaleDateString('en-CA');
export function rescueRecipes(inventory,recipes,limit=6){
  const usable=(inventory||[]).filter(valid);
  const owned=new Set(usable.map(i=>i.groceryId));
  const urgency=new Map(usable.map(i=>[i.groceryId,Math.max(0,Math.ceil((new Date(i.expiry+'T12:00:00')-new Date())/86400000))]));
  return (recipes||[]).map(recipe=>{
    const ingredients=recipe.ingredients||[];
    const present=ingredients.filter(i=>owned.has(i.id));
    const missing=ingredients.filter(i=>!owned.has(i.id));
    const rescue=present.reduce((sum,i)=>sum+(urgency.get(i.id)<=3?1:0),0);
    return {recipe,matched:present.length,total:ingredients.length,missing,rescue,score:present.length*10+rescue*8-missing.length*5};
  }).sort((a,b)=>b.score-a.score||a.recipe.title.localeCompare(b.recipe.title)).slice(0,Math.max(0,limit));
}
export function weeklyMealPlan(inventory,recipes,days=7){
  const ranked=rescueRecipes(inventory,recipes,recipes.length).filter(r=>r.matched>0);
  if(!ranked.length)return [];
  return Array.from({length:Math.max(0,Math.min(14,days))},(_,i)=>({day:i+1,...ranked[i%ranked.length]}));
}
export function budgetSummary(shopping,prices={},budget=0){
  const entries=(shopping||[]).filter(i=>!i.checked).map(i=>({name:i.name,price:Number(prices[i.name])||0}));
  const total=entries.reduce((n,i)=>n+i.price,0);
  const unpriced=entries.filter(i=>!(i.price>0)).length;
  return {total,remaining:Number(budget)-total,unpriced,withinBudget:unpriced===0&&total<=Number(budget)};
}
export function expiryDigest(inventory,leadDays=3,today=new Date()){
  const base=new Date(today.getFullYear(),today.getMonth(),today.getDate());
  return (inventory||[]).filter(i=>Number(i.quantity)>0).map(item=>({...item,daysUntil:Math.round((new Date(item.expiry+'T12:00:00')-base)/86400000)})).filter(i=>Number.isFinite(i.daysUntil)&&i.daysUntil<=leadDays).sort((a,b)=>a.daysUntil-b.daysUntil);
}
