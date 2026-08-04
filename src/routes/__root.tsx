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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Larris's Portfolio" },
      { name: "description", content: "Larris Xie's Portfolio" },
    ],
    links: [
      { rel: "stylesheet", href: stylesHref },
      { rel: "preload", href: geistHref, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: instrumentHref, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: handwritingHref, as: "font", type: "font/ttf", crossOrigin: "anonymous" },
      { rel: "icon", href: "/logo.png" },
      { rel: "shortcut icon", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
  }),
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
