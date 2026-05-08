"use client";

import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function CulturePage() {
  const t = useTranslations("Culture");

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-aletheia-gold/5 rounded-[100%] blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto">{t("title")}</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-aletheia-cream/80">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          <div className="p-8 bg-aletheia-dark-gray/40 border border-aletheia-gray/20 rounded-xl hover:border-aletheia-gold/30 transition-colors">
            <h3 className="text-2xl font-serif text-aletheia-gold mb-4">{t("topics.philosophy_title")}</h3>
            <p className="text-aletheia-cream/80 leading-relaxed">
              {t("topics.philosophy_desc")}
            </p>
          </div>

          <div className="p-8 bg-aletheia-dark-gray/40 border border-aletheia-gray/20 rounded-xl hover:border-aletheia-gold/30 transition-colors">
            <h3 className="text-2xl font-serif text-aletheia-gold mb-4">{t("topics.literature_title")}</h3>
            <p className="text-aletheia-cream/80 leading-relaxed">
              {t("topics.literature_desc")}
            </p>
          </div>

          <div className="p-8 bg-aletheia-dark-gray/40 border border-aletheia-gray/20 rounded-xl hover:border-aletheia-gold/30 transition-colors">
            <h3 className="text-2xl font-serif text-aletheia-gold mb-4">{t("topics.ethics_title")}</h3>
            <p className="text-aletheia-cream/80 leading-relaxed">
              {t("topics.ethics_desc")}
            </p>
          </div>

          <div className="p-8 bg-aletheia-dark-gray/40 border border-aletheia-gray/20 rounded-xl hover:border-aletheia-gold/30 transition-colors">
            <h3 className="text-2xl font-serif text-aletheia-gold mb-4">{t("topics.folk_title")}</h3>
            <p className="text-aletheia-cream/80 leading-relaxed">
              {t("topics.folk_desc")}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
