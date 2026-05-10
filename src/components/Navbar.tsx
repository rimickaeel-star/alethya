"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, Search, ChevronDown } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-aletheia-black/90 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border-2 border-aletheia-gold flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <span className="text-aletheia-gold font-serif font-bold text-lg leading-none">A</span>
          </div>
          <span className="text-aletheia-cream font-serif text-2xl font-semibold tracking-wider">
            Aletheia
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("about")}
          </Link>
          <Link href="/history" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("history")}
          </Link>
          <Link href="/archive" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("archive")}
          </Link>
          <Link href="/monitor" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("monitor")}
          </Link>
          <Link href="/culture" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("culture")}
          </Link>
          <Link href="/media" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("media")}
          </Link>
          <Link href="/blog" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("blog")}
          </Link>
          <Link href="/protection" className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors text-sm font-medium tracking-wide uppercase">
            {t("protection")}
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-aletheia-cream/80 hover:text-aletheia-gold transition-colors">
            <Search size={20} />
          </button>
          
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 text-aletheia-cream/80 hover:text-aletheia-gold transition-colors px-2 py-1"
            >
              <Globe size={20} />
              <span className="text-sm font-medium uppercase">{locale}</span>
              <ChevronDown size={14} />
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 bg-aletheia-dark-gray border border-aletheia-gray/20 rounded-lg shadow-xl py-2 min-w-[120px]">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLanguage(l.code)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-aletheia-gold/10 hover:text-aletheia-gold transition-colors ${locale === l.code ? 'text-aletheia-gold font-bold' : 'text-aletheia-cream'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/join" 
            className="px-5 py-2 border border-aletheia-gold text-aletheia-gold hover:bg-aletheia-gold hover:text-aletheia-black transition-all duration-300 rounded text-sm font-medium tracking-wide"
          >
            {t("join")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-aletheia-cream"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-aletheia-black/95 backdrop-blur-lg border-t border-aletheia-gray/30 p-6 flex flex-col gap-6 shadow-2xl h-screen overflow-y-auto pb-32">
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("about")}</Link>
          <Link href="/history" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("history")}</Link>
          <Link href="/archive" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("archive")}</Link>
          <Link href="/monitor" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("monitor")}</Link>
          <Link href="/culture" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("culture")}</Link>
          <Link href="/media" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("media")}</Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("blog")}</Link>
          <Link href="/protection" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-cream text-lg font-serif">{t("protection")}</Link>
          
          <hr className="border-aletheia-gray/30 my-2" />
          
          <div className="flex flex-col gap-4">
            <span className="text-aletheia-gold font-serif text-sm">Languages</span>
            <div className="grid grid-cols-2 gap-4">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLanguage(l.code)}
                  className={`text-left text-lg font-serif flex items-center gap-2 ${locale === l.code ? 'text-aletheia-gold' : 'text-aletheia-cream/70'}`}
                >
                  <Globe size={18} className={locale === l.code ? 'text-aletheia-gold' : 'text-transparent'} />
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-aletheia-gray/30 my-2" />

          <Link href="/join" onClick={() => setIsMobileMenuOpen(false)} className="text-aletheia-black bg-aletheia-gold text-center py-3 rounded text-lg font-serif mt-4">
            {t("join")}
          </Link>
        </div>
      )}
    </nav>
  );
}
