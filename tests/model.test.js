import {test} from 'node:test';import assert from 'node:assert/strict';import {flights,position,project,filterFlights,selectionFor,advancePhase} from '../src/model.js';
test('flight endpoints and phase clamping',()=>{assert.deepEqual(position(flights[0],0),flights[0].origin);assert.deepEqual(position(flights[0],2),flights[0].destination);});
test('search handles case and no results',()=>{assert.equal(filterFlights(' yyz ').length,1);assert.equal(filterFlights('nowhere').length,0);});
test('projection stays in map bounds',()=>{assert.deepEqual(project([-180,90]),[0,0]);assert.deepEqual(project([180,-90]),[800,400]);});


test('filter changes select a visible flight consistently',()=>{const list=filterFlights('SIN');assert.equal(selectionFor(list,'SP101'),'SP303');assert.equal(selectionFor(list,'SP303'),'SP303');assert.equal(selectionFor([], 'SP101'),null);});
test('phase advances by elapsed time rather than render frequency',()=>{assert.equal(advancePhase(10,1000),12);assert.ok(Math.abs(advancePhase(advancePhase(10,500),500)-12)<1e-9);assert.ok(advancePhase(99,1000)<2);});
test('invalid or excessive playback deltas stay bounded',()=>{assert.equal(advancePhase(10,100000),12);assert.equal(advancePhase(10,-1),10);assert.equal(advancePhase(NaN,1),0);});
