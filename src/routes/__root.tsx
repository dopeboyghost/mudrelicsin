import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { CartProvider } from "@/lib/cart";
import { RadioProvider } from "@/components/radio";
import { WhatsAppFloat } from "@/components/whatsapp";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MUD RELICS" },
      {
        name: "description",
        content:
          "You didn't buy it. You found it. Handmade artifacts, functional sculptures and collectible objects from Kochi.",
      },
      { name: "theme-color", content: "#3A1468" },
      { property: "og:title", content: "MUD RELICS — Handmade Artifacts" },
      {
        property: "og:description",
        content:
          "You didn't buy it. You found it. Handmade artifacts, functional sculptures and collectible objects from Kochi.",
      },
      { property: "og:image", content: "https://mudrelics.in/images/mud-relics-og.jpg" },
      { property: "og:image:secure_url", content: "https://mudrelics.in/images/mud-relics-og.jpg" },
      { property: "og:image:alt", content: "MUD RELICS handmade artifacts and collectible sculptures" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mudrelics.in/" },
      { property: "og:site_name", content: "MUD RELICS" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MUD RELICS — Handmade Artifacts" },
      {
        name: "twitter:description",
        content:
          "You didn't buy it. You found it. Handmade artifacts, functional sculptures and collectible objects from Kochi.",
      },
      { name: "twitter:image", content: "https://mudrelics.in/images/mud-relics-og.jpg" },
      { name: "twitter:image:alt", content: "MUD RELICS handmade artifacts and collectible sculptures" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@500;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <CartProvider>
            <RadioProvider>
              <Outlet />
              <WhatsAppFloat />
            </RadioProvider>
          </CartProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
