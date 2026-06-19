# Jazeel.dev — Portfolio & Business Landing Page

A modern, dark-themed portfolio and business landing page built with **Next.js 16**, **React 19**, **Tailwind CSS 4** and **Framer Motion**. Deployed to **GitHub Pages** as a static export.

🔗 **Live:** [jazeel-zainudeen.github.io](https://jazeel-zainudeen.github.io)

---

## ✨ Features

- **Dark Mode Design** — Premium glassmorphism UI with gradient accents and smooth micro-animations
- **Responsive Layout** — Mobile-first design with adaptive navigation, grid layouts and typography
- **Animated Sections** — Scroll-triggered entrance animations powered by Framer Motion
- **Services Showcase** — Six service cards covering ERP, CRM, HRMS development, maintenance, modernization and dedicated developer hiring
- **Selected Work Gallery** — Project case studies with impact highlights
- **Process Timeline** — Step-by-step engagement workflow from discovery call to ongoing support
- **Client Testimonials** — Social proof section with anonymized client quotes
- **FAQ Accordion** — Expandable Q&A section with smooth open/close transitions
- **Contact Form + Calendly** — Validated contact form that pre-fills and redirects to Calendly for booking discovery calls
- **SEO Optimized** — Full Open Graph, Twitter Card, meta keywords and semantic HTML

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|----------------------------------------|
| Framework   | Next.js 16 (Static Export)             |
| UI Library  | React 19                               |
| Styling     | Tailwind CSS 4                         |
| Animations  | Framer Motion                          |
| Typography  | Inter + Space Grotesk (Google Fonts)   |
| Deployment  | GitHub Pages (via GitHub Actions)      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Static files are exported to the `out/` directory, ready for deployment to any static host.

---

## 📁 Project Structure

```
├── public/                  # Static assets (images, favicon, logos)
│   ├── logo.png
│   ├── portrait-*.jpg       # About section portrait
│   └── project-*.jpg        # Project showcase images
├── src/
│   └── app/
│       ├── globals.css       # Design system tokens & global styles
│       ├── layout.tsx        # Root layout with fonts, metadata & SEO
│       ├── page.tsx          # Main single-page application
│       └── icon.png          # App icon
├── .github/workflows/       # GitHub Actions deployment workflow
├── next.config.ts           # Static export & GitHub Pages config
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## 🌐 Deployment

The site is deployed to **GitHub Pages** using GitHub Actions. On every push to `main`, the workflow:

1. Installs dependencies
2. Builds the Next.js static export (`next build`)
3. Deploys the `out/` directory to GitHub Pages

---

## 📄 Sections Overview

| Section        | Description                                                    |
|----------------|----------------------------------------------------------------|
| **Hero**       | Headline, availability badge, CTA buttons and trust signals    |
| **Tech Stack** | Horizontal band showcasing the technology stack                |
| **About**      | Portrait, bio and experience highlights                        |
| **Services**   | Six service cards with benefits and pain points addressed      |
| **Why Me**     | Six value propositions in a grid layout                        |
| **Process**    | Six-step engagement workflow                                   |
| **Work**       | Selected project case studies with impact metrics              |
| **Testimonials** | Client feedback carousel                                    |
| **FAQ**        | Accordion-style frequently asked questions                     |
| **Contact**    | Validated form with Calendly integration for booking calls     |

---

## 📬 Contact

- **Email:** [zainudheenjazeel@gmail.com](mailto:zainudheenjazeel@gmail.com)
- **LinkedIn:** [linkedin.com/in/jazeel-zainudeen](https://linkedin.com/in/jazeel-zainudeen)
- **WhatsApp:** [wa.me/918086482422](https://wa.me/918086482422)

---

## 📝 License

This project is private and not licensed for redistribution.
