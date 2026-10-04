"use client";

import React from "react";

interface TawkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TawkButton({ children, className, ...props }: TawkButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).Tawk_API) {
      (window as any).Tawk_API.maximize();
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <button onClick={handleClick} className={`cursor-pointer ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
