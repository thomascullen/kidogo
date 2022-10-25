import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useEffect } from "react";
import cover from "~/images/cover.png";
import * as gtag from "~/utils/ga.client";

import styles from "~/styles/index.css";

interface LoaderData {
  googleAnalyticsID: string | undefined;
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({ googleAnalyticsID: process.env.GA });
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://use.typekit.net/ymp5why.css",
    },
    { rel: "stylesheet", href: styles },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kidogo Icons",
  description:
    "A growing collection of icons in 5 different styles designed for the web.",
  viewport: "width=device-width,initial-scale=1",
  "og:image": `https://kidogoicons.com${cover}`,
  "og:title": "Kidogo Icons",
  "og:url": "https://kidogoicons.com",
  "og:description":
    "A growing collection of icons in 5 different styles designed for the web.",
  "twitter:creator": "@thomasauros",
  "twitter:card": "summary_large_image",
});

export default function App() {
  const location = useLocation();
  const { googleAnalyticsID } = useLoaderData<LoaderData>();

  useEffect(() => {
    if (googleAnalyticsID) {
      gtag.pageview(location.pathname, googleAnalyticsID);
    }
  }, [location, googleAnalyticsID]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {!googleAnalyticsID ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsID}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
