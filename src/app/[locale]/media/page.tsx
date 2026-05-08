"use client";

import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import { PlayCircle, Mic, Image as ImageIcon } from "lucide-react";

export default function MediaPage() {
  const locale = useTranslations("Navigation")("about") === "من نحن" ? "ar" : "en";
  const title = locale === "ar" ? "الوسائط المتعددة" : "Media & Resources";
  const subtitle = locale === "ar" 
    ? "مكتبة بصرية وسمعية توثق التاريخ والثقافة عبر الفيديوهات والبودكاست" 
    : "A visual and auditory library documenting history and culture through videos and podcasts.";

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
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="bg-aletheia-dark-gray/30 border border-aletheia-gray/20 rounded-xl p-8 text-center hover:border-aletheia-gold/40 transition-colors cursor-pointer group">
            <PlayCircle className="mx-auto text-aletheia-gold mb-4 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-2xl font-serif mb-3">{locale === "ar" ? "فيديوهات وثائقية" : "Documentaries"}</h3>
            <p className="text-aletheia-cream/60">{locale === "ar" ? "قريباً..." : "Coming soon..."}</p>
          </div>

          <div className="bg-aletheia-dark-gray/30 border border-aletheia-gray/20 rounded-xl p-8 text-center hover:border-aletheia-gold/40 transition-colors cursor-pointer group">
            <Mic className="mx-auto text-aletheia-gold mb-4 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-2xl font-serif mb-3">{locale === "ar" ? "بودكاست أليثيا" : "Aletheia Podcast"}</h3>
            <p className="text-aletheia-cream/60">{locale === "ar" ? "قريباً..." : "Coming soon..."}</p>
          </div>

          <div className="bg-aletheia-dark-gray/30 border border-aletheia-gray/20 rounded-xl p-8 text-center hover:border-aletheia-gold/40 transition-colors cursor-pointer group">
            <ImageIcon className="mx-auto text-aletheia-gold mb-4 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-2xl font-serif mb-3">{locale === "ar" ? "معرض الصور" : "Photo Gallery"}</h3>
            <p className="text-aletheia-cream/60">{locale === "ar" ? "قريباً..." : "Coming soon..."}</p>
          </div>

        </div>
      </div>
    </main>
  );
}
