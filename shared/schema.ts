export interface DinarDataPoint {
  date: string;
  price: number;
  time: string;
}

export interface DinarMarketData {
  currentPrice: number;
  previousPrice: number;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
  trendPeriodDays: number;
  buyPrice: number;
  sellPrice: number;
  lastUpdated: string;
  history: DinarDataPoint[];
}
