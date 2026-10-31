import {test} from 'node:test';import assert from 'node:assert/strict';import {journeyPhase} from '../src/model.js';
test('journey phase is bounded and descriptive',()=>{assert.equal(journeyPhase(-1),'Climbing');assert.equal(journeyPhase(.5),'Cruising');assert.equal(journeyPhase(2),'Descending');});
