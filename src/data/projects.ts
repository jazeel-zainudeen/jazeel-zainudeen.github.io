export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  role: string;
  duration: string;
  thumbnail: string;
  images: string[];
  scrollingPreview?: string;
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
    title: "MYG.IN ECOMMERCE DEVELOPMENT",
    shortDescription: "Business and operations platform supporting one of India's largest electronics retail chains.",
    detailedDescription: "A comprehensive platform for myG, a large-scale retail chain. Working in close connection with the operations team, I was responsible for implementing critical web and app API changes, as well as managing updates regarding overall functioning such as payment gateway integrations, shipping integrations, and promotional updates.",
    role: "Full Stack Developer",
    duration: "6 Months",
    thumbnail: "/assets/projects/myg-ecommerce-thumbnail.jpg",
    images: ["/assets/projects/myg-ecommerce-thumbnail.jpg"],
    scrollingPreview: "/assets/projects/myg-full-screenshot.jpg",
    previewUrl: "https://www.myg.in/",
    techStack: ["CS-Cart", "Smarty", "PHP", "CodeIgniter", "Laravel", "jQuery"],
    keyFeatures: [
      "Seamless payment gateway integration of Bajaj Finserv, alongside other integrations like PayU, Snapmint, PineLabs, and Cashfree.",
      "Integrated and maintained their POS system to ensure accurate, real-time inventory syncing.",
      "Managed the kiosk software deployed in retail stores to beautifully showcase live inventory to customers.",
      "Developed robust web and app APIs in close coordination with the operations team."
    ],
    challenges: "Handling real-time data sync across hundreds of stores while rolling out critical payment and promotional updates.",
    lessonsLearned: "Gained extensive experience in architecting and maintaining complex, multi-provider payment pipelines and syncing legacy POS hardware with modern cloud APIs."
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
  }
];
