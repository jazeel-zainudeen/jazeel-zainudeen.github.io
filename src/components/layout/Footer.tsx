"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="rule-t bg-background pt-16 pb-10">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight">
              <Image
                src="/assets/brand/logo.webp"
                alt="Jazeel"
                width={32}
                height={32}
                priority
                sizes="32px"
                className="h-8 w-8 rounded-full border border-border object-cover"
              />
              <span>
                Jazeel<span className="text-brand">.dev</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full stack developer from Kerala, India. I build and look after
              business software — ERP, CRM, HRMS and the odd IoT platform.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).Tawk_API) (window as any).Tawk_API.maximize(); }}
                aria-label="WhatsApp"
                className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
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
                  className="lucide lucide-message-circle size-4"
                  aria-hidden="true"
                >
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
                  className="lucide lucide-linkedin size-4"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).Tawk_API) (window as any).Tawk_API.maximize(); }}
                aria-label="Email"
                className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
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
                  className="lucide lucide-mail size-4"
                  aria-hidden="true"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
              </a>
              <a
                href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).Tawk_API) (window as any).Tawk_API.maximize(); }}
                aria-label="Phone"
                className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
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
                  className="lucide lucide-phone size-4"
                  aria-hidden="true"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow">Quick Links</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#process"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">What I do</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  ERP Development
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  CRM Development
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  HRMS Development
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Web App Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Legacy Modernization
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dedicated Developer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="text-muted-foreground">
                <span className="block font-medium text-foreground">
                  Jazeel Zainudeen
                </span>
                Full Stack Developer
              </li>
              <li>
                <a
                  href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).Tawk_API) (window as any).Tawk_API.maximize(); }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  +91 80864 82422
                </a>
              </li>
              <li>
                <a
                  href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).Tawk_API) (window as any).Tawk_API.maximize(); }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  zainudheenjazeel@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).Tawk_API) (window as any).Tawk_API.maximize(); }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  wa.me/918086482422
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-t mt-14 flex flex-col items-center justify-between gap-3 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Jazeel Zainudeen. All rights reserved.</p>
          <p>Personal site — built and maintained by me.</p>
        </div>
      </div>
    </footer>
  );
}
