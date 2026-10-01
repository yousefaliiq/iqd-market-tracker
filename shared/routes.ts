import { z } from 'zod';

export const api = {
  dinar: {
    getMarket: {
      method: 'GET' as const,
      path: '/api/dinar/market',
      query: z.object({
        type: z.enum(['market', 'official']).optional()
      }),
      responses: {
        200: z.object({
          currentPrice: z.number(),
          previousPrice: z.number(),
          trend: z.enum(["up", "down", "stable"]),
          trendPercentage: z.number(),
          trendPeriodDays: z.number(),
          buyPrice: z.number(),
          sellPrice: z.number(),
          lastUpdated: z.string(),
          history: z.array(z.object({
            date: z.string(),
            price: z.number(),
            time: z.string(),
          })),
        }),
        500: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type DinarMarketData = z.infer<typeof api.dinar.getMarket.responses[200]>;
