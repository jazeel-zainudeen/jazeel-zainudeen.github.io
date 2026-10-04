import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 as Github, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { ImageCarousel } from "@/components/portfolio/ImageCarousel";
import { ScrollingImagePreview } from "@/components/portfolio/ScrollingImagePreview";
import { TechStackIcon } from "@/components/portfolio/TechStackIcon";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Jazeel`,
    description: project.shortDescription,
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {project.shortDescription}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {project.previewUrl && (
              <a 
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-all hover:bg-brand-glow hover:-translate-y-0.5 active:scale-95"
              >
                <ExternalLink className="h-4 w-4" />
                Live Preview
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-surface-2 hover:-translate-y-0.5 active:scale-95"
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Media Showcase */}
        <div className="mb-16">
          {project.scrollingPreview ? (
            <ScrollingImagePreview imageSrc={project.scrollingPreview} alt={project.title} />
          ) : (
            <ImageCarousel images={project.images} alt={project.title} />
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                About the Project
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
                <p className="whitespace-pre-wrap">{project.detailedDescription}</p>
              </div>
            </section>

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Key Features
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges && (
              <section className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Challenges & Solutions
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {project.challenges}
                </p>
              </section>
            )}
            
            {project.lessonsLearned && (
              <section className="rounded-2xl border border-border bg-brand/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Lessons Learned
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {project.lessonsLearned}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar / Meta Column */}
          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                Project Info
              </h3>
              
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">My Role</dt>
                  <dd className="font-medium text-foreground">{project.role}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                Technologies Used
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <div 
                    key={tech} 
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm"
                  >
                    <TechStackIcon name={tech} className="h-4 w-4 text-brand" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
