"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // Smooth out micro frame spikes rather than hard-dropping frames
    gsap.ticker.lagSmoothing(500, 33);

    // Scroll to initial hash on mount if arriving with a hash (e.g. /#contact)
    if (window.location.hash) {
      setTimeout(() => {
        const targetEl = document.querySelector(window.location.hash);
        if (targetEl) {
          lenis.scrollTo(targetEl as HTMLElement, { offset: -40, duration: 1.2 });
        }
      }, 350);
    }

    // Handle internal anchor clicks smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      // Check if it's an on-page anchor ('#target') or root anchor ('/#target' when already on '/')
      const isAnchor =
        (href.startsWith("#") && href.length > 1) ||
        (href.startsWith("/#") && window.location.pathname === "/");

      if (isAnchor) {
        const hash = href.startsWith("/#") ? href.slice(1) : href;
        const elem = document.querySelector(hash);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, { offset: -40, duration: 1.2 });
          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
