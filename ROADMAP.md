# Raver delivery status and staged roadmap

## Implemented on this draft branch
- Smart Kitchen navigation, offline recipe ranking, Leftover Rescue and seven-day meal suggestions.
- In-app expiry digest (existing reminder center retained); no background push notifications.
- Budget and per-shopping-item price entry with explicit unpriced-item reporting.
- Fridge/Freezer/Pantry plus Counter/Cabinet/Cellar and optional shelf notes.
- Barcode camera capture where native BarcodeDetector is supported; validation only, **not product database lookup**.
- Receipt **text** parsing and individual review/add-to-shopping actions; photo OCR is not implemented.
- Optional browser speech recognition for simple “add X” shopping commands.
- Used/wasted activity events and basic waste counts, starting with new actions only.
- Offline caching of new modules, regression tests, CI workflow.
- Preserved localStorage schema version and original pages.

## Outstanding implementation
1. **Real AI Fridge Chef**: requires a secure server-side model API proxy, rate limits, dietary/allergen controls, fallback and costs.
2. **Receipt photo OCR**: choose and integrate on-device OCR or secure hosted OCR; verify output and permissions.
3. **Product lookup**: select barcode database, manage missing products and API quotas.
4. **Shared Family Fridge + true Offline Sync**: requires a backend, authenticated household membership, authorization rules, migration, conflict policy, retry queue and security tests. Local browser storage is NOT shared between devices.
5. **Smart Expiry Alerts**: notifications outside the open app require explicit permissions and a reliable push service; web browsers may limit delivery.
6. **Food Waste Analytics**: history chart, disposal reason, cost and quantity normalization, import/export and corrections.
7. **Meal Planner**: portion-aware inventory reservation, dietary filters and persistent editable schedule.
8. **Voice Assistant**: broader commands and accessible fallback.

## Validation before merge
- Run `npm run check` and `npm test` (GitHub Actions workflow included).
- Test on iOS Safari, Android Chrome and desktop; especially camera, speech recognition, service worker update, data persistence and layout.
- Confirm no accidental loss of user data when resetting or importing.
- Review camera permission lifecycle and ensure no API secrets are shipped to browser.
- Do not merge until checks and manual QA are complete.
