import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { SearchBar } from "@/components/layout/search-bar";
import { CartBadge } from "@/components/layout/cart-badge";
import { AccountMenu } from "@/components/layout/account-menu";
import { CategoryNav } from "@/components/layout/category-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <Suspense fallback={<div className="hidden flex-1 sm:block" />}>
          <SearchBar className="hidden flex-1 sm:block" />
        </Suspense>
        <div className="ml-auto flex items-center gap-1">
          <AccountMenu />
          <CartBadge />
        </div>
      </div>
      <Suspense fallback={null}>
        <SearchBar className="block px-4 pb-3 sm:hidden" />
      </Suspense>
      <CategoryNav />
    </header>
  );
}
