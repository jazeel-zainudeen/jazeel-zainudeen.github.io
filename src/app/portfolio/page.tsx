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
