import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(var(--background))] px-6 text-center">
      <div className="max-w-md flex flex-col items-center">
        <div className="p-4 rounded-2xl bg-secondary/70 border border-border mb-6">
          <AlertCircle className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-5xl font-bold text-foreground tracking-tight mb-3">404</h1>
        <p className="text-lg text-foreground/70 mb-2">الصفحة غير موجودة</p>
        <p className="text-sm text-muted-foreground mb-8">Sorry, the page you are looking for could not be found.</p>
        <Link href="/">
          <a className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            العودة للرئيسية
          </a>
        </Link>
      </div>
    </div>
  );
}
