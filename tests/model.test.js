import {test} from 'node:test';import assert from 'node:assert/strict';import {flights,position,project,filterFlights} from '../src/model.js';
test('flight endpoints and phase clamping',()=>{assert.deepEqual(position(flights[0],0),flights[0].origin);assert.deepEqual(position(flights[0],2),flights[0].destination);});
test('search handles case and no results',()=>{assert.equal(filterFlights(' yyz ').length,1);assert.equal(filterFlights('nowhere').length,0);});
test('projection stays in map bounds',()=>{assert.deepEqual(project([-180,90]),[0,0]);assert.deepEqual(project([180,-90]),[800,400]);});
