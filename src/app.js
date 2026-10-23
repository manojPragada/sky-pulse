import { flights, airportLabels, project, position, filterFlights, selectionFor, advancePhase, trailSegment } from './model.js';
const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let selected = flights[0].id, playing = false, frame = null, previous = null;
const trailLabel=document.createElement('label');trailLabel.textContent='Trail length ';
const trail=document.createElement('select');trail.id='trail';
for(const [value,label] of [['100','Full route'],['25','Last 25%'],['10','Last 10%']]){const option=document.createElement('option');option.value=value;option.textContent=label;trail.append(option);}trailLabel.append(trail);$('#altitude').closest('label').after(trailLabel);
function drawScene() {
  const phase = Number($('#time').value) / 100;
  $('#progress').textContent = Math.round(phase * 100) + '%';
  $('#markers').replaceChildren(); $('#tracks').replaceChildren();
  const ns = 'http://www.w3.org/2000/svg';
  for (const flight of filterFlights($('#search').value,$('#altitude').value)) {
    const [trailStart,trailEnd]=trailSegment(flight,phase,$('#trail').value);const start=project(trailStart),end=project(trailEnd),point = project(position(flight, phase));
    const line = document.createElementNS(ns, 'path');
    line.setAttribute('d', `M${start} L${end}`); line.setAttribute('class', 'trail'); $('#tracks').append(line);
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', point[0]); dot.setAttribute('cy', point[1]);
    dot.setAttribute('r', flight.id === selected ? 7 : 4); dot.setAttribute('class', 'marker'); $('#markers').append(dot);
  }
}
function renderSelection() {
  const visible = filterFlights($('#search').value,$('#altitude').value);
  selected = selectionFor(visible, selected);
  $('#empty').hidden = visible.length > 0; $('#list').replaceChildren();
  for (const flight of visible) {
    const button = document.createElement('button'); button.dataset.flight = flight.id;
    button.textContent = `${flight.id} · ${flight.from} → ${flight.to}`;
    button.setAttribute('aria-pressed', String(flight.id === selected));
    button.addEventListener('click', () => {
      selected = flight.id; renderSelection();
      [...$('#list').children].find(button => button.dataset.flight === selected)?.focus();
    });
    $('#list').append(button);
  }
  const flight = visible.find(flight => flight.id === selected);
  $('#detail').replaceChildren();
  if (flight) {
    const title = document.createElement('h2'); title.textContent = flight.id;
    const metric = document.createElement('p'); metric.className = 'metric'; metric.textContent = flight.altitude.toLocaleString() + ' ft';
    const note = document.createElement('p'); note.className = 'muted small'; note.textContent = `${airportLabels[flight.from]} (${flight.from}) → ${airportLabels[flight.to]} (${flight.to}) · fictional cruise altitude`;
    $('#detail').append(title, metric, note);
  }
  drawScene();
}
function stop(message = 'Playback paused.') {
  playing = false; previous = null;
  if (frame !== null) cancelAnimationFrame(frame); frame = null;
  $('#play').textContent = 'Play demo'; $('#play').setAttribute('aria-pressed', 'false');
  $('#playback-status').textContent = message;
}
function tick(now) {
  if (!playing) return;
  if (previous !== null) $('#time').value = advancePhase(Number($('#time').value), now - previous);
  previous = now; drawScene(); frame = requestAnimationFrame(tick);
}
function motionPreference() {
  if (reduced.matches) stop('Reduced motion enabled. Use the timeline or journey-step buttons.');
  $('#play').disabled = reduced.matches;
}
$('#play').addEventListener('click', () => {
  if (playing) return stop();
  if (reduced.matches) return;
  playing = true; previous = null; $('#play').textContent = 'Pause demo'; $('#play').setAttribute('aria-pressed', 'true');
  $('#playback-status').textContent = 'Playing synthetic journeys.'; frame = requestAnimationFrame(tick);
});
$('#search').addEventListener('input', renderSelection);
$('#altitude').addEventListener('change', renderSelection);
$('#trail').addEventListener('change',drawScene);
$('#time').addEventListener('input', () => { stop(); drawScene(); });
for (const [id, delta] of [['#back', -10], ['#forward', 10]]) $(id).addEventListener('click', () => {
  stop(); $('#time').value = Math.max(0, Math.min(100, Number($('#time').value) + delta)); drawScene();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) stop('Playback paused while this tab is hidden.'); });
reduced.addEventListener('change', motionPreference);
renderSelection(); motionPreference();


