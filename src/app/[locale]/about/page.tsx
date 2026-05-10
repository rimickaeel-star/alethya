"use client";

import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-aletheia-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto">{t("title")}</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-aletheia-cream/80">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <section>
            <h2 className="text-3xl font-serif text-aletheia-gold mb-6">{t("mission_title")}</h2>
            <p className="text-lg leading-relaxed text-aletheia-cream/80">
              {t("mission_desc")}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-aletheia-gold mb-6">{t("vision_title")}</h2>
            <p className="text-lg leading-relaxed text-aletheia-cream/80 mb-6">
              {t("vision_desc")}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-aletheia-gold mb-6">{t("values_title")}</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-aletheia-cream/80 mb-12">
              <li><strong className="text-aletheia-cream">{t("values.rigor_title")}:</strong> {t("values.rigor_desc")}</li>
              <li><strong className="text-aletheia-cream">{t("values.objectivity_title")}:</strong> {t("values.objectivity_desc")}</li>
              <li><strong className="text-aletheia-cream">{t("values.accessibility_title")}:</strong> {t("values.accessibility_desc")}</li>
              <li><strong className="text-aletheia-cream">{t("values.protection_title")}:</strong> {t("values.protection_desc")}</li>
            </ul>

            {/* Stylized Quote Section */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-aletheia-gold/15 via-aletheia-dark-gray/20 to-aletheia-gold/5 border border-aletheia-gold/20 relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-aletheia-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-aletheia-gold/10 transition-all duration-500" />
              <p className="text-xl md:text-2xl font-serif text-center italic text-aletheia-gold/90 leading-relaxed relative z-10">
                “{t("quote")}”
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
