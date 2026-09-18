import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Manrope, Sora } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const viewport: Viewport = {
  themeColor: "#fafafc",
  colorScheme: "light",
};

const siteUrl = "https://jazeel-zainudeen.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jazeel Zainudeen — Full Stack Engineer | Next.js, React & Cloud Architect",
  description: "Jazeel Zainudeen is a full stack engineer from Kerala, India specializing in high-performance Web Applications, Next.js, React, TypeScript, Cloud APIs & custom Enterprise Software.",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Jazeel Zainudeen",
    "Jazeel Zainudeen developer",
    "Next.js developer Kerala",
    "React developer India",
    "TypeScript software engineer",
    "Full stack engineer India",
    "web development Kerala",
    "freelance software developer India",
    "custom web applications",
    "cloud software engineer",
    "ERP software developer",
    "CRM developer",
    "HRMS software development",
    "Node.js developer",
    "MERN stack developer",
    "web application modernization",
    "business process automation",
    "dedicated remote developer"
  ],
  authors: [{ name: "Jazeel Zainudeen", url: siteUrl }],
  creator: "Jazeel Zainudeen",
  publisher: "Jazeel Zainudeen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Jazeel Zainudeen — Full Stack Engineer & Cloud Architect",
    description: "Personal portfolio of Jazeel Zainudeen — Full Stack Engineer building high-performance web applications, enterprise platforms & cloud solutions using Next.js, React, and TypeScript.",
    url: siteUrl,
    siteName: "Jazeel Zainudeen — Jazeel.dev",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/assets/seo/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Jazeel Zainudeen — Full Stack Engineer & Cloud Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazeel Zainudeen — Full Stack Engineer & Cloud Architect",
    description: "Building modern web applications, scalable APIs & cloud platforms with Next.js, React & TypeScript.",
    images: ["/assets/seo/og-image.jpg"],
    creator: "@jazeeldev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Jazeel Zainudeen",
      "url": siteUrl,
      "image": `${siteUrl}/assets/seo/profile-portrait.jpg`,
      "jobTitle": "Full Stack Engineer & Cloud Architect",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance / Remote Engineer"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kerala",
        "addressCountry": "India"
      },
      "sameAs": [
        "https://wa.me/918086482422",
        "https://linkedin.com",
        "https://github.com/jazeel-zainudeen"
      ],
      "knowsAbout": [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Cloud Architecture",
        "Web Application Development",
        "Custom ERP & CRM Systems",
        "PostgreSQL & Databases",
        "REST & GraphQL APIs"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      "name": "Jazeel Zainudeen — Web Application & Custom Software Development",
      "url": siteUrl,
      "image": `${siteUrl}/assets/seo/og-image.jpg`,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kerala",
        "addressCountry": "India"
      },
      "provider": {
        "@id": `${siteUrl}/#person`
      },
      "areaServed": "Worldwide",
      "knowsLanguage": ["English", "Malayalam"]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Jazeel Zainudeen Portfolio",
      "description": "Full Stack Engineer specializing in Next.js, React, TypeScript & Custom Enterprise Software.",
      "publisher": {
        "@id": `${siteUrl}/#person`
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${manrope.variable} ${sora.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="wM1wDF69RqI0gn_ph5s78bvOjqQhFY3-CR8Hz2QVQzM"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-brand/20 selection:text-brand">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
