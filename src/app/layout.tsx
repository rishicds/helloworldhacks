import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

import Footer from "@/components/shared/Footer";
import LoadingWrapper from "@/components/shared/LoaderClient";
import CoolHeader from "@/components/shared/Header";
import MusicButton from "@/components/shared/MusicButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HELLOWORLDHACKS",
  description: "A hackathon for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingWrapper>
          <Analytics/>
          <CoolHeader/>
          {children}
          <MusicButton />
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}