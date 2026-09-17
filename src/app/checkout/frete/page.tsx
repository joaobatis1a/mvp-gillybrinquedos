"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/lib/checkout-context";
import { getShippingOptions } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";

export default function FretePage() {
  const router = useRouter();
  const { address, shipping, setShipping, isHydrated } = useCheckout();
  const [selectedId, setSelectedId] = useState<string | null>(shipping?.id ?? null);

  useEffect(() => {
    if (isHydrated && !address) router.replace("/checkout/endereco");
  }, [isHydrated, address, router]);

  const options = useMemo(() => (address ? getShippingOptions(address.cep) : []), [address]);
  const effectiveSelectedId = selectedId ?? options[0]?.id ?? null;

  if (!address) return null;

  function handleContinue() {
    const option = options.find((o) => o.id === effectiveSelectedId);
    if (!option) return;
    setShipping(option);
    router.push("/checkout/pagamento");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Forma de entrega</h1>
      <p className="mt-1 text-ink-soft">
        Entregando para {address.street}, {address.number} · {address.city}/{address.state}
      </p>

      <div className="mt-6 space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-4 ${
              effectiveSelectedId === option.id ? "border-gilly bg-gilly-light/40" : "border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="shipping"
                className="mt-1 accent-[#F2600A]"
                checked={effectiveSelectedId === option.id}
                onChange={() => setSelectedId(option.id)}
              />
              <span>
                <span className="block font-bold text-ink">{option.name}</span>
                <span className="text-sm text-ink-soft">{option.description}</span>
                <span className="block text-sm text-ink-soft">
                  {option.etaDays === 0 ? "Disponível hoje" : `Chega em até ${option.etaDays} dia(s) útil(eis)`}
                </span>
              </span>
            </div>
            <span className="shrink-0 font-display font-bold text-ink">
              {option.price === 0 ? "Grátis" : formatBRL(option.price)}
            </span>
          </label>
        ))}
      </div>

      <Button size="lg" className="mt-6 w-full" onClick={handleContinue} disabled={!effectiveSelectedId}>
        Continuar para o pagamento
      </Button>
    </div>
  );
}
