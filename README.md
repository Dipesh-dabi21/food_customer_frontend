# Customer frontend

Vite + React customer app for the food-order assessment.

## Run
1. Copy `.env.example` to `.env`.
2. `npm install`
3. `npm run dev`

Set `VITE_API_URL` to the backend API base URL. The menu has demo fallback items if the backend is not running; placing orders requires the backend.

## Features
- Responsive menu, categories, cart quantity controls and checkout
- Order confirmation and polling-based status tracking
- API integration with the Express backend

Never put private server secrets in Vite variables: `VITE_*` values are public in the browser bundle.
