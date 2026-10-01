import type { Express } from "express";
import { type Server } from "http";
import { api } from "@shared/routes";

const DEFAULT_MARKET_DATA_URL =
  "https://docs.google.com/spreadsheets/d/1rttwTeKKbtOgDzL9ovwY3eW0Kh0sxBTwmstt9e-QL8U/export?format=csv";
const DEFAULT_OFFICIAL_RATE = 132000;

type HistoryPoint = { date: string; price: number; time: string };

function officialHistory(rate: number): HistoryPoint[] {
  const now = new Date();
  const points: HistoryPoint[] = [];

  for (let daysAgo = 30; daysAgo >= 0; daysAgo -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - daysAgo);
    points.push({
      date: date.toISOString().split("T")[0],
      price: rate,
      time: "00:00",
    });
  }

  return points;
}

function parseMarketCsv(csvText: string): HistoryPoint[] {
  const history: HistoryPoint[] = [];
  const lines = csvText.split("\n");

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    const parts = line.split(",").map((part) => part.replace(/["']/g, "").trim());
    if (parts.length < 3) continue;

    const date = parts[0];
    const price = Number.parseInt(parts[1].replace(/[,\"]/g, ""), 10);
    const time = parts[2] || "";

    if (Number.isFinite(price) && price > 50000) {
      history.push({ date, price, time });
    }
  }

  return history;
}

function buildMarketResponse(history: HistoryPoint[], type: "market" | "official") {
  const currentPoint = history[history.length - 1];
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const recent = history.filter((point) => {
    const normalized = point.date.includes("/") ? point.date.replace(/\//g, "-") : point.date;
    return new Date(normalized) >= threeDaysAgo;
  });

  const baselinePoint =
    recent[0] ?? (history.length > 3 ? history[history.length - 4] : history[0]);
  const difference = currentPoint.price - baselinePoint.price;
  const rawPercentage = baselinePoint.price === 0 ? 0 : (difference / baselinePoint.price) * 100;
  const trend = Math.abs(rawPercentage) <= 0.01 ? "stable" : rawPercentage > 0 ? "up" : "down";
  const spread = type === "official" ? 0 : 500;

  return {
    currentPrice: currentPoint.price,
    previousPrice: baselinePoint.price,
    trend,
    trendPercentage: Math.abs(rawPercentage),
    trendPeriodDays: 3,
    buyPrice: currentPoint.price - spread,
    sellPrice: currentPoint.price + spread,
    lastUpdated:
      type === "official" ? new Date().toLocaleString() : `${currentPoint.date} ${currentPoint.time}`,
    history,
  };
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get(api.dinar.getMarket.path, async (req, res) => {
    try {
      const type = req.query.type === "official" ? "official" : "market";
      let history: HistoryPoint[];

      if (type === "official") {
        const configured = Number.parseInt(process.env.OFFICIAL_RATE_IQD_PER_100_USD || "", 10);
        const rate = Number.isFinite(configured) ? configured : DEFAULT_OFFICIAL_RATE;
        history = officialHistory(rate);
      } else {
        const response = await fetch(process.env.DINAR_DATA_URL || DEFAULT_MARKET_DATA_URL);
        if (!response.ok) throw new Error(`Market data source returned ${response.status}`);
        history = parseMarketCsv(await response.text());
      }

      if (history.length === 0) throw new Error("Market data source returned no valid rows");
      res.json(buildMarketResponse(history, type));
    } catch (error) {
      console.error("Market data request failed:", error);
      res.status(502).json({ message: "Market data is temporarily unavailable" });
    }
  });

  return httpServer;
}
