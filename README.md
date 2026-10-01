# IQD Market Tracker

A responsive web application for following Iraqi dinar exchange-rate data, comparing market and official rates, reviewing recent trends, and converting between IQD and USD.

## Highlights

- Live market data fetched through a server-side API
- Market and official-rate views
- Historical chart and short-term trend calculation
- Buy/sell spread presentation
- Currency converter
- Arabic and English interface
- Responsive desktop and mobile layouts

## Stack

- React
- TypeScript
- Express
- TanStack Query
- Recharts
- Tailwind CSS
- Zod

## Local development

```bash
npm install
npm run dev
```

No database is required.

An optional `DINAR_DATA_URL` environment variable can point to a compatible CSV feed. If it is not provided, the application uses its default public data source. `OFFICIAL_RATE_IQD_PER_100_USD` can override the displayed official rate.

## Production

```bash
npm run build
npm start
```

## Render

A `render.yaml` blueprint is included. Manual deployment settings:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check: `/api/health`
- Node: 22


For the production checklist, see `DEPLOYMENT.md`.
