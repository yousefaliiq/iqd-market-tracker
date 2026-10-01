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
        activeRow === 'usd' ? "bg-white/[0.05]" : "bg-transparent"
      )}
      onClick={() => setActiveRow('usd')}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">{t.amountInUsd}</span>
        <span className="text-lg font-medium text-white/50">USD</span>
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
        className="w-full bg-transparent border-0 p-0 text-left text-[2.5rem] md:text-[3.5rem] font-bold text-white placeholder:text-white/5 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all tabular-nums"
        dir="ltr"
      />
    </div>
  );

  const iqdRow = (
    <div 
      className={clsx(
        "p-6 transition-colors duration-300",
        activeRow === 'iqd' ? "bg-white/[0.05]" : "bg-transparent"
      )}
      onClick={() => setActiveRow('iqd')}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">{t.amountInIqd}</span>
        <span className="text-lg font-medium text-white/50">IQD</span>
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
        className="w-full bg-transparent border-0 p-0 text-left text-[2.5rem] md:text-[3.5rem] font-bold text-white placeholder:text-white/5 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all tabular-nums"
        dir="ltr"
      />
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-900/40 rounded-[2.5rem] p-6 md:p-8 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[12px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            <Calculator className="w-5 h-5 text-white/40" />
          </div>
          <h3 className="font-bold text-xl text-white/90 tracking-tight">{t.currencyConverter}</h3>
        </div>

        <div className="relative z-10 grid grid-cols-1 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
          {isSwapped ? iqdRow : usdRow}

          {/* Divider & Swap Icon */}
          <div className="relative h-px bg-white/5 w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={handleSwap}
                className="p-2 rounded-full bg-[#0F172A] border border-white/10 shadow-xl hover:bg-white/10 transition-all active:scale-90"
              >
                <ArrowUpDown className={clsx("w-4 h-4 text-white/40 transition-transform duration-300", isSwapped && "rotate-180")} />
              </button>
            </div>
          </div>

          {isSwapped ? usdRow : iqdRow}
        </div>

        <div className="mt-6 text-center">
          <p 
            className="text-white/20 text-xs font-medium tracking-wider"
            style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
          >
            1 USD ≈ {ratePerDollar.toLocaleString()} IQD
          </p>
        </div>
      </div>
    </div>
  );
}
