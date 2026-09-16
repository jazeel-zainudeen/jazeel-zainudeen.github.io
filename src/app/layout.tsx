import type { Metadata, Viewport } from "next";
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
  title: "Jazeel Zainudeen — Full Stack Developer | Web Application & ERP Specialist",
  description: "Jazeel Zainudeen is a full stack developer from Kerala, India specializing in custom ERP, CRM, HRMS systems, modern Web Applications, Laravel, React & Next.js development.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Jazeel Zainudeen",
    "Jazeel Zainudeen developer",
    "Jazeel Zainudeen Kerala",
    "Jazeel full stack developer",
    "web development Kerala",
    "freelance software developer India",
    "custom software development",
    "business software developer",
    "ERP software developer",
    "CRM developer",
    "HRMS software development",
    "Laravel developer Kerala",
    "React developer India",
    "Next.js developer",
    "PHP developer",
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
  openGraph: {
    title: "Jazeel Zainudeen — Full Stack Developer & Software Engineer",
    description: "Personal portfolio of Jazeel Zainudeen — Full Stack Developer building ERP, CRM, HRMS & custom web applications using Laravel, React, and Next.js.",
    url: siteUrl,
    siteName: "Jazeel Zainudeen — Jazeel.dev",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/portrait-BNAY2NPR.jpg",
        width: 1200,
        height: 630,
        alt: "Jazeel Zainudeen — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazeel Zainudeen — Full Stack Developer",
    description: "Building custom ERP, CRM, HRMS systems & business software with Laravel, React & Next.js.",
    images: ["/portrait-BNAY2NPR.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jazeel Zainudeen",
  "url": siteUrl,
  "image": `${siteUrl}/portrait-BNAY2NPR.jpg`,
  "jobTitle": "Full Stack Developer & Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance / Remote Developer"
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
    "Custom ERP Development",
    "CRM Development",
    "HRMS Development",
    "Web Application Development",
    "Laravel",
    "PHP",
    "React",
    "Next.js",
    "MySQL",
    "REST APIs"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-brand/20 selection:text-brand">
        {children}
      </body>
    </html>
  );
}
