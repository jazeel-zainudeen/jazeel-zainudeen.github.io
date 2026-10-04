export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  tagline: string;
  thumbnail: string;
  mobileThumbnail?: string;
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
    slug: "myg-ecommerce",
    title: "MYG.IN ECOMMERCE DEVELOPMENT",
    shortDescription: "Business and operations platform supporting one of India's largest electronics retail chains.",
    detailedDescription: "A comprehensive platform for myG, a large-scale retail chain. Working in close connection with the operations team, I was responsible for implementing critical web and app API changes, as well as managing updates regarding overall functioning such as payment gateway integrations, shipping integrations, and promotional updates.",
    tagline: "E-Commerce Platform",
    thumbnail: "/assets/projects/myg-full-screenshot.jpg",
    mobileThumbnail: "/assets/projects/myg-mobile-screenshot.jpeg",
    images: ["/assets/projects/myg-full-screenshot.jpg"],
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
    slug: "westford-connect-hrms",
    title: "WESTFORD CONNECT — HRMS SOFTWARE",
    shortDescription: "Complete revamp of the Westford Connect HRMS web application, tailored to client requirements.",
    detailedDescription: "Revamped the complete HRMS web application for Westford Connect. I was responsible for the entire frontend of the website, as well as handling complex integrations. The platform was built with React and features seamless Google Login, Google Calendar integration, and real-time chat functionality using SignalR. Note: The live application is restricted to authenticated users only, so a public preview is not available.",
    tagline: "Enterprise Software",
    thumbnail: "/assets/projects/westford-connect-hrms-full-screenshot.jpeg",
    images: ["/assets/projects/westford-connect-hrms-full-screenshot.jpeg"],
    scrollingPreview: "/assets/projects/westford-connect-hrms-full-screenshot.jpeg",
    techStack: ["React", "TypeScript", "Tailwind CSS", "SignalR", "Google APIs"],
    keyFeatures: [
      "Real-time chat integration using SignalR.",
      "Google Login and Google Calendar integrations.",
      "Employee self-service dashboard for leaves and attendance."
    ],
    challenges: "Migrating complex legacy payroll logic without disrupting active employee cycles.",
    lessonsLearned: "The importance of robust end-to-end testing when refactoring legacy business logic."
  },
  {
    slug: "bobcares-revamp",
    title: "BOBCARES WEBSITE REVAMP",
    shortDescription: "Complete revamp of a large-scale corporate website from WordPress to Next.js, featuring modern Figma-based UI/UX.",
    detailedDescription: "Led the complete revamp of the main Bobcares corporate website. Migrated the legacy WordPress architecture to a high-performance Next.js stack, dramatically improving load times, SEO, and overall user experience. Implemented a pixel-perfect, highly modern design derived from extensive Figma mockups, featuring dark mode elements, smooth animations, and a vastly improved user interface tailored for an enterprise IT support company.",
    tagline: "Corporate Website Revamp",
    thumbnail: "/assets/projects/bobcares-mockup.png",
    images: ["/assets/projects/bobcares-mockup.png"],
    scrollingPreview: "/assets/projects/bobcares-mockup.png",
    previewUrl: "https://bobcares.com/",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma"],
    keyFeatures: [
      "Full migration from WordPress to a highly optimized Next.js application.",
      "Pixel-perfect implementation of a modern, complex Figma design.",
      "Significantly improved Core Web Vitals and overall SEO performance.",
      "Beautiful, responsive UI with engaging animations and a modern aesthetic."
    ],
    challenges: "Migrating a massive amount of legacy content and maintaining SEO rankings while entirely restructuring the frontend.",
    lessonsLearned: "Gained significant experience in large-scale migrations to modern frameworks and executing high-fidelity enterprise-level UI designs."
  },
  {
    slug: "coagmenta",
    title: "COAGMENTA — CORPORATE WEBSITE",
    shortDescription: "A pixel-perfect website created from a Figma design, later converted to WordPress using Elementor.",
    detailedDescription: "A picture-perfect corporate website built directly from a client-provided Figma design. Every single design pattern was implemented as a perfect 1-to-1 copy of the original Figma mockup. The site was built completely from scratch using Bootstrap 5 and jQuery, and was later converted into a fully dynamic WordPress theme using Elementor for easy content management. The website also features full multilingual support, including a localized French language version.",
    tagline: "Corporate Website",
    thumbnail: "/assets/projects/coagmenta-full-screenshot.png",
    images: ["/assets/projects/coagmenta-full-screenshot.png"],
    scrollingPreview: "/assets/projects/coagmenta-full-screenshot.png",
    previewUrl: "https://coagmenta.com/",
    techStack: ["Figma", "HTML5", "CSS3", "Bootstrap 5", "jQuery", "WordPress", "Elementor"],
    keyFeatures: [
      "Pixel-perfect implementation from a high-fidelity Figma design.",
      "Custom-built, responsive frontend using Bootstrap 5 and jQuery.",
      "Seamless integration with WordPress and Elementor for dynamic content management.",
      "Full multilingual integration featuring French language support."
    ],
    challenges: "Ensuring 100% design fidelity while transitioning from a static HTML/jQuery build to a dynamic Elementor-based WordPress theme.",
    lessonsLearned: "Mastered the workflow of converting static high-fidelity prototypes into fully dynamic and editable WordPress templates without sacrificing design quality."
  },
  {
    slug: "news-aggregator-api",
    title: "NEWS AGGREGATOR API",
    shortDescription: "A RESTful API built with Laravel that aggregates news from multiple global sources and provides personalized feeds.",
    detailedDescription: "Developed a robust RESTful API using Laravel 12 and PHP 8.4 that seamlessly aggregates news articles from major publishers including News API, The Guardian, and The New York Times. The backend was developed with a strong emphasis on clean system architecture, utilizing modern design patterns (such as Service classes, Dependency Injection, and decoupled logic) to ensure high maintainability and scalability. It features secure authentication via Laravel Sanctum and provides high-performance endpoints for users to browse, search, and deeply personalize their daily news feeds.",
    tagline: "Backend API",
    thumbnail: "/assets/projects/news-aggregator-api-screenshot.png",
    images: ["/assets/projects/news-aggregator-api-screenshot.png"],
    scrollingPreview: "/assets/projects/news-aggregator-api-screenshot.png",
    githubUrl: "https://github.com/jazeel-zainudeen/news-aggregator-api",
    techStack: ["Laravel", "PHP", "MySQL", "Docker"],
    keyFeatures: [
      "Engineered with clean system architecture and modern backend design patterns.",
      "Secure API authentication managed seamlessly via Laravel Sanctum.",
      "Live data aggregation from News API, The Guardian, and The New York Times.",
      "Customizable news feeds based on user preferences and search criteria.",
      "Fully dockerized local development environment."
    ],
    challenges: "Standardizing distinct and complex JSON responses from three different external news publisher APIs into a single unified format.",
    lessonsLearned: "Deepened knowledge in building scalable RESTful architectures with Laravel and orchestrating multi-source API data aggregation."
  },
  {
    slug: "spares",
    title: "SPARES — PWA WEB APP",
    shortDescription: "A feature-packed, personal-use web application built overnight as a Progressive Web App (PWA).",
    detailedDescription: "Developed a quick, feature-packed web application for a client's personal use. Built entirely overnight, the project involved rapid development and self-reviewed enhancements. The web app is fully functional, completely free to host on Vercel, and available as a Progressive Web App (PWA) for ease of access on mobile devices.",
    tagline: "Web Application",
    thumbnail: "/assets/projects/spares-full-screenshot.png",
    mobileThumbnail: "/assets/projects/spares-mobile-screenshot.png",
    images: ["/assets/projects/spares-full-screenshot.png"],
    scrollingPreview: "/assets/projects/spares-full-screenshot.png",
    previewUrl: "https://spares-mu.vercel.app/",
    githubUrl: "https://github.com/jazeel-zainudeen/spares",
    techStack: ["Next.js", "Tailwind CSS", "Supabase", "Cloudinary"],
    keyFeatures: [
      "Progressive Web App (PWA) support for installable, app-like experience.",
      "Supabase integration for robust backend and database management.",
      "Cloudinary integration for optimized and reliable image storage.",
      "Rapidly developed and deployed entirely overnight."
    ],
    challenges: "Delivering a fully functional, feature-packed application with a proper database and image storage solution overnight.",
    lessonsLearned: "Gained proficiency in rapidly bootstrapping full-stack Next.js applications using Supabase and Cloudinary."
  }
];
