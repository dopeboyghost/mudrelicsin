import { createFileRoute } from "@tanstack/react-router";
import { handleVerifyPayment } from "@/lib/payments/checkout.server";

export const Route = createFileRoute("/api/verify-payment")({
  server: { handlers: { POST: ({ request }) => handleVerifyPayment(request) } },
});
