export interface ArchitectureComponent {
  id: string;
  name: string;
  role: string;
  explanation: string;
  category: 'client' | 'routing' | 'security' | 'database' | 'service' | 'cloud' | 'algorithm';
}

export interface EngineeringDecision {
  question: string;
  answer: string;
  rationale: string;
  tradeOff?: string;
}

export interface ProjectFeature {
  name: string;
  description: string;
  tag?: string;
}

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
  metrics?: string;

  // Standardized 5-Pillar Structure:
  problem: {
    whatWereYouBuilding: string;
    challenges: string[];
    targetUsers: string;
  };
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    securityCloud: string;
  };
  architectureTree: {
    pipeline: string[];
    branches: {
      parentId: string;
      label: string;
      items: string[];
    }[];
    components: Record<string, ArchitectureComponent>;
  };
  engineeringDecisions: EngineeringDecision[];
  features: ProjectFeature[];
  proof: {
    liveUrl?: string;
    githubUrl?: string;
    metrics: string;
    badges: string[];
    summary: string;
  };
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  period: string;
  techStack: string[];
  summary: string;
  whatYouBuilt: string;
  technologies: string[];
  result: string;
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

export interface DepthSkill {
  name: string;
  level?: number;
  usedInProjects: string[];
  highlight?: boolean;
  note?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: DepthSkill[];
}

export const RESUME_DATA = {
  personal: {
    name: "Rahul Rathi",
    title: "Full-Stack Engineer & Cloud Builder",
    subtitle: "B.Tech CSE (VIT Chennai '25) • AWS Certified Cloud Practitioner",
    email: "rathirahul1000@gmail.com",
    phone: "+91 6370223485",
    location: "Balasore, Odisha",
    linkedin: "https://linkedin.com/in/rahul-rathi-85ab42206",
    github: "https://github.com/rahul0037a",
    leetcode: "https://leetcode.com/u/rathirahul1000",
    dsaStats: "100+ Problems Solved across LeetCode, HackerRank, etc.",
    aboutBio: [
      "I'm a Computer Science graduate from VIT Chennai ('25) and an AWS Certified Cloud Practitioner based in Balasore, Odisha.",
      "I am deeply passionate about architecting resilient full-stack systems where clean design meets rock-solid engineering reliability.",
      "I love turning complex requirements into fast, intuitive applications—whether that means crafting low-latency RESTful APIs, orchestrating stateful authentication pipelines, or fine-tuning database schemas.",
      "I'm actively seeking Full-Time Software Engineering and Full-Stack/Frontend roles where I can contribute to high-scale production systems alongside exceptional teams."
    ],
    summary:
      "Computer Science graduate (VIT Chennai, 2025) with hands-on experience building full-stack web applications using React, Next.js, Node.js, Flask. Experienced in developing REST APIs, authentication systems, responsive user interfaces, with additional exposure to applied machine learning. AWS Certified Cloud Practitioner seeking Software Engineering and Full-Stack/Frontend roles.",
    stats: [
      { label: "Degree & Year", value: "VIT CSE '25" },
      { label: "CGPA", value: "7.91" },
      { label: "DSA Problems", value: "100+" },
      { label: "AWS Certified", value: "Valid '27" }
    ]
  },

  education: {
    institution: "Vellore Institute of Technology, Chennai",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "2021 – 2025",
    cgpa: "7.91 / 10",
    location: "Chennai, Tamil Nadu",
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
      id: "ethnus",
      year: "2023",
      role: "Full Stack Intern",
      company: "Ethnus",
      location: "Remote",
      period: "Aug 2023 – Nov 2023",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "RBAC", "REST APIs"],
      summary:
        "Built and deployed a full-stack blogging platform using the MERN stack, delivered 4+ React/Node.js projects, and developed reusable React components with Express.js RESTful APIs.",
      whatYouBuilt:
        "Built and deployed a full-stack blogging platform using the MERN stack, implementing user authentication, post management, and role-based access control (RBAC). Developed reusable React components and RESTful APIs with Express.js, integrating MongoDB for persistent data storage.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "RBAC"],
      result:
        "Delivered 4+ React/Node.js projects across a 4-month internship lifecycle from implementation through production deployment.",
      bullets: [
        "Built and deployed a full-stack blogging platform using the MERN stack, implementing user authentication, post management and role-based access control.",
        "Delivered 4+ React/Node.js projects across a 4-month internship, following the software development lifecycle from implementation through deployment.",
        "Developed reusable React components and RESTful APIs with Express.js, integrating MongoDB for persistent data storage."
      ],
      stats: [
        { label: "Apps Delivered", value: "4+ Projects" },
        { label: "Duration", value: "4 Months" },
        { label: "Stack", value: "MERN Stack" }
      ]
    },
    {
      id: "vit",
      year: "2025",
      role: "B.Tech Computer Science & Engineering",
      company: "Vellore Institute of Technology, Chennai",
      location: "Chennai, Tamil Nadu",
      period: "2021 – 2025",
      techStack: ["Java", "Python", "JavaScript", "SQL", "DSA", "DBMS", "Operating Systems", "Networks"],
      summary:
        "Graduated in Computer Science and Engineering with 7.91 CGPA, building strong competencies in algorithms, distributed systems design, relational databases, and AWS cloud engineering.",
      whatYouBuilt:
        "Developed solid fundamentals across data structures, object-oriented systems, normalized database schemas, and networking protocols, solving 100+ algorithmic problems across LeetCode and HackerRank.",
      technologies: ["Data Structures & Algorithms", "OOP (Java)", "SQL (MySQL)", "Operating Systems", "Computer Networks"],
      result:
        "Graduated with 7.91 CGPA; achieved AWS Certified Cloud Practitioner credential (valid through Aug 2027); completed Stanford Machine Learning course.",
      bullets: [
        "Bachelor of Technology in Computer Science and Engineering | CGPA: 7.91.",
        "Mastered Data Structures & Algorithms, OOP, Database Management Systems, Operating Systems, and Computer Networks.",
        "Solved 100+ algorithmic problems across LeetCode, HackerRank, and competitive platforms."
      ],
      stats: [
        { label: "CGPA", value: "7.91 / 10" },
        { label: "DSA Solved", value: "100+" },
        { label: "AWS Credential", value: "Certified" }
      ]
    },
    {
      id: "fusecake",
      year: "2026",
      role: "SaaS Developer",
      company: "FuseCake",
      location: "Remote",
      period: "Aug 2026 – Sep 2026",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      summary:
        "Developed the Events Discovery feature using React, Next.js, and TypeScript, enabling users to explore startup events with search, multi-faceted filtering, and authentication-gated registration flows.",
      whatYouBuilt:
        "Developed an Events Discovery feature using React, Next.js and TypeScript, enabling users to explore startup events with detailed information on dates, locations, organizers, pricing and categories. Implemented search, filtering and curated event sections for discovering events by keyword, city, category, online/offline mode and price. Built dedicated event detail pages and authentication-gated registration flows returning users to the event after sign-in/sign-up before redirecting them to the official registration platform.",
      technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      result:
        "Developed reusable, component-based UI for event cards, filters, event sections and registration modals while seamlessly integrating the feature into an existing Next.js codebase.",
      bullets: [
        "Developed an Events Discovery feature using React, Next.js and TypeScript, enabling users to explore startup events with detailed information on dates, locations, organizers, pricing and categories.",
        "Implemented search, filtering and curated event sections for discovering events by keyword, city, category, online/offline mode and price.",
        "Built dedicated event detail pages and authentication-gated registration flows, returning users to the event after sign-in/sign-up before redirecting them to the official registration platform.",
        "Developed reusable, component-based UI for event cards, filters, event sections and registration modals while integrating the feature into an existing Next.js codebase."
      ],
      stats: [
        { label: "Period", value: "Aug – Sep 2026" },
        { label: "Tech", value: "Next.js + TS" },
        { label: "Module", value: "Events Discovery" }
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: "wanderlust",
      title: "WanderLust",
      subtitle: "Full-Stack Airbnb Clone & Vacation Rental Platform",
      description:
        "Scalable Airbnb clone enabling property listing, booking, reviews, authentication, and location-based search.",
      category: "Full-Stack Web App",
      tags: ["Node.js", "Express.js", "MongoDB", "EJS", "Leaflet.js", "Cloudinary", "Passport.js", "Helmet", "Joi"],
      liveUrl: "https://bnbclone-x8tw.onrender.com/",
      githubUrl: "https://github.com/rahul0037a",
      metrics: "Interactive Geocoding & Fortified Session Security",
      highlights: [
        "Developed a modular full-stack Airbnb clone using Node.js, Express.js, EJS, SQL and MVC architecture with RESTful APIs.",
        "Created MongoDB schemas with Mongoose references for Users, Listings, Reviews, and Bookings, enabling structured relational data modeling.",
        "Implemented Passport.js authentication, HTTP-only sessions with connect-mongo, Joi validation, and Helmet security headers.",
        "Integrated Cloudinary for image storage and OpenStreetMap Nominatim + Leaflet.js for geocoding and interactive maps."
      ],
      problem: {
        whatWereYouBuilding:
          "WanderLust is a full-stack Airbnb clone enabling hosts to list properties and travelers to discover stays, view reviews, and navigate location-based maps. The system was designed with clean MVC patterns to demonstrate mastery of HTTP request-response lifecycles, database relational schemas in NoSQL, and defense-in-depth security.",
        challenges: [
          "Eliminating server disk bloat by storing user-uploaded listing photos on Cloudinary with automatic WebP transformations.",
          "Sanitizing user request payloads with Joi schema validation and Helmet security headers before database insertion.",
          "Integrating OpenStreetMap Nominatim and Leaflet.js for interactive map pins and forward geocoding without Google Maps API costs."
        ],
        targetUsers:
          "Vacationers seeking stays and hosts listing accommodations."
      },
      architecture: {
        frontend: "EJS Modular Templating + Leaflet.js Map UI + Bootstrap",
        backend: "Node.js + Express.js (MVC Pattern & RESTful Routing)",
        database: "MongoDB with Mongoose schemas & relational references",
        securityCloud: "Passport.js, connect-mongo, Helmet headers, Cloudinary CDN"
      },
      architectureTree: {
        pipeline: [
          "CLIENT",
          "EJS + Bootstrap",
          "EXPRESS / MVC",
          "PASSPORT + JOI + HELMET",
          "MONGOOSE",
          "MONGODB"
        ],
        branches: [
          {
            parentId: "MONGODB",
            label: "Cloud Media & GIS Services",
            items: ["Cloudinary", "Nominatim", "Leaflet"]
          }
        ],
        components: {
          "CLIENT": {
            id: "CLIENT",
            name: "Client Browser",
            role: "Responsive user interface rendering rental stays, reviews, and bookings.",
            explanation: "Receives server-rendered HTML enriched with progressive client-side interactivity and Leaflet vector map controls.",
            category: "client"
          },
          "EJS + Bootstrap": {
            id: "EJS + Bootstrap",
            name: "EJS + Bootstrap",
            role: "Server-side templating engine with modular layouts.",
            explanation: "Enables fast first-contentful paint without heavy client bundles. Bootstrap provides a responsive fluid grid layout.",
            category: "client"
          },
          "EXPRESS / MVC": {
            id: "EXPRESS / MVC",
            name: "Express.js / MVC Architecture",
            role: "Modular REST routing, middleware chaining & controller dispatch.",
            explanation: "Separates business logic (models), route control (controllers), and views, keeping endpoints maintainable and clean.",
            category: "routing"
          },
          "PASSPORT + JOI + HELMET": {
            id: "PASSPORT + JOI + HELMET",
            name: "Passport.js + Joi + Helmet",
            role: "Security layer: authentication, schema validation & HTTP headers.",
            explanation: "Passport handles salted hash auth; Joi rejects malformed payloads before persistence; Helmet sets critical HTTP security headers.",
            category: "security"
          },
          "Passport.js": {
            id: "Passport.js",
            name: "Passport.js Local Strategy",
            role: "Local authentication with persistent session cookies.",
            explanation: "Manages salted password hashing and serializes user IDs into HTTP-only cookie sessions backed by connect-mongo.",
            category: "security"
          },
          "Joi": {
            id: "Joi",
            name: "Joi Schema Validation",
            role: "Request and schema validation before persistence.",
            explanation: "Validates prices, required fields, and string lengths prior to database insertion, preventing payload exploits.",
            category: "security"
          },
          "Helmet": {
            id: "Helmet",
            name: "Helmet Security Headers",
            role: "HTTP response headers hardening against web vulnerabilities.",
            explanation: "Applies Content Security Policy (CSP), prevents clickjacking with X-Frame-Options, and enforces HTTPS transport.",
            category: "security"
          },
          "MONGOOSE": {
            id: "MONGOOSE",
            name: "Mongoose ODM",
            role: "Schema modeling, relational references & validation hooks.",
            explanation: "Provides schema validation, middleware hooks (cascading review deletion upon listing removal), and relational references via ObjectId populate.",
            category: "database"
          },
          "MONGODB": {
            id: "MONGODB",
            name: "MongoDB Database",
            role: "NoSQL document persistence with GeoJSON spatial indexing.",
            explanation: "Stores Listings, Reviews, and Users collections. GeoJSON point coordinates enable spatial indexing for proximity lookups.",
            category: "database"
          },
          "Cloudinary": {
            id: "Cloudinary",
            name: "Cloudinary Media CDN",
            role: "Image storage, cloud optimization, and delivery.",
            explanation: "Directly offloads image payloads from application servers. Automatically optimizes format (WebP) and dynamically crops thumbnails.",
            category: "cloud"
          },
          "Nominatim": {
            id: "Nominatim",
            name: "OpenStreetMap Nominatim Geocoding",
            role: "Forward address geocoding converting text location to latitude/longitude.",
            explanation: "Free, open-source geocoder converting user-entered city or address into exact GPS coordinates on listing creation.",
            category: "service"
          },
          "Leaflet": {
            id: "Leaflet",
            name: "Leaflet.js Vector Maps",
            role: "Lightweight client-side interactive map rendering.",
            explanation: "Renders OpenStreetMap vector tiles, custom interactive markers, and popups with zero Google Maps API quota restrictions.",
            category: "client"
          }
        }
      },
      engineeringDecisions: [
        {
          question: "Why MongoDB instead of PostgreSQL?",
          answer: "Schema agility for variable rental properties and native GeoJSON geospatial support.",
          rationale: "Rental listings have fluctuating attributes (amenities arrays, dynamic pricing, nested reviews) that naturally fit MongoDB's document model. MongoDB's 2dsphere indexing allows direct geospatial queries without complex GIS extensions.",
          tradeOff: "Relational integrity must be maintained at the application/Mongoose level with pre/post hooks rather than database-level foreign key cascades."
        },
        {
          question: "Why MVC Architecture?",
          answer: "Separation of concerns for maintainability, testability, and clean interview code walkthroughs.",
          rationale: "Separating routes (Express routers), business logic (controllers), data schemas (models), and UI (views) guarantees that adding new features never requires rewriting existing endpoints.",
          tradeOff: "More initial boilerplate compared to single-file script architectures, but pays dividends in team collaboration and clarity."
        },
        {
          question: "Why Passport.js with persistent sessions instead of stateless JWT?",
          answer: "Instant session revocation and traditional server-rendered application synergy.",
          rationale: "For traditional server-rendered web applications with HTTP cookies, server-side session stores (connect-mongo) allow immediate session revocation on logout or password change, which stateless JWT tokens cannot achieve without Redis blacklists.",
          tradeOff: "Requires a persistent session store (MongoDB session collection) rather than purely stateless server memory."
        },
        {
          question: "Why Cloudinary for media storage?",
          answer: "Offloads image resizing, WebP transformation, and global CDN delivery from Node.js servers.",
          rationale: "Allowing users to upload high-res photos directly to the application server causes memory spikes and consumes disk space. Cloudinary transforms images to optimized WebP on the fly and distributes them globally.",
          tradeOff: "External third-party API dependency and network upload latency during listing creation."
        },
        {
          question: "Why Joi + Helmet?",
          answer: "Defense-in-depth security at both the transport and application data layers.",
          rationale: "Joi acts as an early gatekeeper rejecting malformed or malicious payload injections before reaching the DB. Helmet injects standard HTTP security headers (CSP, HSTS, X-Frame-Options) to shield against XSS and clickjacking.",
          tradeOff: "Requires configuring strict CSP whitelist rules for third-party scripts (Leaflet tiles, Cloudinary assets, Bootstrap CDN)."
        },
        {
          question: "Why Leaflet.js + Nominatim instead of Google Maps API?",
          answer: "Zero API cost, open-source independence, and privacy-conscious GIS.",
          rationale: "Google Maps charges per geocode and map load with strict quota limits. Nominatim (OpenStreetMap) provides free forward geocoding, and Leaflet delivers a blazing-fast 40KB client bundle.",
          tradeOff: "Nominatim has a 1 request/sec rate limit, requiring client-side throttling or server caching for bulk geocoding."
        }
      ],
      features: [
        {
          name: "Listing Creation & Management",
          description: "Full CRUD operations for rental properties with price, location, description, and cloud photo upload.",
          tag: "CRUD & Cloud"
        },
        {
          name: "Interactive Geocoding & Map Pins",
          description: "Automatic forward geocoding via Nominatim with responsive Leaflet vector maps showing exact coordinates.",
          tag: "GIS & Maps"
        },
        {
          name: "Session Auth & User Authorizations",
          description: "Secure signup, login, and authorization checks ensuring only listing owners can edit or delete stays.",
          tag: "Passport & RBAC"
        },
        {
          name: "Reviews & Ratings System",
          description: "Verified customer star ratings and feedback with cascading deletion if a listing is deleted.",
          tag: "Mongoose Hooks"
        },
        {
          name: "Security & Validation Middleware",
          description: "Strict Joi schema sanitization, Helmet HTTP protection, and connect-mongo session persistence.",
          tag: "Helmet & Joi"
        }
      ],
      proof: {
        liveUrl: "https://bnbclone-x8tw.onrender.com/",
        githubUrl: "https://github.com/rahul0037a",
        metrics: "Production deployment on Render, MongoDB Atlas database, Cloudinary CDN",
        badges: ["Live on Render", "Open Source on GitHub", "Verified MVC Architecture"],
        summary: "Fully functional production deployment on Render connected to MongoDB Atlas and Cloudinary."
      }
    },
    {
      id: "foodplay",
      title: "FoodPlay",
      subtitle: "Personalized Meal Recommendation Web App",
      description:
        "Nutrition-aware diet planner that generates customized meal plans based on individual fitness goals and activity data.",
      category: "HealthTech & Algorithms",
      tags: ["Flask", "JavaScript", "HTML/CSS", "Python", "Render"],
      liveUrl: "https://github.com/rahul0037a/FoodPlay",
      githubUrl: "https://github.com/rahul0037a/FoodPlay",
      metrics: "Serving 50+ Test Users & <20ms API Response",
      highlights: [
        "Engineered a BMR/TDEE calculation engine integrating user inputs (weight, height, activity level, fitness goal) to produce daily macro targets.",
        "Built a preference collection system supporting dietary restrictions, goal types (cut/bulk/maintain), and cuisine preferences — serving 50+ test users.",
        "Developed end-to-end Flask REST backend and a responsive JS frontend; deployed on Render (free tier)."
      ],
      problem: {
        whatWereYouBuilding:
          "FoodPlay was built to solve ambiguity in personal diet planning by converting physiological biometrics into scientifically grounded daily caloric and macronutrient targets. Users receive mathematically balanced meal combinations that match their specific fitness targets (cutting fat, building muscle, or maintaining weight).",
        challenges: [
          "Accurately implementing scientific metabolic formulas (Mifflin-St Jeor) accounting for biological gender, age, height, and activity coefficients.",
          "Partitioning target calories into biochemically viable protein, carbohydrate, and fat gram ratios without rounding drift.",
          "Keeping API response latency under 20ms for instant real-time calculation."
        ],
        targetUsers:
          "Fitness enthusiasts, athletes, and individuals tracking personalized daily caloric and macro targets."
      },
      architecture: {
        frontend: "Responsive JavaScript + Custom HTML/CSS UI",
        backend: "Python 3 + Flask RESTful API Microservice",
        database: "Structured nutritional data & macro lookup dictionaries",
        securityCloud: "Render cloud deployment (free tier), input sanitization"
      },
      architectureTree: {
        pipeline: [
          "CLIENT",
          "BIOMETRICS INTAKE UI",
          "FLASK REST MICROSERVICE",
          "MIFFLIN-ST JEOR ENGINE",
          "MACRO OPTIMIZER",
          "NUTRITION STORE"
        ],
        branches: [
          {
            parentId: "NUTRITION STORE",
            label: "Validation & Hosting",
            items: ["50+ User Test", "Render PaaS"]
          }
        ],
        components: {
          "CLIENT": {
            id: "CLIENT",
            name: "Client Browser",
            role: "Biometric intake and interactive nutrition visualization.",
            explanation: "Collects weight, height, age, gender, and activity factors with responsive inputs.",
            category: "client"
          },
          "BIOMETRICS INTAKE UI": {
            id: "BIOMETRICS INTAKE UI",
            name: "Biometrics Input Form",
            role: "Input validation and biometric parameter assembly.",
            explanation: "Validates positive boundaries for height/weight and translates activity drop-downs into numerical multipliers.",
            category: "client"
          },
          "FLASK REST MICROSERVICE": {
            id: "FLASK REST MICROSERVICE",
            name: "Flask REST API",
            role: "Lightweight Python microservice handling computation requests.",
            explanation: "Stateless microservice that executes calculation routines and returns structured JSON responses in <20ms.",
            category: "routing"
          },
          "MIFFLIN-ST JEOR ENGINE": {
            id: "MIFFLIN-ST JEOR ENGINE",
            name: "Mifflin-St Jeor Metabolic Core",
            role: "Computes Basal Metabolic Rate (BMR) & Total Daily Energy Expenditure (TDEE).",
            explanation: "Calculates BMR using gender-differentiated formulas and applies physical activity coefficients (1.2 to 1.9).",
            category: "algorithm"
          },
          "MACRO OPTIMIZER": {
            id: "MACRO OPTIMIZER",
            name: "Macro Partitioning Algorithm",
            role: "Splits target calories into protein, carb & lipid gram distributions.",
            explanation: "Applies macro splits based on the user's selected fitness phase (Cut/Bulk/Maintain).",
            category: "algorithm"
          },
          "NUTRITION STORE": {
            id: "NUTRITION STORE",
            name: "Nutritional Catalog",
            role: "Curated dataset of whole foods, recipes, and caloric profiles.",
            explanation: "Provides fast dictionary lookups to recommend food items that fit remaining daily macro budgets.",
            category: "database"
          },
          "50+ User Test": {
            id: "50+ User Test",
            name: "Empirical User Testing",
            role: "50+ active peer testing group for calculation validation.",
            explanation: "Tested with 50+ users to validate algorithm usability and nutrition suggestions.",
            category: "service"
          },
          "Render PaaS": {
            id: "Render PaaS",
            name: "Render Cloud Hosting",
            role: "Automated deployment on Render (free tier).",
            explanation: "Hosts Python WSGI server with continuous git deploy hooks.",
            category: "cloud"
          }
        }
      },
      engineeringDecisions: [
        {
          question: "Why Python Flask over Node.js Express?",
          answer: "Native mathematical ergonomics and potential machine learning expansion.",
          rationale: "Python provides clean numeric syntax for mathematical formula execution and direct future interoperability with Python scientific libraries for predictive meal tailoring.",
          tradeOff: "Requires WSGI server configuration on deployment rather than a standard Node event loop."
        },
        {
          question: "Why the Mifflin-St Jeor equation over Harris-Benedict?",
          answer: "Recognized as the gold standard with lower clinical estimation error.",
          rationale: "Clinical comparative studies demonstrate that Mifflin-St Jeor has lower estimation variance for healthy individuals, making it more reliable than the older 1919 Harris-Benedict formula.",
          tradeOff: "Requires exact gender, age, height, and weight inputs from the user."
        }
      ],
      features: [
        {
          name: "Mifflin-St Jeor BMR & TDEE Math",
          description: "Scientific metabolic rate computation tailored to individual age, gender, weight, and activity level.",
          tag: "Algorithm"
        },
        {
          name: "Goal-Oriented Caloric Targets",
          description: "Calculates deficit/surplus targets based on cutting, bulking, or maintenance goals.",
          tag: "Fitness Engine"
        },
        {
          name: "Macro Partitioning",
          description: "Translates caloric goals into exact daily gram targets for protein, carbohydrates, and healthy fats.",
          tag: "Nutrition"
        },
        {
          name: "Dietary Preference Filters",
          description: "Supports dietary restrictions, goal types, and cuisine preferences.",
          tag: "Preferences"
        }
      ],
      proof: {
        liveUrl: "https://github.com/rahul0037a/FoodPlay",
        githubUrl: "https://github.com/rahul0037a/FoodPlay",
        metrics: "Sub-20ms API response, validated with 50+ test users, deployed on Render",
        badges: ["Tested with 50+ Users", "Open Source on GitHub", "Deployed on Render"],
        summary: "Complete open-source repository with calculation tests and deployment scripts."
      }
    },
    {
      id: "blog-blitz",
      title: "Blog Blitz",
      subtitle: "Team Blogging Platform",
      description:
        "Collaborative blogging website built as a team project during the internship.",
      category: "Front-End & UI/UX",
      tags: ["HTML", "CSS", "JavaScript", "Team Git Workflow", "Vercel"],
      liveUrl: "https://blog-blitz-iefe.vercel.app/",
      githubUrl: "https://github.com/rahul0037a",
      metrics: "8+ Responsive Pages & 3-Person Team Git Collaboration",
      highlights: [
        "Owned the UI/UX layer, developing responsive mobile-first layouts and reusable components across 8+ pages.",
        "Collaborated with 3 teammates using Git-based branch workflows and pull-request reviews.",
        "Deployed to Vercel with automated CI/CD continuous deployment hooks."
      ],
      problem: {
        whatWereYouBuilding:
          "Blog Blitz was built as a collaborative blogging website during an internship. The goal was to engineer a responsive, clean multi-page publishing platform across 8+ pages while following team Git branch workflows and pull-request reviews.",
        challenges: [
          "Coordinating feature development across 3 developers simultaneously using feature branches and avoiding merge conflicts.",
          "Ensuring consistent visual rhythm and responsive readability across mobile viewports, tablets, and wide monitors.",
          "Automating deployment previews on Vercel for code review validation."
        ],
        targetUsers:
          "Writers, developers, and collaborative teams publishing tech articles."
      },
      architecture: {
        frontend: "Modern HTML5 Semantic structure + Responsive CSS3 layouts",
        backend: "Client-side interactive state & simulated REST calls",
        database: "Local storage persistence & structured JSON article feed",
        securityCloud: "Vercel edge deployment with global CDN acceleration"
      },
      architectureTree: {
        pipeline: [
          "CLIENT",
          "SEMANTIC HTML5 & CSS3",
          "INTERACTIVE JS STATE",
          "ARTICLE JSON DATA STORE",
          "VERCEL EDGE CDN"
        ],
        branches: [
          {
            parentId: "VERCEL EDGE CDN",
            label: "Team Collaboration",
            items: ["3-Dev Git Workflow", "PR Reviews"]
          }
        ],
        components: {
          "CLIENT": {
            id: "CLIENT",
            name: "Client Browser",
            role: "Typographic reader experience and author editor workspace.",
            explanation: "Optimized for high-readability typography, syntax highlighting, and smooth transitions.",
            category: "client"
          },
          "SEMANTIC HTML5 & CSS3": {
            id: "SEMANTIC HTML5 & CSS3",
            name: "Semantic HTML5 & Modern CSS3",
            role: "Accessible document outline with mobile-first CSS grid and flexbox.",
            explanation: "Employs accessible landmarks (article, aside, nav) ensuring screen reader compliance and high Lighthouse scores.",
            category: "client"
          },
          "INTERACTIVE JS STATE": {
            id: "INTERACTIVE JS STATE",
            name: "Client State & Event Handlers",
            role: "Category filter switches, reading time calculator, and bookmarking.",
            explanation: "Calculates article reading duration based on word count and manages local storage favorites.",
            category: "routing"
          },
          "ARTICLE JSON DATA STORE": {
            id: "ARTICLE JSON DATA STORE",
            name: "Article Feed Data Store",
            role: "Structured schema for author profiles, tags, and articles.",
            explanation: "Decouples article content from presentation logic for fast updates.",
            category: "database"
          },
          "VERCEL EDGE CDN": {
            id: "VERCEL EDGE CDN",
            name: "Vercel Edge Platform",
            role: "Automated continuous deployment and global edge distribution.",
            explanation: "Deploys automatically on git push with instant preview URLs for code reviews.",
            category: "cloud"
          },
          "3-Dev Git Workflow": {
            id: "3-Dev Git Workflow",
            name: "Team Git Workflow",
            role: "Branch protection, PR code reviews, and commit standards.",
            explanation: "Collaborative Git cadence across a 3-person development squad.",
            category: "service"
          },
          "PR Reviews": {
            id: "PR Reviews",
            name: "Pull Request Code Reviews",
            role: "Peer review quality bar ensuring uniform CSS architecture.",
            explanation: "Enforced modular style guidelines before merging into the main branch.",
            category: "service"
          }
        }
      },
      engineeringDecisions: [
        {
          question: "Why semantic HTML5 over div-heavy markup?",
          answer: "Accessibility compliance, SEO crawlability, and optimal browser rendering.",
          rationale: "Articles structured with `<article>`, `<header>`, `<main>`, and `<aside>` are automatically understood by screen readers, search engines, and browser reader modes without extra JavaScript overhead.",
          tradeOff: "Requires rigorous adherence to semantic specs during team development."
        },
        {
          question: "Why team feature branches instead of pushing to main?",
          answer: "Zero regression risk and disciplined peer review cycles.",
          rationale: "Enforcing Git feature branches and PR approvals prevented styling conflicts and guaranteed that every deployed version on Vercel passed layout checks.",
          tradeOff: "Requires active team communication and continuous synchronization with the upstream branch."
        }
      ],
      features: [
        {
          name: "8+ Responsive Publication Pages",
          description: "Homepage feed, article reader, category explorer, author bio, and submission portal.",
          tag: "Multi-Page"
        },
        {
          name: "Dynamic Category & Tag Filtering",
          description: "Filter articles by technology topics (JavaScript, Web Design, AI, DevOps).",
          tag: "Filtering"
        },
        {
          name: "Automatic Read Time Calculation",
          description: "Analyzes article word length and computes estimated reading minutes dynamically.",
          tag: "Client JS"
        },
        {
          name: "Mobile-First Fluid Typography",
          description: "Responsive layouts and reusable components across mobile and desktop.",
          tag: "UI/UX"
        }
      ],
      proof: {
        liveUrl: "https://blog-blitz-iefe.vercel.app/",
        githubUrl: "https://github.com/rahul0037a",
        metrics: "8+ responsive pages, 3-developer team Git cadence, Vercel automated CI/CD",
        badges: ["Live on Vercel", "Team Project", "Git Workflow Verified"],
        summary: "Live on Vercel global edge network with active GitHub repository."
      }
    }
  ] as Project[],

  skillCategories: [
    {
      category: "Frontend",
      description: "Client-side architecture, type-safe interfaces, and responsive design systems",
      skills: [
        { name: "React.js", usedInProjects: ["FuseCake (SaaS)", "Ethnus", "WanderLust"], highlight: true },
        { name: "Next.js", usedInProjects: ["FuseCake (SaaS)"], highlight: true },
        { name: "TypeScript", usedInProjects: ["FuseCake (SaaS)", "Portfolio OS"], highlight: true },
        { name: "Tailwind CSS", usedInProjects: ["FuseCake (SaaS)", "Portfolio OS"], highlight: true },
        { name: "HTML5 / CSS3", usedInProjects: ["Blog Blitz", "FoodPlay", "WanderLust"], highlight: false },
        { name: "Bootstrap / EJS", usedInProjects: ["WanderLust"], highlight: false },
        { name: "Leaflet.js", usedInProjects: ["WanderLust"], highlight: false }
      ]
    },
    {
      category: "Backend",
      description: "Server-side routing, API microservices, and object-oriented systems",
      skills: [
        { name: "Node.js", usedInProjects: ["WanderLust", "Ethnus", "Portfolio OS"], highlight: true },
        { name: "Express.js", usedInProjects: ["WanderLust", "Ethnus"], highlight: true },
        { name: "Flask", usedInProjects: ["FoodPlay"], highlight: true },
        { name: "Java (OOP)", usedInProjects: ["VIT Academic Systems", "DSA Practice"], highlight: true },
        { name: "Python", usedInProjects: ["FoodPlay", "Stanford ML"], highlight: false }
      ]
    },
    {
      category: "Data",
      description: "Document and relational persistence, schema validation, and spatial indexing",
      skills: [
        { name: "MongoDB", usedInProjects: ["WanderLust", "Ethnus"], highlight: true },
        { name: "MySQL", usedInProjects: ["VIT Academic DBMS", "Relational Modeling"], highlight: true },
        { name: "SQL", usedInProjects: ["WanderLust", "VIT Academic DBMS"], highlight: false }
      ]
    },
    {
      category: "Cloud",
      description: "Cloud infrastructure, media delivery, identity access management, and PaaS hosting",
      skills: [
        { name: "AWS", usedInProjects: ["AWS Certified Cloud Practitioner", "Cloud Architecture"], highlight: true },
        { name: "Cloudinary", usedInProjects: ["WanderLust"], highlight: true },
        { name: "Render", usedInProjects: ["WanderLust", "FoodPlay"], highlight: false }
      ]
    },
    {
      category: "Engineering",
      description: "Core computer science fundamentals, architectural patterns, and development workflow",
      skills: [
        { name: "REST APIs", usedInProjects: ["WanderLust", "FuseCake (SaaS)", "FoodPlay", "Ethnus"], highlight: true },
        { name: "Authentication", usedInProjects: ["Passport.js (WanderLust)", "Auth Flow (FuseCake)", "RBAC (Ethnus)"], highlight: true },
        { name: "Session Management", usedInProjects: ["WanderLust (connect-mongo)"], highlight: true },
        { name: "MVC Architecture", usedInProjects: ["WanderLust (Express/EJS/Mongoose)"], highlight: true },
        { name: "Git & GitHub", usedInProjects: ["Blog Blitz (Team Git)", "All Repositories"], highlight: false },
        { name: "Data Structures & Algorithms", usedInProjects: ["100+ LeetCode / HackerRank Solved", "VIT CSE"], highlight: false },
        { name: "SDLC", usedInProjects: ["Ethnus Internship", "FuseCake SaaS"], highlight: false }
      ]
    }
  ] as SkillCategory[],

  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Valid - Aug 2027",
      badge: "AWS Certified",
      verified: true,
      skillsGained: ["AWS Global Infrastructure", "Cloud Security & IAM", "EC2, S3, RDS, DynamoDB", "Billing & CloudWatch Architecture"]
    },
    {
      title: "Supervised Machine Learning: Regression & Classification",
      issuer: "Coursera / Stanford Online (Andrew Ng)",
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
