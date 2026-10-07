"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { TechStackIcon } from "./TechStackIcon";
import { ArrowUpRight } from "lucide-react";
import { BrowserMockup } from "./BrowserMockup";
import { TiltCard } from "@/components/interactive/TiltCard";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-cursor="VIEW"
      className="group block h-full"
    >
      <TiltCard
        maxTilt={5}
        className="flex h-full flex-col rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:border-brand-glow/40 hover:shadow-2xl hover:shadow-black/5"
      >
        {/* Thumbnail Area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-surface/40">
          <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <BrowserMockup 
              imageSrc={project.thumbnail}
              mobileImageSrc={project.mobileThumbnail}
              alt={project.title} 
              priority={index < 2} 
            />
          </div>
          {/* Subtle vignette overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-brand opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[0.62rem] text-muted-foreground font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-4 bg-border"></span>
            <span className="font-display text-[0.65rem] uppercase tracking-widest text-brand-glow font-bold">
              {project.tagline}
            </span>
          </div>
          
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground mb-2 group-hover:text-brand-glow transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1 leading-relaxed">
            {project.shortDescription}
          </p>
          
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
            {project.techStack.slice(0, 4).map((tech) => (
              <div 
                key={tech} 
                className="flex items-center gap-1.5 rounded-md bg-surface/80 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-surface group-hover:text-foreground"
              >
                <TechStackIcon name={tech} className="h-3 w-3" />
                <span>{tech}</span>
              </div>
            ))}
            {project.techStack.length > 4 && (
              <div className="flex items-center rounded-md bg-surface/80 px-2 py-1 text-xs font-medium text-muted-foreground">
                +{project.techStack.length - 4}
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
