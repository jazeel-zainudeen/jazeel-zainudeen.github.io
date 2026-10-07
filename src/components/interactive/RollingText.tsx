"use client";

import React from "react";

interface RollingTextProps {
  text: string;
  className?: string;
  duplicateClassName?: string;
}

export function RollingText({
  text,
  className = "",
  duplicateClassName = "",
}: RollingTextProps) {
  return (
    <span className={`group/roll relative inline-flex overflow-hidden ${className}`}>
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden="true"
        className={`absolute left-0 top-full inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full ${duplicateClassName}`}
      >
        {text}
      </span>
    </span>
  );
}
