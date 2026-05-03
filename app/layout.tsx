import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Geek Hub",
  description: "Turn skills into income. Making remote work less confusing. Learn, build, earn."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
