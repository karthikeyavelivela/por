import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Grain from "@/components/layout/Grain";
import Blobs from "@/components/layout/Blobs";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Application Security",
    "Security Engineer",
    "Founder",
    "FYRO",
    "LLM Red Teaming",
    "Full-Stack Developer",
    "Karthikeya Velivela",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {"try{if(localStorage.getItem('kv-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}"}
        </Script>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-svh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-10001 focus:rounded-full focus:px-5 focus:py-2 focus:text-sm focus:font-medium"
          style={{ background: "var(--orange)", color: "var(--bg)" }}
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <Cursor />
          <Blobs />
          <Grain />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
