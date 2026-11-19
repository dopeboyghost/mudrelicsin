import { createFileRoute } from "@tanstack/react-router";
import { handleCheckout } from "@/lib/payments/checkout.server";

export const Route = createFileRoute("/api/checkout")({
  server: { handlers: { POST: ({ request }) => handleCheckout(request) } },
});
