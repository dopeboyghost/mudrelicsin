import { createFileRoute } from "@tanstack/react-router";
import { handleCreateOrder } from "@/lib/payments/checkout.server";

export const Route = createFileRoute("/api/create-order")({
  server: { handlers: { POST: ({ request }) => handleCreateOrder(request) } },
});
