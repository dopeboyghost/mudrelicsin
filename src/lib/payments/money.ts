import { createHash, timingSafeEqual } from "node:crypto";
import { relicById, type Relic } from "../../data/catalog.ts";

export type Line = {
  id: string;
  name: string;
  number: string;
  image: string;
  quantity: 1;
  pricePaise: number;
};

export type Quote = {
  lines: Line[];
  subtotalPaise: number;
  shippingPaise: number;
  taxPaise: number;
  amountPaise: number;
  currency: "INR";
};

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function tokensMatch(presented: string, storedHash: string) {
  try {
    const a = Buffer.from(hashToken(presented), "hex");
    const b = Buffer.from(storedHash, "hex");
    if (a.length !== b.length || a.length === 0) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function paiseFromRupees(rupees: number) {
  return Math.round(rupees * 100);
}

export function totals(subtotalPaise: number, shippingPaise: number, taxBps: number) {
  const taxPaise = Math.round(((subtotalPaise + shippingPaise) * taxBps) / 10000);
  return {
    subtotalPaise,
    shippingPaise,
    taxPaise,
    amountPaise: subtotalPaise + shippingPaise + taxPaise,
    currency: "INR" as const,
  };
}

export function quoteRelics(ids: string[], shippingPaise: number, taxBps: number): { ok: true; quote: Quote } | { ok: false; error: string; unavailable: string[] } {
  const unique = [...new Set(ids)];
  if (unique.length === 0) return { ok: false, error: "The cart is empty.", unavailable: [] };
  if (unique.length > 12) return { ok: false, error: "Too many pieces in one dispatch.", unavailable: [] };
  const unavailable: string[] = [];
  const lines: Line[] = [];
  for (const id of unique) {
    const relic = relicById(id);
    if (!sellable(relic)) {
      unavailable.push(id);
      continue;
    }
    lines.push({
      id: relic.id,
      name: relic.name,
      number: relic.number,
      image: relic.image,
      quantity: 1,
      pricePaise: paiseFromRupees(relic.price),
    });
  }
  if (unavailable.length) {
    return { ok: false, error: "One of these pieces is not available.", unavailable };
  }
  const subtotalPaise = lines.reduce((sum, line) => sum + line.pricePaise, 0);
  return { ok: true, quote: { lines, ...totals(subtotalPaise, shippingPaise, taxBps) } };
}

function sellable(relic: Relic | undefined): relic is Relic & { price: number } {
  return !!relic && relic.status === "AVAILABLE" && typeof relic.price === "number" && relic.price > 0;
}

export function readMoneyEnv(source: Record<string, string | undefined>) {
  const shipping = readWhole(source.SHIPPING_INR, "SHIPPING_INR", 0, 100000);
  const taxBps = readWhole(source.TAX_BPS, "TAX_BPS", 0, 10000);
  if (!shipping.ok) return shipping;
  if (!taxBps.ok) return taxBps;
  return { ok: true as const, shippingPaise: shipping.value * 100, taxBps: taxBps.value, taxConfigured: source.TAX_BPS?.trim() !== undefined && source.TAX_BPS.trim() !== "" };
}

function readWhole(raw: string | undefined, name: string, min: number, max: number) {
  if (raw == null || raw.trim() === "") return { ok: true as const, value: 0 };
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    return { ok: false as const, error: `${name} must be a whole number from ${min} to ${max}.` };
  }
  return { ok: true as const, value };
}
