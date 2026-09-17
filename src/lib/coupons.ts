export type Coupon = {
  code: string;
  description: string;
  kind: "percent" | "shipping";
  value: number;
};

export const coupons: Coupon[] = [
  { code: "GILLY10", description: "10% de desconto no pedido", kind: "percent", value: 10 },
  { code: "BEMVINDO15", description: "15% de desconto para novos clientes", kind: "percent", value: 15 },
  { code: "FRETEGRATIS", description: "Frete grátis na entrega econômica", kind: "shipping", value: 100 },
];

export function findCoupon(code: string) {
  return coupons.find((coupon) => coupon.code === code.trim().toUpperCase());
}
