import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Panpan | Full Stack Developer",
  description:
    "Building Practical Digital Solutions. Full Stack Developer based in Purbalingga, Indonesia with 3+ years of coding experience. Specializing in Node.js, Web Automation, and Modern UI.",
  keywords: [
    "Dev Panpan",
    "Full Stack Developer",
    "Purbalingga Developer",
    "Node.js Automation",
    "React",
    "Next.js",
    "Web Scraping",
    "Supabase",
  ],
  authors: [{ name: "Dev Panpan", url: "https://github.com/Panzqq" }],
  openGraph: {
    title: "Dev Panpan | Full Stack Developer",
    description: "Building Practical Digital Solutions.",
    type: "website",
    url: "https://github.com/Panzqq",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth dark">
      <body className={`${inter.variable} font-sans bg-[#050C0A] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
