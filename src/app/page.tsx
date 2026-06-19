"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }
};

const fadeInDelay = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const, delay }
});

const heroFadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }
};

const aboutImageAnim = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }
};

const aboutTextAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }
};

const serviceCardAnim = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] as const }
});

const whyCardAnim = (index: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] as const }
});

const processStepAnim = (index: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] as const }
});

const workCardAnim = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] as const }
});

const testimonialCardAnim = (index: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] as const }
});

const servicesData = [
  {
    title: "ERP Development",
    description: "Custom ERP development services tailored to inventory, finance, manufacturing and operations workflows.",
    benefits: [
      "Unified data across departments",
      "Real-time reporting",
      "Scales with your business"
    ],
    solves: "Replaces spreadsheets, disconnected tools and slow manual processes.",
    icon: "database"
  },
  {
    title: "CRM Development",
    description: "Bespoke CRM development from a focused CRM development company — built around your sales pipeline, not someone else's.",
    benefits: [
      "360° customer view",
      "Sales automation",
      "Custom pipelines & reports"
    ],
    solves: "Lost leads, no follow-up visibility, sales teams stuck in email.",
    icon: "users"
  },
  {
    title: "HRMS Development",
    description: "HRMS software development covering attendance, payroll, leave, performance and employee self-service.",
    benefits: [
      "Payroll & attendance in one place",
      "Employee self-service portal",
      "Compliance-ready reports"
    ],
    solves: "Manual HR ops, payroll errors, scattered employee data.",
    icon: "users-round"
  },
  {
    title: "Web Application Maintenance",
    description: "Reliable web application maintenance and software maintenance services — bug fixes, security patches, feature work and uptime support.",
    benefits: [
      "Predictable monthly retainers",
      "Performance & security monitoring",
      "Fast response SLAs"
    ],
    solves: "Aging codebases, broken features, no dev on call.",
    icon: "wrench"
  },
  {
    title: "Legacy Software Modernization",
    description: "Legacy application modernization — re-architect old PHP, jQuery or desktop apps into modern Laravel + React stacks.",
    benefits: [
      "Modern UI / UX",
      "Cloud-ready architecture",
      "Lower hosting costs"
    ],
    solves: "Outdated tech, security risks, vendors that disappeared.",
    icon: "refresh-cw"
  },
  {
    title: "Dedicated Full Stack Developer",
    description: "Hire a remote software developer on a monthly basis — direct communication, your roadmap, your codebase.",
    benefits: [
      "Full-time or part-time",
      "Async + daily standups",
      "No agency overhead"
    ],
    solves: "Need consistent dev velocity without hiring full-time.",
    icon: "code-xml"
  }
];

const whyWorkWithMeData = [
  {
    title: "5+ Years Experience",
    description: "Shipped production systems across ERP, CRM, HRMS and IoT-driven platforms.",
    icon: "award"
  },
  {
    title: "Business-Focused Development",
    description: "Software that maps to real workflows — not abstract feature lists.",
    icon: "target"
  },
  {
    title: "Long-Term Maintenance",
    description: "Stay on as your maintenance partner. Predictable retainers, fast response.",
    icon: "life-buoy"
  },
  {
    title: "Scalable Architecture",
    description: "Clean Laravel + React foundations that grow from MVP to enterprise.",
    icon: "layers"
  },
  {
    title: "Fast Communication",
    description: "Direct line. No account managers, no week-long email threads.",
    icon: "message-square"
  },
  {
    title: "Cost-Effective Alternative",
    description: "Agency-quality output without agency overhead pricing.",
    icon: "wallet"
  }
];

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
    title: "Retail Operations Platform",
    tag: "Retail · India",
    description: "Internal business platform supporting one of India's largest electronics retail chains with operations, inventory and reporting modules.",
    impact: "Streamlined multi-branch workflows and reduced manual reporting time across stores.",
    image: "project-myg-CQpClQIo.jpg"
  },
  {
    title: "Handyman Marketplace App",
    tag: "On-demand services",
    description: "Two-sided mobile platform connecting customers with verified handymen — bookings, live tracking, in-app payments and provider onboarding.",
    impact: "Replaced WhatsApp-based dispatch with a fully automated booking & payout pipeline.",
    image: "project-handyman-Bz-oztfK.jpg"
  },
  {
    title: "HRMS — Software Revamp",
    tag: "Recruitment & HR",
    description: "Complete revamp of a legacy HRMS used by a recruitment group — attendance, payroll, leave management and employee self-service.",
    impact: "Cut payroll processing time and modernized the UX for hundreds of daily users.",
    image: "project-hrms-AYNMxAXq.jpg"
  },
  {
    title: "IoT Gas Station Management Portal",
    tag: "Energy · IoT",
    description: "Full IoT-integrated web application + API layer for fuel station operations — live pump telemetry, sales reconciliation and admin dashboards.",
    impact: "Real-time visibility into pump activity and automated end-of-day sales reporting.",
    image: "project-gasstation-DLudRX2w.jpg"
  }
];

const testimonialsData = [
  {
    quote: "Jazeel rebuilt our internal production tracking tool from a tangled spreadsheet into a real ERP module. Reporting that used to take a full day now runs in minutes.",
    author: "Operations Director",
    company: "Manufacturing Company",
    initials: "MC"
  },
  {
    quote: "Our HRMS revamp was on time, on scope, and the team still maintains it on a monthly retainer. Communication is the best we've had with any developer.",
    author: "Head of Talent",
    company: "Recruitment Agency",
    initials: "RA"
  },
  {
    quote: "We needed a logistics dashboard tied into our existing systems. The API work and the React UI were both rock solid — leads now have clear delivery visibility.",
    author: "Founder",
    company: "Logistics Company",
    initials: "LC"
  }
];

export default function Home() {
  const basePath = "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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

  const faqs: FAQItem[] = [
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
      answer: "Absolutely. I regularly take over existing Laravel, PHP, React and MERN codebases — including legacy application modernization, refactors, and adding new modules without breaking what already works."
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
      answer: "Primary stack: Laravel, PHP, React, Next.js, MERN stack, MySQL, REST APIs, Tailwind CSS and Payload CMS. The right choice depends on your existing systems and long-term goals — I'll recommend based on fit, not fashion."
    }
  ];

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

    // Build Calendly URL with prefilled params
    const calendlyBase = "https://calendly.com/zainudheenjazeel/30min";
    const params = new URLSearchParams();
    if (formData.name) params.set("name", formData.name);
    if (formData.email) params.set("email", formData.email);
    if (formData.phone) params.set("a1", formData.phone);
    const calendlyUrl = `${calendlyBase}?${params.toString()}`;

    // Open Calendly immediately (must be synchronous to avoid popup blocker)
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");

    // Update UI state after a brief delay
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

  const renderServiceIcon = (icon: string) => {
    switch (icon) {
      case "database":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database size-5" aria-hidden="true">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
            <path d="M3 12A9 3 0 0 0 21 12"></path>
          </svg>
        );
      case "users":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users size-5" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        );
      case "users-round":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round size-5" aria-hidden="true">
            <path d="M18 21a8 8 0 0 0-16 0"></path>
            <circle cx="10" cy="8" r="5"></circle>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
          </svg>
        );
      case "wrench":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench size-5" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"></path>
          </svg>
        );
      case "refresh-cw":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw size-5" aria-hidden="true">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M8 16H3v5"></path>
          </svg>
        );
      case "code-xml":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml size-5" aria-hidden="true">
            <path d="m18 16 4-4-4-4"></path>
            <path d="m6 8-4 4 4 4"></path>
            <path d="m14.5 4-5 16"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const renderWhyIcon = (icon: string) => {
    switch (icon) {
      case "award":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award size-5" aria-hidden="true">
            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
            <circle cx="12" cy="8" r="6"></circle>
          </svg>
        );
      case "target":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target size-5" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        );
      case "life-buoy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-life-buoy size-5" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m4.93 4.93 4.24 4.24"></path>
            <path d="m14.83 9.17 4.24-4.24"></path>
            <path d="m14.83 14.83 4.24 4.24"></path>
            <path d="m9.17 14.83-4.24 4.24"></path>
            <circle cx="12" cy="12" r="4"></circle>
          </svg>
        );
      case "layers":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers size-5" aria-hidden="true">
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
          </svg>
        );
      case "message-square":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square size-5" aria-hidden="true">
            <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case "wallet":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet size-5" aria-hidden="true">
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark relative min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-background/70 border-b border-border' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
            <img 
              src={`${basePath}/logo.png`} 
              alt="Jazeel" 
              className="h-9 w-9 rounded-full border border-border bg-surface object-cover" 
            />
            <span>
              Jazeel<span className="text-gradient">.dev</span>
            </span>
          </a>
          
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Services</a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
            <a href="#process" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Process</a>
            <a href="#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Work</a>
            <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="inline-flex items-center rounded-full bg-[image:var(--gradient-brand)] px-4 py-2 text-sm font-medium text-brand-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]">
              Book a call →
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden rounded-md p-2 text-foreground" 
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu size-5" aria-hidden="true">
              <path d="M4 5h16"></path>
              <path d="M4 12h16"></path>
              <path d="M4 19h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md p-6 transition-all duration-300 md:hidden">
          <div className="flex items-center justify-between">
            <a href="#top" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 font-display text-lg font-semibold">
              <img 
                src={`${basePath}/logo.png`} 
                alt="Jazeel" 
                className="h-9 w-9 rounded-full border border-border bg-surface object-cover" 
              />
              <span>Jazeel<span className="text-gradient">.dev</span></span>
            </a>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2 text-foreground" 
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x size-6">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-6 mt-16 text-center text-xl font-medium">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Services
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              About
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Process
            </a>
            <a 
              href="#work" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Work
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-brand)] px-6 py-3.5 text-base font-semibold text-brand-foreground shadow-[var(--shadow-glow)] mt-6"
            >
              Book a call
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="top" className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
          <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"></div>
          <div className="absolute left-1/2 top-10 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[image:var(--gradient-brand)] opacity-20 blur-[120px]"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              {...heroFadeIn}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="size-1.5 rounded-full bg-success animate-pulse"></span>
                Available for new projects · Remote worldwide
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Custom <span className="text-gradient">ERP, CRM &amp; Business</span>
                <br className="hidden sm:block" /> Software Development
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Helping businesses build, maintain and scale mission-critical business applications with over 5 years of full-stack development experience — from custom ERP and CRM platforms to legacy modernization and dedicated remote developer services.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a 
                  href="#contact" 
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  Schedule Free Consultation
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/918086482422?text=Hi%20Jazeel%2C%20I%27d%20like%20to%20discuss%20a%20software%20project." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface-2 sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle size-4" aria-hidden="true">
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                  </svg>
                  WhatsApp Now
                </a>
              </div>
              <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check size-4 text-success" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  5+ Years Experience
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check size-4 text-success" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  Full Stack Development
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check size-4 text-success" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  ERP, CRM &amp; HRMS Solutions
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check size-4 text-success" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  Ongoing Maintenance &amp; Support
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Band */}
        <section aria-label="Tech stack" className="border-y border-border bg-surface/40 py-6 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted stack · Enterprise web applications</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-medium text-muted-foreground/80">
              <span className="transition-colors hover:text-foreground">Laravel</span>
              <span className="transition-colors hover:text-foreground">PHP</span>
              <span className="transition-colors hover:text-foreground">React</span>
              <span className="transition-colors hover:text-foreground">Next.js</span>
              <span className="transition-colors hover:text-foreground">MERN Stack</span>
              <span className="transition-colors hover:text-foreground">MySQL</span>
              <span className="transition-colors hover:text-foreground">Payload CMS</span>
              <span className="transition-colors hover:text-foreground">REST APIs</span>
              <span className="transition-colors hover:text-foreground">Tailwind CSS</span>
              <span className="transition-colors hover:text-foreground">Node.js</span>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div 
                {...aboutImageAnim}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-3xl bg-[image:var(--gradient-brand)] opacity-25 blur-2xl"></div>
                <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-[var(--shadow-elegant)]">
                  <img 
                    src={`${basePath}/portrait-BNAY2NPR.jpg`} 
                    alt="Jazeel Zainudeen, Full Stack Developer" 
                    width="768" 
                    height="896" 
                    className="h-auto w-full object-cover" 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-border bg-background/90 p-4 backdrop-blur sm:block">
                  <div className="text-2xl font-semibold text-gradient">5+ yrs</div>
                  <div className="text-xs text-muted-foreground">Full stack experience</div>
                </div>
              </motion.div>
              <motion.div 
                {...aboutTextAnim}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">About</span>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Meet Your Software Development Partner</h2>
                <p className="mt-5 text-muted-foreground">
                  I&apos;m <span className="font-medium text-foreground">Jazeel Zainudeen</span>, a Full Stack Developer with 5+ years of experience building and maintaining business-critical applications. I help companies develop custom ERP systems, CRM platforms, HRMS solutions, internal business tools, customer portals and workflow automation software.
                </p>
                <p className="mt-4 text-muted-foreground">
                  From SMBs to enterprises in manufacturing, logistics, healthcare and recruitment — I deliver scalable enterprise application development with long-term maintenance support.
                </p>
                <div className="mt-7">
                  <p className="mb-3 text-sm font-medium text-foreground">Core expertise</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">Laravel</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">PHP</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">React</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">MySQL</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">REST APIs</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">Tailwind CSS</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">Enterprise Web Applications</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">Services</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Custom business software, end to end</h2>
              <p className="mt-4 text-muted-foreground">Custom software development for SMBs, manufacturing, logistics, healthcare, recruitment and enterprises that need business process automation that actually ships.</p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service, index) => (
                <motion.article 
                  key={index}
                  {...serviceCardAnim(index)}
                  className="group relative flex flex-col rounded-2xl border border-border bg-[image:var(--gradient-surface)] p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-glow)]"
                >
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-surface-2 text-brand-glow ring-1 ring-border">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {service.benefits.map((benefit, bIndex) => (
                      <li key={bIndex} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-brand-glow"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-lg border border-border bg-background/40 p-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Solves:</span> {service.solves}
                  </p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-glow">
                    Discuss this service
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right size-4" aria-hidden="true">
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Me Section */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">Why work with me</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">A senior developer, not a sales pitch</h2>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyWorkWithMeData.map((item, index) => (
                <motion.div 
                  key={index}
                  {...whyCardAnim(index)}
                  className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur"
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-brand-foreground">
                    {renderWhyIcon(item.icon)}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">How we work</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">A predictable, transparent process</h2>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {processData.map((step, index) => (
                <motion.div 
                  key={index}
                  {...processStepAnim(index)}
                  className="relative overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-surface)] p-6"
                >
                  <span className="absolute -right-2 -top-4 font-display text-7xl font-bold text-foreground/[0.05]">{step.step}</span>
                  <div className="relative">
                    <span className="font-display text-sm font-semibold text-brand-glow">Step {step.step}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section id="work" className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">Selected work</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Real business software, shipped</h2>
              <p className="mt-4 text-muted-foreground">A few highlights — several client engagements are under NDA, described here by domain only.</p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {selectedWorkData.map((project, index) => (
                <motion.article 
                  key={index}
                  {...workCardAnim(index)}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-elegant)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-background">
                    <img 
                      src={`${basePath}/${project.image}`} 
                      alt={`${project.title} — ${project.tag}`} 
                      loading="lazy" 
                      width="1024" 
                      height="640" 
                      className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"></div>
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock size-3" aria-hidden="true">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      NDA Signed
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                      <span className="text-xs text-muted-foreground">{project.tag}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                    <p className="mt-4 border-t border-border pt-4 text-sm">
                      <span className="font-medium text-brand-glow">Impact: </span>
                      <span className="text-muted-foreground">{project.impact}</span>
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">Testimonials</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Trusted by teams that ship</h2>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {testimonialsData.map((item, index) => (
                <motion.figure 
                  key={index}
                  {...testimonialCardAnim(index)}
                  className="relative flex flex-col rounded-2xl border border-border bg-[image:var(--gradient-surface)] p-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote size-7 text-brand-glow/60" aria-hidden="true">
                    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                  </svg>
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                    &quot;{item.quote}&quot;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="grid size-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-semibold text-brand-foreground">{item.initials}</div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.author}</div>
                      <div className="text-xs text-muted-foreground">{item.company}</div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-16 sm:py-20">
          <motion.div 
            {...fadeIn}
            className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">FAQ</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Questions, answered</h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className="rounded-2xl border border-border bg-surface/60 px-5 backdrop-blur"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => handleFaqToggle(index)}
                        aria-expanded={isOpen}
                        className="flex flex-1 w-full items-center justify-between cursor-pointer py-5 text-left font-display text-base font-medium text-foreground hover:no-underline"
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
                          className={`lucide lucide-chevron-down h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                          role="region"
                        >
                          <div className="pt-0 pb-5 text-sm leading-relaxed text-muted-foreground">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-brand)] opacity-15 blur-[120px]"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              {...fadeIn}
              className="grid gap-10 rounded-3xl border border-border bg-[image:var(--gradient-surface)] p-6 shadow-[var(--shadow-elegant)] sm:p-10 lg:grid-cols-5 lg:p-14"
            >
              <div className="lg:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-glow">Get in touch</span>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Let&apos;s discuss your software project</h2>
                <p className="mt-4 text-muted-foreground">Share a few details and book a free 30-minute consultation call directly on my calendar.</p>
                <div className="mt-8 space-y-4 text-sm">
                  <a href="tel:+918086482422" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone size-4 text-brand-glow" aria-hidden="true">
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                    </svg>
                    +91 80864 82422
                  </a>
                  <a href="mailto:zainudheenjazeel@gmail.com" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-4 text-brand-glow" aria-hidden="true">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    zainudheenjazeel@gmail.com
                  </a>
                  <a href="https://wa.me/918086482422" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle size-4 text-brand-glow" aria-hidden="true">
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 h-full bg-surface-2/40 border border-border/30 rounded-2xl backdrop-blur">
                    <div className="size-16 rounded-full bg-success/20 text-success flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">Calendly is Open!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mb-6">
                      A new tab has opened with my calendar. Pick a 30-minute slot that works for you and I&apos;ll confirm within hours.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:bg-surface-2 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Name *</span>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="name" 
                          required
                          className={`w-full rounded-lg border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:ring-2 ${
                            formErrors.name 
                              ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                              : 'border-input focus:border-brand focus:ring-brand/30'
                          }`}
                          placeholder="Your full name" 
                        />
                        {formErrors.name && (
                          <span className="mt-1.5 block text-xs text-destructive">{formErrors.name}</span>
                        )}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Company</span>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          autoComplete="organization" 
                          className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30" 
                          placeholder="Company name" 
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Email *</span>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="email" 
                          required
                          className={`w-full rounded-lg border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:ring-2 ${
                            formErrors.email 
                              ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                              : 'border-input focus:border-brand focus:ring-brand/30'
                          }`}
                          placeholder="you@company.com" 
                        />
                        {formErrors.email && (
                          <span className="mt-1.5 block text-xs text-destructive">{formErrors.email}</span>
                        )}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone</span>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          autoComplete="tel" 
                          className={`w-full rounded-lg border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:ring-2 ${
                            formErrors.phone 
                              ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                              : 'border-input focus:border-brand focus:ring-brand/30'
                          }`}
                          placeholder="+91 ..." 
                        />
                        {formErrors.phone && (
                          <span className="mt-1.5 block text-xs text-destructive">{formErrors.phone}</span>
                        )}
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Project Type</span>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleFormChange}
                        className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30 appearance-none"
                      >
                        <option value="Custom ERP Development">Custom ERP Development</option>
                        <option value="CRM Development">CRM Development</option>
                        <option value="HRMS Development">HRMS Development</option>
                        <option value="Business Process Automation">Business Process Automation</option>
                        <option value="Custom Business Software">Custom Business Software</option>
                        <option value="Legacy System Modernization">Legacy System Modernization</option>
                        <option value="Web Application Maintenance">Web Application Maintenance</option>
                        <option value="Next.js &amp; Payload CMS">Next.js &amp; Payload CMS</option>
                        <option value="Laravel Development">Laravel Development</option>
                        <option value="PHP Development">PHP Development</option>
                        <option value="React Development">React Development</option>
                        <option value="MERN Stack Development">MERN Stack Development</option>
                        <option value="Dedicated Remote Developer">Dedicated Remote Developer</option>
                        <option value="Other / Not Sure">Other / Not Sure</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Message *</span>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        onBlur={handleFormBlur}
                        rows={5} 
                        required
                        className={`w-full rounded-lg border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:ring-2 ${
                          formErrors.message 
                            ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                            : 'border-input focus:border-brand focus:ring-brand/30'
                        }`}
                        placeholder="Tell me about your business, current systems and what you'd like to build or improve."
                      ></textarea>
                      {formErrors.message && (
                        <span className="mt-1.5 block text-xs text-destructive">{formErrors.message}</span>
                      )}
                    </label>
                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01] disabled:opacity-70 cursor-pointer"
                    >
                      {formSubmitting ? (
                        <>
                          <svg className="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          Opening Calendly...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          Book Free Consultation
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/80 pt-16 pb-10 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-semibold">
                <img 
                  src={`${basePath}/logo.png`} 
                  alt="Jazeel" 
                  className="h-7 w-7 rounded-full border border-border bg-surface object-cover" 
                />
                <span>Jazeel<span className="text-gradient">.dev</span></span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Full Stack Developer specializing in custom ERP, CRM, HRMS and business process automation for SMBs and enterprises worldwide.</p>
              <div className="mt-5 flex gap-3">
                <a 
                  href="https://wa.me/918086482422" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp" 
                  className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
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
                  className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
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
                  className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
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
                  className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone size-4" aria-hidden="true">
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <p className="font-display text-sm font-semibold">Quick Links</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Services</a>
                </li>
                <li>
                  <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">About</a>
                </li>
                <li>
                  <a href="#process" className="text-muted-foreground transition-colors hover:text-foreground">Process</a>
                </li>
                <li>
                  <a href="#work" className="text-muted-foreground transition-colors hover:text-foreground">Work</a>
                </li>
                <li>
                  <a href="#faq" className="text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-sm font-semibold">Services</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">ERP Development</a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">CRM Development</a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">HRMS Development</a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Web App Maintenance</a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Legacy Modernization</a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Dedicated Developer</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-sm font-semibold">Contact</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="text-muted-foreground">
                  <span className="block text-foreground">Jazeel Zainudeen</span>
                  Full Stack Developer
                </li>
                <li>
                  <a href="tel:+918086482422" className="text-muted-foreground transition-colors hover:text-foreground">+91 80864 82422</a>
                </li>
                <li>
                  <a href="mailto:zainudheenjazeel@gmail.com" className="text-muted-foreground transition-colors hover:text-foreground">zainudheenjazeel@gmail.com</a>
                </li>
                <li>
                  <a href="https://wa.me/918086482422" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">wa.me/918086482422</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© 2026 Jazeel Zainudeen. All rights reserved.</p>
            <p>Custom Software Development · ERP · CRM · HRMS · Remote Developer</p>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Sticky Call Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex gap-2">
          <a href="#contact" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-brand)] px-4 py-3 text-sm font-semibold text-brand-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days size-4" aria-hidden="true">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg> 
            Book a call
          </a>
          <a href="https://wa.me/918086482422" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle size-4" aria-hidden="true">
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
            </svg> 
            WhatsApp
          </a>
        </div>
      </div>
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
