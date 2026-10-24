import {test} from 'node:test';import assert from 'node:assert/strict';import {flights,position,project,filterFlights,selectionFor,advancePhase,trailSegment,airportDirectory} from '../src/model.js';
test('flight endpoints and phase clamping',()=>{assert.deepEqual(position(flights[0],0),flights[0].origin);assert.deepEqual(position(flights[0],2),flights[0].destination);});
test('search handles case and no results',()=>{assert.equal(filterFlights(' yyz ').length,1);assert.equal(filterFlights('nowhere').length,0);});
test('search accepts bundled demo city labels',()=>{assert.deepEqual(filterFlights('toronto').map(f=>f.id),['SP101']);assert.deepEqual(filterFlights('london').map(f=>f.id),['SP101']);assert.deepEqual(filterFlights('sydney').map(f=>f.id),['SP303']);});
test('airport directory is unique, alphabetical and reports demo coverage',()=>{const airports=airportDirectory();assert.equal(airports.length,8);assert.deepEqual(airports.map(a=>a.city),[...airports.map(a=>a.city)].sort());assert.deepEqual(airports.find(a=>a.code==='YYZ'),{code:'YYZ',city:'Toronto',routes:1});});
test('altitude filter composes with airport search and tolerates invalid input',()=>{assert.deepEqual(filterFlights('',38000).map(f=>f.id),['SP303']);assert.deepEqual(filterFlights('JFK',35000).map(f=>f.id),['SP202']);assert.equal(filterFlights('',NaN).length,flights.length);});
test('projection stays in map bounds',()=>{assert.deepEqual(project([-180,90]),[0,0]);assert.deepEqual(project([180,-90]),[800,400]);});


test('filter changes select a visible flight consistently',()=>{const list=filterFlights('SIN');assert.equal(selectionFor(list,'SP101'),'SP303');assert.equal(selectionFor(list,'SP303'),'SP303');assert.equal(selectionFor([], 'SP101'),null);});
test('phase advances by elapsed time rather than render frequency',()=>{assert.equal(advancePhase(10,1000),12);assert.ok(Math.abs(advancePhase(advancePhase(10,500),500)-12)<1e-9);assert.ok(advancePhase(99,1000)<2);});
test('invalid or excessive playback deltas stay bounded',()=>{assert.equal(advancePhase(10,100000),12);assert.equal(advancePhase(10,-1),10);assert.equal(advancePhase(NaN,1),0);});
test('trail segment follows the aircraft and clamps its history window',()=>{assert.deepEqual(trailSegment(flights[0],.6,25),[position(flights[0],.35),position(flights[0],.6)]);assert.deepEqual(trailSegment(flights[0],.1,25)[0],flights[0].origin);assert.deepEqual(trailSegment(flights[0],2,200)[1],flights[0].destination);});


