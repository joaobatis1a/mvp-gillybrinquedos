export type CategorySlug =
  | "bonecas"
  | "carrinhos"
  | "cozinha"
  | "blocos"
  | "pelucias"
  | "eletronicos"
  | "colecionaveis"
  | "bebes";

export type CategoryAccent = "gilly" | "sky" | "candy" | "sun";

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  emoji: string;
  accent: CategoryAccent;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: CategorySlug;
  emoji: string;
  price: number;
  originalPrice?: number;
  installmentsMax: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  ageRange: string;
  description: string;
  highlights: string[];
  tags?: Array<"novidade" | "mais-vendido" | "ultimas-unidades">;
};

export type Address = {
  id: string;
  label: string;
  recipient: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type ShippingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  etaDays: number;
};

export type PaymentMethod = "pix" | "credito";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: Array<{ product: Product; quantity: number }>;
  address: Address;
  shipping: ShippingOption;
  paymentMethod: PaymentMethod;
  installments: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: "confirmado";
};

export type StoredUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
