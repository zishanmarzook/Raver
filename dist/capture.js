// Raver optional smart capture and analytics tools. All data is user-reviewable.
export function parseBarcode(value){
 const code=String(value??'').replace(/[\s-]/g,'');
 if(!/^\d{8}$|^\d{12,14}$/.test(code))return null;
 const digits=code.split('').map(Number),check=digits.pop();
 const sum=digits.reverse().reduce((n,d,i)=>n+d*(i%2===0?3:1),0);
 return (10-sum%10)%10===check?code:null;
}
export function parseReceiptText(text){
 return String(text??'').split(/\r?\n/).map(line=>line.trim()).filter(Boolean)
 .filter(line=>!/(subtotal|total|tax|gst|discount|change|cash|card|visa|thank you|invoice|receipt|date|time|bill no)/i.test(line))
 .map(line=>{const m=line.match(/^(.{2,70}?)\s+(?:₹|rs\.?|inr|\$)?\s*(\d+(?:[.,]\d{1,2})?)$/i);
 return m?{name:m[1].trim(),price:Number(m[2].replace(',','.'))}:null;})
 .filter(x=>x&&Number.isFinite(x.price)&&x.price>=0);
}
export function foodWasteAnalytics(events=[]){
 const rows=events.filter(e=>e&&['used','wasted'].includes(e.type));
 const count=t=>rows.filter(e=>e.type===t).length;
 const cost=rows.filter(e=>e.type==='wasted').reduce((n,e)=>n+(Number(e.cost)||0),0);
 return {used:count('used'),wasted:count('wasted'),recordedWasteCost:Math.round(cost*100)/100,rate:rows.length?count('wasted')/rows.length:null};
}
export function parseVoiceCommand(text){
 const input=String(text??'').trim().slice(0,160);
 const add=input.match(/^(?:add|buy|remember)\s+(.+)$/i);
 return add?{action:'shopping',name:add[1].trim()}:null;
}
export function safeImportKitchen(json){
 const parsed=typeof json==='string'?JSON.parse(json):json;
 if(!parsed||parsed.version!==1||!Array.isArray(parsed.inventory)||!Array.isArray(parsed.shopping)||!parsed.settings)throw Error('Invalid kitchen backup');
 if(parsed.inventory.length>5000||parsed.shopping.length>5000)throw Error('Backup too large');
 return parsed;
}
