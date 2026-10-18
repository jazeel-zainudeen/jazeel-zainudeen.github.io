"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function SmoothScrollInner({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Reset scroll to top immediately whenever route / pathname changes
  useEffect(() => {
    // If arriving with an anchor hash, allow smooth scroll to the target element
    if (window.location.hash) {
      const timer = setTimeout(() => {
        const targetEl = document.querySelector(window.location.hash);
        if (targetEl && lenisRef.current) {
          lenisRef.current.scrollTo(targetEl as HTMLElement, { offset: -40, duration: 1.2 });
        }
      }, 200);
      return () => clearTimeout(timer);
    }

    // Always reset scroll to top (0, 0) immediately on page switch
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Refresh ScrollTrigger after route transition
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(refreshTimer);
  }, [pathname]);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Disable browser default scroll restoration so it doesn't conflict with Lenis
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
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

    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <SmoothScrollInner>{children}</SmoothScrollInner>
    </Suspense>
  );
}
