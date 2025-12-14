import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = "Indiecorn Studio | Portfolio Intelligence";
const description =
  "Indiecorn Studio’s portfolio of startups and products across SaaS, marketplaces, and creator tools—interactive analysis with live status filters.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Indiecorn",
    "startup studio",
    "portfolio",
    "SaaS",
    "marketplace",
    "product analysis"
  ],
  metadataBase: new URL("https://indiecorn.studio"),
  openGraph: {
    title,
    description,
    url: "https://indiecorn.studio",
    siteName: "Indiecorn Studio",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


