import { motion, AnimatePresence } from "framer-motion";
import { Globe, DollarSign, BookOpen, ShieldCheck, X, Home } from "lucide-react";
import { Link, useLocation } from "wouter";

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "ar" | "en";
  setLang: (lang: "ar" | "en") => void;
  rateType: "market" | "official";
  setRateType: (type: "market" | "official") => void;
}

export function MobileNavOverlay({
  isOpen,
  onClose,
  lang,
  setLang,
  rateType,
  setRateType,
}: MobileNavOverlayProps) {
  const [location] = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: lang === "ar" ? "الرئيسية" : "Home",
      href: "/",
    },
    {
      icon: Globe,
      label: lang === "ar" ? "English" : "العربية",
      onClick: () => {
        setLang(lang === "ar" ? "en" : "ar");
        onClose();
      },
    },
    {
      icon: DollarSign,
      label: rateType === "market"
        ? (lang === "ar" ? "سعر البنك الرسمي" : "Official Bank Rate")
        : (lang === "ar" ? "سعر السوق الموازي" : "Market Exchange Rate"),
      onClick: () => {
        setRateType(rateType === "market" ? "official" : "market");
        onClose();
      },
    },
    {
      icon: BookOpen,
      label: lang === "ar" ? "دليل الصرف" : "Exchange Guide",
      href: "/guide",
    },
    {
      icon: ShieldCheck,
      label: lang === "ar" ? "إخلاء المسؤولية" : "Legal Disclaimer",
      href: "/compliance",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-[15px] transform-gpu"
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 w-full max-w-sm flex flex-col p-6 pointer-events-none"
          >
            <div className="flex justify-end mb-8 pointer-events-auto">
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-secondary/70 border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center space-y-4 pointer-events-auto">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {item.href ? (
                    <Link href={item.href}>
                      <a 
                        onClick={onClose}
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-95 group ${
                          location === item.href 
                            ? "bg-primary/20 border-primary/30" 
                            : "bg-secondary/70 border-border hover:bg-secondary"
                        }`}
                      >
                        <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${
                          location === item.href ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                        }`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-lg font-bold ${location === item.href ? "text-primary" : "text-foreground"}`}>
                          {item.label}
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-secondary/70 border border-border hover:bg-secondary transition-all active:scale-95 group text-start"
                    >
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-foreground">
                        {item.label}
                      </span>
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
