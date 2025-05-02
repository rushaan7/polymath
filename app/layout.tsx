import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://thepolymathspath.com'),
  title: "The Polymath's Path | Become a Modern Renaissance Person",
  description: "A comprehensive guide to becoming a modern Renaissance person. Learn multiple disciplines, develop diverse skills, and master the art of learning.",
  keywords: ["polymath", "learning", "education", "personal development", "renaissance", "self-improvement", "knowledge", "skills"],
  authors: [{ name: "Rushaan Khan", url: "https://www.linkedin.com/in/rushaan-khan/" }],
  creator: "Rushaan Khan",
  publisher: "The Polymath's Path",
  openGraph: {
    title: "The Polymath's Path | Become a Modern Renaissance Person",
    description: "A comprehensive guide to becoming a modern Renaissance person. Learn multiple disciplines, develop diverse skills, and master the art of learning.",
    type: "website",
    locale: "en_US",
    siteName: "The Polymath's Path",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Polymath's Path Book Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Polymath's Path | Become a Modern Renaissance Person",
    description: "A comprehensive guide to becoming a modern Renaissance person. Learn multiple disciplines, develop diverse skills, and master the art of learning.",
    images: ["/images/og-image.jpg"],
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
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
