import test from 'node:test';import assert from 'node:assert/strict';import {altitudeTrend} from '../src/model.js';
test('altitude trend follows the bounded synthetic profile',()=>{assert.equal(altitudeTrend(-1),'gaining altitude');assert.equal(altitudeTrend(.5),'holding fictional cruise altitude');assert.equal(altitudeTrend(2),'losing altitude');});
