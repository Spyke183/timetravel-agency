import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import MotionProvider from "@/components/MotionProvider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://timetravel-agency-woad.vercel.app";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TimeTravel Agency — Voyagez à travers le temps",
  description:
    "Agence de voyage temporel de luxe (fictive). Découvrez Paris 1889, le Crétacé −65M et Florence 1504 avec un conseiller IA dédié.",
  keywords: [
    "voyage temporel",
    "TimeTravel Agency",
    "Paris 1889",
    "Crétacé",
    "Florence 1504",
    "IA",
  ],
  authors: [{ name: "TimeTravel Agency" }],
  openGraph: {
    title: "TimeTravel Agency — Voyagez à travers le temps",
    description:
      "Paris 1889, Crétacé −65M, Florence 1504 — voyages temporels de luxe avec conseiller IA.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <MotionProvider>
          <a
            href="#contenu"
            className="sr-only rounded-lg bg-gold-400 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
          >
            Aller au contenu
          </a>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <Chatbot />
        </MotionProvider>
      </body>
    </html>
  );
}
