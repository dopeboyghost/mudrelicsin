import { createFileRoute } from "@tanstack/react-router";
import { handleStock } from "@/lib/payments/checkout.server";

export const Route = createFileRoute("/api/stock")({
  server: { handlers: { GET: ({ request }) => handleStock(request) } },
});
