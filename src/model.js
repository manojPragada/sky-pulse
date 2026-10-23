export const flights=[{id:'SP101',from:'YYZ',to:'LHR',origin:[-79,44],destination:[0,51],altitude:35000},{id:'SP202',from:'JFK',to:'LIS',origin:[-74,41],destination:[-9,39],altitude:37000},{id:'SP303',from:'SIN',to:'SYD',origin:[104,1],destination:[151,-34],altitude:39000},{id:'SP404',from:'DEL',to:'DXB',origin:[77,29],destination:[55,25],altitude:33000}];
export const airportLabels={YYZ:'Toronto',LHR:'London',JFK:'New York',LIS:'Lisbon',SIN:'Singapore',SYD:'Sydney',DEL:'Delhi',DXB:'Dubai'};
export function project([lon,lat]){return [(lon+180)/360*800,(90-lat)/180*400];}
export function position(flight,phase){const t=Math.max(0,Math.min(1,phase));return flight.origin.map((n,i)=>n+(flight.destination[i]-n)*t);}
export function filterFlights(query,minAltitude=0){const q=query.trim().toLowerCase();const altitude=Number(minAltitude);return flights.filter(f=>`${f.id} ${f.from} ${airportLabels[f.from]} ${f.to} ${airportLabels[f.to]}`.toLowerCase().includes(q)&&f.altitude>=(Number.isFinite(altitude)?altitude:0));}
export function trailSegment(flight,phase,trailPercent=100){const end=Math.max(0,Math.min(1,Number(phase)||0));const length=Math.max(0,Math.min(100,Number(trailPercent)||0))/100;return [position(flight,Math.max(0,end-length)),position(flight,end)];}


export function selectionFor(visible, selected) {
  return visible.find(flight => flight.id === selected)?.id ?? visible[0]?.id ?? null;
}
export function advancePhase(percent, elapsedMs) {
  if (!Number.isFinite(percent) || !Number.isFinite(elapsedMs)) return 0;
  return ((percent + Math.max(0, Math.min(elapsedMs, 1000)) * .002) % 100 + 100) % 100;
}


