import { clsx } from "clsx";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: "up" | "down" | "stable";
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, trend, subtitle, className, icon }: StatCardProps) {
  return (
    <div className={clsx(
      "bg-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-border transition-colors duration-300",
      className
    )}>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-widest">{title}</span>
        {icon && <div className="text-muted-foreground/60 bg-secondary/70 p-2 rounded-xl border border-border/80">{icon}</div>}
      </div>

      <div className="relative z-10">
        <div className="flex items-end gap-3">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight tabular-nums">
            {value}
          </h3>
          
          {trend && (
            <div className={clsx(
              "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold mb-1.5 border",
              trend === "up" && "bg-emerald-700/10 text-emerald-700 dark:text-emerald-300 border-emerald-700/15",
              trend === "down" && "bg-rose-700/10 text-rose-700 dark:text-rose-300 border-rose-700/15",
              trend === "stable" && "bg-primary/10 text-primary border-primary/15"
            )}>
              {trend === "up" && <ArrowUp className="w-3 h-3" />}
              {trend === "down" && <ArrowDown className="w-3 h-3" />}
              {trend === "stable" && <Minus className="w-3 h-3" />}
              <span>
                {trend === "up" ? "ارتفاع" : trend === "down" ? "انخفاض" : "استقرار"}
              </span>
            </div>
          )}
        </div>
        
        {subtitle && (
          <p className="text-muted-foreground/60 text-xs mt-2 font-medium tracking-wide">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
