// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Sumanth Gajula",
  handle: "sumanth",
  role: "Node.js / Full Stack Engineer",
  location: "Overland Park, KS",
  email: "sumanthg232001@gmail.com",
  phone: "913-278-8177",
  github: "https://github.com/GSumanth23",
  linkedin: "https://www.linkedin.com/in/sumanth-gajula-253579208",
  // Put your photo in /public (e.g. /photo.jpg) and set it here. Empty = initials avatar.
  photo: "photo.jpg",
  // Where the pixel sunglasses land on the photo (percent of photo size).
  shades: { top: "20.3%", left: "50.2%", width: "18%" },
  intro: "I build fast, secure Node.js backends for healthcare and finance, and I ship side projects end to end.",
  tagline:
    "I build production Node.js and TypeScript backends — REST & GraphQL APIs, auth, observability — for healthcare and financial platforms.",
  summary: [
    "Node.js engineer with 4+ years shipping backend services at Oracle Health, EY, and Pfizer.",
    "I like the parts of the stack most people avoid: legacy rewrites, event-loop bottlenecks, auth middleware, and the logging that tells you what actually broke at 2 a.m.",
    "Currently building cloud healthcare APIs at Oracle Health, and shipping side projects end to end — from schema to deploy.",
  ],
};

export const stats = [
  { value: "4+", label: "years in production" },
  { value: "~40%", label: "faster API responses" },
  { value: "85%+", label: "API test coverage" },
  { value: "10+", label: "services on shared middleware" },
];

export const experience = [
  {
    company: "Oracle Health",
    title: "Node.js Engineer",
    period: "Oct 2025 – Present",
    location: "Kansas",
    points: [
      "Own production Node.js/TypeScript services and REST/GraphQL APIs powering clinical and patient-facing apps on Oracle Health's cloud platform.",
      "Led the migration of legacy server-side endpoints to Express services through incremental rewrites — zero downtime for existing consumers.",
      "Authored a shared Express middleware library (Zod validation, correlation IDs, rate limiting, centralized errors) reused across 10+ services.",
      "Built OAuth 2.0 / OIDC JWT validation and fine-grained RBAC on every route that touches patient data.",
      "Designed an Apollo GraphQL layer with DataLoader batching over existing REST services, eliminating N+1 queries.",
      "Fixed event-loop blocking with worker threads and streamed exports; cut response times ~40% via caching, Promise.all, pooling and SQL indexes.",
      "Shipped Winston → Logstash → Elasticsearch audit logging with Kibana alerts, shortening incident root-cause time.",
    ],
    stack: ["Node.js", "TypeScript", "Express", "GraphQL", "Oracle DB", "PostgreSQL", "ELK", "Docker", "Kubernetes", "OCI"],
  },
  {
    company: "EY Global Delivery Services",
    title: "Software Engineer",
    period: "Aug 2022 – Dec 2023",
    location: "India",
    points: [
      "Built Node.js backends for EY Tax and Assurance audit, reporting and compliance platforms.",
      "Created Express BFF and microservice APIs aggregating multiple internal systems for Next.js apps.",
      "Rewrote legacy jQuery/server-side reporting modules as versioned Node.js APIs after documenting their business rules.",
      "Shipped serverless APIs on AWS Lambda + API Gateway + DynamoDB with the Serverless Framework.",
      "Implemented Azure AD SSO (OAuth 2.0 / OIDC / JWT) through Express auth middleware.",
    ],
    stack: ["Node.js", "Express", "Next.js", "AWS Lambda", "DynamoDB", "PostgreSQL", "SQL Server", "Azure AD", "Cypress"],
  },
  {
    company: "Pfizer",
    title: "Software Developer",
    period: "May 2021 – Jul 2022",
    location: "India",
    points: [
      "Developed Node.js services and APIs for clinical research data management in JavaScript and TypeScript.",
      "Built serverless functions on AWS Lambda with DynamoDB and S3, monitored in CloudWatch.",
      "Migrated legacy jQuery pages onto new Node.js APIs backed by PostgreSQL and MongoDB.",
    ],
    stack: ["Node.js", "TypeScript", "AWS Lambda", "S3", "MongoDB", "PostgreSQL", "jQuery"],
  },
];

export const projects = [
  {
    name: "Oracle Health Clinical APIs",
    status: "work",
    tagline: "Cloud healthcare platform APIs",
    color: "#93c5fd",
    image: "",
    url: "internal · Oracle Health",
    description:
      "REST and GraphQL APIs for clinical summaries, documents and approval workflows. Migrated legacy endpoints to microservices with zero downtime, secured patient data with OIDC and RBAC, built an ELK audit-logging pipeline, and added resilient LLM integrations with real-time streaming. About 40% faster API responses.",
    stack: ["Node.js", "TypeScript", "Express", "Apollo GraphQL", "Elastic Stack", "OCI"],
    live: null,
    repo: null,
  },
  {
    name: "CareDesk",
    status: "in progress",
    tagline: "Multi-clinic appointment portal",
    color: "#c4b5fd",
    image: "",
    url: "caredesk",
    description:
      "Multi-clinic appointment portal with role-based access for clinic admins, doctors, front desk and patients. Each clinic is its own Auth0 Organization.",
    stack: ["Node.js", "Express", "Auth0", "Neon Postgres", "React"],
    live: null,
    repo: null,
  },
  {
    name: "Plate",
    status: "live",
    tagline: "Full-stack calorie tracker",
    color: "#6ee7b7",
    image: "",
    url: "calorie-tracker-pk2g.onrender.com",
    description:
      "Full-stack calorie tracker for logging meals and daily intake. React front end, Node.js API, Postgres on Neon, deployed on Render.",
    stack: ["React", "Node.js", "Express", "Neon Postgres", "Render"],
    live: "https://calorie-tracker-pk2g.onrender.com",
    repo: "https://github.com/GSumanth23/calorie-tracker",
  },
  {
    name: "Cheezywich Cafe & Bites",
    status: "live",
    tagline: "Menu & WhatsApp ordering for a real café",
    color: "#fcd34d",
    image: "",
    url: "cheezywich.vercel.app",
    description:
      "Website for a real café in Hyderabad — menu, combos and WhatsApp ordering, built for fast first load on mobile.",
    stack: ["React", "Vite", "Vercel"],
    live: "https://cheezywich.vercel.app",
    repo: null,
  },
];

export const skills = {
  "Core": ["Node.js", "Express", "TypeScript", "JavaScript (ES6+)", "GraphQL / Apollo", "REST", "Microservices", "Next.js"],
  "Auth & Security": ["OAuth 2.0", "OIDC", "JWT", "RBAC", "Azure AD SSO", "Passport.js", "Helmet"],
  "Data": ["PostgreSQL", "Oracle DB", "MongoDB", "SQL Server", "DynamoDB", "Elasticsearch"],
  "Cloud & Ops": ["AWS Lambda", "API Gateway", "S3", "Docker", "Kubernetes", "OCI", "Jenkins", "Azure DevOps"],
  "Observability": ["Elastic Stack", "Winston", "Kibana", "CloudWatch", "Request tracing"],
  "Testing": ["Mocha", "Chai", "Supertest", "Jest", "Cypress", "TDD"],
  "AI-Assisted Dev": ["GitHub Copilot", "Claude", "LLM integration", "SSE streaming"],
};

export const education = [
  { degree: "M.S. Computer Science", school: "University of Central Missouri", period: "2024 – 2025" },
  { degree: "B.Tech", school: "GITAM University, Hyderabad", period: "2018 – 2022" },
];
