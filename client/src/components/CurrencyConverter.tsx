import { useState, useEffect } from 'react';
import { ArrowUpDown, Calculator } from 'lucide-react';
import { clsx } from 'clsx';
import { translations } from '@/lib/translations';

interface CurrencyConverterProps {
  rate: number; // Current market price for $100
  lang: 'ar' | 'en';
}

export function CurrencyConverter({ rate, lang }: CurrencyConverterProps) {
  const t = translations[lang];
  const [usd, setUsd] = useState<string>('');
  const [iqd, setIqd] = useState<string>('');
  const [activeRow, setActiveRow] = useState<'usd' | 'iqd' | null>(null);
  const [isSwapped, setIsSwapped] = useState(false);
  
  useEffect(() => {
    setUsd('');
    setIqd('');
  }, [rate]);

  // Rate is usually per $100 (e.g., 148,000 IQD per $100)
  const ratePerDollar = rate / 100;

  const handleUsdChange = (value: string) => {
    const cleanValue = value.replace(/,/g, '');
    if (cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue)) {
      setUsd(cleanValue);
      if (cleanValue === '') {
        setIqd('');
      } else {
        const num = parseFloat(cleanValue);
        if (!isNaN(num)) {
          setIqd((num * ratePerDollar).toFixed(0));
        }
      }
    }
  };

  const handleIqdChange = (value: string) => {
    const cleanValue = value.replace(/,/g, '');
    if (cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue)) {
      setIqd(cleanValue);
      if (cleanValue === '') {
        setUsd('');
      } else {
        const num = parseFloat(cleanValue);
        if (!isNaN(num)) {
          setUsd((num / ratePerDollar).toFixed(2));
        }
      }
    }
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  const formatNumber = (val: string) => {
    if (!val) return '';
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const usdRow = (
    <div 
      className={clsx(
        "p-6 transition-colors duration-300",
        activeRow === 'usd' ? "bg-secondary/70" : "bg-transparent"
      )}
      onClick={() => setActiveRow('usd')}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-widest">{t.amountInUsd}</span>
        <span className="text-lg font-medium text-muted-foreground">USD</span>
      </div>
      <input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*"
        value={formatNumber(usd)}
        onChange={(e) => handleUsdChange(e.target.value)}
        onFocus={() => setActiveRow('usd')}
        onBlur={() => setActiveRow(null)}
        placeholder="0"
        className="w-full bg-transparent border-0 p-0 text-left text-[2.5rem] md:text-[3.5rem] font-bold text-foreground placeholder:text-muted-foreground/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all tabular-nums"
        dir="ltr"
      />
    </div>
  );

  const iqdRow = (
    <div 
      className={clsx(
        "p-6 transition-colors duration-300",
        activeRow === 'iqd' ? "bg-secondary/70" : "bg-transparent"
      )}
      onClick={() => setActiveRow('iqd')}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-widest">{t.amountInIqd}</span>
        <span className="text-lg font-medium text-muted-foreground">IQD</span>
      </div>
      <input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*"
        value={formatNumber(iqd)}
        onChange={(e) => handleIqdChange(e.target.value)}
        onFocus={() => setActiveRow('iqd')}
        onBlur={() => setActiveRow(null)}
        placeholder="0"
        className="w-full bg-transparent border-0 p-0 text-left text-[2.5rem] md:text-[3.5rem] font-bold text-foreground placeholder:text-muted-foreground/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all tabular-nums"
        dir="ltr"
      />
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-[2.5rem] p-6 md:p-8 border border-border shadow-[0_8px_28px_rgb(var(--theme-shadow)/0.055)] relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="p-2.5 rounded-xl bg-secondary/70 border border-border shadow-inner">
            <Calculator className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-xl text-foreground tracking-tight">{t.currencyConverter}</h3>
        </div>

        <div className="relative z-10 grid grid-cols-1 bg-secondary/45 border border-border rounded-3xl overflow-hidden">
          {isSwapped ? iqdRow : usdRow}

          {/* Divider & Swap Icon */}
          <div className="relative h-px bg-secondary/70 w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={handleSwap}
                className="p-2 rounded-full bg-card border border-border shadow-[0_4px_14px_rgb(var(--theme-shadow)/0.08)] hover:bg-secondary transition-all active:scale-90"
              >
                <ArrowUpDown className={clsx("w-4 h-4 text-muted-foreground transition-transform duration-300", isSwapped && "rotate-180")} />
              </button>
            </div>
          </div>

          {isSwapped ? usdRow : iqdRow}
        </div>

        <div className="mt-6 text-center">
          <p 
            className="text-muted-foreground/60 text-xs font-medium tracking-wider"
            style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
          >
            1 USD ≈ {ratePerDollar.toLocaleString()} IQD
          </p>
        </div>
      </div>
    </div>
  );
}
