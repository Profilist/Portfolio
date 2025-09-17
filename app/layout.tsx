import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import StickyNavWrapper from "@/components/StickyNavWrapper";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const larrisHandwriting = localFont({
  src: "./LarrisHandwriting-Regular.ttf",
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Larris's Portfolio",
  description: "Larris Xie's Portfolio",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} ${larrisHandwriting.variable} antialiased relative min-h-screen`}
      >
        {children}
        <StickyNavWrapper />
        <Analytics />
      </body>
    </html>
  );
}
