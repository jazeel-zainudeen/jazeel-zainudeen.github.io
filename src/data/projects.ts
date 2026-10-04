export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  role: string;
  duration: string;
  thumbnail: string;
  images: string[];
  previewUrl?: string;
  githubUrl?: string;
  techStack: string[];
  keyFeatures: string[];
  challenges?: string;
  lessonsLearned?: string;
}

export const projectsData: Project[] = [
  {
    slug: "retail-operations-platform",
    title: "Retail Operations Platform",
    shortDescription: "Internal business platform supporting one of India's largest electronics retail chains.",
    detailedDescription: "A comprehensive internal platform designed to handle operations, inventory, and reporting modules for a large-scale retail chain, significantly streamlining multi-branch workflows and reducing manual reporting time across stores.",
    role: "Lead Full Stack Developer",
    duration: "6 Months",
    thumbnail: "/assets/projects/retail-operations-platform.jpg",
    images: ["/assets/projects/retail-operations-platform.jpg"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    keyFeatures: [
      "Multi-branch inventory management and real-time syncing.",
      "Custom reporting module reducing manual work.",
      "Role-based access control for different staff levels.",
    ],
    challenges: "Handling real-time data sync across hundreds of stores with low-latency constraints.",
    lessonsLearned: "Optimized database queries and implemented caching strategies effectively using Redis."
  },
  {
    slug: "handyman-marketplace",
    title: "Handyman Marketplace App",
    shortDescription: "Two-sided mobile platform connecting customers with verified handymen.",
    detailedDescription: "A fully automated booking and payout pipeline that replaced a WhatsApp-based dispatch system. Features include bookings, live tracking, in-app payments, and provider onboarding.",
    role: "Full Stack Developer",
    duration: "4 Months",
    thumbnail: "/assets/projects/handyman-marketplace.jpg",
    images: ["/assets/projects/handyman-marketplace.jpg"],
    techStack: ["React Native", "Next.js", "TypeScript", "Node.js", "Stripe"],
    keyFeatures: [
      "Live tracking of service providers.",
      "In-app payments integration using Stripe.",
      "Automated provider onboarding and verification system."
    ],
    challenges: "Building a reliable live-tracking system that doesn't heavily drain mobile battery.",
    lessonsLearned: "Learned best practices for background geolocation services in React Native."
  },
  {
    slug: "hrms-revamp",
    title: "HRMS — Software Revamp",
    shortDescription: "Complete revamp of a legacy HRMS used by a recruitment group.",
    detailedDescription: "Modernized a legacy Human Resources Management System to cut payroll processing time and improve UX for hundreds of daily users. Includes modules for attendance, payroll, leave management, and an employee self-service portal.",
    role: "Frontend Lead",
    duration: "3 Months",
    thumbnail: "/assets/projects/hrms-revamp.jpg",
    images: ["/assets/projects/hrms-revamp.jpg"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    keyFeatures: [
      "Employee self-service dashboard for leaves and attendance.",
      "Automated payroll calculation engine.",
      "Modernized, responsive UI/UX."
    ],
    challenges: "Migrating complex legacy payroll logic without disrupting active employee cycles.",
    lessonsLearned: "The importance of robust end-to-end testing when refactoring legacy business logic."
  },
  {
    slug: "iot-gas-station-portal",
    title: "IoT Gas Station Management Portal",
    shortDescription: "Full IoT-integrated web application and API layer for fuel station operations.",
    detailedDescription: "A robust portal providing real-time visibility into pump activity and automated end-of-day sales reporting. It integrates live pump telemetry, sales reconciliation, and admin dashboards.",
    role: "Backend & Integration Developer",
    duration: "5 Months",
    thumbnail: "/assets/projects/gas-station-portal.jpg",
    images: ["/assets/projects/gas-station-portal.jpg"],
    techStack: ["Next.js", "Node.js", "MQTT", "PostgreSQL", "Tailwind CSS"],
    keyFeatures: [
      "Real-time IoT telemetry data visualization via MQTT.",
      "Automated end-of-day sales reconciliation reports.",
      "Multi-tenant architecture for different gas station owners."
    ],
    challenges: "Processing high-frequency MQTT streams reliably without dropping packets.",
    lessonsLearned: "Architecting stream-processing pipelines using message brokers."
  }
];
