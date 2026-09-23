import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gilly text-white shadow-sm shadow-gilly/20 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(242,96,10,0.65)]",
  secondary:
    "bg-sky text-white hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(63,176,229,0.55)]",
  outline:
    "border-2 border-gilly text-gilly hover:bg-gilly-light bg-transparent",
  ghost: "text-ink hover:bg-black/5 bg-transparent",
  danger: "bg-danger text-white hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(225,75,60,0.55)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-base px-6 py-3 gap-2",
  lg: "text-lg px-8 py-4 gap-2.5",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }
>(({ className, variant = "primary", size = "md", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilly cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`}
      {...props}
    />
  );
});
Button.displayName = "Button";
