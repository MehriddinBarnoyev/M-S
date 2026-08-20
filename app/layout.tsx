import type { Metadata, Viewport } from "next";
import { Playfair_Display, Great_Vibes, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { content } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-letter",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

// If you deploy somewhere other than this URL, update it so the link
// preview image resolves to an absolute URL on that domain.
const SITE_URL = "https://my-dilnuraa.netlify.app";

// What she sees in the Telegram/WhatsApp link preview before she taps it.
const TITLE = content.birthday.share.title;
const DESCRIPTION = content.birthday.share.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    // The preview image comes from app/opengraph-image.tsx, which is
    // rendered at build time — leaving `images` unset lets Next inject it.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050510",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${greatVibes.variable} ${dancing.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
