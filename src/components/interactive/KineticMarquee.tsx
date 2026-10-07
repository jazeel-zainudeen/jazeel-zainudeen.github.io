"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface KineticMarqueeProps {
  items: string[];
  speed?: number;
  direction?: 1 | -1;
  className?: string;
}

export function KineticMarquee({
  items,
  speed = 40,
  direction = 1,
  className = "",
}: KineticMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const track = trackRef.current;
    if (!track || !container) return;

    let xPos = 0;
    let extraSpeed = 0;
    let isVisible = true;
    let halfWidth = track.scrollWidth / 2;

    const onResize = () => {
      if (track) halfWidth = track.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize);

    // Velocity listener
    const scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        if (!isVisible) return;
        extraSpeed = self.getVelocity() * 0.0025;
      },
    });

    const update = () => {
      if (!isVisible) return;

      extraSpeed *= 0.92;
      const currentSpeed = (speed * 0.02 + Math.abs(extraSpeed)) * direction;
      xPos -= currentSpeed;

      // Use cached halfWidth to eliminate forced layout reflow!
      if (Math.abs(xPos) >= halfWidth && halfWidth > 0) {
        xPos = 0;
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
    };

    gsap.ticker.add(update);

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(update);
      scrollTrigger.kill();
    };
  }, [speed, direction]);

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap select-none py-4 ${className}`}
    >
      <div ref={trackRef} className="inline-flex items-center gap-8 will-change-transform">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-8">
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground/80 hover:text-foreground transition-colors">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
