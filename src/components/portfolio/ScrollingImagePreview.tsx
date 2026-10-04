"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ScrollingImagePreviewProps {
  imageSrc: string;
  alt: string;
  previewUrl?: string;
}

export function ScrollingImagePreview({ imageSrc, alt, previewUrl }: ScrollingImagePreviewProps) {
  return (
    <div className="group relative w-full rounded-2xl border border-border/60 bg-surface/30 p-2 shadow-2xl md:p-4">
      {/* Browser Top Bar Mockup */}
      <div className="mb-3 flex items-center gap-1.5 px-2 md:mb-4 md:px-0">
        <div className="size-2.5 rounded-full bg-red-400/80 md:size-3"></div>
        <div className="size-2.5 rounded-full bg-amber-400/80 md:size-3"></div>
        <div className="size-2.5 rounded-full bg-green-400/80 md:size-3"></div>
      </div>

      {/* Scrolling Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/40 bg-background md:aspect-video [container-type:size]">
        <div className="absolute inset-x-0 top-0 w-full animate-scroll-up-down">
          <Image
            src={imageSrc}
            alt={alt}
            width={1200}
            height={4000}
            className="w-full h-auto object-top"
            priority
            unoptimized // Useful for very long screenshots to prevent next/image height clipping
          />
        </div>

        {/* Hover Overlay */}
        {previewUrl && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <ExternalLink className="h-5 w-5" />
              Live Preview
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
