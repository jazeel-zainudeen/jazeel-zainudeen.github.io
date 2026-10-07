"use client";

import Image from "next/image";
import Link from "next/link";
import { TawkButton } from "@/components/ui/TawkButton";

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
              Full stack developer based in Kerala, India, focused on building
              scalable ERP, CRM, and HRMS systems while modernizing legacy
              platforms and supporting software long after deployment.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="https://wa.me/918086482422"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
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
                href="mailto:zainudheenjazeel@gmail.com"
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
                href="tel:+918086482422"
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
                <TawkButton
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </TawkButton>
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
                  href="tel:+918086482422"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  +91 80864 82422
                </a>
              </li>
              <li>
                <a
                  href="mailto:zainudheenjazeel@gmail.com"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  zainudheenjazeel@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918086482422"
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
          <p>Personal site - built and maintained by me.</p>
        </div>
      </div>
    </footer>
  );
}
