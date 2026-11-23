import { inr } from "@/data/catalog";

/**
 * The MUD RELICS WhatsApp Business number.
 * Digits only: country code + number, no +, spaces, or dashes.
 */
export const WHATSAPP_NUMBER = "918714122994";

const SITE = "https://mudrelics.in";

export function productPageUrl(id: string) {
  return `${SITE}/relics/${id}`;
}

export function whatsAppHref(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

function titleCase(name: string) {
  return name
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function relicEnquiryMessage(relic: { id: string; name: string; number: string; price: number | null }) {
  const name = titleCase(relic.name);
  const digits = relic.number.match(/(\d+)/)?.[1];
  const artifact = digits ? `, Artifact #${digits}` : "";
  const price = relic.price != null ? `, priced at ${inr(relic.price)}` : "";
  return `Hey MUD RELICS! I'm interested in ${name}${artifact}${price}. Is it available?\n${productPageUrl(relic.id)}`;
}
