"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** milissegundos de atraso — usado para escalonar grades */
  delay?: number;
  variant?: "up" | "zoom" | "left" | "right";
  className?: string;
};

const VARIANT_CLASS = {
  up: "",
  zoom: "reveal-zoom",
  left: "reveal-left",
  right: "reveal-right",
} as const;

/**
 * Revela o conteúdo quando ele entra na viewport. Escreve direto no DOM
 * (sem estado) para não provocar re-render durante o scroll.
 */
export function Reveal({ children, delay = 0, variant = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px 260px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible="false"
      className={`reveal ${VARIANT_CLASS[variant]} ${className ?? ""}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
