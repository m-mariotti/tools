import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAdsense from "../components/GoogleAdsense";
import CookieBanner from "../components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Free Online Tools & Calculators | Financial & Math Tools",
  description: "Free online tools and calculators for investments, proportions, and more. Calculate compound interest, solve mathematical proportions, and access useful utilities - all free and easy to use.",
  keywords: "online calculator, free tools, investment calculator, compound interest, proportion calculator, financial tools, math calculator, online utilities",
  authors: [{ name: "Tools Portal" }],
  creator: "Tools Portal",
  publisher: "Tools Portal",
  metadataBase: new URL('https://mariottimauro.eu'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'it': '/it',
    },
  },
  openGraph: {
    title: "Free Online Tools & Calculators",
    description: "Free online tools and calculators for investments, proportions, and more. Simple, fast, and accessible.",
    url: 'https://mariottimauro.eu',
    siteName: 'Tools Portal',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Online Tools & Calculators",
    description: "Free online tools and calculators for investments, proportions, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAdsense />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}