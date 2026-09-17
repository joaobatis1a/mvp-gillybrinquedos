"use client";

import { usePathname } from "next/navigation";
import { CheckoutStepper } from "@/components/checkout/checkout-stepper";

const STEP_BY_SEGMENT: Record<string, "endereco" | "frete" | "pagamento" | "confirmacao"> = {
  endereco: "endereco",
  frete: "frete",
  pagamento: "pagamento",
  confirmacao: "confirmacao",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean).pop() ?? "endereco";
  const current = STEP_BY_SEGMENT[segment] ?? "endereco";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <CheckoutStepper current={current} />
      </div>
      {children}
    </div>
  );
}
