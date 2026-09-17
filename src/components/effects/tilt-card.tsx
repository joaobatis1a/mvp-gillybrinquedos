"use client";

import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** intensidade máxima da inclinação, em graus */
  strength?: number;
};

/**
 * Cartão com inclinação 3D e brilho que acompanha o ponteiro.
 * Atualiza variáveis CSS direto no nó para evitar re-render a cada movimento.
 */
export function TiltCard({ children, className, strength = 7 }: TiltCardProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene) return;

    const rect = scene.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      scene.style.setProperty("--tilt-y", `${(px - 0.5) * strength * 2}deg`);
      scene.style.setProperty("--tilt-x", `${(0.5 - py) * strength * 2}deg`);
      scene.style.setProperty("--pointer-x", `${px * 100}%`);
      scene.style.setProperty("--pointer-y", `${py * 100}%`);
    });
  }

  function handleLeave() {
    const scene = sceneRef.current;
    if (!scene) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    scene.style.setProperty("--tilt-y", "0deg");
    scene.style.setProperty("--tilt-x", "0deg");
  }

  return (
    <div
      ref={sceneRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-scene ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
