import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // MVP temporário: fotos reais de produtos vêm de fontes variadas (marketplaces,
    // sites de marca, Wikimedia) enquanto a loja não tem seu próprio banco de fotos.
    // Antes de ir para produção, isso deve ser trocado por um domínio de imagens
    // próprio (upload da loja) e essa lista, restrita.
    remotePatterns: [
      { protocol: "https", hostname: "**.mlstatic.com" },
      { protocol: "https", hostname: "**.media-amazon.com" },
      { protocol: "https", hostname: "**.ssl-images-amazon.com" },
      { protocol: "https", hostname: "**.wikimedia.org" },
      { protocol: "https", hostname: "**.americanas.com.br" },
      { protocol: "https", hostname: "**.b2w.io" },
      { protocol: "https", hostname: "**.kabum.com.br" },
      { protocol: "https", hostname: "**.hasbro.com" },
      { protocol: "https", hostname: "**.mattel.com" },
      { protocol: "https", hostname: "**.lego.com" },
      { protocol: "https", hostname: "**.shopify.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
