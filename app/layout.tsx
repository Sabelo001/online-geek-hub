import type { Metadata } from "next";
import { Barlow_Condensed, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Online Geek Hub — Trained AI Data Workforce",
    template: "%s | Online Geek Hub"
  },
  description:
    "Online Geek Hub is a pilot-ready remote AI workforce delivering data annotation, model evaluation, transcription, and prompt review. Review-based quality. Remote-first delivery.",
  keywords: [
    "AI data annotation",
    "remote AI workforce",
    "model evaluation",
    "transcription services",
    "prompt review",
    "AI data services Kenya",
    "remote data workers",
    "pilot AI project"
  ],
  authors: [{ name: "Online Geek Hub" }],
  creator: "Online Geek Hub",
  metadataBase: new URL("https://online-geek-hub.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://online-geek-hub.vercel.app",
    siteName: "Online Geek Hub",
    title: "Online Geek Hub — Trained AI Data Workforce",
    description:
      "Pilot-ready remote AI workforce delivering annotation, evaluation, transcription, and data support. Review-based. Remote-first.",
    images: [
      {
        url: "/images/scholars-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Online Geek Hub — Trained AI Data Workforce"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Geek Hub — Trained AI Data Workforce",
    description: "Pilot-ready remote AI workforce. Annotation, evaluation, transcription, and data support.",
    images: ["/images/scholars-hero.jpg"]
  },
  icons: {
    icon: "/favicon.png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
