"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }
};

const servicesData = [
  {
    num: "01",
    title: "ERP Development",
    description: "Custom ERP development services tailored to inventory, finance, manufacturing and operations workflows.",
    benefits: [
      "Unified data across departments",
      "Real-time reporting",
      "Scales with your business"
    ],
    solves: "Replaces spreadsheets, disconnected tools and slow manual processes.",
    colSpan: "lg:col-span-2",
    ruleL: ""
  },
  {
    num: "02",
    title: "CRM Development",
    description: "Bespoke CRM development from a focused CRM development company — built around your sales pipeline, not someone else's.",
    benefits: [
      "360° customer view",
      "Sales automation",
      "Custom pipelines & reports"
    ],
    solves: "Lost leads, no follow-up visibility, sales teams stuck in email.",
    colSpan: "",
    ruleL: "lg:rule-l"
  },
  {
    num: "03",
    title: "HRMS Development",
    description: "HRMS software development covering attendance, payroll, leave, performance and employee self-service.",
    benefits: [
      "Payroll & attendance in one place",
      "Employee self-service portal",
      "Compliance-ready reports"
    ],
    solves: "Manual HR ops, payroll errors, scattered employee data.",
    colSpan: "",
    ruleL: "lg:rule-l"
  },
  {
    num: "04",
    title: "Web Application Maintenance",
    description: "Reliable web application maintenance and software maintenance services — bug fixes, security patches, feature work and uptime support.",
    benefits: [
      "Predictable monthly retainers",
      "Performance & security monitoring",
      "Fast response SLAs"
    ],
    solves: "Aging codebases, broken features, no dev on call.",
    colSpan: "",
    ruleL: ""
  },
  {
    num: "05",
    title: "Legacy Application Modernization",
    description: "Legacy application modernization — re-architect old monolithic apps into high-performance Next.js + React + Cloud architectures.",
    benefits: [
      "Modern UI / UX",
      "Cloud-ready & Serverless",
      "Lower hosting costs"
    ],
    solves: "Outdated tech, security risks, vendors that disappeared.",
    colSpan: "",
    ruleL: "lg:rule-l"
  },
  {
    num: "06",
    title: "Dedicated Full Stack Developer",
    description: "Hire a remote software developer on a monthly basis — direct communication, your roadmap, your codebase.",
    benefits: [
      "Full-time or part-time",
      "Async + daily standups",
      "No agency overhead"
    ],
    solves: "Need consistent dev velocity without hiring full-time.",
    colSpan: "lg:col-span-2",
    ruleL: "lg:rule-l"
  }
];

const whyWorkWithMeData = [
  {
    num: "01",
    title: "Five years in",
    description: "Production systems across ERP, CRM, HRMS and IoT-driven platforms.",
    ruleL: ""
  },
  {
    num: "02",
    title: "Workflow first",
    description: "I start from how people actually work, not from a feature list.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8"
  },
  {
    num: "03",
    title: "I stay around",
    description: "Most systems I build, I keep maintaining long after launch.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8"
  },
  {
    num: "04",
    title: "Clean foundations",
    description: "Next.js + React + TypeScript setups that survive growth instead of collapsing under it.",
    ruleL: ""
  },
  {
    num: "05",
    title: "Direct to me",
    description: "You talk to the person writing the code. No layers in between.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8"
  },
  {
    num: "06",
    title: "No fluff",
    description: "Honest feedback, realistic timelines, zero jargon.",
    ruleL: "lg:border-l lg:border-ink-foreground/20 lg:pl-8"
  }
];

const faqData: FAQItem[] = [
  {
    question: "What types of applications do you build?",
    answer: "I specialize in custom Enterprise Software (ERP, CRM, HRMS platforms), modern SaaS web applications, customer-facing portals, real-time dashboards, and REST API integrations."
  },
  {
    question: "How long does a typical project take?",
    answer: "A MVP or specialized web application feature usually takes 2 to 4 weeks. Comprehensive ERP, CRM or enterprise platform developments range from 6 to 12 weeks depending on scope, module depth, and integration needs."
  },
  {
    question: "How much does custom software development cost?",
    answer: "Custom business software development is priced by scope — small internal tools typically start in the low thousands USD, while full ERP, CRM or HRMS builds are scoped after a discovery call. You'll get a clear fixed quote or milestone-based proposal before any work starts. Monthly maintenance retainers are also available."
  },
  {
    question: "Do you provide software maintenance?",
    answer: "Yes. Web application maintenance and software maintenance services are a core part of what I offer — bug fixes, security patches, performance work, feature additions and uptime monitoring on predictable monthly retainers."
  },
  {
    question: "Can you work with existing applications?",
    answer: "Absolutely. I regularly take over existing React, Next.js, Node.js, and legacy codebases — including legacy application modernization, refactors, and adding new modules without breaking what already works."
  },
  {
    question: "Do you provide dedicated developer services?",
    answer: "Yes — you can hire me as a dedicated remote software developer on a part-time or full-time monthly basis, working directly inside your team, tools and roadmap."
  },
  {
    question: "How do you communicate with clients?",
    answer: "Direct and async-first. WhatsApp, email, Slack or your preferred tool, with scheduled weekly demos, written updates and a shared task board. No account managers between you and the person writing the code."
  },
  {
    question: "What technologies do you use?",
    answer: "Primary stack: Next.js, React, TypeScript, Node.js, Tailwind CSS, PostgreSQL, REST & GraphQL APIs, plus Payload CMS and Laravel where required. The right choice depends on your existing systems and long-term goals — I recommend based on fit and performance."
  }
];

const faqs = faqData;

const processData = [
  {
    step: "01",
    title: "Discovery Call",
    description: "Understand your business, current systems, pain points and goals."
  },
  {
    step: "02",
    title: "Requirement Analysis",
    description: "Document workflows, user roles, integrations and success metrics."
  },
  {
    step: "03",
    title: "Development Plan",
    description: "Clear scope, milestones, timelines and transparent pricing."
  },
  {
    step: "04",
    title: "Agile Development",
    description: "Weekly demos, frequent feedback, working software early."
  },
  {
    step: "05",
    title: "Testing & Deployment",
    description: "QA, UAT, secure deployment, data migration and team training."
  },
  {
    step: "06",
    title: "Ongoing Support",
    description: "Maintenance retainers, feature work and 24×7 monitoring options."
  }
];

const selectedWorkData = [
  {
    num: "01",
    tag: "Retail · India",
    title: "Retail Operations Platform",
    description: "Internal business platform supporting one of India's largest electronics retail chains with operations, inventory and reporting modules.",
    impact: "Streamlined multi-branch workflows and reduced manual reporting time across stores.",
    image: "/project-myg-BTHHvbmM.jpg",
    alt: "Retail Operations Platform — Retail · India",
    orderImage: "",
    orderText: "lg:col-start-9"
  },
  {
    num: "02",
    tag: "On-demand services",
    title: "Handyman Marketplace App",
    description: "Two-sided mobile platform connecting customers with verified handymen — bookings, live tracking, in-app payments and provider onboarding.",
    impact: "Replaced WhatsApp-based dispatch with a fully automated booking & payout pipeline.",
    image: "/project-handyman-CCj8He0-.jpg",
    alt: "Handyman Marketplace App — On-demand services",
    orderImage: "lg:order-2 lg:col-start-6",
    orderText: "lg:order-1 lg:col-start-1"
  },
  {
    num: "03",
    tag: "Recruitment & HR",
    title: "HRMS — Software Revamp",
    description: "Complete revamp of a legacy HRMS used by a recruitment group — attendance, payroll, leave management and employee self-service.",
    impact: "Cut payroll processing time and modernized the UX for hundreds of daily users.",
    image: "/project-hrms-XV0SNF7i.jpg",
    alt: "HRMS — Software Revamp — Recruitment & HR",
    orderImage: "",
    orderText: "lg:col-start-9"
  },
  {
    num: "04",
    tag: "Energy · IoT",
    title: "IoT Gas Station Management Portal",
    description: "Full IoT-integrated web application + API layer for fuel station operations — live pump telemetry, sales reconciliation and admin dashboards.",
    impact: "Real-time visibility into pump activity and automated end-of-day sales reporting.",
    image: "/project-gasstation-CkzHaHlv.jpg",
    alt: "IoT Gas Station Management Portal — Energy · IoT",
    orderImage: "lg:order-2 lg:col-start-6",
    orderText: "lg:order-1 lg:col-start-1"
  }
];

const testimonialsData = [
  {
    quote: "Jazeel rebuilt our internal production tracking tool from a tangled spreadsheet into a real ERP module. Reporting that used to take a full day now runs in minutes.",
    author: "Operations Director",
    company: "Manufacturing Company",
    ruleL: ""
  },
  {
    quote: "Our HRMS revamp was on time, on scope, and the team still maintains it on a monthly retainer. Communication is the best we've had with any developer.",
    author: "Head of Talent",
    company: "Recruitment Agency",
    ruleL: "lg:rule-l lg:pl-8"
  },
  {
    quote: "We needed a logistics dashboard tied into our existing systems. The API work and the React UI were both rock solid — leads now have clear delivery visibility.",
    author: "Founder",
    company: "Logistics Company",
    ruleL: "lg:rule-l lg:pl-8"
  }
];


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Custom ERP Development",
    message: ""
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleFormBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTouched = {
      name: true,
      email: true,
      phone: true,
      message: true
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
      message: messageError
    };

    setFormErrors(errors);

    if (nameError || emailError || phoneError || messageError) {
      return;
    }

    setFormSubmitting(true);

    const calendlyBase = "https://calendly.com/zainudheenjazeel/30min";
    const params = new URLSearchParams();
    if (formData.name) params.set("name", formData.name);
    if (formData.email) params.set("email", formData.email);
    if (formData.phone) params.set("a1", formData.phone);
    if (formData.company) params.set("a2", formData.company);
    if (formData.projectType) params.set("a3", formData.projectType);
    const builtUrl = `${calendlyBase}?${params.toString()}`;
    setCalendlyUrl(builtUrl);

    window.open(builtUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "Custom ERP Development",
        message: ""
      });
      setTouched({
        name: false,
        email: false,
        phone: false,
        message: false
      });
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Floating Capsule Header on Mobile, Full Glass Navbar on Desktop */}
      <header className="fixed inset-x-0 top-3 z-50 transition-all md:top-0 md:bg-background/90 md:backdrop-blur-xl md:border-b md:border-border">
        {/* Floating Capsule Container on Mobile, Standard Flex Container on Desktop */}
        <div className="mx-auto flex h-12 max-w-[calc(100%-1.5rem)] items-center justify-between rounded-full border border-border/70 bg-background/80 px-3.5 backdrop-blur-xl shadow-lg sm:max-w-[calc(100%-2rem)] md:h-16 md:max-w-[88rem] md:rounded-none md:border-0 md:bg-transparent md:px-8 md:shadow-none md:backdrop-blur-none">
          <a href="#top" className="flex items-center gap-2 font-display text-sm font-bold tracking-tight md:text-base">
            <img 
              src="/logo.png" 
              alt="Jazeel" 
              className="h-6 w-6 rounded-full border border-border object-cover md:h-8 md:w-8" 
            />
            <span>Jazeel<span className="text-brand-glow">.dev</span></span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            <a href="#services" className="link-rule font-display text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">What I do</a>
            <a href="#about" className="link-rule font-display text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">About</a>
            <a href="#process" className="link-rule font-display text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">Process</a>
            <a href="#work" className="link-rule font-display text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">Work</a>
            <a href="#faq" className="link-rule font-display text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </nav>

          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-foreground transition-all hover:bg-brand-glow shadow-sm"
            >
              Say hello
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a 
              href="#contact" 
              className="inline-flex items-center rounded-full bg-brand px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-wider text-brand-foreground shadow-sm"
            >
              Say hello
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center p-1.5 text-foreground rounded-full border border-border bg-surface active:scale-95 transition-transform" 
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                  <path d="M4 6h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay - 2 Column Interactive Grid Layout */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.16 }}
              className="mx-auto mt-2 max-w-[calc(100%-1.5rem)] rounded-2xl border border-border bg-background/98 p-4 backdrop-blur-2xl md:hidden shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-2.5">
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-2 text-brand-glow">
                      <path d="m18 16 4-4-4-4"/>
                      <path d="m6 8-4 4 4 4"/>
                      <path d="m14.5 4-5 16"/>
                    </svg>
                    <span className="font-mono text-[0.62rem] text-muted-foreground">01</span>
                  </div>
                  <div className="mt-4">
                    <span className="block font-display text-xs font-bold text-foreground">What I do</span>
                    <span className="text-[0.65rem] text-muted-foreground">Services &amp; Stack</span>
                  </div>
                </a>

                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-brand-glow">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span className="font-mono text-[0.62rem] text-muted-foreground">02</span>
                  </div>
                  <div className="mt-4">
                    <span className="block font-display text-xs font-bold text-foreground">About</span>
                    <span className="text-[0.65rem] text-muted-foreground">5+ Yrs Experience</span>
                  </div>
                </a>

                <a 
                  href="#process" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-workflow text-brand-glow">
                      <rect width="8" height="8" x="3" y="3" rx="2"/>
                      <path d="M7 11v4a2 2 0 0 0 2 2h4"/>
                      <rect width="8" height="8" x="13" y="13" rx="2"/>
                    </svg>
                    <span className="font-mono text-[0.62rem] text-muted-foreground">03</span>
                  </div>
                  <div className="mt-4">
                    <span className="block font-display text-xs font-bold text-foreground">Process</span>
                    <span className="text-[0.65rem] text-muted-foreground">How I work</span>
                  </div>
                </a>

                <a 
                  href="#work" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex flex-col justify-between rounded-xl border border-border/60 bg-surface/60 p-3.5 transition-all hover:bg-surface active:scale-95"
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase text-brand-glow">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <span className="font-mono text-[0.62rem] text-muted-foreground">04</span>
                  </div>
                  <div className="mt-4">
                    <span className="block font-display text-xs font-bold text-foreground">Work</span>
                    <span className="text-[0.65rem] text-muted-foreground">Selected Projects</span>
                  </div>
                </a>
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-1 items-center justify-between rounded-xl border border-border/60 bg-surface/40 px-3.5 py-2.5 font-display text-xs font-semibold text-foreground transition-all hover:bg-surface"
                >
                  <span>FAQ</span>
                  <span className="font-mono text-[0.62rem] text-muted-foreground">05</span>
                </a>
                <a 
                  href="https://wa.me/918086482422" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-brand/10 border border-brand/20 px-3.5 py-2.5 font-display text-xs font-bold text-brand-glow transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[0.68rem] text-muted-foreground font-display">
                <span>Kerala, India — Remote</span>
                <span className="flex items-center gap-1.5 text-brand-glow font-semibold">
                  <span className="size-1.5 rounded-full bg-brand-glow animate-pulse"></span>
                  Open for work
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section id="top" className="relative overflow-hidden pt-20 sm:pt-36 md:pt-44">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
            {/* Top Status Strip */}
            <div className="rule-b hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 pb-4 font-display text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="flex items-center gap-2 text-brand-glow">
                <span className="size-1.5 rounded-full bg-brand-glow animate-pulse"></span>
                Open to interesting work
              </span>
              <span>/</span>
              <span>Kerala, India — remote</span>
              <span className="ml-auto hidden lg:inline">Personal site of Jazeel Zainudeen</span>
            </div>

            {/* Main Hero Header & Paragraph */}
            <div className="grid grid-cols-12 gap-y-8 pt-4 sm:pt-16 md:pt-20 lg:gap-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="col-span-12 lg:col-span-9"
              >
                <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl lg:text-[6.2rem]">
                  Hi, I&apos;m Jazeel.<br />
                  I build <span className="text-brand-glow">software</span><br />
                  <span className="text-muted-foreground">for real work.</span>
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="col-span-12 lg:col-span-5 lg:col-start-8 lg:-mt-16"
              >
                <p className="rule-l pl-5 sm:pl-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  A full stack developer from Kerala, India. For the past five years I&apos;ve spent my days building ERP, CRM and HRMS systems, modernizing old codebases, and keeping them alive long after launch. This is my corner of the internet.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a 
                    href="#contact" 
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-3.5 font-display text-xs font-semibold tracking-wider text-ink-foreground shadow-md transition-all hover:bg-ink/90 active:scale-95"
                  >
                    <span>Book a discovery call</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:translate-x-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </a>
                  <a 
                    href="https://wa.me/918086482422?text=Hi%20Jazeel%2C%20saw%20your%20site%20%E2%80%94%20wanted%20to%20say%20hi." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-background px-7 py-3.5 font-display text-xs font-semibold tracking-wider text-foreground shadow-sm transition-all hover:bg-surface hover:border-brand-glow/40 active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle text-brand-glow">
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    <span>Direct WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Stats Row - Spacious layout with Framer Motion staggered entrance */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mt-14 sm:mt-20 md:mt-24 grid grid-cols-12 gap-y-6 pb-16 sm:pb-24"
            >
              <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div whileHover={{ y: -3 }} className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">01</span>Full Stack since 2019
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">02</span>Next.js · React · TypeScript
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">03</span>ERP, CRM &amp; HRMS
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} className="rule-t rounded-xl border border-white/5 bg-surface/30 p-5 font-display text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-surface/60">
                    <span className="index-num block sm:inline mr-3 text-xs sm:text-sm font-bold text-brand-glow">04</span>Kerala, India — Remote
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Banner */}
        <section aria-label="Tech stack" className="bg-ink py-10 text-ink-foreground">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <p className="font-display text-[0.68rem] uppercase tracking-[0.24em] text-ink-foreground/50">Tools I work with every day</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">Next.js<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">React<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">TypeScript<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">Node.js<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">Tailwind CSS<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">PostgreSQL<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">REST &amp; GraphQL<span className="h-4 w-px bg-ink-foreground/25" aria-hidden="true"></span></span>
              <span className="flex items-center gap-6 font-display text-lg font-medium tracking-tight text-ink-foreground/85 sm:text-xl">Cloud / Serverless</span>
            </div>
          </div>
        </section>

        {/* About Section - Soft Surface Background */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-surface/50 py-14 sm:bg-transparent sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">About</span>
              <span className="index-num text-xs text-muted-foreground">01</span>
            </div>
            <div className="grid grid-cols-12 gap-y-8 pt-8 lg:gap-x-12">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="relative">
                  <div className="absolute -bottom-4 -right-4 hidden h-full w-full bg-sand sm:block"></div>
                  <img 
                    src="/portrait-BNAY2NPR.jpg" 
                    alt="Jazeel Zainudeen, Full Stack Developer" 
                    width="768" 
                    height="896" 
                    loading="lazy" 
                    className="relative aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
                  A little<br />about me
                </h2>
                <p className="mt-7 max-w-xl text-muted-foreground">
                  I&apos;m <span className="font-medium text-foreground">Jazeel Zainudeen</span>, a full stack engineer based in Kerala, India. Over the last five years I&apos;ve built production web applications, high-performance Cloud solutions, ERP systems, CRM platforms, and internal automations that quietly save teams hours every week.
                </p>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  I&apos;ve worked with small teams and larger companies across manufacturing, logistics, healthcare and recruitment. I specialize in modern JavaScript/TypeScript ecosystems, micro-frontends, and robust cloud backend architectures.
                </p>
                <div className="mt-10 grid grid-cols-3">
                  <div className="rule-t py-4 pr-3">
                    <div className="index-num text-3xl font-semibold sm:text-4xl">5+</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Years building</div>
                  </div>
                  <div className="rule-t py-4 pr-3">
                    <div className="index-num text-3xl font-semibold sm:text-4xl">20+</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Systems shipped</div>
                  </div>
                  <div className="rule-t py-4 pr-3">
                    <div className="index-num text-3xl font-semibold sm:text-4xl">4</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Industries</div>
                  </div>
                </div>
                <div className="mt-10">
                  <p className="eyebrow mb-4">Core expertise</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <span className="font-display text-sm text-muted-foreground">Next.js 15</span>
                    <span className="font-display text-sm text-muted-foreground">React 19</span>
                    <span className="font-display text-sm text-muted-foreground">TypeScript</span>
                    <span className="font-display text-sm text-muted-foreground">Node.js</span>
                    <span className="font-display text-sm text-muted-foreground">Tailwind CSS</span>
                    <span className="font-display text-sm text-muted-foreground">PostgreSQL</span>
                    <span className="font-display text-sm text-muted-foreground">Cloud Architecture</span>
                    <span className="font-display text-sm text-muted-foreground">Enterprise Web Applications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services Section - Clean Background */}
        <section id="services" className="bg-background py-14 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">What I work on</span>
              <span className="index-num text-xs text-muted-foreground">02</span>
            </div>
            <div className="grid grid-cols-12 gap-y-6 pt-8 lg:gap-x-12">
              <h2 className="col-span-12 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-6">
                The kind of things<br />I build
              </h2>
              <p className="col-span-12 max-w-xl self-end text-muted-foreground lg:col-span-5 lg:col-start-8">
                Most of my work lives inside companies rather than on the open web — internal systems for manufacturing, logistics, healthcare and recruitment teams.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service, i) => (
                <motion.article 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group rule-t flex flex-col p-6 transition-colors hover:bg-surface sm:p-8 ${service.colSpan} ${service.ruleL}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="index-num text-4xl font-semibold text-sand transition-colors group-hover:text-brand">{service.num}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true">
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex gap-3">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-brand"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="rule-t mt-auto pt-5 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-display font-semibold uppercase tracking-[0.14em] text-foreground">Solves — </span>
                    {service.solves}
                  </p>
                  <a href="#contact" className="link-rule mt-6 inline-flex w-fit items-center gap-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                    Ask me about this
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* How I Work / Why Work With Me Section - Dark Ink */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-ink py-14 text-ink-foreground sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-ink-foreground/20 pb-4">
              <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink-foreground/60">How I work</span>
              <span className="index-num text-xs text-ink-foreground/50">03</span>
            </div>
            <h2 className="max-w-3xl pt-8 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
              A few things<br />worth knowing
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {whyWorkWithMeData.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`border-t border-ink-foreground/20 py-6 pr-6 ${item.ruleL}`}
                >
                  <span className="index-num text-xs text-ink-foreground/45">{item.num}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/65">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Process Section - Soft Surface Background */}
        <motion.section 
          id="process" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-surface/50 py-14 sm:bg-transparent sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">My process</span>
              <span className="index-num text-xs text-muted-foreground">04</span>
            </div>
            <h2 className="max-w-3xl pt-8 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
              How a project<br />usually goes
            </h2>
            <div className="mt-10">
              {processData.map((p, pIdx) => (
                <motion.div 
                  key={pIdx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: pIdx * 0.08 }}
                  className="rule-t group grid grid-cols-12 items-baseline gap-y-2 py-5 transition-colors hover:bg-surface"
                >
                  <span className="index-num col-span-12 text-3xl font-semibold text-sand transition-colors group-hover:text-brand sm:col-span-2 sm:text-5xl">{p.step}</span>
                  <h3 className="col-span-12 font-display text-xl font-semibold sm:col-span-4">{p.title}</h3>
                  <p className="col-span-12 text-sm text-muted-foreground sm:col-span-6">{p.description}</p>
                </motion.div>
              ))}
              <div className="rule-t"></div>
            </div>
          </div>
        </motion.section>

        {/* Selected Work Section - Clean Background */}
        <section id="work" className="bg-background py-14 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">Things I&apos;ve built</span>
              <span className="index-num text-xs text-muted-foreground">05</span>
            </div>
            <div className="grid grid-cols-12 gap-y-6 pt-8 lg:gap-x-12">
              <h2 className="col-span-12 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-6">
                A few projects<br />I&apos;m proud of
              </h2>
              <p className="col-span-12 max-w-xl self-end text-muted-foreground lg:col-span-5 lg:col-start-8">
                Most of this work sits behind NDAs, so it&apos;s described by domain rather than by client name.
              </p>
            </div>
            <div className="mt-10 space-y-12 sm:space-y-20">
              {selectedWorkData.map((work, wIdx) => (
                <motion.article 
                  key={wIdx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: wIdx * 0.1 }}
                  className="group grid grid-cols-12 gap-y-6 lg:gap-x-12"
                >
                  <div className={`col-span-12 lg:col-span-7 ${work.orderImage}`}>
                    <div className="relative overflow-hidden rounded-xl border border-border/50 shadow-md transition-shadow group-hover:shadow-xl">
                      <img 
                        src={work.image} 
                        alt={work.alt} 
                        loading="lazy" 
                        width="1024" 
                        height="640" 
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-0 top-0 inline-flex items-center gap-1.5 bg-ink px-3 py-1.5 font-display text-[0.62rem] uppercase tracking-[0.16em] text-ink-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock size-3" aria-hidden="true">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        NDA Signed
                      </span>
                    </div>
                  </div>
                  <div className={`col-span-12 self-center lg:col-span-4 ${work.orderText}`}>
                    <span className="index-num text-xs text-muted-foreground">{work.num} / {work.tag}</span>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl transition-colors group-hover:text-brand-glow">{work.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{work.description}</p>
                    <p className="rule-t mt-6 pt-5 text-sm">
                      <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">Impact — </span>
                      <span className="text-muted-foreground">{work.impact}</span>
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Soft Surface Background */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-surface/50 py-14 sm:bg-transparent sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">Kind words</span>
              <span className="index-num text-xs text-muted-foreground">06</span>
            </div>
            <h2 className="max-w-3xl pt-8 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
              What people<br />I&apos;ve worked with say
            </h2>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3">
              {testimonialsData.map((t, tIdx) => (
                <motion.figure 
                  key={tIdx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: tIdx * 0.1 }}
                  className={`rule-t flex flex-col py-6 pr-8 ${t.ruleL}`}
                >
                  <span className="font-display text-4xl leading-none text-sand">“</span>
                  <blockquote className="mt-3 font-display text-base leading-snug tracking-tight text-foreground sm:text-lg">
                    {t.quote}
                  </blockquote>
                  <figcaption className="rule-t mt-auto pt-4">
                    <div className="font-display text-sm font-semibold">{t.author}</div>
                    <div className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.company}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section - Clean Background */}
        <motion.section 
          id="faq" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-background py-14 sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="rule-b flex items-baseline justify-between pb-4">
              <span className="eyebrow">FAQ</span>
              <span className="index-num text-xs text-muted-foreground">07</span>
            </div>
            <div className="grid grid-cols-12 gap-y-8 pt-8 lg:gap-x-12">
              <h2 className="col-span-12 font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-4">
                Questions,<br />answered
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
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden text-sm"
                            >
                              <div className="pb-5 text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  <div className="rule-t"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden bg-ink py-14 text-ink-foreground sm:py-32"
        >
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex items-baseline justify-between border-b border-ink-foreground/20 pb-4">
              <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink-foreground/60">Say hello</span>
              <span className="index-num text-xs text-ink-foreground/50">08</span>
            </div>
            <div className="grid grid-cols-12 gap-y-12 pt-14 lg:gap-x-12">
              <div className="col-span-12 lg:col-span-5">
                <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
                  Let&apos;s have<br />a conversation
                </h2>
                <p className="mt-6 max-w-md text-ink-foreground/65">
                  An idea, a question, or just hello — drop me a line and I usually reply within a day. WhatsApp works too, if that&apos;s easier.
                </p>
                <div className="mt-10">
                  <a href="tel:+918086482422" className="flex items-center gap-3 border-t border-ink-foreground/20 py-4 text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone size-4 text-brand" aria-hidden="true">
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                    </svg>
                    +91 80864 82422
                  </a>
                  <a href="mailto:zainudheenjazeel@gmail.com" className="flex items-center gap-3 border-t border-ink-foreground/20 py-4 text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-4 text-brand" aria-hidden="true">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    zainudheenjazeel@gmail.com
                  </a>
                  <a href="https://wa.me/918086482422" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border-y border-ink-foreground/20 py-4 text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle size-4 text-brand" aria-hidden="true">
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="col-span-12 space-y-5 lg:col-span-6 lg:col-start-7" noValidate>
                {formSubmitted ? (
                  <div className="border border-ink-foreground/25 p-8 text-center">
                    <h3 className="font-display text-xl font-semibold mb-2 text-ink-foreground">Calendly Opened!</h3>
                    <p className="text-ink-foreground/75 text-sm mb-4">
                      A new tab has opened with my calendar. Pick a 30-minute slot that works for you.
                    </p>
                    {calendlyUrl && (
                      <p className="text-ink-foreground/60 text-xs mb-6">
                        Popup didn&apos;t open?{" "}
                        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                          Click here to open Calendly
                        </a>
                      </p>
                    )}
                    <button 
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="inline-flex items-center justify-center gap-2 bg-background px-6 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/55">Name</span>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="name" 
                          className="w-full border border-ink-foreground/25 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand" 
                          placeholder="Your full name" 
                        />
                        {touched.name && formErrors.name && (
                          <span className="mt-1 block text-xs text-red-400">{formErrors.name}</span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/55">Company</span>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          autoComplete="organization" 
                          className="w-full border border-ink-foreground/25 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand" 
                          placeholder="Company name" 
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/55">Email</span>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="email" 
                          className="w-full border border-ink-foreground/25 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand" 
                          placeholder="you@company.com" 
                        />
                        {touched.email && formErrors.email && (
                          <span className="mt-1 block text-xs text-red-400">{formErrors.email}</span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/55">Phone</span>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="tel" 
                          className="w-full border border-ink-foreground/25 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand" 
                          placeholder="+91 ..." 
                        />
                        {touched.phone && formErrors.phone && (
                          <span className="mt-1 block text-xs text-red-400">{formErrors.phone}</span>
                        )}
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/55">Project Type</span>
                      <select 
                        name="projectType" 
                        value={formData.projectType}
                        onChange={handleFormChange}
                        className="w-full border border-ink-foreground/25 bg-transparent px-4 py-3 text-sm text-ink-foreground outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                      >
                        <option value="Custom ERP Development" className="bg-ink text-ink-foreground">Custom ERP Development</option>
                        <option value="CRM Development" className="bg-ink text-ink-foreground">CRM Development</option>
                        <option value="HRMS Development" className="bg-ink text-ink-foreground">HRMS Development</option>
                        <option value="Business Process Automation" className="bg-ink text-ink-foreground">Business Process Automation</option>
                        <option value="Custom Business Software" className="bg-ink text-ink-foreground">Custom Business Software</option>
                        <option value="Legacy System Modernization" className="bg-ink text-ink-foreground">Legacy System Modernization</option>
                        <option value="Web Application Maintenance" className="bg-ink text-ink-foreground">Web Application Maintenance</option>
                        <option value="Next.js &amp; Payload CMS" className="bg-ink text-ink-foreground">Next.js &amp; Payload CMS</option>
                        <option value="Laravel Development" className="bg-ink text-ink-foreground">Laravel Development</option>
                        <option value="PHP Development" className="bg-ink text-ink-foreground">PHP Development</option>
                        <option value="React Development" className="bg-ink text-ink-foreground">React Development</option>
                        <option value="MERN Stack Development" className="bg-ink text-ink-foreground">MERN Stack Development</option>
                        <option value="Dedicated Remote Developer" className="bg-ink text-ink-foreground">Dedicated Remote Developer</option>
                        <option value="Other / Not Sure" className="bg-ink text-ink-foreground">Other / Not Sure</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/55">Message</span>
                      <textarea 
                        name="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={handleFormChange}
                        onBlur={handleFormBlur}
                        className="w-full border border-ink-foreground/25 bg-transparent px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/40 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand" 
                        placeholder="Tell me a bit about what you have in mind."
                      ></textarea>
                      {touched.message && formErrors.message && (
                        <span className="mt-1 block text-xs text-red-400">{formErrors.message}</span>
                      )}
                    </label>

                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 bg-background px-6 py-4 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-brand hover:text-white disabled:opacity-70"
                    >
                      {formSubmitting ? "Sending..." : "Send message"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="rule-t bg-background pt-16 pb-10">
        <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight">
                <img 
                  src="/logo.png" 
                  alt="Jazeel" 
                  className="h-8 w-8 rounded-full border border-border object-cover" 
                />
                <span>Jazeel<span className="text-brand">.dev</span></span>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Full stack developer from Kerala, India. I build and look after business software — ERP, CRM, HRMS and the odd IoT platform.
              </p>
              <div className="mt-6 flex gap-2">
                <a 
                  href="https://wa.me/918086482422" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp" 
                  className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle size-4" aria-hidden="true">
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/jazeel-zainudeen/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn" 
                  className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-4" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a 
                  href="mailto:zainudheenjazeel@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Email" 
                  className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-4" aria-hidden="true">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                </a>
                <a 
                  href="tel:+918086482422" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Phone" 
                  className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone size-4" aria-hidden="true">
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow">Quick Links</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Services</a></li>
                <li><a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">About</a></li>
                <li><a href="#process" className="text-muted-foreground transition-colors hover:text-foreground">Process</a></li>
                <li><a href="#work" className="text-muted-foreground transition-colors hover:text-foreground">Work</a></li>
                <li><a href="#faq" className="text-muted-foreground transition-colors hover:text-foreground">FAQ</a></li>
                <li><a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</a></li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">What I do</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">ERP Development</a></li>
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">CRM Development</a></li>
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">HRMS Development</a></li>
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Web App Maintenance</a></li>
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Legacy Modernization</a></li>
                <li><a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Dedicated Developer</a></li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="text-muted-foreground">
                  <span className="block font-medium text-foreground">Jazeel Zainudeen</span>
                  Full Stack Developer
                </li>
                <li><a href="tel:+918086482422" className="text-muted-foreground transition-colors hover:text-foreground">+91 80864 82422</a></li>
                <li><a href="mailto:zainudheenjazeel@gmail.com" className="text-muted-foreground transition-colors hover:text-foreground">zainudheenjazeel@gmail.com</a></li>
                <li><a href="https://wa.me/918086482422" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">wa.me/918086482422</a></li>
              </ul>
            </div>
          </div>

          <div className="rule-t mt-14 flex flex-col items-center justify-between gap-3 pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© 2026 Jazeel Zainudeen. All rights reserved.</p>
            <p>Personal site — built and maintained by me.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
