# Nina Brinquedos

**Loja virtual de brinquedos** · Next.js · TypeScript · Tailwind CSS

[![Demo ao vivo](https://img.shields.io/badge/demo-online-F2600A?style=flat-square)](https://ninabrinquedos.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-F2600A?style=flat-square)](LICENSE)

MVP de e-commerce construído do zero com foco em UX/UI: navegação por categorias, busca, carrinho, favoritos e um checkout simulado completo, tudo com uma identidade visual própria em vez do template genérico de loja que qualquer IA gera de primeira.

🔗 **Demo:** [ninabrinquedos.vercel.app](https://ninabrinquedos.vercel.app)

> Projeto pessoal de portfólio. "Nina Brinquedos" é uma marca fictícia — o objetivo aqui é demonstrar construção de produto e atenção a detalhe de interface, não vender brinquedos de verdade.

## Funcionalidades

- Home com destaques, categorias, semana de ofertas, carrossel de benefícios e vitrine da loja física
- Busca com sugestões em tempo real
- Listagem de categoria com filtros (marca, preço, faixa etária) e ordenação
- Página de produto com galeria de fotos, avaliações, parcelamento e itens relacionados
- Carrinho, favoritos e conta (login, cadastro, endereços, pedidos) com estado persistido no navegador
- Checkout simulado em etapas: endereço → frete → pagamento → confirmação

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- React Hook Form + Zod para formulários e validação

Projeto **frontend-only**: não há backend nem banco de dados — carrinho, favoritos, conta e pedidos usam dados mockados e estado persistido em `localStorage`.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
