import type { ShippingOption } from "@/lib/types";

export function getShippingOptions(cep: string): ShippingOption[] {
  const digits = cep.replace(/\D/g, "");
  const lastDigit = Number(digits[digits.length - 1] ?? 0);
  const isNearby = digits.startsWith("534") || digits.startsWith("535") || digits.startsWith("530");

  return [
    {
      id: "retirada",
      name: "Retirar na loja",
      description: "Rodovia PE-15, Km 16,5 · Paulista, PE",
      price: 0,
      etaDays: 0,
    },
    {
      id: "economica",
      name: "Entrega econômica",
      description: isNearby ? "Entrega regional" : "Entrega via transportadora",
      price: isNearby ? 12.9 : 24.9 + lastDigit,
      etaDays: isNearby ? 3 : 7,
    },
    {
      id: "expressa",
      name: "Entrega expressa",
      description: "Chega mais rápido, com rastreio prioritário",
      price: isNearby ? 22.9 : 39.9 + lastDigit,
      etaDays: isNearby ? 1 : 3,
    },
  ];
}
