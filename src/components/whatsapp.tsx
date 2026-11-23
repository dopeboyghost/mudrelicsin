import { whatsAppHref, relicEnquiryMessage } from "@/lib/whatsapp";

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3A9 9 0 1 1 12 21zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.1 8.1 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 3.5 3.5 0 0 0 1.6.5 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c-.1-.2-.3-.2-.6-.4z"
      />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with MUD RELICS on WhatsApp"
    >
      <Mark />
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
