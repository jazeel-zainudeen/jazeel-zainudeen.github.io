"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { TiltCard } from "@/components/interactive/TiltCard";
import { useSound } from "@/components/interactive/SoundEffects";

interface ProjectNavigationProps {
  prevProject: Project;
  nextProject: Project;
}

export function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  const { playHover, playPop } = useSound();

  return (
    <div className="border-t border-border/80 pt-16 mt-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">
            Explore More Work
          </span>
          <h3 className="font-display text-2xl font-bold text-foreground">
            Continue Journey
          </h3>
        </div>
        <Link
          href="/portfolio"
          onMouseEnter={playHover}
          onClick={playPop}
          data-cursor="ALL"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          View All Systems →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Project Card */}
        <Link
          href={`/portfolio/${prevProject.slug}`}
          onMouseEnter={playHover}
          onClick={playPop}
          data-cursor="PREV"
          className="group block"
        >
          <TiltCard
            maxTilt={4}
            className="flex h-full flex-col sm:flex-row items-center gap-5 rounded-2xl border border-border/80 bg-surface/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-brand-glow/40 hover:bg-surface/70 hover:shadow-xl hover:shadow-black/5"
          >
            <div className="relative aspect-[16/10] w-full sm:w-36 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <Image
                src={prevProject.thumbnail}
                alt={prevProject.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 150px"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-brand-glow" />
                <span className="font-medium uppercase tracking-wider text-[0.68rem]">Previous</span>
              </div>
              <h4 className="font-display text-base font-bold text-foreground truncate group-hover:text-brand-glow transition-colors">
                {prevProject.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {prevProject.tagline}
              </p>
            </div>
          </TiltCard>
        </Link>

        {/* Next Project Card */}
        <Link
          href={`/portfolio/${nextProject.slug}`}
          onMouseEnter={playHover}
          onClick={playPop}
          data-cursor="NEXT"
          className="group block"
        >
          <TiltCard
            maxTilt={4}
            className="flex h-full flex-col sm:flex-row items-center gap-5 rounded-2xl border border-border/80 bg-surface/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-brand-glow/40 hover:bg-surface/70 hover:shadow-xl hover:shadow-black/5"
          >
            <div className="flex flex-1 flex-col justify-center min-w-0 order-2 sm:order-1 text-left sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-muted-foreground mb-1">
                <span className="font-medium uppercase tracking-wider text-[0.68rem]">Next Project</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-brand-glow" />
              </div>
              <h4 className="font-display text-base font-bold text-foreground truncate group-hover:text-brand-glow transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {nextProject.tagline}
              </p>
            </div>

            <div className="relative aspect-[16/10] w-full sm:w-36 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/30 order-1 sm:order-2">
              <Image
                src={nextProject.thumbnail}
                alt={nextProject.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 150px"
              />
            </div>
          </TiltCard>
        </Link>
      </div>
    </div>
  );
}
