"use client";

import { useState } from "react";
import { ExternalLink, Code2 as Github, Share2, Check } from "lucide-react";
import { Magnetic } from "@/components/interactive/Magnetic";
import { useSound } from "@/components/interactive/SoundEffects";

interface ProjectHeaderActionsProps {
  previewUrl?: string;
  githubUrl?: string;
  title: string;
}

export function ProjectHeaderActions({
  previewUrl,
  githubUrl,
  title,
}: ProjectHeaderActionsProps) {
  const [copied, setCopied] = useState(false);
  const { playHover, playPop } = useSound();

  const handleShare = async () => {
    playPop();
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${title} | Jazeel Zainudeen`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {previewUrl && (
        <Magnetic strength={0.3}>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playPop}
            data-cursor="VISIT"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-background shadow-md transition-all hover:bg-brand-glow hover:shadow-xl active:scale-95"
          >
            <span>Live Preview</span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Magnetic>
      )}

      {githubUrl && (
        <Magnetic strength={0.25}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playPop}
            data-cursor="CODE"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-md transition-all hover:bg-surface-2 hover:border-foreground/40 active:scale-95"
          >
            <Github className="h-3.5 w-3.5" />
            <span>Source Code</span>
          </a>
        </Magnetic>
      )}

      {/* Share Button */}
      <Magnetic strength={0.2}>
        <button
          type="button"
          onClick={handleShare}
          onMouseEnter={playHover}
          aria-label="Share project link"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface/80 text-muted-foreground backdrop-blur-md transition-all hover:border-foreground hover:text-foreground active:scale-95 cursor-pointer"
          title="Share / Copy Link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500 animate-in zoom-in-75 duration-150" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </button>
      </Magnetic>
    </div>
  );
}
