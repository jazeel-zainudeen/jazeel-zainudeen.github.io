import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { TawkButton } from "@/components/ui/TawkButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Jazeel",
  description: "A showcase of my recent projects, spanning web, mobile, and IoT.",
};

export default function PortfolioListingPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-2xl">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Selected Work
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A collection of robust, scalable applications I&apos;ve built across ERP, CRM, mobile, and IoT domains. 
          </p>
        </div>

        {/* Filter/Tags (Optional, can expand later) */}
        <div className="mt-12 flex flex-wrap gap-3 pb-4 border-b border-border">
          <button className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-brand-foreground transition-colors">
            All Projects
          </button>
          <button className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
            Web Apps
          </button>
          <button className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
            Mobile
          </button>
        </div>

        {/* Grid Section */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}

          {/* Blurred "More Projects" Card */}
          <div className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-dashed border-border/60 bg-surface/20 transition-all hover:bg-surface/40 hover:border-brand/30 cursor-default">
            {/* Blurred Background Skeleton */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-20 filter blur-[4px] transition-all duration-500 group-hover:blur-[2px] group-hover:opacity-30">
              <div className="relative aspect-[4/3] w-full bg-muted/60" />
              <div className="flex flex-1 flex-col p-6">
                <div className="h-2 w-12 rounded-full bg-foreground/20 mb-4" />
                <div className="h-5 w-3/4 rounded-md bg-foreground/30 mb-3" />
                <div className="h-3 w-full rounded-md bg-foreground/20 mb-2" />
                <div className="h-3 w-5/6 rounded-md bg-foreground/20 mb-6" />
                <div className="mt-auto flex gap-2 pt-4 border-t border-border/50">
                  <div className="h-6 w-16 rounded-md bg-foreground/20" />
                  <div className="h-6 w-16 rounded-md bg-foreground/20" />
                </div>
              </div>
            </div>
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur-md shadow-sm border border-border/50 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-brand group-hover:border-brand/30 group-hover:shadow-brand/5 group-hover:shadow-lg">
                <span className="text-2xl font-light leading-none">+</span>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground/90 mb-2">
                And Much More
              </h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">
                Showcasing selected work. Other projects are private or coming soon.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 rounded-3xl bg-surface px-6 py-16 text-center sm:px-12 border border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4">
            Let&apos;s build something great together.
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground mb-8">
            Whether you need a full enterprise system from scratch or specialized features for your existing app, I can help.
          </p>
          <TawkButton
            className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-foreground shadow-lg transition-all hover:bg-brand-glow hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            Start a Conversation
          </TawkButton>
        </div>

      </div>
    </div>
  );
}
