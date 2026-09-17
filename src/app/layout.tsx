import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { CheckoutProvider } from "@/lib/checkout-context";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gilly Brinquedos - Diversão sem limites",
  description:
    "Bonecas, carrinhos elétricos, cozinhas, blocos de montar e muito mais. Loja de brinquedos em Paulista, PE.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${baloo.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <AuthProvider>
          <CartProvider>
            <CheckoutProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </CheckoutProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
