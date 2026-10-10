"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TawkButton } from "@/components/ui/TawkButton";
import { HeroWebGL } from "@/components/interactive/HeroWebGL";
import { Magnetic } from "@/components/interactive/Magnetic";
import { TiltCard } from "@/components/interactive/TiltCard";
import { CounterNumber } from "@/components/interactive/CounterNumber";
import { KineticMarquee } from "@/components/interactive/KineticMarquee";
import { LiveStatusClock } from "@/components/interactive/LiveStatusClock";
import { useSound } from "@/components/interactive/SoundEffects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projectsData } from "@/data/projects";
import { ArrowUpRight, ArrowRight, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const servicesData = [
  {
    num: "01",
    title: "ERP Development",
    description:
      "Custom ERP development services tailored to inventory, finance, manufacturing and operations workflows.",
    benefits: [
      "Unified data across departments",
      "Real-time reporting & metrics",
      "Scales seamlessly with your business",
    ],
    solves:
      "Replaces spreadsheets, disconnected tools and slow manual processes.",
    colSpan: "lg:col-span-2",
  },
  {
    num: "02",
    title: "CRM Development",
    description:
      "Bespoke CRM development from a focused software architect - built around your sales pipeline, not rigid templates.",
    benefits: [
      "360° customer & deal view",
      "Automated lead follow-ups",
      "Custom analytics & reporting",
    ],
    solves: "Lost leads, zero pipeline visibility, teams trapped in email.",
    colSpan: "",
  },
  {
    num: "03",
    title: "HRMS Development",
    description:
      "HRMS software development covering attendance, payroll, leave management, performance metrics and employee portals.",
    benefits: [
      "Payroll & attendance in one place",
      "Employee self-service dashboard",
      "Compliance-ready reporting",
    ],
    solves: "Manual HR ops, payroll errors, scattered employee data.",
    colSpan: "",
  },
  {
    num: "04",
    title: "Web App Maintenance",
    description:
      "Reliable web application maintenance and continuous software engineering - bug fixes, security patches and uptime support.",
    benefits: [
      "Predictable monthly retainers",
      "Performance & security audits",
      "Fast response SLA guarantees",
    ],
    solves: "Aging codebases, broken features, no dedicated dev on call.",
    colSpan: "",
  },
  {
    num: "05",
    title: "Legacy App Modernization",
    description:
      "Transform legacy monoliths into high-performance, modern Next.js + React + Cloud architectures with zero downtime.",
    benefits: [
      "Blazing UI / UX performance",
      "Cloud-native & Serverless",
      "Drastically reduced infrastructure cost",
    ],
    solves: "Outdated stacks, security vulnerabilities, vanished vendors.",
    colSpan: "",
  },
  {
    num: "06",
    title: "Dedicated Full Stack Engineer",
    description:
      "Hire a remote senior engineer on a dedicated monthly retainer - direct communication, embedded in your git repository.",
    benefits: [
      "Full-time or part-time sprints",
      "Async communication + standups",
      "Zero agency bloat or markups",
    ],
    solves: "Need consistent development velocity without hiring full-time.",
    colSpan: "lg:col-span-2",
  },
];

const whyWorkWithMeData = [
  {
    num: "01",
    title: "Five years in production",
    description:
      "Architected and shipped production systems across ERP, CRM, HRMS, and IoT-driven platforms.",
  },
  {
    num: "02",
    title: "Workflow first, code second",
    description:
      "I start from how real teams actually work day-to-day, not from an abstract feature checklist.",
  },
  {
    num: "03",
    title: "I stick around long-term",
    description:
      "Most systems I engineer, I continue maintaining and scaling long after the initial deployment.",
  },
  {
    num: "04",
    title: "Rock-solid foundations",
    description:
      "Next.js + React + TypeScript architectures engineered to thrive under load rather than buckle.",
  },
  {
    num: "05",
    title: "Direct developer access",
    description:
      "You collaborate directly with the architect writing your code. No middle managers or translators.",
  },
  {
    num: "06",
    title: "Zero fluff, radical honesty",
    description:
      "Clear feedback, realistic timelines, measurable deliverables, and zero technical jargon.",
  },
];

const faqData: FAQItem[] = [
  {
    question: "What types of applications do you build?",
    answer:
      "I specialize in custom Enterprise Software (ERP, CRM, HRMS platforms), modern SaaS web applications, customer-facing portals, real-time dashboards, and REST API integrations.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A fast MVP or specialized web application feature usually takes 2 to 4 weeks. Comprehensive ERP, CRM or enterprise platform developments range from 6 to 12 weeks depending on scope, module depth, and integration needs.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Custom business software development is priced by scope - small internal tools typically start in the low thousands USD, while full ERP, CRM or HRMS builds are scoped after a discovery call. You'll get a clear fixed quote or milestone-based proposal before any work starts. Monthly maintenance retainers are also available.",
  },
  {
    question: "Do you provide software maintenance?",
    answer:
      "Yes. Web application maintenance and software maintenance services are a core part of what I offer - bug fixes, security patches, performance work, feature additions and uptime monitoring on predictable monthly retainers.",
  },
  {
    question: "Can you work with existing applications?",
    answer:
      "Absolutely. I regularly take over existing React, Next.js, Node.js, and legacy codebases - including legacy application modernization, refactors, and adding new modules without breaking what already works.",
  },
  {
    question: "Do you provide dedicated developer services?",
    answer:
      "Yes - you can hire me as a dedicated remote software developer on a part-time or full-time monthly basis, working directly inside your team, tools and roadmap.",
  },
  {
    question: "How do you communicate with clients?",
    answer:
      "Direct and async-first. WhatsApp, email, Slack or your preferred tool, with scheduled weekly demos, written updates and a shared task board. No account managers between you and the person writing the code.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Primary stack: Next.js, React, TypeScript, Node.js, Tailwind CSS, PostgreSQL, REST & GraphQL APIs, plus Payload CMS and Laravel where required. The right choice depends on your existing systems and long-term goals - I recommend based on fit and performance.",
  },
];

const processData = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "Understand your business workflows, current software stack, pain points, and strategic goals.",
  },
  {
    step: "02",
    title: "Requirement Architecture",
    description:
      "Map out data models, user roles, security constraints, third-party integrations, and milestone roadmap.",
  },
  {
    step: "03",
    title: "Engineering Plan",
    description:
      "Transparent fixed quote or milestone scope with documented timeline commitments.",
  },
  {
    step: "04",
    title: "Iterative Sprints",
    description:
      "Continuous delivery with weekly playable demos and frequent feedback loops.",
  },
  {
    step: "05",
    title: "UAT & Deployment",
    description:
      "Rigorous quality assurance, end-to-end testing, zero-downtime cloud deployment, and team onboarding.",
  },
  {
    step: "06",
    title: "Ongoing Evolution",
    description:
      "Proactive monitoring retainers, feature roadmap sprints, and 24/7 uptime SLAs.",
  },
];

const testimonialsData = [
  {
    quote:
      "Jazeel rebuilt our internal production tracking tool from a tangled spreadsheet into a real ERP module. Reporting that used to take a full day now runs in minutes.",
    author: "Operations Director",
    company: "Manufacturing Enterprise",
  },
  {
    quote:
      "Our HRMS revamp was on time, on scope, and the team still maintains it on a monthly retainer. Communication is the best we've had with any developer.",
    author: "Head of Talent",
    company: "Recruitment Agency",
  },
  {
    quote:
      "We needed a logistics dashboard tied into our existing systems. The API work and the React UI were both rock solid - leads now have clear delivery visibility.",
    author: "Founder",
    company: "Logistics Company",
  },
];

const marqueeItems = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Three.js",
  "GSAP",
  "Tailwind CSS",
  "PostgreSQL",
  "Node.js",
  "REST & GraphQL",
  "Cloud APIs",
  "Enterprise ERP",
  "Custom CRM",
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { playPop, playHover } = useSound();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
    projectType: false,
  });

  const handleFaqToggle = (index: number) => {
    playPop();
    setActiveFaq(activeFaq === index ? null : index);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email address";
      }
    } else if (name === "message") {
      if (!value.trim()) {
        error = "Message is required";
      } else if (value.trim().length < 10) {
        error = "Message must be at least 10 characters";
      }
    } else if (name === "phone") {
      if (value.trim() && !/^\+?[0-9\s\-()]{7,20}$/.test(value)) {
        error = "Invalid phone number";
      }
    }
    return error;
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleFormBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    playPop();

    const newTouched = {
      name: true,
      email: true,
      phone: true,
      message: true,
      projectType: true,
    };
    setTouched(newTouched);

    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const phoneError = validateField("phone", formData.phone);
    const messageError = validateField("message", formData.message);

    const errors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError,
      projectType: "",
    };

    setFormErrors(errors);

    if (nameError || emailError || phoneError || messageError) {
      return;
    }

    setFormSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append(
        "access_key",
        "b660d21b-5cb4-4675-9811-a9b09e63c548",
      );
      submissionData.append("subject", `New Inquiry from ${formData.name}`);
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone || "N/A");
      submissionData.append("company", formData.company || "N/A");
      submissionData.append("Project Type", formData.projectType);
      submissionData.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
        setTouched({
          name: false,
          email: false,
          phone: false,
          message: false,
          projectType: false,
        });
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Top 3 featured projects for homepage showcase
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-brand/15">
      <main>
        {/* ============================================================ */}
        {/* Hero Section with Interactive Three.js WebGL Core */}
        {/* ============================================================ */}
        <section
          id="top"
          className="relative min-h-[92vh] flex flex-col justify-between overflow-x-clip pt-20 sm:pt-32 md:pt-36 pb-12"
        >
          {/* Three.js Interactive Particle Polyhedron Canvas */}
          <HeroWebGL />

          <div className="relative z-10 mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8 w-full">
            {/* Top Status Strip with Live IST Clock */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
              <div className="flex items-center gap-3">
                <LiveStatusClock />
                <span className="hidden sm:inline font-mono text-[0.68rem] text-muted-foreground uppercase tracking-widest">
                  AVAILABLE FOR Q2 CONTRACTS
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-3 font-mono text-[0.68rem] text-muted-foreground tracking-widest uppercase">
                <span>FULL STACK ENGINEER</span>
                <span className="text-border">/</span>
                <span>CLOUD ARCHITECT</span>
              </div>
            </div>

            {/* Main Hero Typography & Callout */}
            <div className="grid grid-cols-12 gap-y-10 pt-10 sm:pt-16 md:pt-20 lg:gap-x-12 items-end">
              <div className="col-span-12 lg:col-span-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-8 rounded-full bg-brand" />
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Full Stack Engineer · Next.js &amp; Cloud Architect
                  </span>
                </div>

                <h1 className="font-display text-[2.15rem] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-[3.1rem] xl:text-[3.5rem]">
                  Hi, I&apos;m Jazeel Zainudeen.
                  <br />
                  <span className="text-foreground">
                    Architecting scalable{" "}
                    <span className="relative inline-block text-brand-glow">
                      web applications
                      <span className="absolute bottom-1 left-0 right-0 h-1 bg-brand-glow/20 rounded-full" />
                    </span>
                  </span>{" "}
                  <span className="text-muted-foreground font-normal">
                    &amp; enterprise platforms.
                  </span>
                </h1>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <div className="rounded-2xl border border-border/80 bg-surface/40 p-6 sm:p-7 backdrop-blur-xl shadow-lg shadow-black/5">
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Full stack developer from Kerala, India. For over half a
                    decade, I&apos;ve crafted high-performance ERP, CRM, and
                    cloud architectures, modernized aging stacks, and maintained
                    critical operations long after deployment.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Magnetic strength={0.25} className="w-full sm:w-auto">
                      <a
                        href="#contact"
                        onMouseEnter={playHover}
                        onClick={playPop}
                        data-cursor="CALL"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3.5 font-display text-xs font-semibold tracking-wider text-background shadow-md transition-all hover:bg-brand-glow hover:shadow-xl active:scale-95"
                      >
                        <span>Book discovery call</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Magnetic>

                    <Magnetic strength={0.25} className="w-full sm:w-auto">
                      <a
                        href="https://wa.me/918086482422"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playPop}
                        data-cursor="CHAT"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/90 px-5 py-3.5 font-display text-xs font-semibold tracking-wider text-foreground shadow-sm backdrop-blur-md transition-all hover:border-brand-glow/50 hover:bg-surface active:scale-95"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-500" />
                        <span>WhatsApp</span>
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Stats Row with Animated Number Counters */}
            <div className="mt-14 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <TiltCard maxTilt={5}>
                <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6 backdrop-blur-md transition-colors hover:border-brand-glow/40 hover:bg-surface/80">
                  <span className="font-mono text-xs font-bold text-brand-glow mb-2 block">
                    01 // TENURE
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    <CounterNumber end={5} suffix="+ Yrs" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider font-display">
                    Full Stack Engineering
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5}>
                <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6 backdrop-blur-md transition-colors hover:border-brand-glow/40 hover:bg-surface/80">
                  <span className="font-mono text-xs font-bold text-brand-glow mb-2 block">
                    02 // SHIPPED
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    <CounterNumber end={20} suffix="+ Apps" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider font-display">
                    Production Systems
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5}>
                <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6 backdrop-blur-md transition-colors hover:border-brand-glow/40 hover:bg-surface/80">
                  <span className="font-mono text-xs font-bold text-brand-glow mb-2 block">
                    03 // FOCUS
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    Next.js
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider font-display">
                    React · TS · Cloud APIs
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5}>
                <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6 backdrop-blur-md transition-colors hover:border-brand-glow/40 hover:bg-surface/80">
                  <span className="font-mono text-xs font-bold text-brand-glow mb-2 block">
                    04 // DOMAINS
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    <CounterNumber end={4} suffix=" Sectors" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider font-display">
                    ERP · CRM · HRMS · IoT
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Kinetic Scroll-Velocity Marquee Ribbon */}
        {/* ============================================================ */}
        <section
          aria-label="Core technologies"
          className="relative border-y border-border/80 bg-surface/80 backdrop-blur-md py-2 overflow-hidden"
        >
          <KineticMarquee items={marqueeItems} speed={35} />
        </section>

        {/* ============================================================ */}
        {/* About Section with 3D Image Perspective */}
        {/* ============================================================ */}
        <section
          id="about"
          className="relative bg-surface/40 py-20 sm:py-32 border-y border-border/60"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-glow">
                About The Engineer
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                01 // PROFILE
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-12 pt-12 lg:gap-x-14 items-center">
              <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                <TiltCard
                  maxTilt={8}
                  className="rounded-3xl border border-border/80 bg-card p-3 shadow-2xl transition-all duration-300 hover:shadow-brand-glow/15"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <Image
                      src="/assets/seo/jazeel-zainudeen-profile.jpg"
                      alt="Jazeel Zainudeen, Full Stack Developer"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                      className="object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2 pb-1">
                    <div>
                      <div className="font-display text-sm font-bold text-foreground">
                        Jazeel Zainudeen
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Kerala, India
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-600 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      AVAILABLE
                    </span>
                  </div>
                </TiltCard>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight">
                  Turning complex workflow chaos into dependable code
                </h2>
                <p className="mt-8 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  I&apos;m{" "}
                  <span className="font-semibold text-foreground">
                    Jazeel Zainudeen
                  </span>
                  , a full stack engineer based in Kerala, India. Over the last
                  five years, I&apos;ve engineered enterprise web applications,
                  scalable Cloud APIs, custom ERP platforms, and business
                  automation pipelines that eliminate hundreds of hours of
                  manual labor for teams.
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  I partner directly with technical founders, operational leads,
                  and agencies across manufacturing, logistics, healthcare, and
                  retail. I cut through buzzwords and deliver fast, maintainable
                  TypeScript architectures built to last.
                </p>

                {/* Tech Chips */}
                <div className="mt-10">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">
                    Core Technical Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js 16",
                      "React 19",
                      "TypeScript",
                      "Three.js",
                      "Node.js",
                      "PostgreSQL",
                      "Tailwind CSS",
                      "REST & GraphQL",
                      "Docker & Cloud",
                      "Payload CMS",
                      "Laravel",
                    ].map((tech) => (
                      <span
                        key={tech}
                        onMouseEnter={playHover}
                        className="rounded-full border border-border/80 bg-background/80 px-4 py-1.5 font-display text-xs font-semibold text-foreground shadow-sm transition-all hover:border-brand-glow hover:bg-surface"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Services Section with 3D Spotlight Cards */}
        {/* ============================================================ */}
        <section id="services" className="relative py-20 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-glow">
                Capabilities
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                02 // SERVICES
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-6 pt-10 lg:gap-x-12 items-end">
              <h2 className="col-span-12 font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight lg:col-span-7">
                Software engineered for
                <br />
                specific business needs
              </h2>
              <p className="col-span-12 max-w-xl text-base text-muted-foreground lg:col-span-5">
                Most of my work powers internal enterprise engines rather than
                disposable landing pages - mission-critical tools where downtime
                is not an option.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((service, i) => (
                <TiltCard
                  key={i}
                  maxTilt={6}
                  as="article"
                  data-cursor="EXPLORE"
                  onMouseEnter={playHover}
                  className={`group flex h-full flex-col rounded-3xl border border-border/80 bg-card p-7 sm:p-8 transition-all duration-300 hover:border-brand-glow/40 hover:shadow-2xl hover:shadow-black/5 ${service.colSpan}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-3xl font-bold text-muted-foreground/60 transition-colors group-hover:text-foreground">
                      {service.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted-foreground transition-all group-hover:bg-foreground group-hover:text-background group-hover:scale-110">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2 text-xs sm:text-sm text-foreground/80">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-glow" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-border/60">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground uppercase tracking-wider font-display">
                        Solves —{" "}
                      </span>
                      {service.solves}
                    </p>
                    <TawkButton
                      onMouseEnter={playHover}
                      onClick={playPop}
                      className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-foreground hover:text-brand-glow transition-colors"
                    >
                      <span>Discuss this requirement</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </TawkButton>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Why Work With Me (Dark High-Contrast Ink Section) */}
        {/* ============================================================ */}
        <section className="relative bg-ink py-20 text-ink-foreground sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

          <div className="relative mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-ink-foreground/20 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-ink-foreground/80">
                Guiding Principles
              </span>
              <span className="font-mono text-xs text-ink-foreground/60">
                03 // STANDARDS
              </span>
            </div>

            <h2 className="max-w-3xl pt-10 font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight">
              A few guarantees
              <br />
              worth knowing
            </h2>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyWorkWithMeData.map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={playHover}
                  className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-7 backdrop-blur-md transition-all hover:bg-ink-foreground/10 hover:border-ink-foreground/30"
                >
                  <span className="font-mono text-xs font-bold text-brand-glow">
                    {item.num}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/75">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Process Section */}
        {/* ============================================================ */}
        <section id="process" className="relative py-20 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-glow">
                Methodology
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                04 // WORKFLOW
              </span>
            </div>

            <h2 className="max-w-3xl pt-10 font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight">
              Predictable execution,
              <br />
              zero surprises
            </h2>

            <div className="mt-12 divide-y divide-border/80">
              {processData.map((p, pIdx) => (
                <div
                  key={pIdx}
                  onMouseEnter={playHover}
                  className="group grid grid-cols-12 items-baseline gap-y-3 py-7 transition-colors hover:bg-surface/50 px-4 rounded-xl"
                >
                  <span className="font-mono col-span-12 text-3xl font-bold text-muted-foreground/60 transition-colors group-hover:text-foreground sm:col-span-2 sm:text-4xl">
                    {p.step}
                  </span>
                  <h3 className="col-span-12 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground sm:col-span-4">
                    {p.title}
                  </h3>
                  <p className="col-span-12 text-sm sm:text-base leading-relaxed text-muted-foreground sm:col-span-6">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Featured Projects Showcase (Direct Interactive Experience) */}
        {/* ============================================================ */}
        <section id="work" className="relative py-20 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between border-b border-border/80 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-glow">
                Selected Work
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                05 // RECENT BUILDS
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-6 pt-10 lg:gap-x-12 items-end">
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight">
                  Systems engineered for
                  <br />
                  real operational scale
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-5 flex lg:justify-end">
                <Link
                  href="/portfolio"
                  data-cursor="ALL"
                  onMouseEnter={playHover}
                  className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur-sm transition-all hover:border-foreground hover:bg-surface active:scale-95"
                >
                  <span>Explore full portfolio</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Grid of 3 Featured Interactive Project Cards */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, idx) => (
                <ProjectCard key={project.slug} project={project} index={idx} />
              ))}
            </div>

            {/* Direct Invitation Banner */}
            <div className="mt-14 rounded-3xl border border-dashed border-border/80 bg-surface/30 p-8 text-center sm:p-12">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Looking for specific industry platforms?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
                Explore case studies covering e-commerce sync pipelines, HRMS
                self-service dashboards, and high-volume ERP integrations.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/portfolio"
                  data-cursor="VIEW"
                  onMouseEnter={playHover}
                  onClick={playPop}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 font-display text-xs font-semibold uppercase tracking-wider text-background shadow-lg transition-all hover:bg-brand-glow active:scale-95"
                >
                  <span>View all projects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Testimonials */}
        {/* ============================================================ */}
        <section className="relative bg-surface/40 py-20 sm:py-32 border-y border-border/60">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-glow">
                Client Feedback
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                06 // REPUTATION
              </span>
            </div>

            <h2 className="max-w-3xl pt-10 font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight">
              What partners say
              <br />
              about my delivery
            </h2>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {testimonialsData.map((t, tIdx) => (
                <TiltCard
                  key={tIdx}
                  maxTilt={6}
                  as="figure"
                  className="flex h-full flex-col rounded-3xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 hover:border-brand-glow/30"
                >
                  <span className="font-display text-5xl leading-none text-muted-foreground/30 font-serif">
                    “
                  </span>
                  <blockquote className="mt-3 font-display text-base leading-relaxed text-foreground flex-1">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-border/60">
                    <div className="font-display text-sm font-bold text-foreground">
                      {t.author}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {t.company}
                    </div>
                  </figcaption>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ Section */}
        {/* ============================================================ */}
        <section id="faq" className="relative py-20 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-glow">
                Frequently Asked
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                07 // ANSWERS
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-12">
              <h2 className="col-span-12 font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight lg:col-span-5">
                Clear answers to
                <br />
                common questions
              </h2>

              <div className="col-span-12 lg:col-span-7">
                <div className="divide-y divide-border/80">
                  {faqData.map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div key={index} className="py-2">
                        <h3>
                          <button
                            type="button"
                            onClick={() => handleFaqToggle(index)}
                            className="flex w-full items-center justify-between py-4 text-left font-display text-base sm:text-lg font-bold text-foreground transition-all hover:text-brand-glow"
                            aria-expanded={isOpen}
                          >
                            <span>{faq.question}</span>
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
                                isOpen
                                  ? "rotate-180 border-foreground/30 bg-foreground/10"
                                  : "border-border/80 bg-surface"
                              }`}
                            >
                              <svg
                                className="h-4 w-4 text-foreground transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m6 9 6 6 6-6"
                                />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pb-5 pt-1 text-sm sm:text-base leading-relaxed text-muted-foreground">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Contact Section */}
        {/* ============================================================ */}
        <section
          id="contact"
          className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-ink-foreground/20 pb-4">
              <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.24em] text-ink-foreground/80">
                Initiate Project
              </span>
              <span className="font-mono text-xs text-ink-foreground/60">
                08 // CONTACT
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-12 pt-14 lg:gap-x-12">
              <div className="col-span-12 lg:col-span-5">
                <h2 className="font-display text-3xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight text-white">
                  Let&apos;s build
                  <br />
                  something lasting
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-foreground/80">
                  Whether you have an established architectural specification or
                  just need clarity on timelines and stack feasibility, drop me
                  a note below. Direct replies within 24 hours.
                </p>

                <div className="mt-10 space-y-4">
                  <a
                    href="mailto:zainudheenjazeel@gmail.com"
                    onMouseEnter={playHover}
                    className="flex items-center gap-3 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-4 text-sm text-ink-foreground transition-all hover:bg-ink-foreground/10 hover:border-ink-foreground/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand-glow">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
                        />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-ink-foreground/60 font-mono">
                        DIRECT EMAIL
                      </div>
                      <div className="font-semibold text-white">
                        zainudheenjazeel@gmail.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918086482422"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    className="flex items-center gap-3 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-4 text-sm text-ink-foreground transition-all hover:bg-ink-foreground/10 hover:border-ink-foreground/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-ink-foreground/60 font-mono">
                        WHATSAPP CHAT
                      </div>
                      <div className="font-semibold text-white">
                        +91 80864 82422
                      </div>
                    </div>
                  </a>

                  <div className="pt-4">
                    <TawkButton
                      onMouseEnter={playHover}
                      onClick={playPop}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white p-4 font-display text-sm font-bold tracking-wider text-black shadow-xl transition-all hover:bg-gray-100 active:scale-95"
                    >
                      <span>LIVE CHAT VIA TAWK</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </TawkButton>
                  </div>
                </div>
              </div>

              {/* Form with Web3Forms */}
              <form
                onSubmit={handleFormSubmit}
                className="col-span-12 space-y-5 lg:col-span-7"
                noValidate
              >
                {formSubmitted ? (
                  <div className="rounded-3xl border border-ink-foreground/25 bg-ink-foreground/5 p-10 text-center backdrop-blur-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 text-white">
                      Message Received!
                    </h3>
                    <p className="text-ink-foreground/80 text-sm max-w-md mx-auto mb-6">
                      Thank you for reaching out. I will review your
                      requirements and respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-display text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gray-100 active:scale-95"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-ink-foreground/15 bg-ink-foreground/5 p-6 sm:p-8 backdrop-blur-xl">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Your Name *
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="name"
                          className="w-full rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3.5 text-sm text-white placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-brand-glow focus:bg-ink-foreground/10 focus:ring-2 focus:ring-brand-glow/20"
                          placeholder="e.g. Alex Mercer"
                        />
                        {touched.name && formErrors.name && (
                          <span className="mt-1 block text-xs text-red-400">
                            {formErrors.name}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Company / Organization
                        </span>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          autoComplete="organization"
                          className="w-full rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3.5 text-sm text-white placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-brand-glow focus:bg-ink-foreground/10 focus:ring-2 focus:ring-brand-glow/20"
                          placeholder="e.g. Acme Corp"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Work Email *
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="email"
                          className="w-full rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3.5 text-sm text-white placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-brand-glow focus:bg-ink-foreground/10 focus:ring-2 focus:ring-brand-glow/20"
                          placeholder="alex@acme.com"
                        />
                        {touched.email && formErrors.email && (
                          <span className="mt-1 block text-xs text-red-400">
                            {formErrors.email}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Phone / WhatsApp
                        </span>
                        <PhoneInput
                          country={"in"}
                          enableSearch={true}
                          value={formData.phone}
                          onChange={(val) => {
                            const value = val ? `+${val}` : "";
                            setFormData((prev) => ({ ...prev, phone: value }));
                            if (touched.phone) {
                              setFormErrors((prev) => ({
                                ...prev,
                                phone: validateField("phone", value),
                              }));
                            }
                          }}
                          onBlur={() => {
                            setTouched((prev) => ({ ...prev, phone: true }));
                            setFormErrors((prev) => ({
                              ...prev,
                              phone: validateField("phone", formData.phone),
                            }));
                          }}
                          containerClass="!w-full"
                          inputClass="!w-full !rounded-xl !border !border-ink-foreground/15 !bg-ink-foreground/5 !py-[14px] !pl-14 !pr-4 !text-sm !text-white placeholder:!text-ink-foreground/40 !backdrop-blur-md transition-all hover:!bg-ink-foreground/10 focus:!border-brand-glow focus:!bg-ink-foreground/10 focus:!ring-2 focus:!ring-brand-glow/20"
                          buttonClass="!bg-transparent !border-0 !pl-3"
                        />
                        {touched.phone && formErrors.phone && (
                          <span className="mt-1 block text-xs text-red-400">
                            {formErrors.phone}
                          </span>
                        )}
                      </label>
                    </div>

                    <label className="block mt-5">
                      <span className="mb-2 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/75">
                        Project Scope / Category
                      </span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setIsProjectDropdownOpen(!isProjectDropdownOpen)
                          }
                          className="w-full flex items-center justify-between rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3.5 text-sm outline-none backdrop-blur-md transition-all focus:border-brand-glow focus:ring-2 focus:ring-brand-glow/20 text-white"
                        >
                          <span
                            className={
                              formData.projectType
                                ? "text-white"
                                : "text-ink-foreground/50"
                            }
                          >
                            {formData.projectType ||
                              "Select a service focus (Optional)"}
                          </span>
                          <svg
                            className={`w-4 h-4 text-ink-foreground/50 transition-transform ${isProjectDropdownOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {isProjectDropdownOpen && (
                          <div className="absolute z-20 w-full mt-2 rounded-xl border border-ink-foreground/20 bg-ink p-2 shadow-2xl max-h-[260px] overflow-y-auto">
                            {[
                              "Custom ERP Development",
                              "CRM Development",
                              "HRMS Development",
                              "Legacy Modernization",
                              "Dedicated Senior Developer",
                              "Web Application Maintenance",
                              "Next.js / React Architecture",
                            ].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    projectType: opt,
                                  }));
                                  setIsProjectDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-ink-foreground hover:bg-ink-foreground/10 hover:text-white rounded-lg transition-colors"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="hidden"
                        name="projectType"
                        value={formData.projectType}
                      />
                    </label>

                    <label className="block mt-5">
                      <span className="mb-2 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/75">
                        Tell Me About The Project *
                      </span>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleFormChange}
                        onBlur={handleFormBlur}
                        className="w-full rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3.5 text-sm text-white placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-brand-glow focus:bg-ink-foreground/10 focus:ring-2 focus:ring-brand-glow/20"
                        placeholder="What systems are you looking to build, replace, or maintain?"
                      />
                      {touched.message && formErrors.message && (
                        <span className="mt-1 block text-xs text-red-400">
                          {formErrors.message}
                        </span>
                      )}
                    </label>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="cursor-pointer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formSubmitting
                        ? "Dispatching..."
                        : "Send Project Inquiry"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
