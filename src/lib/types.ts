import type { ToyArtKey } from "@/components/toys/toy-art";

export type CategorySlug =
  | "bonecas"
  | "bonecos"
  | "carrinhos"
  | "montar"
  | "pelucias"
  | "jogos"
  | "criativos"
  | "bebes"
  | "radicais"
  | "eletronicos";

export type CategoryAccent = "gilly" | "sky" | "candy" | "sun" | "mint" | "grape";

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  art: ToyArtKey;
  accent: CategoryAccent;
  description: string;
  blurb: string;
};

export type ProductTag = "novidade" | "mais-vendido" | "ultimas-unidades" | "exclusivo";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: CategorySlug;
  art: ToyArtKey;
  price: number;
  originalPrice?: number;
  installmentsMax: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  /** Idade mínima recomendada, em anos (0 = primeiros meses) */
  ageMin: number;
  ageLabel: string;
  description: string;
  highlights: string[];
  tags?: ProductTag[];
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

export type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "avaliacao" | "novidades";

export type ProductFilters = {
  brands: string[];
  ages: string[];
  maxPrice: number | null;
  onlyPromo: boolean;
  sort: SortOption;
};
