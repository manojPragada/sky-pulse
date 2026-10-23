# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support

## Next

- [ ] Add verified live-data provider adapter with rate-limit handling
- [ ] Replace schematic map with attributed geographic geometry
- [x] Add bundled city-label search for demo endpoints
- [ ] Add geographic search and altitude history

## Continuity

2026-10-22: Extended offline airport filtering to bundled city labels and made endpoint names visible in flight details. Labels are static demo metadata, not a geographic provider. Next: verify provider terms before any live-data adapter.

2026-10-21: Added full-route, 25% and 10% synthetic trail windows. Trail geometry follows the scrubbed/playback position, clamps safely at route boundaries and is covered in model and browser tests. Next: verify provider terms before any live adapter.

2026-10-21: Added a composable synthetic altitude filter with stable selected-flight fallback and browser coverage. No provider or live altitude claim. Next: verify a live-data provider's terms and rate limits before implementing an adapter.

2026-10-20: Added repeatable Playwright regression checks and a public-repository-only CI workflow. Desktop, mobile and motion-enabled scenarios passed locally using Chromium 153; model tests and syntax checks passed. Screenshots generated locally for inspection. Earlier browser-unavailable notes below are historical. No deployment or live-provider validation performed. Next: expand browser coverage and review the existing PR before merging.

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 3 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.


2026-10-18: Fixed filtered-selection/detail consistency, stopped rebuilding list controls during animation, added elapsed-time playback, hidden-tab pausing, live motion preference handling and manual journey steps. Six model tests pass. Browser QA remains blocked by browser download failure; no live provider or deployment added.


