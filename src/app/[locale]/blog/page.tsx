"use client";

import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";

export default function BlogPage() {
  const locale = useTranslations("Navigation")("about") === "من نحن" ? "ar" : "en";
  const title = locale === "ar" ? "المدونة والمقالات" : "Blog & Articles";
  const subtitle = locale === "ar" 
    ? "مقالات رأي، تحليلات تاريخية، وتحديثات حول مسار عمل المنصة." 
    : "Opinion pieces, historical analysis, and updates on the platform's work.";

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      <div className="pt-32 pb-20 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-aletheia-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto">{title}</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-aletheia-cream/80">{subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center py-20 border border-dashed border-aletheia-gray/30 rounded-xl bg-aletheia-dark-gray/10">
          <BookOpen className="mx-auto text-aletheia-gold/50 mb-4" size={48} />
          <h3 className="text-2xl font-serif mb-3 text-aletheia-cream/80">
            {locale === "ar" ? "لا توجد مقالات حالياً" : "No articles published yet"}
          </h3>
          <p className="text-aletheia-cream/50">
            {locale === "ar" ? "نحن نعمل على إعداد المحتوى الأول للمدونة." : "We are currently preparing the first batch of articles."}
          </p>
        </div>
      </div>
    </main>
  );
}
