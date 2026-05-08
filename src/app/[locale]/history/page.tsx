"use client";

import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function HistoryPage() {
  const t = useTranslations("History");

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-aletheia-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto">{t("title")}</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-aletheia-cream/80">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          
          <div className="relative border-l border-aletheia-gray/30 pl-8 space-y-16 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8">
            
            <div className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-aletheia-gold -left-[41px] rtl:-right-[41px] top-2" />
              <h3 className="text-2xl font-serif text-aletheia-gold mb-3">{t("eras.medieval_title")}</h3>
              <p className="text-aletheia-cream/80 leading-relaxed">
                {t("eras.medieval_desc")}
              </p>
            </div>

            <div className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-aletheia-gold -left-[41px] rtl:-right-[41px] top-2" />
              <h3 className="text-2xl font-serif text-aletheia-gold mb-3">{t("eras.ottoman_title")}</h3>
              <p className="text-aletheia-cream/80 leading-relaxed">
                {t("eras.ottoman_desc")}
              </p>
            </div>

            <div className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-aletheia-gold -left-[41px] rtl:-right-[41px] top-2" />
              <h3 className="text-2xl font-serif text-aletheia-gold mb-3">{t("eras.mandate_title")}</h3>
              <p className="text-aletheia-cream/80 leading-relaxed">
                {t("eras.mandate_desc")}
              </p>
            </div>

            <div className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-aletheia-gold -left-[41px] rtl:-right-[41px] top-2" />
              <h3 className="text-2xl font-serif text-aletheia-gold mb-3">{t("eras.modern_title")}</h3>
              <p className="text-aletheia-cream/80 leading-relaxed">
                {t("eras.modern_desc")}
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
