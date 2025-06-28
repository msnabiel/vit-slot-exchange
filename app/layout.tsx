import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIT Slot Exchange",
  description:
    "Exchange class slots easily with other VIT students. Find, request, and manage slot swaps securely and anonymously.",
  keywords: [
    "VIT Slot Exchange",
    "VIT Timetable Swap",
    "VIT Slot Swap",
    "VIT University",
    "Class Slot Exchange",
    "VIT Student Tools",
    "Slot Exchange Platform",
    "VIT Utilities",
    "VIT Academic Tools",
    "Student Slot Exchange",
  ],
  openGraph: {
    type: "website",
    siteName: "VIT Slot Exchange",
    locale: "en_US",
    url: "",
    title: "VIT Slot Exchange",
    description:
      "Exchange class slots easily with other VIT students. Find, request, and manage slot swaps securely and anonymously.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VIT Slot Exchange",
      },
    ],
  },
  authors: [
    {
      name: "Nabiel",
      url: "https://nabiel.vercel.app",
    },
  ],
  creator: "Nabiel",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
