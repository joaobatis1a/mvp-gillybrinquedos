import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "bonecas",
    name: "Bonecas & Bebês Reborn",
    shortName: "Bonecas",
    emoji: "👶",
    accent: "candy",
    description: "Bonecas, bebês reborn e acessórios de cuidado.",
  },
  {
    slug: "carrinhos",
    name: "Carrinhos & Motinhos Elétricos",
    shortName: "Carrinhos",
    emoji: "🚗",
    accent: "sky",
    description: "Passeio, motinhos e carrinhos elétricos.",
  },
  {
    slug: "cozinha",
    name: "Cozinha & Casinha",
    shortName: "Cozinha",
    emoji: "🍳",
    accent: "sun",
    description: "Cozinhas, mercadinhos e casinhas de brincar.",
  },
  {
    slug: "blocos",
    name: "Blocos de Montar",
    shortName: "Blocos",
    emoji: "🧱",
    accent: "gilly",
    description: "Blocos de encaixe e construção criativa.",
  },
  {
    slug: "pelucias",
    name: "Pelúcias",
    shortName: "Pelúcias",
    emoji: "🧸",
    accent: "candy",
    description: "Pelúcias macias para todas as idades.",
  },
  {
    slug: "eletronicos",
    name: "Eletrônicos & Controle Remoto",
    shortName: "Eletrônicos",
    emoji: "🎮",
    accent: "sky",
    description: "Controle remoto, robótica e games.",
  },
  {
    slug: "colecionaveis",
    name: "Colecionáveis",
    shortName: "Colecionáveis",
    emoji: "⭐",
    accent: "sun",
    description: "Mini brands, blind boxes e colecionáveis.",
  },
  {
    slug: "bebes",
    name: "Primeira Infância",
    shortName: "Bebês",
    emoji: "🍼",
    accent: "gilly",
    description: "Itens para os primeiros meses do bebê.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
