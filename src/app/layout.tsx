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
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  title: "Jazeel Zainudeen — Full Stack Developer",
  description: "Personal site of Jazeel Zainudeen, a full stack developer from Kerala, India, building ERP, CRM, HRMS and business software with Laravel, React and Next.js.",
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
    title: "Jazeel Zainudeen — Full Stack Developer",
    description: "Personal site of Jazeel Zainudeen, a full stack developer from Kerala, India, building ERP, CRM, HRMS and business software with Laravel, React and Next.js.",
    url: "/",
    siteName: "Jazeel.dev",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9555b5e2-f1f1-4a56-b72f-a5a39d708dcb",
        width: 1200,
        height: 630,
        alt: "Jazeel Zainudeen — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazeel Zainudeen — Full Stack Developer",
    description: "Personal site of Jazeel Zainudeen, a full stack developer from Kerala, India, building ERP, CRM, HRMS and business software with Laravel, React and Next.js.",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9555b5e2-f1f1-4a56-b72f-a5a39d708dcb"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${manrope.variable} ${sora.variable}`}>
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-brand/20 selection:text-brand">
        {children}
      </body>
    </html>
  );
}
