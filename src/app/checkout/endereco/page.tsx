"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useCheckout } from "@/lib/checkout-context";
import { Button } from "@/components/ui/button";
import { formatCep } from "@/lib/format";
import type { Address } from "@/lib/types";

const addressSchema = z.object({
  label: z.string().min(1, "Dê um nome para este endereço"),
  recipient: z.string().min(3, "Informe o nome do destinatário"),
  cep: z.string().min(9, "CEP inválido"),
  street: z.string().min(3, "Informe a rua"),
  number: z.string().min(1, "Informe o número"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Informe o bairro"),
  city: z.string().min(2, "Informe a cidade"),
  state: z
    .string()
    .length(2, "Use a sigla do estado, ex: PE")
    .transform((value) => value.toUpperCase()),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function EnderecoPage() {
  const router = useRouter();
  const { lines, isHydrated: cartHydrated } = useCart();
  const { user, addresses, addAddress, isHydrated: authHydrated } = useAuth();
  const { setAddress, address: checkoutAddress } = useCheckout();
  const [modeOverride, setModeOverride] = useState<"saved" | "new" | null>(null);
  const [selectedIdOverride, setSelectedIdOverride] = useState<string | null>(null);
  const [saveToProfile, setSaveToProfile] = useState(true);

  const mode = modeOverride ?? (authHydrated && addresses.length > 0 ? "saved" : "new");
  const selectedId =
    selectedIdOverride ?? checkoutAddress?.id ?? addresses[0]?.id ?? null;

  useEffect(() => {
    if (cartHydrated && lines.length === 0) router.replace("/carrinho");
  }, [cartHydrated, lines.length, router]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { label: "Casa", cep: "", state: "" },
  });

  const cepValue = useWatch({ control, name: "cep" });

  function onSubmitNew(data: AddressFormValues) {
    const address: Address = { id: crypto.randomUUID(), ...data };
    if (saveToProfile && user) addAddress(data);
    setAddress(address);
    router.push("/checkout/frete");
  }

  function continueWithSaved() {
    const found = addresses.find((a) => a.id === selectedId);
    if (!found) return;
    setAddress(found);
    router.push("/checkout/frete");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Endereço de entrega</h1>
      <p className="mt-1 text-ink-soft">Para onde vamos enviar seus brinquedos?</p>

      {addresses.length > 0 && (
        <div className="mt-6 flex gap-2 rounded-full bg-black/5 p-1 text-sm font-bold">
          <button
            onClick={() => setModeOverride("saved")}
            className={`flex-1 rounded-full py-2 cursor-pointer ${mode === "saved" ? "bg-white text-gilly shadow-sm" : "text-ink-soft"}`}
          >
            Endereços salvos
          </button>
          <button
            onClick={() => setModeOverride("new")}
            className={`flex-1 rounded-full py-2 cursor-pointer ${mode === "new" ? "bg-white text-gilly shadow-sm" : "text-ink-soft"}`}
          >
            Novo endereço
          </button>
        </div>
      )}

      {mode === "saved" && addresses.length > 0 ? (
        <div className="mt-6 space-y-3">
          {addresses.map((address) => (
            <label
              key={address.id}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 ${
                selectedId === address.id ? "border-gilly bg-gilly-light/40" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="saved-address"
                className="mt-1 accent-[#F2600A]"
                checked={selectedId === address.id}
                onChange={() => setSelectedIdOverride(address.id)}
              />
              <span className="text-sm">
                <span className="block font-bold text-ink">
                  {address.label} · {address.recipient}
                </span>
                <span className="text-ink-soft">
                  {address.street}, {address.number}
                  {address.complement ? ` - ${address.complement}` : ""} · {address.neighborhood}
                  , {address.city}/{address.state} · CEP {address.cep}
                </span>
              </span>
            </label>
          ))}
          <Button size="lg" className="w-full" onClick={continueWithSaved} disabled={!selectedId}>
            Continuar
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitNew)} className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Nome do endereço" error={errors.label?.message} className="sm:col-span-2">
            <input {...register("label")} placeholder="Casa, trabalho..." className={inputClass} />
          </Field>
          <Field label="Destinatário" error={errors.recipient?.message} className="sm:col-span-2">
            <input {...register("recipient")} placeholder="Nome completo" className={inputClass} />
          </Field>
          <Field label="CEP" error={errors.cep?.message}>
            <input
              {...register("cep")}
              value={cepValue}
              onChange={(event) =>
                setValue("cep", formatCep(event.target.value), { shouldValidate: true })
              }
              placeholder="00000-000"
              inputMode="numeric"
              className={inputClass}
            />
          </Field>
          <Field label="Estado (UF)" error={errors.state?.message}>
            <input {...register("state")} placeholder="PE" maxLength={2} className={inputClass} />
          </Field>
          <Field label="Rua" error={errors.street?.message} className="sm:col-span-2">
            <input {...register("street")} placeholder="Nome da rua" className={inputClass} />
          </Field>
          <Field label="Número" error={errors.number?.message}>
            <input {...register("number")} placeholder="123" className={inputClass} />
          </Field>
          <Field label="Complemento (opcional)">
            <input {...register("complement")} placeholder="Apto, bloco..." className={inputClass} />
          </Field>
          <Field label="Bairro" error={errors.neighborhood?.message}>
            <input {...register("neighborhood")} placeholder="Bairro" className={inputClass} />
          </Field>
          <Field label="Cidade" error={errors.city?.message}>
            <input {...register("city")} placeholder="Cidade" className={inputClass} />
          </Field>

          {user && (
            <label className="flex items-center gap-2 text-sm text-ink-soft sm:col-span-2">
              <input
                type="checkbox"
                checked={saveToProfile}
                onChange={(event) => setSaveToProfile(event.target.checked)}
                className="accent-[#F2600A]"
              />
              Salvar este endereço na minha conta
            </label>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              Continuar para o frete
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-border bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-gilly focus:outline-none";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-semibold text-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-semibold text-danger">{error}</p>}
    </div>
  );
}
