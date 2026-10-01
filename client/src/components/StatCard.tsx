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
      "bg-slate-900/40 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-white/5 hover:border-white/10 transition-all duration-300",
      className
    )}>
      {/* Background Gradient Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-white/30 font-semibold text-xs uppercase tracking-widest">{title}</span>
        {icon && <div className="text-white/20 bg-white/5 p-2 rounded-xl border border-white/5">{icon}</div>}
      </div>

      <div className="relative z-10">
        <div className="flex items-end gap-3">
          <h3 className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight tabular-nums">
            {value}
          </h3>
          
          {trend && (
            <div className={clsx(
              "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold mb-1.5 border",
              trend === "up" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
              trend === "down" && "bg-rose-500/10 text-rose-400 border-rose-500/20",
              trend === "stable" && "bg-blue-500/10 text-blue-400 border-blue-500/20"
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
          <p className="text-white/20 text-xs mt-2 font-medium tracking-wide">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
