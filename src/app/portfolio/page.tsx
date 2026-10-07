import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { TawkButton } from "@/components/ui/TawkButton";
import { TiltCard } from "@/components/interactive/TiltCard";
import { Magnetic } from "@/components/interactive/Magnetic";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Jazeel Zainudeen",
  description:
    "A showcase of my recent production systems spanning custom ERP platforms, HRMS dashboards, e-commerce architectures, and cloud APIs.",
};

export default function PortfolioListingPage() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation with Generous Separation */}
        <div className="mb-10 sm:mb-12">
          <Magnetic strength={0.25}>
            <Link
              href="/"
              data-cursor="BACK"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-md transition-all hover:border-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </Magnetic>
        </div>

        {/* Spacious Header Section */}
        <div className="mb-14 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-border/60">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1.5 w-6 rounded-full bg-brand" />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
                Curated Production Work
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.08]">
              Engineering Portfolio
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A curated selection of robust web and enterprise applications I&apos;ve developed, from multi-store retail ERPs to mission-critical corporate platforms.
            </p>
          </div>

          {/* Clean Metric Badge on the Right */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-surface/50 px-5 py-3 backdrop-blur-md shadow-xs">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left">
                <div className="font-mono text-xs font-semibold text-foreground">6 PRODUCTION SYSTEMS</div>
                <div className="text-[0.68rem] text-muted-foreground">Architected · Deployed · Scaled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}

          {/* Blurred "More Projects" Card */}
          <TiltCard maxTilt={5}>
            <div className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-dashed border-border/80 bg-surface/30 transition-all hover:bg-surface/50 hover:border-brand/40 cursor-default">
              {/* Blurred Background Skeleton */}
              <div className="absolute inset-0 pointer-events-none select-none opacity-20 filter blur-[3px] transition-opacity duration-300 group-hover:opacity-35">
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
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-background/90 backdrop-blur-md shadow-md border border-border/70 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-brand group-hover:border-brand/40 group-hover:shadow-xl">
                  <span className="text-2xl font-light leading-none">+</span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground mb-2">
                  And Private Internal Systems
                </h3>
                <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
                  Several ERP, logistics, and healthcare codebases are governed by non-disclosure agreements.
                </p>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* CTA Section */}
        <div className="mt-28 rounded-3xl bg-surface/60 px-6 py-16 text-center sm:px-12 border border-border/70 shadow-sm relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Have a custom requirement in mind?
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground mb-8 leading-relaxed">
            Whether you need a dedicated full stack developer or a custom web application architected from scratch, let&apos;s talk scope.
          </p>
          <div className="flex justify-center">
            <Magnetic strength={0.3}>
              <TawkButton
                data-cursor="HELLO"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-background shadow-lg transition-all hover:bg-brand-glow active:scale-95"
              >
                <span>Start a conversation</span>
                <ArrowRight className="h-4 w-4" />
              </TawkButton>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}
