"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Lock,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { useSound } from "@/components/interactive/SoundEffects";

interface InteractiveProjectShowcaseProps {
  imageSrc: string;
  alt: string;
  previewUrl?: string;
  githubUrl?: string;
  title: string;
}

export function InteractiveProjectShowcase({
  imageSrc,
  alt,
  previewUrl,
  title,
}: InteractiveProjectShowcaseProps) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const { playHover, playPop } = useSound();

  // Extract display host/domain for the mock address bar
  const displayHost = previewUrl
    ? previewUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "local.enterprise-system.internal";

  // Handle ESC key to exit fullscreen lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
        playPop();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, playPop]);

  // Lock background scroll when fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullscreen]);

  const scrollToTop = () => {
    playPop();
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="group relative w-full rounded-2xl border border-border/80 bg-surface/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-brand-glow/40 hover:shadow-black/10">
        {/* Interactive Top Browser Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-3 bg-surface/80 rounded-t-2xl">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
              title="Window Close"
              onClick={playPop}
            />
            <span
              className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
              title="Window Minimize"
              onClick={playPop}
            />
            <span
              className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
              title="Expand Full View"
              onClick={() => {
                playPop();
                setIsFullscreen(true);
              }}
            />
          </div>

          {/* Interactive URL Address Bar */}
          <div className="order-3 sm:order-2 flex flex-1 items-center justify-center min-w-[200px] max-w-md mx-auto">
            <div className="flex w-full items-center justify-between rounded-full border border-border/70 bg-background/80 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur-md">
              <div className="flex items-center gap-2 truncate">
                <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="truncate font-mono text-[0.72rem] select-all">
                  https://{displayHost}
                </span>
              </div>
              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playPop}
                  title="Open live website in new tab"
                  className="ml-2 text-muted-foreground hover:text-brand-glow transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Interactive Action Controls */}
          <div className="order-2 sm:order-3 flex items-center gap-2">
            {/* Auto-Scroll Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playPop();
                setIsAutoScrolling((prev) => !prev);
              }}
              onMouseEnter={playHover}
              className={`flex h-7 items-center gap-1.5 rounded-md border border-border/70 px-2.5 text-xs font-medium transition-colors ${
                isAutoScrolling
                  ? "bg-brand/10 text-brand-glow border-brand/30"
                  : "bg-background/60 text-muted-foreground hover:text-foreground"
              }`}
              title={isAutoScrolling ? "Pause auto-scroll" : "Resume auto-scroll"}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span className="hidden sm:inline">Auto-Scroll</span>
                </>
              )}
            </button>

            {/* Fullscreen Expand Lightbox Button */}
            <button
              type="button"
              onClick={() => {
                playPop();
                setIsFullscreen(true);
              }}
              onMouseEnter={playHover}
              className="flex h-7 items-center gap-1.5 rounded-md border border-border/70 bg-background/60 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              title="Expand Full View"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Expand</span>
            </button>
          </div>
        </div>

        {/* Viewport Display Area (16:10 Desktop Window) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative aspect-[16/10] md:aspect-video w-full overflow-hidden rounded-b-2xl bg-background/95 [container-type:size]"
        >
          {/* Scrolling Image Layer */}
          <div
            className="absolute inset-x-0 top-0 w-full animate-scroll-up-down"
            style={{
              animationPlayState: isHovered || !isAutoScrolling ? "paused" : "running",
            }}
          >
            <Image
              src={imageSrc}
              alt={alt}
              width={1400}
              height={4500}
              className="w-full h-auto object-top select-none"
              priority
              unoptimized
            />
          </div>

          {/* Micro-interaction Hint pill */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 py-1 text-[0.68rem] font-medium text-muted-foreground backdrop-blur-md shadow-sm transition-opacity duration-300 group-hover:opacity-100 opacity-60">
            <Sparkles className="h-3 w-3 text-brand-glow animate-pulse" />
            <span>Hover to pause · Click Expand for full scroll</span>
          </div>

          {/* Quick Live Preview Floating CTA on hover */}
          {previewUrl && (
            <div className="absolute right-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playPop}
                data-cursor="VISIT"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-xl hover:bg-brand-glow hover:shadow-brand-glow/20 transition-all active:scale-95"
              >
                <span>Live Preview</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Immersive Lightbox Modal with Native Scroll */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-[100000] flex flex-col h-screen w-screen bg-background/98 backdrop-blur-2xl animate-in fade-in duration-200"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Fullscreen Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/80 px-6 bg-surface/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-glow animate-pulse" />
              <h3 className="font-display text-sm sm:text-base font-semibold text-foreground truncate max-w-[260px] sm:max-w-md">
                {title} <span className="text-muted-foreground font-normal">· Architecture Preview</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playPop}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-brand-glow hover:text-brand-foreground transition-all"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              <button
                type="button"
                onClick={scrollToTop}
                onMouseEnter={playHover}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
                title="Scroll back to top"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Top</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  setIsFullscreen(false);
                }}
                onMouseEnter={playHover}
                className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:bg-brand-glow transition-all"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Close (ESC)</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Scrollable Body: min-h-0 and data-lenis-prevent allow native wheel/touch scroll */}
          <div
            ref={modalScrollRef}
            data-lenis-prevent
            className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain p-4 sm:p-8 md:p-12"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            <div className="mx-auto max-w-5xl rounded-2xl border border-border/70 bg-surface/30 shadow-2xl overflow-hidden mb-12">
              <Image
                src={imageSrc}
                alt={alt}
                width={1600}
                height={6000}
                className="w-full h-auto object-top select-none"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
