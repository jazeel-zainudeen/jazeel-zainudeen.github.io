"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const updateBar = () => {
      const bar = barRef.current;
      if (!bar) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        bar.style.transform = "scaleX(0)";
        return;
      }
      const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      bar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateBar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateBar();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-transparent pointer-events-none"
    >
      <div
        ref={barRef}
        suppressHydrationWarning
        className="h-full w-full origin-left bg-gradient-to-r from-brand to-brand-glow will-change-transform shadow-[0_0_10px_rgba(17,24,39,0.5)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
