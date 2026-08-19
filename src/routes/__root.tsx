import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import StickyNavWrapper from "@/components/StickyNavWrapper";
import geistHref from "../assets/fonts/geist-latin.woff2?url";
import handwritingHref from "../assets/fonts/larris-handwriting.ttf?url";
import instrumentHref from "../assets/fonts/instrument-serif-latin.woff2?url";
import stylesHref from "../styles.css?url";

const SITE_ORIGIN = "https://www.larrisx.com";
const SITE_TITLE = "Larris's Portfolio";
const SITE_DESCRIPTION =
  "Larris Xie's portfolio—software engineering projects, research, and experience across AI, infrastructure, and full-stack development.";

export const Route = createRootRoute({
  head: ({ matches }) => {
    const pathname = matches.at(-1)?.pathname ?? "/";
    const canonicalUrl = new URL(pathname, SITE_ORIGIN).toString();

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: SITE_TITLE },
        { name: "description", content: SITE_DESCRIPTION },
        { name: "author", content: "Larris Xie" },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Larris Xie" },
        { property: "og:title", content: SITE_TITLE },
        { property: "og:description", content: SITE_DESCRIPTION },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: `${SITE_ORIGIN}/logo.png` },
        { property: "og:image:width", content: "500" },
        { property: "og:image:height", content: "500" },
        { property: "og:image:alt", content: "Larris Xie" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:creator", content: "@larrisx" },
        { name: "twitter:title", content: SITE_TITLE },
        { name: "twitter:description", content: SITE_DESCRIPTION },
        { name: "twitter:image", content: `${SITE_ORIGIN}/logo.png` },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_ORIGIN}/#website`,
                url: `${SITE_ORIGIN}/`,
                name: "Larris Xie",
                description: SITE_DESCRIPTION,
                publisher: { "@id": `${SITE_ORIGIN}/#person` },
              },
              {
                "@type": "Person",
                "@id": `${SITE_ORIGIN}/#person`,
                name: "Larris Xie",
                url: `${SITE_ORIGIN}/`,
                jobTitle: "Software Engineer",
                affiliation: {
                  "@type": "CollegeOrUniversity",
                  name: "University of Waterloo",
                  url: "https://uwaterloo.ca/",
                },
                sameAs: [
                  "https://github.com/Profilist",
                  "https://www.linkedin.com/in/larrisxie",
                  "https://x.com/larrisx",
                ],
              },
            ],
          },
        },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        { rel: "stylesheet", href: stylesHref },
        { rel: "preload", href: geistHref, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "preload", href: instrumentHref, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "preload", href: handwritingHref, as: "font", type: "font/ttf", crossOrigin: "anonymous" },
        { rel: "icon", href: "/logo.png" },
        { rel: "shortcut icon", href: "/logo.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
      ],
    };
  },
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <StickyNavWrapper />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased relative min-h-screen">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if (location.hostname === "www.larrisx.com") {
              const beacon = document.createElement("script");
              beacon.type = "module";
              beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
              beacon.dataset.cfBeacon = '{"token":"a3dc1bc3307d4b819a729ead77cf523a"}';
              document.head.appendChild(beacon);
            }`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center font-geist">
      <h1 className="border-r border-black/30 px-6 text-2xl font-medium leading-[49px]">404</h1>
      <p className="pl-6 text-sm leading-[49px]">This page could not be found.</p>
    </main>
  );
}
