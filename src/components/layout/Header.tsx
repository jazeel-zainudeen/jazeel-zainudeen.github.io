"use client";

import Image from "next/image";
import Link from "next/link";
import { TawkButton } from "@/components/ui/TawkButton";
import { useState, useEffect } from "react";
import { Magnetic } from "@/components/interactive/Magnetic";
import { RollingText } from "@/components/interactive/RollingText";
import { SoundToggle, useSound } from "@/components/interactive/SoundEffects";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const { playHover, playPop } = useSound();

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const val = mobileMenuOpen ? "hidden" : "";
    document.body.style.overflow = val;
    document.documentElement.style.overflow = val;
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-300 ${
          headerScrolled
            ? "top-2 sm:top-3 pointer-events-none"
            : "top-0 bg-transparent border-none"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ${
            headerScrolled
              ? `pointer-events-auto h-12 max-w-[calc(100%-1.5rem)] rounded-full border border-border/80 px-4 shadow-lg backdrop-blur-xl sm:max-w-[calc(100%-2rem)] md:max-w-6xl ${
                  mobileMenuOpen ? "bg-background/95" : "bg-background/85"
                }`
              : `h-14 max-w-full px-4 sm:h-16 sm:px-6 md:max-w-[88rem] md:px-8 border-none bg-transparent backdrop-blur-none shadow-none ${
                  mobileMenuOpen ? "bg-background/95 backdrop-blur-xl" : ""
                }`
          }`}
        >
          {/* Logo with magnetic pull */}
          <Magnetic strength={0.25}>
            <Link
              href="/"
              onMouseEnter={playHover}
              onClick={playPop}
              data-cursor="HOME"
              className="group flex items-center gap-2.5 font-display text-sm font-bold tracking-tight md:text-base"
            >
              <div className="relative overflow-hidden rounded-full border border-border p-0.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-foreground">
                <Image
                  src="/assets/brand/logo.webp"
                  alt="Jazeel"
                  width={32}
                  height={32}
                  priority
                  sizes="32px"
                  className="h-6 w-6 rounded-full object-cover md:h-7 md:w-7"
                />
              </div>
              <span className="tracking-tight">
                Jazeel
                <span className="text-brand-glow font-medium transition-colors group-hover:text-foreground">
                  .dev
                </span>
              </span>
            </Link>
          </Magnetic>

          {/* Desktop Navigation with Rolling Text & Sound */}
          <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
            <Link
              href="/#services"
              onMouseEnter={playHover}
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RollingText text="What I do" />
            </Link>
            <Link
              href="/#about"
              onMouseEnter={playHover}
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RollingText text="About" />
            </Link>
            <Link
              href="/#process"
              onMouseEnter={playHover}
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RollingText text="Process" />
            </Link>
            <Link
              href="/portfolio"
              onMouseEnter={playHover}
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-brand"
            >
              <RollingText text="Work" />
            </Link>
            <Link
              href="/#faq"
              onMouseEnter={playHover}
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RollingText text="FAQ" />
            </Link>
          </nav>

          {/* Right Actions: Sound Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <SoundToggle />

            <Link
              href="/portfolio"
              onMouseEnter={playHover}
              className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-all hover:text-brand"
            >
              <RollingText text="Portfolio" />
            </Link>

            <Magnetic strength={0.3}>
              <TawkButton
                onMouseEnter={playHover}
                onClick={playPop}
                data-cursor="HELLO"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-background transition-all hover:bg-brand-glow hover:shadow-lg active:scale-95"
              >
                <span>Say hello</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
              </TawkButton>
            </Magnetic>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2.5 md:hidden">
            <SoundToggle />

            <Link
              href="/portfolio"
              className="font-display text-[0.65rem] font-semibold uppercase tracking-wider text-foreground hover:text-brand"
            >
              Portfolio
            </Link>

            <TawkButton
              className="inline-flex items-center rounded-full bg-brand px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-wider text-brand-foreground shadow-sm"
            >
              Hello
            </TawkButton>

            <button
              onClick={() => {
                playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="cursor-pointer flex items-center justify-center p-1.5 text-foreground rounded-full border border-border bg-surface active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <path d="M4 6h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop + Overlay */}
        <div
          className={`fixed inset-0 z-[-1] bg-black/15 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`mx-auto mt-2 max-w-[calc(100%-1.5rem)] rounded-2xl border border-border bg-background/98 p-4 backdrop-blur-2xl md:hidden shadow-2xl transition-all duration-300 origin-top ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-code-2 text-brand-glow"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
                <span className="font-mono text-[0.62rem] text-muted-foreground">01</span>
              </div>
              <div className="mt-4">
                <span className="block font-display text-xs font-bold text-foreground">What I do</span>
                <span className="text-[0.65rem] text-muted-foreground">Services &amp; Stack</span>
              </div>
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user text-brand-glow"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="font-mono text-[0.62rem] text-muted-foreground">02</span>
              </div>
              <div className="mt-4">
                <span className="block font-display text-xs font-bold text-foreground">About</span>
                <span className="text-[0.65rem] text-muted-foreground">5+ Yrs Experience</span>
              </div>
            </Link>

            <Link
              href="/#process"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-workflow text-brand-glow"
                >
                  <rect width="8" height="8" x="3" y="3" rx="2" />
                  <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                  <rect width="8" height="8" x="13" y="13" rx="2" />
                </svg>
                <span className="font-mono text-[0.62rem] text-muted-foreground">03</span>
              </div>
              <div className="mt-4">
                <span className="block font-display text-xs font-bold text-foreground">Process</span>
                <span className="text-[0.65rem] text-muted-foreground">How I work</span>
              </div>
            </Link>

            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-briefcase text-brand-glow"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span className="font-mono text-[0.62rem] text-muted-foreground">04</span>
              </div>
              <div className="mt-4">
                <span className="block font-display text-xs font-bold text-foreground">Work</span>
                <span className="text-[0.65rem] text-muted-foreground">Selected Projects</span>
              </div>
            </Link>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-1 items-center justify-between rounded-xl border border-border/60 bg-surface/40 px-3.5 py-2.5 font-display text-xs font-semibold text-foreground transition-all hover:bg-surface"
            >
              <span>FAQ</span>
              <span className="font-mono text-[0.62rem] text-muted-foreground">05</span>
            </Link>
            <a
              href="https://wa.me/918086482422"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-brand/10 border border-brand/20 px-3.5 py-2.5 font-display text-xs font-bold text-brand-glow transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[0.68rem] text-muted-foreground font-display">
            <span>Kerala, India - Remote</span>
            <span className="flex items-center gap-1.5 text-brand-glow font-semibold">
              <span className="size-1.5 rounded-full bg-brand-glow animate-pulse"></span>
              Open for work
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
