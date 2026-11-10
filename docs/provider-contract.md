# Live provider boundary

Sky Pulse remains in synthetic demo mode. `src/integrations/provider.ts` defines the boundary a future server adapter must satisfy without choosing or contacting a provider.

The adapter must supply a provider label, observation timestamp and bounded aircraft array. The UI must display the provider label and distinguish fresh, stale, empty and failed states. Coordinates outside geographic bounds, invalid timestamps and future observations are rejected. Individual malformed aircraft are dropped without reclassifying demo fixtures as live data.

Before a concrete provider is implemented, document its current terms, attribution, rate limits, permitted caching, coverage and key-handling requirements. Browser code must not contain a provider secret.
