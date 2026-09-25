"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Badge } from "@/components/ui/badge";
import { formatBRL, formatDate } from "@/lib/format";

const PAYMENT_LABEL = { pix: "Pix", credito: "Cartão de crédito" } as const;

export default function PedidosPage() {
  const { orders } = useAuth();
  const [openId, setOpenId] = useState<string | null>(orders[0]?.id ?? null);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Meus pedidos</h1>
      <p className="mt-1 text-ink-soft">Acompanhe o histórico das suas compras na Nina.</p>

      {orders.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border py-14 text-center">
          <GillyMascot mood="sleepy" size={110} />
          <p className="text-ink-soft">Você ainda não fez nenhum pedido.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {orders.map((order) => {
            const open = openId === order.id;
            return (
              <div key={order.id} className="rounded-2xl border border-border">
                <button
                  onClick={() => setOpenId(open ? null : order.id)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                >
                  <div>
                    <p className="font-bold text-ink">Pedido #{order.id}</p>
                    <p className="text-sm text-ink-soft">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone="success">Confirmado</Badge>
                    <span className="font-display font-bold text-ink">{formatBRL(order.total)}</span>
                  </div>
                </button>

                {open && (
                  <div className="border-t border-border p-4 text-sm">
                    <ul className="space-y-1.5 text-ink-soft">
                      {order.items.map(({ product, quantity }) => (
                        <li key={product.id} className="flex justify-between">
                          <span>
                            {quantity}x {product.name}
                          </span>
                          <span>{formatBRL(product.price * quantity)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 grid gap-3 border-t border-border pt-3 sm:grid-cols-2">
                      <div>
                        <p className="font-bold text-ink">Entrega</p>
                        <p className="text-ink-soft">
                          {order.address.street}, {order.address.number} · {order.address.city}/
                          {order.address.state}
                        </p>
                        <p className="text-ink-soft">{order.shipping.name}</p>
                      </div>
                      <div>
                        <p className="font-bold text-ink">Pagamento</p>
                        <p className="text-ink-soft">
                          {PAYMENT_LABEL[order.paymentMethod]}
                          {order.paymentMethod === "credito" && order.installments > 1
                            ? ` em ${order.installments}x`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
