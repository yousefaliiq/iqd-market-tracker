import { useEffect, useState } from "react";
import { useMarketData, useRefreshMarketData } from "@/hooks/use-dinar";
import { StatCard } from "@/components/StatCard";
import { PriceChart } from "@/components/PriceChart";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { RefreshCw, Info, TrendingUp, TrendingDown, DollarSign, Menu, Globe, HelpCircle, BookOpen, ShieldCheck, X } from "lucide-react";
import { Link } from "wouter";
import { clsx } from "clsx";
import { MobileNavOverlay } from "@/components/MobileNavOverlay";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { translations } from "@/lib/translations";

export default function Home() {
  const [rateType, setRateType] = useState<'market' | 'official'>('market');
  const { data, isLoading, isError, refetch, isRefetching } = useMarketData(rateType);
  const [lang, setLang] = useState<"ar" | "en">(() => {
    return (localStorage.getItem("language") as "ar" | "en") || "ar";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);
  }, [lang]);

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-4">
          <Info className="w-12 h-12 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.errorLoading}</h2>
        <p className="text-muted-foreground mb-6">{t.errorSub}</p>
        <button 
          onClick={() => refetch()}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-colors"
        >
          {t.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] pb-20 relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-card/95 backdrop-blur-md transform-gpu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[100] p-2 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground/80 transition-all active:scale-95 hover-elevate active-elevate-2 overflow-visible"
              >
                <div className="relative w-6 h-6">
                  <span className={clsx(
                    "absolute block h-0.5 w-6 bg-current transition-all duration-300",
                    isMenuOpen ? "top-3 rotate-45" : "top-1"
                  )} />
                  <span className={clsx(
                    "absolute block h-0.5 w-6 bg-current transition-all duration-300 top-3",
                    isMenuOpen && "opacity-0 translate-x-4"
                  )} />
                  <span className={clsx(
                    "absolute block h-0.5 w-6 bg-current transition-all duration-300",
                    isMenuOpen ? "top-3 -rotate-45" : "top-5"
                  )} />
                </div>
              </button>

              <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {t.title}
                {rateType === 'official' && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({lang === 'ar' ? 'سعر البنك' : 'Official Rate'})</span>
                )}
              </h1>
            </div>

            <div className="flex flex-col items-end opacity-60">
            </div>
          </div>
        </div>
      </header>

      <MobileNavOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        lang={lang}
        setLang={setLang}
        rateType={rateType}
        setRateType={setRateType}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 will-change-transform">
        
        {/* Main Price Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Professional Exchange Rate Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12 flex flex-col min-h-[300px] group transition-colors duration-300 shadow-[0_10px_34px_rgb(var(--theme-shadow)/0.06)] transform-gpu">
            {isLoading ? (
              <div className="flex flex-col gap-8 h-full justify-center">
                <div className="h-4 w-32 bg-secondary/70 rounded-full animate-pulse" />
                <div className="h-16 w-64 bg-secondary/70 rounded-lg animate-pulse" />
              </div>
            ) : (
              <div className="flex flex-col h-full relative z-10">
                {/* Top Row: Label and Trend */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/70 border border-border">
                      <DollarSign className="w-4 h-4 text-muted-foreground/80" />
                    </div>
                    <span className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-widest">
                      {lang === 'ar' ? 'سعر الصرف المباشر' : 'Live Exchange Rate'}
                    </span>
                  </div>
                  
                  {/* Trend Indicator with Stunning Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button 
                        type="button"
                        className={clsx(
                          "flex items-center gap-2 font-bold text-sm px-5 py-2 rounded-full border transition-all duration-500 cursor-pointer hover:scale-105 active:scale-95 transform-gpu",
                          rateType === 'official' ? "bg-secondary/70 text-muted-foreground border-border hover:bg-secondary" :
                          data?.trend === "up" ? "bg-emerald-700/10 text-emerald-700 dark:text-emerald-300 border-emerald-700/15 hover:bg-emerald-700/15" : 
                          data?.trend === "down" ? "bg-rose-700/10 text-rose-700 dark:text-rose-300 border-rose-700/15 hover:bg-rose-700/15" : 
                          "bg-secondary/70 text-muted-foreground border-border hover:bg-secondary"
                        )}
                      >
                        <div className={clsx(
                          "w-2 h-2 rounded-full animate-pulse",
                          rateType === 'official' ? "bg-muted-foreground/40" :
                          data?.trend === "up" ? "bg-emerald-700 dark:bg-emerald-300" : 
                          data?.trend === "down" ? "bg-rose-700 dark:bg-rose-300" : 
                          "bg-muted-foreground/40"
                        )} />
                        <span className="tabular-nums tracking-tighter text-base">
                          {rateType === 'official' ? '0.00%' : (
                            <>
                              {data?.trend === "up" ? '+' : data?.trend === "down" ? '-' : ''}
                              {data?.trendPercentage?.toFixed(2)}%
                            </>
                          )}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent 
                      side="bottom" 
                      className="p-0 border-0 bg-transparent shadow-none w-auto animate-in fade-in slide-in-from-top-2 duration-300"
                      sideOffset={10}
                    >
                      <div className="relative group overflow-hidden rounded-2xl bg-card border border-border p-5 shadow-[0_16px_40px_rgb(var(--theme-shadow)/0.12)] max-w-[280px]">
                        {/* Inner Gradient Glow */}
                        <div className={clsx(
                          "absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-500",
                          data?.trend === "up" ? "bg-green-500" : data?.trend === "down" ? "bg-rose-500" : "bg-white"
                        )} />
                        
                        <div className="relative z-10 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={clsx(
                              "p-2 rounded-lg bg-secondary/70 border border-border transition-colors duration-300",
                              (rateType === 'official' || data?.trend === "stable") ? "text-foreground" : data?.trend === "up" ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
                            )}>
                              {rateType === 'official' || data?.trend === "stable" ? <RefreshCw className="w-4 h-4" /> : data?.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            </div>
                            <h4 className="font-bold text-foreground tracking-tight">
                              {lang === 'ar' ? 'تحليل الاتجاه' : 'Trend Analysis'}
                            </h4>
                          </div>
                          
                          <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                            {rateType === 'official'
                              ? (lang === 'ar' ? 'السوق مستقر. لا يوجد تغيير في السعر الرسمي.' : 'The market is stable. There is no change in the official price.')
                              : (lang === 'ar' 
                                  ? `السوق يتجه نحو ${data?.trend === 'up' ? 'الارتفاع' : 'الانخفاض'}. تم حساب هذه النسبة بناءً على حركة السعر خلال آخر 3 أيام.`
                                  : `The market is trending ${data?.trend === 'up' ? 'up' : 'down'}. This percentage is calculated based on price movement over the last 3 days.`
                                )
                            }
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Main Price Section */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-4">
                      <h2 className="text-7xl md:text-9xl font-bold text-foreground tracking-tighter tabular-nums leading-none">
                        {data?.currentPrice.toLocaleString()}
                      </h2>
                      <span className="text-2xl md:text-3xl text-muted-foreground/35 font-bold tracking-tight uppercase">IQD</span>
                    </div>
                    <p className="text-muted-foreground/80 text-base font-medium tracking-wide">
                      {lang === 'ar' ? 'دينار عراقي مقابل الدولار الأمريكي' : 'Iraqi Dinar per US Dollar'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buy/Sell Grid */}
          <div className="grid grid-cols-2 gap-6 h-full">
            {isLoading ? (
              <>
                <div className="bg-secondary/70 rounded-3xl animate-pulse" />
                <div className="bg-secondary/70 rounded-3xl animate-pulse" />
              </>
            ) : (
              <>
                <StatCard 
                  title={t.buyPrice} 
                  value={data?.buyPrice.toLocaleString() || "0"} 
                  subtitle={rateType === 'official' ? '' : t.buySubtitle}
                  className="h-full bg-card border-border transition-colors duration-300 transform-gpu"
                  icon={<DollarSign className="w-4 h-4" />}
                />
                <StatCard 
                  title={t.sellPrice} 
                  value={data?.sellPrice.toLocaleString() || "0"} 
                  subtitle={rateType === 'official' ? '' : t.sellSubtitle}
                  className="h-full bg-card border-border transition-colors duration-300 transform-gpu"
                  icon={<DollarSign className="w-4 h-4" />}
                />
              </>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-card rounded-3xl p-8 border border-border mb-12 shadow-[0_8px_28px_rgb(var(--theme-shadow)/0.055)] relative overflow-hidden transform-gpu">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-secondary/70 border border-border">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg text-foreground">
                {t.marketAnalysis}
              </h3>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-[350px] w-full bg-secondary/70 animate-pulse rounded-2xl" />
          ) : (
            <div className="relative z-10">
              <PriceChart data={data?.history || []} />
            </div>
          )}
        </div>

        {/* Converter Section */}
        <div className="relative">
          {data && <CurrencyConverter rate={data.currentPrice} lang={lang} />}
        </div>

      </main>
    </div>
  );
}
