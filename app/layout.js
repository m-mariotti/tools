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
  title: "Tools Portal - Free Online Calculators",
  description: "Simple and free online tools and calculators for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAdsense />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}