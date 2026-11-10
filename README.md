# Sky Pulse
A visually focused flight-tracking interface, beginning with a fully offline synthetic demo.

**Status:** working demo foundation. Selectable aircraft, trails, airport search, responsive layouts and empty states are implemented. No live provider is configured, no real aircraft positions are shown and there is no hosted demo.

## Run and verify
Prerequisites: Node.js 22+ and npm 11+.
```bash
npm install
npm run dev
npm run check
npm run build
```
`check` runs strict TypeScript validation and unit tests. No linter is configured.

## Configuration
None. `.env.example` documents that demo mode has no keys. Do not add a provider key until its terms, attribution, storage rules and rate limits are documented.

## Structure
```text
src/data.ts       typed synthetic aircraft, airports and map projection
src/main.ts       state, rendering and interactions
src/styles.css    responsive visual system and motion preferences
src/data.test.ts  data/search contract tests
src/integrations/ provider-neutral live-response boundary and tests
docs/             integration contracts and provenance requirements
ROADMAP.md        sequenced product work
```

## Architecture and data
The app is dependency-light TypeScript rendered into semantic HTML plus an inline SVG map. All records use `demo-*` IDs and are authored fixtures, not a cached or simulated live feed. Selection updates the aircraft detail panel; airport search is entirely local. No network request runs in the browser.

## Accessibility and performance
Native buttons drive every selection, focus styles use browser defaults, a skip link reaches the flight list, and details are announced through an `aria-live` region. Mobile layouts remove nonessential telemetry. Motion is limited to a selected-marker pulse and is disabled when reduced motion is requested.

## Deployment
Run `npm run build` and serve `dist/` from a static host. No deployment has been performed. The interface must continue to display synthetic/live provenance and feed freshness if an adapter is added.

## Troubleshooting
- No results: search the four demo airports by code or city.
- Blank page: run `npm run check`, then confirm the built `dist/index.html` is served rather than opened through a restricted file URL.
- Confusing position: coordinates are display-projection values, not navigation data.

## Assets and contributions
All geometry, copy and synthetic fixtures are original and generated in code; no map tiles or third-party imagery are included. Keep fixtures fictional, update the roadmap, and run both checks before contributing. No license has been selected.
