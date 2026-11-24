import { whatsAppHref, relicEnquiryMessage } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with MUD RELICS on WhatsApp"
    >
      <img src="/brand/whatsapp-medallion.webp" alt="" className="whatsapp-medallion" />
    </a>
  );
}

export function RelicEnquiry({ relic }: { relic: { id: string; name: string; number: string; price: number | null } }) {
  return (
    <a
      href={whatsAppHref(relicEnquiryMessage(relic))}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex min-h-11 w-full items-center justify-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment sm:w-auto"
    >
      ENQUIRE ABOUT THIS RELIC
    </a>
  );
}

export function WhatsAppChatLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment ${className}`}
    >
      CHAT WITH MUD RELICS
    </a>
  );
}
