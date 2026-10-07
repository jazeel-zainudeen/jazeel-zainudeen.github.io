"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TawkButton } from "@/components/ui/TawkButton";

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
      "Real-time reporting",
      "Scales with your business",
    ],
    solves:
      "Replaces spreadsheets, disconnected tools and slow manual processes.",
    colSpan: "lg:col-span-2",
    ruleL: "",
  },
  {
    num: "02",
    title: "CRM Development",
    description:
      "Bespoke CRM development from a focused CRM development company - built around your sales pipeline, not someone else's.",
    benefits: [
      "360° customer view",
      "Sales automation",
      "Custom pipelines & reports",
    ],
    solves: "Lost leads, no follow-up visibility, sales teams stuck in email.",
    colSpan: "",
    ruleL: "lg:rule-l",
  },
  {
    num: "03",
    title: "HRMS Development",
    description:
      "HRMS software development covering attendance, payroll, leave, performance and employee self-service.",
    benefits: [
      "Payroll & attendance in one place",
      "Employee self-service portal",
      "Compliance-ready reports",
    ],
    solves: "Manual HR ops, payroll errors, scattered employee data.",
    colSpan: "",
    ruleL: "lg:rule-l",
  },
  {
    num: "04",
    title: "Web Application Maintenance",
    description:
      "Reliable web application maintenance and software maintenance services - bug fixes, security patches, feature work and uptime support.",
    benefits: [
      "Predictable monthly retainers",
      "Performance & security monitoring",
      "Fast response SLAs",
    ],
    solves: "Aging codebases, broken features, no dev on call.",
    colSpan: "",
    ruleL: "",
  },
  {
    num: "05",
    title: "Legacy Application Modernization",
    description:
      "Legacy application modernization - re-architect old monolithic apps into high-performance Next.js + React + Cloud architectures.",
    benefits: [
      "Modern UI / UX",
      "Cloud-ready & Serverless",
      "Lower hosting costs",
    ],
    solves: "Outdated tech, security risks, vendors that disappeared.",
    colSpan: "",
    ruleL: "lg:rule-l",
  },
  {
    num: "06",
    title: "Dedicated Full Stack Developer",
    description:
      "Hire a remote software developer on a monthly basis - direct communication, your roadmap, your codebase.",
    benefits: [
      "Full-time or part-time",
      "Async + daily standups",
      "No agency overhead",
    ],
    solves: "Need consistent dev velocity without hiring full-time.",
    colSpan: "lg:col-span-2",
    ruleL: "lg:rule-l",
  },
];

const whyWorkWithMeData = [
  {
    num: "01",
    title: "Five years in",
    description:
      "Production systems across ERP, CRM, HRMS and IoT-driven platforms.",
    ruleL: "",
  },
  {
    num: "02",
    title: "Workflow first",
    description:
      "I start from how people actually work, not from a feature list.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8",
  },
  {
    num: "03",
    title: "I stay around",
    description: "Most systems I build, I keep maintaining long after launch.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8",
  },
  {
    num: "04",
    title: "Clean foundations",
    description:
      "Next.js + React + TypeScript setups that survive growth instead of collapsing under it.",
    ruleL: "",
  },
  {
    num: "05",
    title: "Direct to me",
    description:
      "You talk to the person writing the code. No layers in between.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8",
  },
  {
    num: "06",
    title: "No fluff",
    description: "Honest feedback, realistic timelines, zero jargon.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8",
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
      "A MVP or specialized web application feature usually takes 2 to 4 weeks. Comprehensive ERP, CRM or enterprise platform developments range from 6 to 12 weeks depending on scope, module depth, and integration needs.",
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

const faqs = faqData;

const processData = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "Understand your business, current systems, pain points and goals.",
  },
  {
    step: "02",
    title: "Requirement Analysis",
    description:
      "Document workflows, user roles, integrations and success metrics.",
  },
  {
    step: "03",
    title: "Development Plan",
    description: "Clear scope, milestones, timelines and transparent pricing.",
  },
  {
    step: "04",
    title: "Agile Development",
    description: "Weekly demos, frequent feedback, working software early.",
  },
  {
    step: "05",
    title: "Testing & Deployment",
    description:
      "QA, UAT, secure deployment, data migration and team training.",
  },
  {
    step: "06",
    title: "Ongoing Support",
    description:
      "Maintenance retainers, feature work and 24×7 monitoring options.",
  },
];

const testimonialsData = [
  {
    quote:
      "Jazeel rebuilt our internal production tracking tool from a tangled spreadsheet into a real ERP module. Reporting that used to take a full day now runs in minutes.",
    author: "Operations Director",
    company: "Manufacturing Company",
    ruleL: "",
  },
  {
    quote:
      "Our HRMS revamp was on time, on scope, and the team still maintains it on a monthly retainer. Communication is the best we've had with any developer.",
    author: "Head of Talent",
    company: "Recruitment Agency",
    ruleL: "lg:rule-l lg:pl-8",
  },
  {
    quote:
      "We needed a logistics dashboard tied into our existing systems. The API work and the React UI were both rock solid - leads now have clear delivery visibility.",
    author: "Founder",
    company: "Logistics Company",
    ruleL: "lg:rule-l lg:pl-8",
  },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Sticky Header - flat on mobile at top, capsule when scrolled */}

      <main>
        {/* Hero Section */}
        <section
          id="top"
          className="relative overflow-hidden pt-14 sm:pt-36 md:pt-44"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
            {/* Top Status Strip */}
            <div className="rule-b hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 pb-4 font-display text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="flex items-center gap-2 text-brand-glow">
                <span className="size-1.5 rounded-full bg-brand-glow animate-pulse"></span>
                Open to interesting work
              </span>
              <span>/</span>
              <span>Kerala, India - remote</span>
              <span className="ml-auto hidden lg:inline">
                Personal site of Jazeel Zainudeen
              </span>
            </div>

            {/* Main Hero Header & Paragraph */}
            <div className="grid grid-cols-12 gap-y-8 pt-8 sm:pt-16 md:pt-20 lg:gap-y-12">
              <div className="col-span-12 lg:col-span-9">
                <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl lg:text-[6.2rem]">
                  Hi, I&apos;m Jazeel Zainudeen.
                  <br />I build{" "}
                  <span className="text-brand-glow">software</span>
                  <br />
                  <span className="text-muted-foreground">
                    that solves real problems.
                  </span>
                </h1>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:-mt-16">
                <p className="rule-l pl-5 sm:pl-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  A full stack developer from Kerala, India. For the past five
                  years I&apos;ve spent my days building ERP, CRM and HRMS
                  systems, modernizing old codebases, and keeping them alive
                  long after launch. This is my corner of the internet.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-3.5 font-display text-xs font-semibold tracking-wider text-ink-foreground shadow-md transition-all hover:bg-ink/90 active:scale-95"
                  >
                    <span>Book a discovery call</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:translate-x-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </a>
                  <a
                    href="https://wa.me/918086482422"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-background px-7 py-3.5 font-display text-xs font-semibold tracking-wider text-foreground shadow-sm transition-all hover:bg-surface hover:border-brand-glow/40 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-circle text-brand-glow"
                    >
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    <span>Direct WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Row - Spacious layout with Framer Motion staggered entrance */}
            <div className="relative mt-14 sm:mt-20 md:mt-24 grid grid-cols-12 gap-y-6 pb-16 sm:pb-24">
              <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">
                      01
                    </span>
                    Full Stack since 2019
                  </div>
                  <div className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">
                      02
                    </span>
                    Next.js · React · TypeScript
                  </div>
                  <div className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">
                      03
                    </span>
                    ERP, CRM &amp; HRMS
                  </div>
                  <div className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">
                      04
                    </span>
                    Kerala, India - Remote
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Banner */}
        <section
          aria-label="Tech stack"
          className="bg-ink py-10 text-ink-foreground"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <p className="font-display text-[0.68rem] uppercase tracking-[0.24em] text-ink-foreground/75">
              Tools I work with every day
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                Next.js
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                React
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                TypeScript
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                Node.js
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                Tailwind CSS
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                PostgreSQL
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                REST &amp; GraphQL
                <span
                  className="h-4 w-px bg-ink-foreground/25"
                  aria-hidden="true"
                ></span>
              </span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">
                Cloud / Serverless
              </span>
            </div>
          </div>
        </section>

        {/* About Section - Soft Surface Background */}
        <section
          id="about"
          className="bg-surface/50 py-14 sm:bg-transparent sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">About</span>
              <span className="index-num text-xs text-muted-foreground">
                01
              </span>
            </div>
            <div className="grid grid-cols-12 gap-y-8 pt-8 lg:gap-x-12">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="relative">
                  <div className="absolute -bottom-4 -right-4 hidden h-full w-full bg-sand sm:block"></div>
                  <Image
                    src="/assets/seo/jazeel-zainudeen-profile.jpg"
                    alt="Jazeel Zainudeen, Full Stack Developer"
                    width={440}
                    height={550}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="relative aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
                  A little
                  <br />
                  about me
                </h2>
                <p className="mt-7 max-w-xl text-muted-foreground">
                  I&apos;m{" "}
                  <span className="font-medium text-foreground">
                    Jazeel Zainudeen
                  </span>
                  , a full stack engineer based in Kerala, India. Over the last
                  five years I&apos;ve built production web applications,
                  high-performance Cloud solutions, ERP systems, CRM platforms,
                  and internal automations that quietly save teams hours every
                  week.
                </p>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  I&apos;ve worked with small teams and larger companies across
                  manufacturing, logistics, healthcare and recruitment. I
                  specialize in modern JavaScript/TypeScript ecosystems,
                  micro-frontends, and robust cloud backend architectures.
                </p>
                <div className="mt-10 grid grid-cols-3">
                  <div className="rule-t py-4 pr-3">
                    <div className="index-num text-3xl font-semibold sm:text-4xl">
                      5+
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Years building
                    </div>
                  </div>
                  <div className="rule-t py-4 pr-3">
                    <div className="index-num text-3xl font-semibold sm:text-4xl">
                      20+
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Systems shipped
                    </div>
                  </div>
                  <div className="rule-t py-4 pr-3">
                    <div className="index-num text-3xl font-semibold sm:text-4xl">
                      4
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Industries
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <p className="eyebrow mb-4">Core expertise</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <span className="font-display text-sm text-muted-foreground">
                      Next.js 15
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      React 19
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      TypeScript
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      Node.js
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      Tailwind CSS
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      PostgreSQL
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      Cloud Architecture
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      Enterprise Web Applications
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Clean Background */}
        <section id="services" className="bg-background py-14 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">What I work on</span>
              <span className="index-num text-xs text-muted-foreground">
                02
              </span>
            </div>
            <div className="grid grid-cols-12 gap-y-6 pt-8 lg:gap-x-12">
              <h2 className="col-span-12 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-6">
                The kind of things
                <br />I build
              </h2>
              <p className="col-span-12 max-w-xl self-end text-muted-foreground lg:col-span-5 lg:col-start-8">
                Most of my work lives inside companies rather than on the open
                web - internal systems for manufacturing, logistics, healthcare
                and recruitment teams.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service, i) => (
                <article
                  key={i}
                  className={`group rule-t flex flex-col p-6 transition-colors hover:bg-surface sm:p-8 ${service.colSpan} ${service.ruleL}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="index-num text-4xl font-semibold text-sand transition-colors group-hover:text-brand">
                      {service.num}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex gap-3">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-brand"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="rule-t mt-auto pt-5 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-display font-semibold uppercase tracking-[0.14em] text-foreground">
                      Solves -{" "}
                    </span>
                    {service.solves}
                  </p>
                  <TawkButton className="link-rule mt-6 inline-flex w-fit items-center gap-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                    Ask me about this
                  </TawkButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How I Work / Why Work With Me Section - Dark Ink */}
        <section className="bg-ink py-14 text-ink-foreground sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-ink-foreground/20 pb-4">
              <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink-foreground/80">
                How I work
              </span>
              <span className="index-num text-xs text-ink-foreground/75">
                03
              </span>
            </div>
            <h2 className="max-w-3xl pt-8 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
              A few things
              <br />
              worth knowing
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {whyWorkWithMeData.map((item, idx) => (
                <div
                  key={idx}
                  className={`border-t border-ink-foreground/20 py-6 pr-6 ${item.ruleL}`}
                >
                  <span className="index-num text-xs text-ink-foreground/75">
                    {item.num}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Soft Surface Background */}
        <section
          id="process"
          className="bg-surface/50 py-14 sm:bg-transparent sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">My process</span>
              <span className="index-num text-xs text-muted-foreground">
                04
              </span>
            </div>
            <h2 className="max-w-3xl pt-8 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
              How a project
              <br />
              usually goes
            </h2>
            <div className="mt-10">
              {processData.map((p, pIdx) => (
                <div
                  key={pIdx}
                  className="rule-t group grid grid-cols-12 items-baseline gap-y-2 py-5 transition-colors hover:bg-surface"
                >
                  <span className="index-num col-span-12 text-3xl font-semibold text-sand transition-colors group-hover:text-brand sm:col-span-2 sm:text-5xl">
                    {p.step}
                  </span>
                  <h3 className="col-span-12 font-display text-xl font-semibold sm:col-span-4">
                    {p.title}
                  </h3>
                  <p className="col-span-12 text-sm text-muted-foreground sm:col-span-6">
                    {p.description}
                  </p>
                </div>
              ))}
              <div className="rule-t"></div>
            </div>
          </div>
        </section>

        {/* Selected Work Section - Replaced by CTA */}
        <section id="work" className="bg-background py-14 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">Things I&apos;ve built</span>
              <span className="index-num text-xs text-muted-foreground">
                05
              </span>
            </div>
            <div className="mt-16 rounded-3xl bg-surface px-6 py-20 text-center sm:px-12 border border-border shadow-sm">
              <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl mb-6">
                Curious about what I&apos;ve been building?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
                Explore a detailed showcase of my recent projects, spanning
                enterprise web apps, mobile platforms, and IoT dashboards.
              </p>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-foreground shadow-lg transition-all hover:bg-brand-glow hover:-translate-y-0.5 active:scale-95"
              >
                View My Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Soft Surface Background */}
        <section className="bg-surface/50 py-14 sm:bg-transparent sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">Kind words</span>
              <span className="index-num text-xs text-muted-foreground">
                06
              </span>
            </div>
            <h2 className="max-w-3xl pt-8 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
              What people
              <br />
              I&apos;ve worked with say
            </h2>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3">
              {testimonialsData.map((t, tIdx) => (
                <figure
                  key={tIdx}
                  className={`rule-t flex flex-col py-6 pr-8 ${t.ruleL}`}
                >
                  <span className="font-display text-4xl leading-none text-sand">
                    “
                  </span>
                  <blockquote className="mt-3 font-display text-base leading-snug tracking-tight text-foreground sm:text-lg">
                    {t.quote}
                  </blockquote>
                  <figcaption className="rule-t mt-auto pt-4">
                    <div className="font-display text-sm font-semibold">
                      {t.author}
                    </div>
                    <div className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {t.company}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Clean Background */}
        <section id="faq" className="bg-background py-14 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">FAQ</span>
              <span className="index-num text-xs text-muted-foreground">
                07
              </span>
            </div>
            <div className="grid grid-cols-12 gap-y-8 pt-8 lg:gap-x-12">
              <h2 className="col-span-12 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-4">
                Questions,
                <br />
                answered
              </h2>
              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                <div>
                  {faqs.map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div key={index} className="rule-t border-b-0">
                        <h3>
                          <button
                            type="button"
                            onClick={() => handleFaqToggle(index)}
                            className="flex w-full items-center justify-between py-5 text-left font-display text-base font-medium transition-all hover:no-underline"
                            aria-expanded={isOpen}
                          >
                            <span>{faq.question}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </button>
                        </h3>
                        {isOpen && (
                          <div className="overflow-hidden text-sm">
                            <div className="pb-5 text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="rule-t"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="overflow-hidden bg-ink py-14 text-ink-foreground sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-ink-foreground/20 pb-4">
              <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink-foreground/80">
                Say hello
              </span>
              <span className="index-num text-xs text-ink-foreground/75">
                08
              </span>
            </div>
            <div className="grid grid-cols-12 gap-y-12 pt-14 lg:gap-x-12">
              <div className="col-span-12 lg:col-span-5">
                <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
                  Let&apos;s have
                  <br />a conversation
                </h2>
                <p className="mt-6 max-w-md text-ink-foreground/80">
                  An idea, a question, or just hello - drop me a line and I
                  usually reply within a day. WhatsApp works too, if that&apos;s
                  easier.
                </p>
                <div className="mt-10">
                  <a
                    href="tel:+918086482422"
                    className="flex items-center gap-3 border-t border-ink-foreground/20 py-4 text-sm text-ink-foreground/85 transition-colors hover:text-ink-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone size-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                    </svg>
                    +91 80864 82422
                  </a>
                  <a
                    href="mailto:zainudheenjazeel@gmail.com"
                    className="flex items-center gap-3 border-t border-ink-foreground/20 py-4 text-sm text-ink-foreground/85 transition-colors hover:text-ink-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail size-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    zainudheenjazeel@gmail.com
                  </a>
                  <a
                    href="https://wa.me/918086482422"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border-y border-ink-foreground/20 py-4 text-sm text-ink-foreground/85 transition-colors hover:text-ink-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-circle size-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    WhatsApp
                  </a>
                  <div className="mt-8">
                    <TawkButton className="group flex w-full sm:w-fit items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-display text-sm font-medium tracking-wider text-black shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl active:scale-95">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-square text-brand"
                        aria-hidden="true"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>OR CHAT WITH US</span>
                    </TawkButton>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="col-span-12 space-y-5 lg:col-span-6 lg:col-start-7"
                noValidate
              >
                {formSubmitted ? (
                  <div className="border border-ink-foreground/25 p-8 text-center">
                    <h3 className="font-display text-xl font-semibold mb-2 text-ink-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-ink-foreground/80 text-sm mb-6">
                      Thank you for reaching out. I will get back to you as soon
                      as possible!
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="cursor-pointer inline-flex items-center justify-center gap-2 bg-background px-6 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Name
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="name"
                          className="w-full rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3.5 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-ink-foreground/30 focus:bg-ink-foreground/10 focus:ring-4 focus:ring-ink-foreground/5"
                          placeholder="Your full name"
                        />
                        {touched.name && formErrors.name && (
                          <span className="mt-1 block text-xs text-red-400">
                            {formErrors.name}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Company
                        </span>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          autoComplete="organization"
                          className="w-full rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3.5 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-ink-foreground/30 focus:bg-ink-foreground/10 focus:ring-4 focus:ring-ink-foreground/5"
                          placeholder="Company name"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Email
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="email"
                          className="w-full rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3.5 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-ink-foreground/30 focus:bg-ink-foreground/10 focus:ring-4 focus:ring-ink-foreground/5"
                          placeholder="you@company.com"
                        />
                        {touched.email && formErrors.email && (
                          <span className="mt-1 block text-xs text-red-400">
                            {formErrors.email}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/75">
                          Phone
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
                          inputClass="!w-full !rounded-xl !border !border-ink-foreground/10 !bg-ink-foreground/5 !py-[14px] !pl-14 !pr-4 !text-sm !text-ink-foreground placeholder:!text-ink-foreground/40 !backdrop-blur-md transition-all hover:!bg-ink-foreground/10 focus:!border-ink-foreground/30 focus:!bg-ink-foreground/10 focus:!ring-4 focus:!ring-ink-foreground/5"
                          buttonClass="!bg-transparent !border-0 !pl-3"
                        />
                        {touched.phone && formErrors.phone && (
                          <span className="mt-1 block text-xs text-red-400">
                            {formErrors.phone}
                          </span>
                        )}
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/75">
                        Project Type
                      </span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setIsProjectDropdownOpen(!isProjectDropdownOpen)
                          }
                          className="w-full flex items-center justify-between rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3.5 text-sm outline-none backdrop-blur-md transition-all focus:border-ink-foreground/30 focus:bg-ink-foreground/10 focus:ring-4 focus:ring-ink-foreground/5"
                        >
                          <span
                            className={
                              formData.projectType
                                ? "text-ink-foreground"
                                : "text-ink-foreground/50"
                            }
                          >
                            {formData.projectType ||
                              "Select a service (Optional)"}
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
                          <div className="absolute z-10 w-full mt-2 rounded-xl border border-ink-foreground/10 bg-ink overflow-hidden shadow-2xl max-h-[250px] overflow-y-auto">
                            <ul className="py-2">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "Custom ERP Development",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Custom ERP Development
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "CRM Development",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  CRM Development
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "HRMS Development",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  HRMS Development
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType:
                                        "Business Process Automation",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Business Process Automation
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "Custom Business Software",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Custom Business Software
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType:
                                        "Legacy System Modernization",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Legacy System Modernization
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType:
                                        "Web Application Maintenance",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Web Application Maintenance
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "Next.js & Payload CMS",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Next.js & Payload CMS
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "Laravel Development",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  Laravel Development
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      projectType: "PHP Development",
                                    }));
                                    setIsProjectDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-ink-foreground hover:bg-ink-foreground/10 transition-colors"
                                >
                                  PHP Development
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Hidden input to ensure value is captured in form data just in case */}
                      <input
                        type="hidden"
                        name="projectType"
                        value={formData.projectType}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/75">
                        Message
                      </span>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleFormChange}
                        onBlur={handleFormBlur}
                        className="w-full rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3.5 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none backdrop-blur-md transition-all focus:border-ink-foreground/30 focus:bg-ink-foreground/10 focus:ring-4 focus:ring-ink-foreground/5"
                        placeholder="Tell me a bit about what you have in mind."
                      ></textarea>
                      {touched.message && formErrors.message && (
                        <span className="mt-1 block text-xs text-red-400">
                          {formErrors.message}
                        </span>
                      )}
                    </label>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl bg-background px-6 py-4 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-brand-glow hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formSubmitting ? "Sending..." : "Send message"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
