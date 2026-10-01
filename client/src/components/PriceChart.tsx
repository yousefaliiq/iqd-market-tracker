import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, subMonths, isAfter } from "date-fns";
import { DinarDataPoint } from "@shared/schema";
import { clsx } from "clsx";

interface PriceChartProps {
  data: DinarDataPoint[];
  sparkline?: boolean;
  color?: string;
}

type TimeFrame = "1D" | "1M" | "6M";

export function PriceChart({ data, sparkline = false, color = "#3b82f6" }: PriceChartProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1D");

  const chartData = useMemo(() => {
    if (!data.length) return [];

    const dataWithParsedDates = data.map(d => {
      const normalizedDate = d.date.replace(/\//g, "-");
      const parts = normalizedDate.split("-");
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const parsedDate = new Date(year, month, day);
      
      const cleanPrice = typeof d.price === "string" 
        ? parseFloat((d.price as string).replace(/[,د.ع]/g, ""))
        : d.price;

      return { ...d, price: cleanPrice, parsedDate };
    }).filter(d => !isNaN(d.parsedDate.getTime()));

    if (sparkline) {
      // Return last 20 points for sparkline
      return dataWithParsedDates.slice(-20).map(d => ({ ...d, label: d.time }));
    }

    if (timeFrame === "1D") {
      const lastEntry = dataWithParsedDates[dataWithParsedDates.length - 1];
      const lastDate = lastEntry.date;
      const fallbackData = dataWithParsedDates.filter(d => d.date === lastDate);
      
      // If we only have one point for the day (common with official rate), 
      // duplicate it at the start of the day to ensure a horizontal line is drawn
      if (fallbackData.length === 1) {
        return [
          { ...fallbackData[0], label: "00:00", time: "00:00" },
          { ...fallbackData[0], label: "23:59", time: "23:59" }
        ];
      }
      return fallbackData.map(d => ({ ...d, label: d.time }));
    }

    const now = new Date();
    const startDate = timeFrame === "1M" ? subDays(now, 30) : subMonths(now, 6);
    const rangeData = dataWithParsedDates.filter(d => isAfter(d.parsedDate, startDate));
    const dailyMap = new Map<string, any>();
    rangeData.forEach(d => dailyMap.set(d.date, d));
    return Array.from(dailyMap.values()).map(d => ({
      ...d,
      label: format(d.parsedDate, "MMM dd")
    }));
  }, [data, timeFrame, sparkline]);

  if (sparkline) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#sparklineGradient)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        {(["1D", "1M", "6M"] as TimeFrame[]).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeFrame(tf)}
            className={clsx(
              "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
              timeFrame === tf
                ? "bg-primary text-slate-900 shadow-lg shadow-primary/20"
                : "bg-slate-800 text-slate-400 hover:text-slate-200"
            )}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              minTickGap={30}
              dy={10}
            />
            <YAxis
              hide
              domain={[(dataMin: number) => dataMin * 0.999, (dataMax: number) => dataMax * 1.001]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
                        {format(item.parsedDate, "PPP")}
                      </p>
                      {item.time && <p className="text-white/40 text-[10px] mb-1">{item.time}</p>}
                      <p className="text-white font-bold text-lg">
                        {item.price.toLocaleString()} <span className="text-xs text-white/20 uppercase ml-1">IQD</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={1000}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
