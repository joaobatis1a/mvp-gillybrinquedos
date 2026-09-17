"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { GillyMascot } from "@/components/mascot/gilly-mascot";

const schema = z.object({ email: z.string().email("E-mail inválido") });
type FormValues = z.infer<typeof schema>;

export default function RecuperarSenhaPage() {
  const { resetPassword } = useAuth();
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormValues) {
    const result = resetPassword(data.email);
    setFeedback({ ok: result.success, message: result.message });
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-12 sm:px-6">
      <GillyMascot mood="love" size={90} />
      <h1 className="mt-2 font-display text-2xl font-extrabold text-ink">Recuperar senha</h1>
      <p className="mt-1 text-center text-ink-soft">
        Informe seu e-mail e enviaremos as instruções de redefinição.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">E-mail</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-xl border-2 border-border bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-gilly focus:outline-none"
            placeholder="voce@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs font-semibold text-danger">{errors.email.message}</p>
          )}
        </div>

        {feedback && (
          <p className={`text-sm font-semibold ${feedback.ok ? "text-success" : "text-danger"}`}>
            {feedback.message}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          Enviar instruções
        </Button>
      </form>

      <p className="mt-5 text-sm text-ink-soft">
        Lembrou a senha?{" "}
        <Link href="/conta/login" className="font-bold text-gilly hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
