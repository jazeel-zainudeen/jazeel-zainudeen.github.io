"use client";

import React from "react";

interface TawkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface TawkWindow extends Window {
  Tawk_API?: {
    maximize?: () => void;
  };
}

export function TawkButton({ children, className, onClick, ...props }: TawkButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    // Check if Tawk is loaded and available
    const win = typeof window !== "undefined" ? (window as unknown as TawkWindow) : null;
    if (win?.Tawk_API?.maximize) {
      try {
        win.Tawk_API.maximize();
        return;
      } catch (err) {
        console.warn("Tawk maximize error", err);
      }
    }

    // If on homepage, smoothly scroll down to the contact inquiry section
    if (window.location.pathname === "/") {
      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Direct fallback to WhatsApp so user can initiate chat immediately without losing their place
    window.open(
      "https://wa.me/918086482422?text=" + encodeURIComponent("Hi Jazeel, I would like to discuss a project requirement."),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button onClick={handleClick} className={`cursor-pointer ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
