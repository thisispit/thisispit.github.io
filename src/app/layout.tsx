import type { Metadata } from "next";
import { Poppins, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pitamber Singh | Data Engineer",
  description: "Building intelligent systems through data science, AI, and modern software engineering.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Pitamber Singh | Data Engineer",
    description: "Building intelligent systems through data science, AI, and modern software engineering.",
    url: "https://thisispit.github.io",
    siteName: "Pitamber Singh",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://thisispit.github.io/media/img/og_preview.jpg",
        width: 1200,
        height: 630,
        alt: "Pitamber Singh — Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitamber Singh | Data Engineer",
    description: "Building intelligent systems through data science, AI, and modern software engineering.",
    images: ["https://thisispit.github.io/media/img/og_preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-background text-foreground font-inter">{children}</body>
    </html>
  );
}
