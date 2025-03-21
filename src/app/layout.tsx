import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import Footer from "@/components/shared/Footer";
import LoadingWrapper from "@/components/shared/LoaderClient";
import CoolHeader from "@/components/shared/Header";
import MusicButton from "@/components/shared/MusicButton";
//import LenisProvider from "@/components/shared/LenisProvider";
import SplashCursor from "@/components/shared/Mouse";

export const metadata: Metadata = {
  title: "HELLOWORLDHACKS | A Hackathon for Everyone",
  description: "Join HELLOWORLDHACKS, an inclusive hackathon for beginners and experts alike. Collaborate, innovate, and build amazing projects in a supportive environment.",
  keywords: ["hackathon", "coding", "programming", "tech event", "developers", "students", "beginners", "HELLOWORLDHACKS"],
  authors: [{name: "Swapnendu Banerjee"}, {name: "Sagnik Datta"}, {name: "Adrita Chakraborty"}, {name: "Moyukh Chowdhury"},{name: "Rishi Paul"}, {name: "Debayudh Basu"}],
  openGraph: {
    title: "HELLOWORLDHACKS | A 30 Days. Infinite Possibilities",
    description: "Join HELLOWORLDHACKS, an inclusive hackathon for beginners and experts alike. Collaborate, innovate, and build amazing projects in a supportive environment.",
    url: "https://helloworldhacks.tech",
    siteName: "HELLOWORLDHACKS",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "HELLOWORLDHACKS - 30 Days. Infinite Possibilities",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HELLOWORLDHACKS | 30 Days. Infinite Possibilities",
    description: "Join HELLOWORLDHACKS, an inclusive hackathon for beginners and experts alike. Collaborate, innovate, and build amazing projects in a supportive environment.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "V-8XCGTSU7NrprTpefhuGWICtXNuSGFKmxBi34aMGmQ", 
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://helloworldhacks.tech",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
    
  {/* <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qp5ayba370");
          `,
        }}
      />  */}
     



     
      <html lang="en">
        <head>
          <link rel="canonical" href="https://helloworldhacks.com" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Script
            id="schema-script"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "Event",
                  "name": "HELLOWORLDHACKS",
                  "description": "Join HELLOWORLDHACKS, an inclusive hackathon for beginners and experts alike. Collaborate, innovate, and build amazing projects in a supportive environment.",
                  "image": "https://helloworldhacks.com/og-image.jpg",
                  "url": "https://helloworldhacks.com",
                  "eventStatus": "https://schema.org/EventScheduled",
                  "organizer": {
                    "@type": "Organization",
                    "name": "HELLOWORLDHACKS Team",
                    "url": "https://helloworldhacks.com"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": "https://helloworldhacks.com/register",
                    "availability": "https://schema.org/InStock"
                  }
                }
              `,
            }}
          />
        </head>
        <body>
          <LoadingWrapper>
            <SplashCursor />
     
              <header>
                <CoolHeader />
              </header>
              <main id="main-content">{children}</main>
              <footer>
                <Footer />
              </footer>
              <MusicButton />
              <Analytics />
           
          </LoadingWrapper>
          {/* <script src="https://cdn.splitbee.io/sb.js" async /> */}  
        </body>
      </html>
    </>
  );
}