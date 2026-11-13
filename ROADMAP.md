# Raver development roadmap

## Current baseline
Static vanilla JavaScript PWA, localStorage v1, 77 catalogue items, 12 recipes, in-app reminders and existing inventory/shopping flows. Preserve data key and backwards compatibility. No API secrets in client code.

## Stage 1 (this branch)
- Offline rescue recipe ranking and 7-day suggestions on the Smart Kitchen screen.
- Expiry digest logic and budget calculation primitives; price-entry UI is not yet implemented.
- Existing Fridge/Freezer/Pantry selector remains in place.
- Service worker precaches the new module.
- Automated unit tests for new calculations.

## Stage 2 — capture
Barcode scanning via camera API and product lookup with explicit manual fallback; receipt OCR with user confirmation; optional speech recognition with text fallback. Require HTTPS and handle denied permissions. Never silently insert unverified items.

## Stage 3 — analytics and reminders
Add append-only inventory activity events (used/wasted/edited), clear monetary-value provenance, monthly waste analytics, opt-in browser notifications with capability checks. Avoid assuming notifications run while browser is closed.

## Stage 4 — accounts and offline sync
Choose backend/auth provider, design household membership roles, scoped security rules, sync queue, idempotent mutations, conflict resolution and migration from localStorage. Encrypt transport; no anonymous shared kitchen access.

## Stage 5 — AI Fridge Chef
Server-side proxy for optional AI recipe generation, per-user quotas, dietary restrictions and allergy warnings. Keep deterministic offline suggestions when API is unavailable.

## Release gates
Run npm run check and npm test; manually test desktop/mobile, storage migration, offline reload, permission denial, accessibility and cross-browser behavior. Do not merge until checks pass.
