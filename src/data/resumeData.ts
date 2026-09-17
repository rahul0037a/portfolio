export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    securityCloud: string;
  };
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  techStack: string[];
  summary: string;
  bullets: string[];
  stats: { label: string; value: string }[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badge: string;
  credentialUrl?: string;
  verified: boolean;
  skillsGained: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: number; iconName?: string; highlight?: boolean }[];
}

export const RESUME_DATA = {
  personal: {
    name: "Rahul Rathi",
    title: "Full-Stack Engineer & Cloud Builder",
    subtitle: "B.Tech CSE (VIT Chennai '25) • AWS Certified Cloud Practitioner",
    email: "rathirahul1000@gmail.com",
    phone: "+91 6370223485",
    location: "India (Open to Remote & Relocation)",
    linkedin: "https://linkedin.com/in/rahul-rathi-85ab42206",
    github: "https://github.com/rahul0037a",
    leetcode: "https://leetcode.com/u/rathirahul1000",
    dsaStats: "100+ Problems Solved across LeetCode, HackerRank, etc.",
    summary:
      "Computer Science graduate from VIT Chennai with hands-on experience building full-stack web applications using React, Next.js, Node.js, Java, and AWS. Experienced in developing high-throughput REST APIs, resilient authentication systems, responsive user interfaces, and solving 100+ algorithmic problems across LeetCode and HackerRank. AWS Certified Cloud Practitioner seeking Software Engineering and Full-Stack roles.",
    stats: [
      { label: "CGPA (VIT Chennai)", value: "7.91" },
      { label: "DSA Problems", value: "100+" },
      { label: "Internships", value: "2" },
      { label: "AWS Certified", value: "Aug 2027" }
    ]
  },

  education: {
    institution: "Vellore Institute of Technology, Chennai",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "2021 – 2025",
    cgpa: "7.91 / 10",
    coreCourses: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems & Virtualization",
      "Computer Networks",
      "Software Development Life Cycle (SDLC)"
    ],
    highlights: [
      "Built a solid foundation in computational thinking, complexity analysis, and modular software engineering.",
      "Graduated in 2025 with strong engineering fundamentals in both systems programming and modern full-stack web stacks."
    ]
  },

  experiences: [
    {
      id: "fusecake",
      role: "SaaS Developer",
      company: "FuseCake",
      location: "Remote",
      period: "Aug 2026 – Sep 2026",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      summary:
        "Engineered the core Events Discovery module for startup ecosystem participants, implementing lightning-fast search, multi-faceted filtering, and seamless auth-gated registration pipelines.",
      bullets: [
        "Developed an Events Discovery feature using React, Next.js, and TypeScript, enabling users to explore startup events with detailed information on dates, locations, organizers, pricing, and categories.",
        "Implemented search, filtering, and curated event sections for discovering events by keyword, city, category, online/offline mode, and price.",
        "Built dedicated event detail pages and authentication-gated registration flows, returning users to the event after sign-in/sign-up before redirecting them to the official registration platform.",
        "Developed reusable, component-based UI for event cards, filters, event sections, and registration modals while integrating the feature into an existing Next.js codebase."
      ],
      stats: [
        { label: "Stack", value: "Next.js + TS" },
        { label: "Module", value: "Event Engine" },
        { label: "Auth Flow", value: "Gated Return" }
      ]
    },
    {
      id: "ethnus",
      role: "Full Stack Intern",
      company: "Ethnus",
      location: "Remote",
      period: "Aug 2023 – Nov 2023",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "RBAC", "REST"],
      summary:
        "Shipped 4+ production-ready MERN web applications throughout an intensive 4-month lifecycle, establishing secure authentication, role-based access control, and scalable API endpoints.",
      bullets: [
        "Built and deployed a full-stack blogging platform using the MERN stack, implementing user authentication, post management, and role-based access control.",
        "Delivered 4+ React/Node.js projects across a 4-month internship, following the software development lifecycle from implementation through deployment.",
        "Developed reusable React components and RESTful APIs with Express.js, integrating MongoDB for persistent data storage."
      ],
      stats: [
        { label: "Apps Delivered", value: "4+ Projects" },
        { label: "Stack", value: "MERN Stack" },
        { label: "Security", value: "RBAC & JWT" }
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: "wanderlust",
      title: "WanderLust",
      subtitle: "Full-Stack Airbnb Clone & Vacation Rental Platform",
      description:
        "A feature-complete, scalable Airbnb clone architected with modular MVC principles. Enables property listing, rich bookings, geocoded map exploration, user reviews, and fortified session authentication.",
      category: "Full-Stack Web App",
      tags: ["Node.js", "Express.js", "MongoDB", "Leaflet.js", "Cloudinary", "Passport.js", "Helmet", "Joi"],
      liveUrl: "https://bnbclone-x8tw.onrender.com/",
      githubUrl: "https://github.com/rahul0037a",
      metrics: "Interactive Geocoding & Session Security",
      highlights: [
        "Developed a modular full-stack Airbnb clone using Node.js, Express.js, EJS, SQL, and MVC architecture with RESTful APIs.",
        "Created MongoDB schemas with Mongoose references for Users, Listings, Reviews, and Bookings, enabling structured relational data modeling.",
        "Implemented Passport.js authentication, HTTP-only sessions with connect-mongo, Joi validation, and Helmet security headers.",
        "Integrated Cloudinary for cloud image storage and OpenStreetMap Nominatim + Leaflet.js for live geocoding and interactive maps."
      ],
      architecture: {
        frontend: "EJS Modular Templating + Leaflet.js Map UI + Bootstrap",
        backend: "Node.js + Express.js (MVC Pattern & RESTful Routing)",
        database: "MongoDB with Mongoose schemas & relational references",
        securityCloud: "Passport.js, connect-mongo, Helmet headers, Cloudinary CDN"
      }
    },
    {
      id: "foodplay",
      title: "FoodPlay",
      subtitle: "Personalized Meal Recommendation & Nutrition Engine",
      description:
        "A nutrition-aware diet planner that computes individual basal metabolic rates and total daily energy expenditures to generate target macro distributions and tailored meal suggestions.",
      category: "HealthTech & Algorithms",
      tags: ["Flask", "Python", "JavaScript", "HTML/CSS", "Nutrition Algorithms", "Render"],
      liveUrl: "https://github.com/rahul0037a/FoodPlay",
      githubUrl: "https://github.com/rahul0037a/FoodPlay",
      metrics: "Tested with 50+ Real Users",
      highlights: [
        "Engineered a BMR/TDEE calculation engine integrating user biometric inputs (weight, height, activity level, fitness goal) to produce daily macro targets.",
        "Built a preference collection system supporting dietary restrictions, goal types (cut/bulk/maintain), and cuisine preferences – tested across 50+ users.",
        "Developed end-to-end Flask REST backend and a responsive JS frontend; deployed seamlessly on Render."
      ],
      architecture: {
        frontend: "Responsive JavaScript + Custom CSS Glass UI",
        backend: "Python 3 + Flask RESTful API Engine",
        database: "Structured nutritional data & macro lookup dictionaries",
        securityCloud: "Render cloud deployment, input sanitization"
      }
    },
    {
      id: "blog-blitz",
      title: "Blog Blitz",
      subtitle: "Team Collaborative Blogging Platform",
      description:
        "A collaborative multi-author blogging website engineered with modern responsive design principles, clean component architecture, and team Git workflows.",
      category: "Front-End & UI/UX",
      tags: ["HTML5", "CSS3", "JavaScript", "Team Git Workflow", "Vercel"],
      liveUrl: "https://blog-blitz-iefe.vercel.app/",
      githubUrl: "https://github.com/rahul0037a",
      metrics: "8+ Responsive Pages & 3-person Team Git",
      highlights: [
        "Owned the entire UI/UX layer, developing responsive mobile-first layouts and reusable components across 8+ distinct pages.",
        "Collaborated with 3 teammates using Git-based branch workflows, pull-request reviews, and agile sprint cadence.",
        "Deployed to Vercel with automated CI/CD continuous deployment hooks."
      ],
      architecture: {
        frontend: "Modern HTML5 Semantic structure + Custom CSS3 animations",
        backend: "Client-side interactive state & simulated REST calls",
        database: "Local storage persistence & mock data structures",
        securityCloud: "Vercel edge deployment with global CDN acceleration"
      }
    },
    {
      id: "fusecake",
      title: "FuseCake",
      subtitle: "Events Discovery & Registration SaaS Platform",
      description:
        "Modern startup events discovery platform engineered with Next.js 14, responsive search, stateful auth-gated redirect pipelines, and a modular 35+ component system.",
      category: "Full-Stack & SaaS",
      tags: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "REST APIs", "Stateful Auth"],
      liveUrl: "https://fusecake.com",
      githubUrl: "https://github.com/rahul0037a",
      metrics: "5-Stage Auth Flow & 35+ Component UI Kit",
      highlights: [
        "Architected an Events Discovery platform enabling users to explore startup events with multi-criteria search by keyword, city, category, and price.",
        "Built dedicated event detail pages with stateful auth-gated registration flows returning users seamlessly to their intent.",
        "Engineered 35+ reusable component UI kit with robust responsive design across 12+ viewports."
      ],
      architecture: {
        frontend: "Next.js 14 App Router + Tailwind CSS + Reusable UI Kit",
        backend: "Server-side data dispatch & REST microservices",
        database: "Structured events catalog & organizer schema",
        securityCloud: "Stateful session return gatekeeper & Edge delivery"
      }
    }
  ] as Project[],

  skillCategories: [
    {
      category: "Languages",
      description: "Core programming and scripting languages for systems & web",
      skills: [
        { name: "JavaScript (ES6+)", level: 90, highlight: true },
        { name: "TypeScript", level: 85, highlight: true },
        { name: "Python", level: 85, highlight: true },
        { name: "Java", level: 82, highlight: true },
        { name: "SQL", level: 82, highlight: false },
        { name: "HTML5 / CSS3", level: 95, highlight: false }
      ]
    },
    {
      category: "Frameworks & Libraries",
      description: "Frontend & backend frameworks powering modern full-stack web applications",
      skills: [
        { name: "React.js", level: 92, highlight: true },
        { name: "Next.js", level: 88, highlight: true },
        { name: "Node.js", level: 86, highlight: true },
        { name: "Express.js", level: 85, highlight: false },
        { name: "Flask", level: 80, highlight: false },
        { name: "Tailwind CSS", level: 92, highlight: true },
        { name: "Leaflet.js", level: 78, highlight: false },
        { name: "Bootstrap / EJS", level: 84, highlight: false }
      ]
    },
    {
      category: "Databases & Cloud",
      description: "Cloud infrastructure, storage, and persistence mechanisms",
      skills: [
        { name: "AWS (Cloud Practitioner)", level: 85, highlight: true },
        { name: "MongoDB & Mongoose", level: 88, highlight: true },
        { name: "MySQL", level: 80, highlight: false },
        { name: "Render", level: 85, highlight: false },
        { name: "Cloudinary CDN", level: 82, highlight: false }
      ]
    },
    {
      category: "ML & Data Science",
      description: "Applied machine learning, feature pipelines, and evaluation metrics",
      skills: [
        { name: "Supervised Learning", level: 82, highlight: true },
        { name: "Regression & Classification", level: 85, highlight: true },
        { name: "Feature Engineering", level: 78, highlight: false },
        { name: "Model Evaluation", level: 80, highlight: false },
        { name: "Exploratory Data Analysis (EDA)", level: 82, highlight: false }
      ]
    },
    {
      category: "Core Concepts & Tools",
      description: "Software engineering fundamentals and development workflow",
      skills: [
        { name: "Data Structures & Algorithms", level: 86, highlight: true },
        { name: "REST APIs & Architecture", level: 92, highlight: true },
        { name: "Authentication & Sessions", level: 90, highlight: true },
        { name: "OOP & MVC Patterns", level: 88, highlight: false },
        { name: "Git & GitHub Workflows", level: 90, highlight: false },
        { name: "SDLC & Agile Delivery", level: 85, highlight: false }
      ]
    }
  ] as SkillCategory[],

  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Valid through Aug 2027",
      badge: "AWS Certified",
      verified: true,
      skillsGained: ["AWS Global Infrastructure", "Cloud Security & IAM", "EC2, S3, RDS, DynamoDB", "Billing & CloudWatch Architecture"]
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "Stanford Online & DeepLearning.AI (Andrew Ng) • Coursera",
      date: "Jan 2025",
      badge: "Stanford Online",
      verified: true,
      skillsGained: ["Linear & Logistic Regression", "Gradient Descent & Cost Functions", "Overfitting & Regularization", "Decision Trees & Random Forests"]
    },
    {
      title: "MERN Full Stack Intern Certificate",
      issuer: "Ethnus",
      date: "Nov 2023",
      badge: "Ethnus Verified",
      verified: true,
      skillsGained: ["Full-Stack MERN Architecture", "RESTful API Development", "Role-Based Access Control (RBAC)", "Component-Driven React"]
    }
  ] as Certification[]
};
