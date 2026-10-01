type Translations = {
  [key in 'ar' | 'en']: {
    title: string;
    currentExchangeRate: string;
    lastUpdated: string;
    marketTrend: string;
    trendUp: string;
    trendDown: string;
    trendStable: string;
    buyPrice: string;
    sellPrice: string;
    buySubtitle: string;
    sellSubtitle: string;
    marketAnalysis: string;
    currencyConverter: string;
    amountInUsd: string;
    amountInIqd: string;
    exchangeRateNotice: string;
    retry: string;
    errorLoading: string;
    errorSub: string;
    currency: string;
    trendInfoTitle: string;
    trendInfoDesc: string;
    trendChange: string;
  };
};

export const translations: Translations = {
  ar: {
    title: "متتبع سعر الدينار",
    currentExchangeRate: "سعر الصرف الحالي",
    lastUpdated: "آخر تحديث",
    marketTrend: "حالة السوق",
    trendUp: "السوق في ارتفاع",
    trendDown: "السوق في انخفاض",
    trendStable: "السوق مستقر",
    buyPrice: "سعر الشراء",
    sellPrice: "سعر البيع",
    buySubtitle: "من شركات الصيرفة",
    sellSubtitle: "إلى شركات الصيرفة",
    marketAnalysis: "تحليل السوق",
    currencyConverter: "حاسبة الصرف السريع",
    amountInUsd: "المبلغ بالدولار ($)",
    amountInIqd: "المبلغ بالدينار (IQD)",
    exchangeRateNotice: "سعر الصرف المحتسب: {rate} دينار لكل 100 دولار",
    retry: "إعادة المحاولة",
    errorLoading: "تعذر تحميل البيانات",
    errorSub: "حدث خطأ أثناء الاتصال بالخادم. يرجى التحقق من الانترنت.",
    currency: "د.ع",
    trendInfoTitle: "تحليل الاتجاه",
    trendInfoDesc: "يتم احتساب هذا الاتجاه بناءً على حركة السوق خلال آخر {days} أيام.",
    trendChange: "نسبة التغير:",
  },
  en: {
    title: "Dinar Tracker",
    currentExchangeRate: "Current Exchange Rate",
    lastUpdated: "Last Updated",
    marketTrend: "Market Trend",
    trendUp: "Market is Rising",
    trendDown: "Market is Falling",
    trendStable: "Market is Stable",
    buyPrice: "Buy Price",
    sellPrice: "Sell Price",
    buySubtitle: "From exchange companies",
    sellSubtitle: "To exchange companies",
    marketAnalysis: "Market Analysis",
    currencyConverter: "Quick Exchange Calculator",
    amountInUsd: "Amount in USD ($)",
    amountInIqd: "Amount in IQD (IQD)",
    exchangeRateNotice: "Calculated Rate: {rate} IQD per $100",
    retry: "Retry",
    errorLoading: "Failed to load data",
    errorSub: "An error occurred while connecting to the server. Please check your internet.",
    currency: "IQD",
    trendInfoTitle: "Trend Analysis",
    trendInfoDesc: "This trend is calculated based on market movement over the last {days} days.",
    trendChange: "Percentage Change:",
  },
};
