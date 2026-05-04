import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Online Geek Hub",
  description: "Online Geek Hub is a trained remote AI workforce delivering annotation, evaluation, transcription, and data support. Pilot-ready. Review-based. Remote-first.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}
