"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CounterNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CounterNumber({
  end,
  suffix = "",
  duration = 1.8,
  className = "",
}: CounterNumberProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = counterRef.current;
    if (!el) return;

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.floor(obj.val));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration]);

  return (
    <span ref={counterRef} className={`tabular-nums ${className}`}>
      {count}
      {suffix}
    </span>
  );
}
