"use client";

import React, { useRef } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
  as?: "div" | "article" | "figure";
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glow = true,
  as: Component = "div",
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    rectRef.current = card.getBoundingClientRect();
    // Fast response during active mouse tracking
    card.style.transition = "transform 0.06s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;

    if (!rectRef.current) {
      rectRef.current = card.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    // Direct RAF transform update: zero React re-renders, zero layout thrashing
    rafId.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.background = `radial-gradient(400px circle at ${percentX.toFixed(1)}% ${percentY.toFixed(1)}%, rgba(17, 24, 39, 0.08), transparent 80%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rectRef.current = null;
    const card = cardRef.current;
    if (card) {
      // Smooth cinematic return on exit
      card.style.transition = "transform 0.5s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.3s ease-out, border-color 0.3s ease-out";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <Component
      ref={cardRef as React.Ref<any>}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.4s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.3s ease-out, border-color 0.3s ease-out",
        willChange: "transform",
      }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Specular light sheen: zero re-render direct DOM update */}
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
        >
          <div
            ref={glowRef}
            className="h-full w-full opacity-0 transition-opacity duration-300 ease-out"
          />
        </div>
      )}
      {children}
    </Component>
  );
}
