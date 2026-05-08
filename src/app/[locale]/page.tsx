import Navbar from "@/components/Navbar";
import { ArrowRight, BookOpen, ScrollText, Scale } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");
  const p = useTranslations("Pillars");

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full border border-aletheia-gold/20" />
          <div className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full border border-aletheia-gold/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-aletheia-gold/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-aletheia-gold/20 to-transparent" />
        </div>

        <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-aletheia-gold/30 bg-aletheia-gold/5 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-aletheia-gold animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-aletheia-gold uppercase">{t("badge")}</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 max-w-5xl text-balance">
            {t("title1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-aletheia-gold to-yellow-200 italic">{t("title_highlight")}</span><br />
            {t("title2")}
          </h1>
          
          <p className="text-lg md:text-xl text-aletheia-cream/70 max-w-2xl mb-12 font-light leading-relaxed text-balance">
            {t("description")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              href="/archive"
              className="group relative px-8 py-4 bg-aletheia-gold text-aletheia-black font-semibold tracking-wide rounded overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("explore")}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full z-0" />
            </Link>
            
            <Link 
              href="/about"
              className="px-8 py-4 text-aletheia-cream font-medium tracking-wide border border-aletheia-cream/20 hover:border-aletheia-gold/50 hover:bg-aletheia-gold/5 transition-colors rounded flex items-center gap-2"
            >
              {t("mission")}
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs uppercase tracking-[0.3em] font-medium">{t("scroll")}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-aletheia-gold to-transparent" />
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 bg-aletheia-dark-gray/30 border-t border-aletheia-gray/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 p-8 rounded-xl border border-aletheia-gray/10 hover:border-aletheia-gold/30 bg-aletheia-black/50 transition-colors group">
              <div className="w-14 h-14 rounded bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold group-hover:scale-110 transition-transform duration-500">
                <BookOpen size={28} />
              </div>
              <h3 className="font-serif text-2xl mt-4">{p("rigor_title")}</h3>
              <p className="text-aletheia-cream/60 leading-relaxed font-light">
                {p("rigor_desc")}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 p-8 rounded-xl border border-aletheia-gray/10 hover:border-aletheia-gold/30 bg-aletheia-black/50 transition-colors group">
              <div className="w-14 h-14 rounded bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold group-hover:scale-110 transition-transform duration-500">
                <ScrollText size={28} />
              </div>
              <h3 className="font-serif text-2xl mt-4">{p("archive_title")}</h3>
              <p className="text-aletheia-cream/60 leading-relaxed font-light">
                {p("archive_desc")}
              </p>
            </div>

            <div className="flex flex-col gap-4 p-8 rounded-xl border border-aletheia-gray/10 hover:border-aletheia-gold/30 bg-aletheia-black/50 transition-colors group">
              <div className="w-14 h-14 rounded bg-aletheia-gold/10 flex items-center justify-center text-aletheia-gold group-hover:scale-110 transition-transform duration-500">
                <Scale size={28} />
              </div>
              <h3 className="font-serif text-2xl mt-4">{p("legal_title")}</h3>
              <p className="text-aletheia-cream/60 leading-relaxed font-light">
                {p("legal_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
