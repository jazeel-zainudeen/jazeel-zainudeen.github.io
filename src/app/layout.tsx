import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1a1f33",
};

export const metadata: Metadata = {
  title: "Jazeel Zainudeen — Custom ERP, CRM & HRMS Developer",
  description: "Full stack developer building custom ERP, CRM, HRMS and business automation software with Laravel, React, Next.js and MERN stack.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "custom software development",
    "business software development",
    "erp development services",
    "crm development company",
    "hrms software development",
    "web application maintenance",
    "legacy application modernization",
    "laravel development services",
    "php development company",
    "react development services",
    "custom business applications",
    "software maintenance services",
    "enterprise application development",
    "business process automation",
    "remote software developer"
  ],
  authors: [{ name: "Jazeel Zainudeen" }],
  openGraph: {
    title: "Jazeel Zainudeen — Custom ERP, CRM & HRMS Developer",
    description: "Full stack developer building custom ERP, CRM, HRMS and business automation software with Laravel, React, Next.js and MERN stack.",
    url: "/",
    siteName: "Jazeel.dev",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9555b5e2-f1f1-4a56-b72f-a5a39d708dcb",
        width: 1200,
        height: 630,
        alt: "Jazeel Zainudeen Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazeel Zainudeen — Custom ERP, CRM & HRMS Developer",
    description: "Full stack developer building custom ERP, CRM, HRMS and business automation software with Laravel, React, Next.js and MERN stack.",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9555b5e2-f1f1-4a56-b72f-a5a39d708dcb"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-brand/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
