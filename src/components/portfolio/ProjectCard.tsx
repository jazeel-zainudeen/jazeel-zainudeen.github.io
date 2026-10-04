import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { TechStackIcon } from "./TechStackIcon";
import { ArrowUpRight } from "lucide-react";
import { BrowserMockup } from "./BrowserMockup";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5">
        {/* Thumbnail Area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <BrowserMockup 
            imageSrc={project.thumbnail}
            mobileImageSrc={project.mobileThumbnail}
            alt={project.title} 
            priority={index < 2} 
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-brand opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[0.62rem] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-4 bg-border"></span>
            <span className="font-display text-[0.65rem] uppercase tracking-widest text-brand-glow font-semibold">
              {project.tagline}
            </span>
          </div>
          
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground mb-2 group-hover:text-brand-glow transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
            {project.shortDescription}
          </p>
          
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
            {project.techStack.slice(0, 4).map((tech) => (
              <div 
                key={tech} 
                className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-xs font-medium text-muted-foreground"
              >
                <TechStackIcon name={tech} className="h-3 w-3" />
                <span>{tech}</span>
              </div>
            ))}
            {project.techStack.length > 4 && (
              <div className="flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-muted-foreground">
                +{project.techStack.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
