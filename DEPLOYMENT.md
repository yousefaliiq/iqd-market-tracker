# IQD Market Tracker deployment

## Services required

- GitHub repository
- Render Web Service

No database, Supabase project, private API key, or external account is required for the default portfolio deployment.

## Deploy to Render

Connect the GitHub repository and create a Web Service with:

- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check: `/api/health`

The application uses its configured public CSV source by default. If you later want to replace that feed, add a `DINAR_DATA_URL` environment variable containing the URL of a compatible CSV feed. `OFFICIAL_RATE_IQD_PER_100_USD` is optional and overrides the displayed official rate.

## Verify

Check:

- `/api/health` returns `{ "status": "ok" }`
- Market and official tabs both load
- The chart renders on desktop and mobile
- The currency converter works
- Arabic and English layouts work
