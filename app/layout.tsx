import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPMB, Lda — Procurement industrial",
  description: "Procurement e fornecimento industrial fiável.",
  authors: [{ name: "GPMB, Lda" }],
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left gradient-wing" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
