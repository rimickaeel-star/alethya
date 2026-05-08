import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navigation");

  return (
    <footer className="bg-aletheia-black border-t border-aletheia-gray/20 pt-16 pb-8 text-aletheia-cream">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-8 h-8 rounded-full border-2 border-aletheia-gold flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
                <span className="text-aletheia-gold font-serif font-bold text-lg leading-none">A</span>
              </div>
              <span className="text-aletheia-cream font-serif text-2xl font-semibold tracking-wider">
                Aletheia
              </span>
            </Link>
            <p className="text-aletheia-cream/60 max-w-sm leading-relaxed">
              An independent, non-profit digital platform dedicated to correcting the historical narrative and presenting the intellectual legacy of the Alawite community with academic rigor.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-aletheia-gold text-lg mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("about")}</Link></li>
              <li><Link href="/history" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("history")}</Link></li>
              <li><Link href="/archive" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("archive")}</Link></li>
              <li><Link href="/monitor" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("monitor")}</Link></li>
              <li><Link href="/culture" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("culture")}</Link></li>
              <li><Link href="/media" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("media")}</Link></li>
              <li><Link href="/blog" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("blog")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-aletheia-gold text-lg mb-6">Action</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/join" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">{t("join")}</Link></li>
              <li><a href="mailto:contact@aletheia.org" className="text-aletheia-cream/70 hover:text-aletheia-gold transition-colors">Contact Us</a></li>
              <li><a href="/studio" className="text-aletheia-cream/40 hover:text-aletheia-cream/70 transition-colors text-sm">Editor Login</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-aletheia-gray/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-aletheia-cream/40 text-sm">
            © {new Date().getFullYear()} Aletheia Project. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-aletheia-cream/40 hover:text-aletheia-gold transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-aletheia-cream/40 hover:text-aletheia-gold transition-colors text-sm">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
