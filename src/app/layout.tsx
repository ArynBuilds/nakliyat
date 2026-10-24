import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { PageTransition } from "@/components/providers/page-transition";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SITE } from "@/lib/contact";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT"],
});

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} — ${SITE.tagline}`,
    template: `%s · ${SITE.title}`,
  },
  description: SITE.description,
  keywords: [
    "evden eve nakliyat",
    "İstanbul nakliyat",
    "asansörlü nakliyat",
    "şehirlerarası nakliyat",
    "paketleme hizmeti",
    "eşya depolama",
    "Yusufoğlu Nakliyat",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.url,
    siteName: SITE.title,
    title: `${SITE.title} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.title} — ${SITE.tagline}`,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="font-display antialiased">
        <LenisProvider />
        <CustomCursor />
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
