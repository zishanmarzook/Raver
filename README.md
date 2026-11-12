# Food Saver

A calm, cream-themed kitchen companion. Search 77 groceries (or add custom food), track quantities and editable expiry countdowns, discover 12 recipes, and build a shopping list.

## Features

- Manual packaging dates or clearly labelled, editable shelf-life estimates.
- Grocery search, storage/category filters, food editing, used-item tracking and undo.
- Strict ingredient matching or flexible recipes with missing-ingredient shopping lists. Matches check ingredient types; recipe quantities remain visible for review.
- Individual, student, family and roommate profiles, whole-kitchen/perishable views, and selectable features.
- In-app expiry reminder centre with adjustable lead times. Background push notifications are not enabled.
- Local device persistence, JSON data export, clearly labelled sample kitchen, and a fresh start flow.
- Mobile layout, web app manifest, app icons, and service worker for revisiting cached screens offline.

## Run

No installation or build step is needed. Serve `dist/` with a static HTTP server, for example:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. For phone installation, serve over HTTPS and use your browser’s Add to Home Screen / Install option. This is a web app, not an App Store package.

```sh
npm run check
npm test
```

## Data

Records stay in this browser on this device. Kitchen profiles do not create shared accounts or cloud synchronisation. Expiry estimates are approximate and editable, not freshness guarantees. No bank, grocery, or recipe API is required. Food images are bundled locally; font loading is optional and has system fallbacks.

## Deployment

Deploy the contents of `dist/` on any static host. The Sites deployment uses `.openai/hosting.json`. This repository is the Food Saver project requested for `Raver`.
