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
import { format, subDays, subMonths, subYears, isAfter } from "date-fns";
import { DinarDataPoint } from "@shared/schema";
import { clsx } from "clsx";

interface PriceChartProps {
  data: DinarDataPoint[];
  sparkline?: boolean;
  color?: string;
}

type TimeFrame = "1D" | "1M" | "6M" | "1Y";

export function PriceChart({ data, sparkline = false, color = "hsl(var(--primary))" }: PriceChartProps) {
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

    const latestDate = dataWithParsedDates[dataWithParsedDates.length - 1].parsedDate;
    const startDate =
      timeFrame === "1M"
        ? subDays(latestDate, 30)
        : timeFrame === "6M"
          ? subMonths(latestDate, 6)
          : subYears(latestDate, 1);
    const rangeData = dataWithParsedDates.filter(
      d => isAfter(d.parsedDate, startDate) || d.parsedDate.getTime() === startDate.getTime()
    );
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
        {(["1D", "1M", "6M", "1Y"] as TimeFrame[]).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeFrame(tf)}
            className={clsx(
              "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
              timeFrame === tf
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
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
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.16} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border) / 0.75)"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
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
                    <div className="bg-card p-3 rounded-xl border border-border shadow-[0_10px_30px_rgb(var(--theme-shadow)/0.1)]">
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                        {format(item.parsedDate, "PPP")}
                      </p>
                      {item.time && <p className="text-muted-foreground text-[10px] mb-1">{item.time}</p>}
                      <p className="text-foreground font-bold text-lg">
                        {item.price.toLocaleString()} <span className="text-xs text-muted-foreground uppercase ml-1">IQD</span>
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
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={850}
              animationEasing="ease-in-out"
              animationBegin={0}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
