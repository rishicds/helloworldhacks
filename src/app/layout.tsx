import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import Footer from "@/components/shared/Footer";
import LoadingWrapper from "@/components/shared/LoaderClient";
import CoolHeader from "@/components/shared/Header";
import MusicButton from "@/components/shared/MusicButton";
import LenisProvider from "@/components/shared/LenisProvider";

export const metadata: Metadata = {
  title: "HELLOWORLDHACKS",
  description: "A hackathon for everyone",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
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
      />
      <html>
      <body>
      <LoadingWrapper>
        <LenisProvider>
          <CoolHeader />
          <main>{children}</main>
          <Footer />
          <MusicButton />
          <Analytics />
        </LenisProvider>
      </LoadingWrapper>
      </body>
      </html>
    </>
  );
}