import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  MessageCircle,
  Mail,
} from "lucide-react";
import { InteractiveProjectShowcase } from "@/components/portfolio/InteractiveProjectShowcase";
import { ProjectHeaderActions } from "@/components/portfolio/ProjectHeaderActions";
import { ProjectNavigation } from "@/components/portfolio/ProjectNavigation";
import { TechStackIcon } from "@/components/portfolio/TechStackIcon";
import { TiltCard } from "@/components/interactive/TiltCard";
import { Magnetic } from "@/components/interactive/Magnetic";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Jazeel Zainudeen`,
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
  const currentIndex = projectsData.findIndex((p) => p.slug === resolvedParams.slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject =
    projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Interactive Header Actions (Back button & Share & Live links) */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <ProjectHeaderActions
              previewUrl={project.previewUrl}
              githubUrl={project.githubUrl}
              title={project.title}
            />

            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-1.5 w-6 rounded-full bg-brand" />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
                {project.tagline}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Interactive Media Showcase Workstation */}
        <div className="mb-16">
          <InteractiveProjectShowcase
            imageSrc={project.scrollingPreview || project.thumbnail}
            alt={project.title}
            previewUrl={project.previewUrl}
            githubUrl={project.githubUrl}
            title={project.title}
          />
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* About The Project */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-brand-glow" />
                <span>Architecture & Overview</span>
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-wrap text-base">
                  {project.detailedDescription}
                </p>
              </div>
            </section>

            {/* Key Features with Interactive Glow Cards */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-brand-glow" />
                  <span>Key Deliverables & Features</span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-1">
                  {project.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-3.5 rounded-xl border border-border/80 bg-surface/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-brand-glow/40 hover:bg-surface/70 hover:shadow-md"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-glow transition-transform group-hover:scale-110">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Engineering Solutions */}
            {project.challenges && (
              <section>
                <TiltCard maxTilt={3}>
                  <div className="rounded-2xl border border-border/80 bg-surface/50 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-amber-500/40 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                        Challenges & Solutions
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {project.challenges}
                    </p>
                  </div>
                </TiltCard>
              </section>
            )}

            {/* Lessons Learned */}
            {project.lessonsLearned && (
              <section>
                <TiltCard maxTilt={3}>
                  <div className="rounded-2xl border border-border/80 bg-brand/5 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-brand-glow/40 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-glow">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                        Architectural Insights
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {project.lessonsLearned}
                    </p>
                  </div>
                </TiltCard>
              </section>
            )}
          </div>

          {/* Sticky Sidebar / Project Metadata */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Project Specs Card */}
            <div className="rounded-2xl border border-border/80 bg-surface/60 p-6 backdrop-blur-xl shadow-sm">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-brand-glow" />
                <span>System Specs</span>
              </h3>

              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Platform Category
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {project.tagline}
                  </dd>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Deployment Status
                  </dt>
                  <dd className="flex items-center gap-2 text-foreground font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Production Verified</span>
                  </dd>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Role & Scope
                  </dt>
                  <dd className="text-foreground font-medium">
                    Architecture · Full Stack Engineering
                  </dd>
                </div>
              </dl>
            </div>

            {/* Interactive Technologies Used */}
            <div className="rounded-2xl border border-border/80 bg-surface/60 p-6 backdrop-blur-xl shadow-sm">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-brand-glow" />
                <span>Technologies</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <div
                    key={tech}
                    data-cursor="TECH"
                    className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all hover:border-brand-glow/50 hover:bg-surface hover:-translate-y-0.5"
                  >
                    <TechStackIcon name={tech} className="h-3.5 w-3.5 text-brand-glow" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Discussion Card */}
            <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-surface/80 to-surface/40 p-6 backdrop-blur-xl">
              <h4 className="font-display text-sm font-bold text-foreground mb-2">
                Need similar architecture?
              </h4>
              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                Whether scaling an enterprise ERP or bootstrapping high-load web APIs, let&apos;s evaluate your technical scope.
              </p>
              <div className="flex flex-col gap-2.5">
                <Magnetic strength={0.25} className="w-full">
                  <a
                    href={`https://wa.me/918086482422?text=${encodeURIComponent(`Hi Jazeel, I would like to discuss building a system similar to ${project.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="CHAT"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-background shadow-md transition-all hover:bg-brand-glow active:scale-95"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2} className="w-full">
                  <a
                    href={`mailto:zainudheenjazeel@gmail.com?subject=${encodeURIComponent(`Project Scope: ${project.title}`)}&body=${encodeURIComponent(`Hi Jazeel,\n\nI was looking at ${project.title} on your portfolio and would like to discuss a project with similar architecture.\n\nBest regards,`)}`}
                    data-cursor="EMAIL"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:text-foreground hover:border-foreground/40"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Direct Email</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Previous / Next Project Navigator */}
        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
      </div>
    </div>
  );
}
