"use client";

import { useEffect, useState } from "react";

export function LiveStatusClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (Asia/Kolkata)
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 font-mono text-[0.68rem] text-muted-foreground backdrop-blur-md shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
      <span className="font-semibold text-foreground">KERALA, IN</span>
      <span className="text-border">|</span>
      <span className="tabular-nums tracking-widest text-foreground font-medium">
        {time || "05:30:00"} IST
      </span>
    </div>
  );
}
