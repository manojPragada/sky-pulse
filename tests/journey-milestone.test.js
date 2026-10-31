import test from 'node:test';import assert from 'node:assert/strict';import {nextJourneyMilestone} from '../src/model.js';
test('nextJourneyMilestone follows the synthetic profile boundaries',()=>{assert.equal(nextJourneyMilestone(0),'cruise in 15%');assert.equal(nextJourneyMilestone(.5),'descent in 35%');assert.equal(nextJourneyMilestone(1),'arrival in 0%');});
