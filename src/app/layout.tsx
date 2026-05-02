import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "react-day-picker/dist/style.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | West Willows',
    default: 'West Willows | A Private Escape Into Luxury',
  },
  description: "Experience the ultimate luxury villa in Punjab. West Willows is an exclusive estate offering private suites, thematic pool parties, weddings, and corporate getaways.",
  keywords: "luxury villa punjab, private estate rental, west willows, resort in mohali, luxury staycation",
  openGraph: {
    title: "West Willows | A Private Escape Into Luxury",
    description: "Experience the ultimate luxury villa in Punjab.",
    siteName: "West Willows",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-cream text-charcoal">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
