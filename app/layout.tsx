import type { Metadata, Viewport } from "next";
import { Playfair_Display, Great_Vibes, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

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
const SITE_URL = "https://my-sevinch.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "A little surprise, made just for you",
  description: "Someone made something special. Open me ♥",
  openGraph: {
    title: "A little surprise, made just for you",
    description: "Someone made something special. Open me ♥",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "A little surprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A little surprise, made just for you",
    description: "Someone made something special. Open me ♥",
    images: ["/og-preview.png"],
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
