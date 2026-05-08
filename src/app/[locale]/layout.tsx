import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isArabic = locale === 'ar';
  
  return {
    title: isArabic ? "أليثيا | كشف الحقيقة. استعادة التاريخ." : "Aletheia | Unveiling the Truth. Restoring the History.",
    description: isArabic 
      ? "منصة رقمية دولية مكرسة لتصحيح السردية التاريخية للطائفة العلوية بموضوعية أكاديمية."
      : "An international digital platform dedicated to correcting the historical and cultural narrative of the Alawite community.",
    openGraph: {
      title: isArabic ? "أليثيا" : "Aletheia",
      description: isArabic ? "كشف الحقيقة. استعادة التاريخ." : "Unveiling the Truth. Restoring the History.",
      url: `https://aletheia.org/${locale}`,
      siteName: "Aletheia",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic ? "أليثيا" : "Aletheia",
    }
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
