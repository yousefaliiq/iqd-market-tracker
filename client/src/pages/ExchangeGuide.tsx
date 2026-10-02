import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  UserX, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  Plane, 
  HelpCircle, 
  ArrowLeft 
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MobileNavOverlay } from "@/components/MobileNavOverlay";
import { clsx } from "clsx";

interface GuideItem {
  icon: any;
  title: { ar: string; en: string };
  body: { ar: string; en: string };
  iconColor?: string;
}

export default function ExchangeGuide() {
  const [lang, setLang] = useState<"en" | "ar">(() => {
    return (localStorage.getItem("language") as "en" | "ar") || "ar";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rateType, setRateType] = useState<'market' | 'official'>('market');

  useEffect(() => {
    const handleStorage = () => {
      const currentLang = (localStorage.getItem("language") as "en" | "ar") || "ar";
      setLang(currentLang);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);
  }, [lang]);

  const t = {
    title: lang === "ar" ? "دليل الصرف" : "Exchange Guide",
    tourists: lang === "ar" ? "السياح" : "For Tourists",
    general: lang === "ar" ? "معلومات عامة" : "General Info",
    back: lang === "ar" ? "رجوع" : "Back",
  };

  const touristsTips: GuideItem[] = [
    {
      icon: CreditCard,
      title: {
        ar: "متى تستخدم سعر الصرف الرسمي؟",
        en: "When to use the Official Exchange Rate?"
      },
      body: {
        ar: "تستطيع استخدام بطاقتك العالمية (Credit/Debit Card) للدفع عبر أجهزة الدفع (POS) في الفنادق، المولات، وتطبيقات النقل وتوصيل الطعام، أو عند سحب الأموال من الصراف الآلي (ATM). هذه البطاقات مقبولة، وسيتم احتساب الصرف تلقائياً وفق السعر الرسمي للبنك المركزي (حوالي 1320 دينار).",
        en: "You can use your international cards (Credit/Debit Card) for POS payments in hotels, malls, transport apps, and food delivery, or when withdrawing money from an ATM. These cards are accepted, and the exchange will be calculated automatically at the official Central Bank rate (approx. 1320 IQD)."
      }
    },
    {
      icon: Banknote,
      title: {
        ar: "متى تستخدم سعر صرف السوق الموازي؟",
        en: "When to use the Parallel Market Rate?"
      },
      body: {
        ar: "عند جلب النقود (الكاش) بالدولار، يمكنك تصريفها عبر شركات الصرافة المجازة. هذه المكاتب تعتمد في تعاملاتها النقدية على سعر السوق المتداول (المعروض في الصفحة الرئيسية)، والذي يكون عادةً أعلى من السعر الرسمي، مما يمنحك قيمة شرائية أكبر.",
        en: "When bringing cash in USD, you can exchange it through licensed exchange companies. These offices rely on the circulating market rate (shown on the home page) for their cash transactions, which is usually higher than the official rate, giving you more purchasing power."
      }
    },
    {
      icon: ShieldCheck,
      title: {
        ar: "هل تصريف الدولار آمن ضمن السوق الموازي؟",
        en: "Is USD exchange safe in the parallel market?"
      },
      body: {
        ar: "نعم، التعامل مع شركات الصرافة المجازة (ذات المقرات الرسمية) هو إجراء آمن وقانوني وروتيني يقوم به الجميع. تعتمد هذه الشركات السعر السائد في السوق لتلبية احتياجات المواطنين والسياح من العملة المحلية.",
        en: "Yes, dealing with licensed exchange companies (with official headquarters) is a safe, legal, and routine procedure performed by everyone. These companies adopt the prevailing market rate to meet the local currency needs of citizens and tourists."
      }
    },
    {
      icon: UserX,
      iconColor: "text-rose-500",
      title: {
        ar: "تحذير هام: أمانك المالي",
        en: "Important Warning: Your Financial Security"
      },
      body: {
        ar: "لضمان أمانك وتجنب الاحتيال أو العملة المزيفة، تجنب تماماً التعامل مع الأشخاص المتجولين في الشوارع. تعامل حصراً مع مكاتب الصرافة الرسمية ذات المقرات الثابتة لضمان الحصول على إيصال رسمي وسعر عادل.",
        en: "To ensure your safety and avoid fraud or counterfeit currency, completely avoid dealing with street vendors. Deal exclusively with official exchange offices with fixed locations to ensure you receive an official receipt and a fair price."
      }
    },
    {
      icon: Scale,
      title: {
        ar: "تنبيه قانوني هام",
        en: "Important Legal Notice"
      },
      body: {
        ar: "حسب القانون العراقي، الدينار العراقي هو العملة الرسمية الوحيدة المسموح التعامل بها داخل العراق. يمنع القانون الدفع المباشر بالدولار في الأسواق المحلية، لذا يجب عليك تصريف الدولار إلى دينار قبل الشراء.",
        en: "According to Iraqi law, the Iraqi Dinar is the only official currency allowed for transactions within Iraq. The law prohibits direct payment in USD in local markets, so you must exchange USD to Dinar before purchasing."
      }
    },
    {
      icon: AlertTriangle,
      title: {
        ar: "تنبيه حول جودة العملة",
        en: "Currency Quality Notice"
      },
      body: {
        ar: "يفضل السوق العراقي الدولار من الطبعة الجديدة (الملونة/الزرقاء) حصراً. الطبعات القديمة (البيضاء) أو الأوراق الممزقة والمختومة غالباً ما تُرفض من قبل الصرافين أو تُصرف بسعر أقل بكثير، لذا احرص على جلب أوراق نقدية جديدة ونظيفة.",
        en: "The Iraqi market exclusively prefers the new series USD (colored/blue). Older series (white) or torn and stamped bills are often rejected by exchangers or exchanged at a much lower rate, so be sure to bring new, clean banknotes."
      }
    }
  ];

  const generalInfo: GuideItem[] = [
    {
      icon: TrendingUp,
      title: {
        ar: "سعر صرف السوق الموازي",
        en: "Parallel Market Exchange Rate"
      },
      body: {
        ar: "هو السعر المتداول للنقد (الكاش) في السوق المحلية، ويخضع لقوى العرض والطلب اليومية بين الأفراد والتجار، وهو يختلف عن السعر الرسمي الثابت.",
        en: "It is the circulating rate for cash in the local market, subject to daily supply and demand forces between individuals and traders, and it differs from the fixed official rate."
      }
    },
    {
      icon: Plane,
      title: {
        ar: "دولار المسافر",
        en: "Traveler's Dollar"
      },
      body: {
        ar: "هي حصة مالية مدعومة يوفرها البنك المركزي العراقي للمواطنين عند السفر، حيث يحق للمسافر شراء مبلغ محدد من الدولار بالسعر الرسمي (1320) بدلاً من سعر السوق، وذلك لتسهيل نفقات السفر.",
        en: "It is a subsidized financial quota provided by the Central Bank of Iraq to citizens when traveling. Travelers are entitled to purchase a specific amount of USD at the official rate (1320) instead of the market rate to facilitate travel expenses."
      }
    },
    {
      icon: HelpCircle,
      title: {
        ar: "لماذا يوجد فرق في السعر؟",
        en: "Why is there a price difference?"
      },
      body: {
        ar: "الفرق ينتج لأن السعر الرسمي مخصص لتمويل العمليات التجارية الأصولية والسفر عبر المنافذ المصرفية، بينما يعكس سعر السوق طلب المواطنين والقطاع الخاص على السيولة النقدية (الكاش) لتغطية التعاملات اليومية.",
        en: "The difference arises because the official rate is designated for financing fundamental commercial operations and travel through banking channels, while the market rate reflects the demand of citizens and the private sector for cash liquidity to cover daily transactions."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 font-tajawal" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/80 bg-card/90 backdrop-blur-md transform-gpu">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[100] p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground/80 transition-all active:scale-95"
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
              <Link href="/">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className={lang === 'ar' ? "rotate-180 w-5 h-5" : "w-5 h-5"} />
                  <span className="font-bold">{t.back}</span>
                </button>
              </Link>
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

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-8">
          {t.title}
        </h1>

        <Tabs defaultValue="tourists" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card/80 p-1 rounded-2xl border border-border/80 mb-8">
            <TabsTrigger 
              value="tourists" 
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all duration-300"
            >
              {t.tourists}
            </TabsTrigger>
            <TabsTrigger 
              value="general"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all duration-300"
            >
              {t.general}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tourists" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {touristsTips.map((tip, idx) => (
              <Card key={idx} className="bg-card/75 backdrop-blur-md border border-border p-6 rounded-2xl hover:border-primary/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-primary/10 border border-primary/20 ${tip.iconColor || 'text-primary'}`}>
                    <tip.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-foreground text-start">{tip.title[lang]}</h3>
                    <p className="text-muted-foreground leading-relaxed text-start text-base" style={{ lineHeight: '1.6' }}>{tip.body[lang]}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="general" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {generalInfo.map((info, idx) => (
              <Card key={idx} className="bg-card/75 backdrop-blur-md border border-border p-6 rounded-2xl hover:border-primary/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-foreground text-start">{info.title[lang]}</h3>
                    <p className="text-muted-foreground leading-relaxed text-start text-base" style={{ lineHeight: '1.6' }}>{info.body[lang]}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
