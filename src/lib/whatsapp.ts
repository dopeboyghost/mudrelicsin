import { inr } from "@/data/catalog";

/**
 * WhatsApp Business number for every chat button on the site.
 * International digits only: country code + number, no +, spaces, or dashes.
 * Example: 919876543210
 * This is the number from the existing MUD RELICS click-to-chat link.
 * Replace this one value to point every button at a different number.
 */
export const WHATSAPP_NUMBER = "919895246770";

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
  const artifact = digits ? ` (Artifact #${digits})` : "";
  const price = relic.price != null ? `, priced at ${inr(relic.price)}` : "";
  return `Hey MUD RELICS! I'm interested in ${name}${artifact}${price}. Is this relic available?\n${productPageUrl(relic.id)}`;
}
