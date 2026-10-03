import type { Metadata, Viewport } from "next";
import { Anuphan, Chonburi, Sriracha } from "next/font/google";
import "./globals.css";

const display = Chonburi({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "thai"],
});

const body = Anuphan({
  variable: "--font-body",
  subsets: ["latin", "thai"],
});

const hand = Sriracha({
  variable: "--font-hand",
  weight: "400",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Nana Goldfish Farm – Professional Goldfish Farm from Thailand",
  description:
    "A goldfish farm in Thailand breeding and developing quality goldfish for overseas markets, with large pond capacity and experience preparing fish for long-distance shipping.",
};

export const viewport: Viewport = {
  themeColor: "#dd2b30",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
