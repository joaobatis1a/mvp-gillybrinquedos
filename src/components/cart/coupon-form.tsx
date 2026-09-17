"use client";

import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";

export function CouponForm() {
  const { couponCode, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!code.trim()) return;
    const result = applyCoupon(code);
    setFeedback({ ok: result.success, message: result.message });
    if (result.success) setCode("");
  }

  if (couponCode) {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-success-light px-4 py-3 text-sm">
        <span className="font-bold text-success">Cupom {couponCode} aplicado</span>
        <button
          onClick={() => {
            removeCoupon();
            setFeedback(null);
          }}
          className="font-semibold text-ink-soft hover:text-danger cursor-pointer"
        >
          Remover
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Cupom de desconto"
          className="min-w-0 flex-1 rounded-full border-2 border-border bg-cream px-4 py-2 text-sm uppercase placeholder:normal-case placeholder:text-ink-soft focus:border-gilly focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-ink px-5 py-2 text-sm font-bold text-white hover:bg-ink/85 cursor-pointer"
        >
          Aplicar
        </button>
      </div>
      {feedback && (
        <p className={`text-sm font-semibold ${feedback.ok ? "text-success" : "text-danger"}`}>
          {feedback.message}
        </p>
      )}
    </form>
  );
}
