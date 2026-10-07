"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorTextRef = useRef<string>("");
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.01, ease: "none" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.01, ease: "none" });

    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.18, ease: "power2.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.18, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest("[data-cursor]");
      const interactive = target.closest("a, button, input, textarea, select");

      if (cursorAttrEl) {
        const text = cursorAttrEl.getAttribute("data-cursor") || "";
        if (text !== cursorTextRef.current) {
          cursorTextRef.current = text;
          setCursorText(text);
        }
        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
      } else if (interactive) {
        if (cursorTextRef.current !== "") {
          cursorTextRef.current = "";
          setCursorText("");
        }
        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
      } else {
        if (cursorTextRef.current !== "") {
          cursorTextRef.current = "";
          setCursorText("");
        }
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          setIsHovered(false);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 rounded-full bg-foreground will-change-transform transition-[width,height,opacity,background-color] duration-150 ease-out ${
          cursorText ? "opacity-0" : isHovered ? "h-2 w-2 bg-brand-glow" : "h-1.5 w-1.5"
        }`}
      />

      <div
        ref={followerRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border will-change-transform transition-[width,height,background-color,border-color] duration-200 ease-out ${
          cursorText
            ? "h-20 w-20 border-brand/40 bg-foreground text-background shadow-2xl backdrop-blur-sm"
            : isHovered
            ? "h-12 w-12 border-brand-glow/60 bg-foreground/5 backdrop-blur-[1px]"
            : isClicking
            ? "h-7 w-7 border-foreground/60"
            : "h-9 w-9 border-foreground/25 bg-transparent"
        }`}
      >
        {cursorText && (
          <span className="font-display text-[0.62rem] font-bold uppercase tracking-widest text-background select-none animate-in fade-in zoom-in-95 duration-150">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
