"use client";

import { useEffect, useRef, useCallback, Suspense } from "react";
import { usePathname } from "next/navigation";

function ScrollProgressBarInner() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);
  const isNavigatingRef = useRef(false);
  const trickleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to calculate current scroll progress
  const getScrollProgress = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / totalHeight));
  }, []);

  const completeNavLoading = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (trickleTimerRef.current) clearInterval(trickleTimerRef.current);
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);

    // Complete to 100%
    bar.style.transition = "transform 180ms ease-out";
    bar.style.transform = "scaleX(1)";

    // After hitting 100%, reset cleanly to 0 for the top of the new page
    finishTimerRef.current = setTimeout(() => {
      if (!barRef.current) return;
      barRef.current.style.transition = "transform 220ms ease-in-out";
      barRef.current.style.transform = "scaleX(0)";

      setTimeout(() => {
        if (!barRef.current) return;
        barRef.current.style.transition = "";
        isNavigatingRef.current = false;

        // Re-sync with the new page scroll position (top = 0)
        const p = getScrollProgress();
        barRef.current.style.transform = `scaleX(${p})`;
      }, 230);
    }, 180);
  }, [getScrollProgress]);

  const startNavLoading = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (trickleTimerRef.current) clearInterval(trickleTimerRef.current);
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);

    isNavigatingRef.current = true;

    // Surge forward smoothly from either current scroll or 0.32
    const currentProgress = getScrollProgress();
    let currentVal = Math.max(0.32, Math.min(0.75, currentProgress + 0.15));

    bar.style.transition = "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)";
    bar.style.transform = `scaleX(${currentVal})`;

    // Trickle progress forward up to ~0.88 while the route transitions
    trickleTimerRef.current = setInterval(() => {
      if (currentVal >= 0.88) {
        if (trickleTimerRef.current) clearInterval(trickleTimerRef.current);
        return;
      }
      const step = Math.max(0.015, (0.90 - currentVal) * 0.18);
      currentVal = Math.min(0.88, currentVal + step);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${currentVal})`;
      }
    }, 180);

    // Failsafe auto-reset after 6s in case navigation is interrupted
    finishTimerRef.current = setTimeout(() => {
      completeNavLoading();
    }, 6000);
  }, [completeNavLoading, getScrollProgress]);

  // Detect route / pathname changes and complete loading
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (isNavigatingRef.current) {
        completeNavLoading();
      }
    }
  }, [pathname, completeNavLoading]);

  // Click interceptor for route navigation & browser popstate
  useEffect(() => {

    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("rel")?.includes("external") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      const currentPath = window.location.pathname;
      if (href.startsWith("/#") && currentPath === "/") {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        if (targetUrl.origin !== currentUrl.origin) return;
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
          return;
        }

        startNavLoading();
      } catch {}
    };

    const handlePopState = () => {
      startNavLoading();
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    // Scroll listener for normal page reading
    let ticking = false;
    const updateBar = () => {
      if (isNavigatingRef.current) return;
      const bar = barRef.current;
      if (!bar) return;
      const progress = getScrollProgress();
      bar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking && !isNavigatingRef.current) {
        requestAnimationFrame(updateBar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateBar();

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
      if (trickleTimerRef.current) clearInterval(trickleTimerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, [startNavLoading, getScrollProgress]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100000] h-[2.5px] bg-transparent pointer-events-none"
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

export function ScrollProgressBar() {
  return (
    <Suspense fallback={null}>
      <ScrollProgressBarInner />
    </Suspense>
  );
}
