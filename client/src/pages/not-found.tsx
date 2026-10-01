import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(var(--background))] px-6 text-center">
      <div className="max-w-md flex flex-col items-center">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <AlertCircle className="w-10 h-10 text-white/40" />
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight mb-3">404</h1>
        <p className="text-lg text-white/70 mb-2">الصفحة غير موجودة</p>
        <p className="text-sm text-white/40 mb-8">Sorry, the page you are looking for could not be found.</p>
        <Link href="/">
          <a className="px-6 py-3 rounded-xl bg-primary text-slate-900 font-bold hover:bg-primary/90 transition-colors">
            العودة للرئيسية
          </a>
        </Link>
      </div>
    </div>
  );
}
