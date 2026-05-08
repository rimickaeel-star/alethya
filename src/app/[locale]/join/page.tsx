"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import { Languages, GraduationCap, Video, ArrowRight, Scale } from "lucide-react";

export default function JoinPage() {
  const t = useTranslations("Join");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-16 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-aletheia-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto">{t("title")}</h1>
          <p className="text-aletheia-cream/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        
        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-7xl mx-auto">
          <div className="p-8 border border-aletheia-gray/20 rounded-xl bg-aletheia-dark-gray/20 hover:border-aletheia-gold/40 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold mb-6 group-hover:scale-110 transition-transform duration-500">
              <Languages size={24} />
            </div>
            <h3 className="text-xl font-serif mb-3 group-hover:text-aletheia-gold transition-colors">{t("roles.translator.title")}</h3>
            <p className="text-aletheia-cream/60 leading-relaxed text-sm">{t("roles.translator.desc")}</p>
          </div>

          <div className="p-8 border border-aletheia-gray/20 rounded-xl bg-aletheia-dark-gray/20 hover:border-aletheia-gold/40 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold mb-6 group-hover:scale-110 transition-transform duration-500">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-xl font-serif mb-3 group-hover:text-aletheia-gold transition-colors">{t("roles.researcher.title")}</h3>
            <p className="text-aletheia-cream/60 leading-relaxed text-sm">{t("roles.researcher.desc")}</p>
          </div>

          <div className="p-8 border border-aletheia-gray/20 rounded-xl bg-aletheia-dark-gray/20 hover:border-aletheia-gold/40 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold mb-6 group-hover:scale-110 transition-transform duration-500">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-serif mb-3 group-hover:text-aletheia-gold transition-colors">{t("roles.creator.title")}</h3>
            <p className="text-aletheia-cream/60 leading-relaxed text-sm">{t("roles.creator.desc")}</p>
          </div>

          <div className="p-8 border border-aletheia-gray/20 rounded-xl bg-aletheia-dark-gray/20 hover:border-aletheia-gold/40 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold mb-6 group-hover:scale-110 transition-transform duration-500">
              <Scale size={24} />
            </div>
            <h3 className="text-xl font-serif mb-3 group-hover:text-aletheia-gold transition-colors">{t("roles.legal.title")}</h3>
            <p className="text-aletheia-cream/60 leading-relaxed text-sm">{t("roles.legal.desc")}</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-aletheia-dark-gray/40 border border-aletheia-gray/20 rounded-2xl p-8 md:p-12">
          {isSubmitted ? (
             <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-8 rounded-lg text-center font-medium text-lg">
               Application received! We will be in touch shortly.
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-aletheia-cream/70 mb-2">{t("form.name")}</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded px-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-aletheia-cream/70 mb-2">{t("form.email")}</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded px-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-aletheia-cream/70 mb-2">{t("form.role")}</label>
                <select className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded px-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors appearance-none">
                  <option value="translator">{t("roles.translator.title")}</option>
                  <option value="researcher">{t("roles.researcher.title")}</option>
                  <option value="creator">{t("roles.creator.title")}</option>
                  <option value="legal">{t("roles.legal.title")}</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-aletheia-cream/70 mb-2">{t("form.portfolio")}</label>
                <input 
                  type="url" 
                  className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded px-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors"
                />
              </div>

              <button type="submit" className="mt-4 flex items-center justify-center gap-2 bg-aletheia-gold text-aletheia-black font-semibold py-4 rounded hover:bg-yellow-500 transition-colors w-full text-lg">
                {t("form.submit")} <ArrowRight size={20} className="rtl:rotate-180" />
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
