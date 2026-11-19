import { createFileRoute } from "@tanstack/react-router";
import { handleWebhook } from "@/lib/payments/checkout.server";

export const Route = createFileRoute("/api/razorpay/webhook")({
  server: { handlers: { POST: ({ request }) => handleWebhook(request) } },
});
