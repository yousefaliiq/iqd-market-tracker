import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, Info, Scale, AlertCircle, Eye, CheckCircle, Building2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MobileNavOverlay } from "@/components/MobileNavOverlay";
import { clsx } from "clsx";

interface LegalSection {
  icon: any;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
}

export default function Compliance() {
  const [, setLocation] = useLocation();
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
    title: lang === "ar" ? "إخلاء المسؤولية" : "Legal Disclaimer",
    header: lang === "ar" ? "إخلاء المسؤولية القانونية" : "Legal Disclaimer & Compliance",
    acknowledge: lang === "ar" ? "إقرار والعودة" : "Acknowledge & Return",
    back: lang === "ar" ? "رجوع" : "Back",
  };

  const sections: LegalSection[] = [
    {
      icon: Info,
      title: {
        ar: "1. الغرض المعلوماتي والبحثي",
        en: "1. Informational & Research Purpose"
      },
      content: {
        ar: "هذا الموقع هو أداة رقمية مخصصة للأغراض البحثية والإحصائية فقط لرصد متغيرات السوق. البيانات المعروضة تمثل \"رصداً للواقع\" ولا تعبر بالضرورة عن السعر الرسمي. إدارة الموقع لا تقدم أي مشورة مالية، ولا تشجع على تداول العملة، ولا تروج للمضاربة في الأسواق الموازية.",
        en: "This website is a digital tool strictly for research and statistical purposes to monitor market variables. The data displayed represents a \"monitoring of reality\" and does not necessarily reflect the official rate. The site administration provides no financial advice, does not encourage currency trading, and does not promote speculation in parallel markets."
      }
    },
    {
      icon: Scale,
      title: {
        ar: "2. الحيادية التامة",
        en: "2. Absolute Neutrality"
      },
      content: {
        ar: "نحن لسنا مؤسسة مالية، ولا نمتلك مكتب صيرفة، ولا نقوم بأي عمليات بيع أو شراء للعملات. الموقع يعمل كمرآة رقمية محايدة تعكس البيانات المتداولة في السوق لأغراض العلم بالشيء فقط، ونحن لا نتحكم في الأسعار ولا نتدخل في تحديدها.",
        en: "We are not a financial institution, we do not own an exchange bureau, and we do not engage in any buying or selling of currencies. The site acts as a neutral digital mirror reflecting market data for informational purposes only; we do not control or set prices."
      }
    },
    {
      icon: Building2,
      title: {
        ar: "3. الامتثال ودعم السعر الرسمي",
        en: "3. Compliance & Official Rate Support"
      },
      content: {
        ar: "نعلن بشكل صريح وتام دعمنا والتزامنا بالسعر الرسمي للصرف المحدد من قبل البنك المركزي العراقي والقوانين الحكومية النافذة. نحن نحث جميع المستخدمين بشدة على إجراء معاملاتهم المالية حصراً عبر القنوات المصرفية الرسمية والمصارف المجازة قانوناً.",
        en: "We explicitly declare our full support and commitment to the official exchange rate set by the Central Bank of Iraq and applicable government laws. We strongly urge all users to conduct their financial transactions exclusively through official banking channels and legally licensed banks."
      }
    },
    {
      icon: Shield,
      title: {
        ar: "4. حدود المسؤولية",
        en: "4. Limitation of Liability"
      },
      content: {
        ar: "استخدامك لهذا الموقع يعني إقرارك بأنك المسؤول الوحيد عن قراراتك المالية. إدارة الموقع تخلي مسؤوليتها القانونية والمدنية والجنائية بالكامل عن أي خسائر مادية أو تبعات قانونية قد تنشأ عن استخدام هذه البيانات. المعلومات مقدمة \"كما هي\" دون أي ضمانات.",
        en: "By using this site, you acknowledge that you are solely responsible for your financial decisions. The site administration fully disclaims all legal, civil, and criminal liability for any financial losses or legal consequences arising from the use of this data. Information is provided \"as is\" without warranties."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 font-tajawal selection:bg-primary/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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
        <Card className="bg-card/90 backdrop-blur-xl border border-border p-8 md:p-12 rounded-[2rem] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 text-primary mb-6 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
              <Shield className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-glow">
              {t.header}
            </h2>
          </div>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} className="relative group/section animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-2 rounded-xl bg-secondary/70 border border-border text-primary/80">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground tracking-wide">
                    {section.title[lang]}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground/80 text-xl leading-[1.8] text-start font-medium">
                    {section.content[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border/80 flex justify-center">
            <Button 
              onClick={() => setLocation('/')}
              className="min-h-14 px-12 rounded-2xl bg-primary text-primary-foreground text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              {t.acknowledge}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
