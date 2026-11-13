import test from 'node:test';
import assert from 'node:assert/strict';
import {parseBarcode,parseReceiptText,foodWasteAnalytics,parseVoiceCommand,safeImportKitchen} from '../dist/capture.js';
test('barcode checksums reject invalid scans',()=>{assert.equal(parseBarcode('4006381333931'),'4006381333931');assert.equal(parseBarcode('4006381333932'),null);});
test('receipt parser requires user review and skips totals',()=>{assert.deepEqual(parseReceiptText('Milk 45.00\nTOTAL 45.00'),[{name:'Milk',price:45}]);});
test('waste analytics does not invent historical costs',()=>{assert.equal(foodWasteAnalytics([{type:'used'},{type:'wasted'}]).recordedWasteCost,0);});
test('voice commands only allow shopping addition',()=>{assert.deepEqual(parseVoiceCommand('add milk'),{action:'shopping',name:'milk'});assert.equal(parseVoiceCommand('delete everything'),null);});
test('backup validates version and lists',()=>{assert.throws(()=>safeImportKitchen('{}'));});
