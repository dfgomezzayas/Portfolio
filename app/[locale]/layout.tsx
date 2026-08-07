import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { getTranslations } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "seo",
  });

  const isEs = locale === "es";

  return {
    metadataBase: new URL("https://daniel-gomez.dev"),
    title: {
      default: t("title"),
      template: "%s | Daniel Gómez",
    },
    description: t("description"),
    keywords: [
      "fullstack developer",
      "react",
      "next.js",
      "typescript",
      "fastapi",
      "frontend",
      "portfolio",
    ],
    authors: [{ name: "Daniel Gómez" }],
    creator: "Daniel Gómez",
    alternates: {
      canonical: `https://daniel-gomez.dev/${locale}`,
      languages: {
        "en-US": "https://daniel-gomez.dev/en",
        "es-ES": "https://daniel-gomez.dev/es",
      },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_ES",
      url: `https://daniel-gomez.dev/${locale}`,
      title: "Daniel Gómez | FullStack Developer",
      description: t("openGraphDescription"),
      siteName: "Daniel Gómez",
      // Image is generated automatically by app/[locale]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: "Daniel Gómez | FullStack Developer",
      description: t("openGraphDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
