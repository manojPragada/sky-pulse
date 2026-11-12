# Roadmap
## Completed
- [x] Build a usable synthetic demo map with selectable aircraft and trails
- [x] Add airport search, detail states and explicit demo labeling
- [x] Add responsive, keyboard-accessible and reduced-motion presentation
- [x] Add bounded pan/zoom controls with keyboard-operable equivalents
- [x] Define a provider-neutral normalization and freshness contract
## Next
- [ ] Verify provider terms, attribution and rate limits before any live integration
- [x] Persist optional demo favorites locally with validated IDs
- [x] Add an accessible saved-only demo flight filter and empty state
## Continuity
2026-11-11: Added a keyboard-operable saved-only flight filter with deterministic fixture ordering and a clear empty state when no demo flights are saved. Next: evaluate a specific provider's current terms, attribution, coverage and limits before wiring an adapter.

2026-11-10: Added user-initiated browser-local favorites for synthetic flights, validating restored IDs against the current fixture set and keeping provenance labels visible. Next: evaluate a specific provider's current terms, attribution, coverage and limits before wiring an adapter.

2026-11-09: Added a provider-neutral envelope normalizer with geographic validation, future-timestamp rejection and explicit fresh/stale states. No provider is selected or contacted. Next: evaluate a specific provider's current terms, attribution, coverage and limits before wiring an adapter.

2026-11-09: Added bounded pan/zoom controls as native buttons, retained focus across map redraws and unit-tested viewport clamping. Next: define the provider-neutral freshness/error contract before considering live data.

2026-11-09: Established the first working Sky Pulse interface with three fictional flights, route trails, aircraft inspection and airport search. Every surface labels the data synthetic; no real positions or provider claims are made.
