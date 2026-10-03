import type { Metadata } from "next";
import { Kanit, Taviraj } from "next/font/google";

/* V2 "Copper-Red Porcelain": a light classical serif that carries Thai and Latin as one voice,
   with a light geometric sans for reading. */
const serif = Taviraj({
  variable: "--pc-serif",
  weight: ["200", "300", "400"],
  subsets: ["latin", "thai"],
});

const sans = Kanit({
  variable: "--pc-sans",
  weight: ["300", "400", "500"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Nana Goldfish Farm – Professional Goldfish Farm from Thailand",
  description:
    "Quality Thai goldfish for customers around the world, and the official distributor of NEO-HELIOS in Thailand.",
};

export default function V2Layout({ children }: LayoutProps<"/v2">) {
  return <div className={`${serif.variable} ${sans.variable}`}>{children}</div>;
}
