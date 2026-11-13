import test from 'node:test';
import assert from 'node:assert/strict';
import {rescueRecipes,weeklyMealPlan,budgetSummary,expiryDigest} from '../dist/smart-kitchen.js';
import {RECIPES} from '../dist/data.js';
const date=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
test('rescue ranks matched food and ignores expired stock',()=>{const r=rescueRecipes([{groceryId:'egg',quantity:2,expiry:date(1)},{groceryId:'bread',quantity:1,expiry:date(-2)}],RECIPES);assert.ok(r.length);assert.ok(r.some(x=>x.matched>0));});
test('weekly plan handles empty inventory and caps days',()=>{assert.deepEqual(weeklyMealPlan([],RECIPES),[]);assert.ok(weeklyMealPlan([{groceryId:'egg',quantity:2,expiry:date(5)}],RECIPES,40).length<=14);});
test('budget never claims success when prices missing',()=>{assert.equal(budgetSummary([{name:'milk',checked:false}],{},100).withinBudget,false);assert.equal(budgetSummary([{name:'milk',checked:false}],{milk:30},100).remaining,70);});
test('expiry digest includes overdue and soon items',()=>{const r=expiryDigest([{expiry:date(-1),quantity:1},{expiry:date(2),quantity:1},{expiry:date(10),quantity:1}],3);assert.equal(r.length,2);});
