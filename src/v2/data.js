export const skills = [
  "Python", "FastAPI", "Django", "Flask", "Node.js", "Spring Boot", "Java",
  "TypeScript", "GraphQL", "React", "Next.js", "React Native", "Flutter",
  "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "SQLAlchemy", "Prisma",
  "PyTorch", "TensorFlow", "Scikit-learn", "NumPy", "Pandas", "Docker",
  "AWS", "Vercel", "Git", "GitHub Actions", "Jest", "Cypress",
];

export const skillGroups = [
  { title: "Backend & APIs", skills: ["Python", "FastAPI", "Django REST Framework", "Flask", "Node.js", "Spring Boot", "GraphQL"] },
  { title: "AI & data", skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Data preprocessing", "Model evaluation"] },
  { title: "Frontend & mobile", skills: ["React", "Next.js", "React Native", "Flutter", "TypeScript", "Tailwind CSS"] },
  { title: "Data & delivery", skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "GitHub Actions", "Jest", "Cypress"] },
];

export const projects = [
  {
    number: "01",
    title: "Health 101",
    category: "Health tech · AI",
    period: "2025 — 2026",
    description: "A health mobile app with a secure backend and real-time features, including heart-failure prediction models built with PyTorch and REST APIs powered by FastAPI.",
    image: "/projects/health101.png",
    imageAlt: "Health 101 mobile app project",
    tags: ["Flutter", "FastAPI", "GraphQL", "PyTorch", "PostgreSQL", "Redis"],
    link: "https://github.com/danielemmzy/health101",
    linkLabel: "View on GitHub",
  },
  {
    number: "02",
    title: "Vivid Gen",
    category: "Generative AI · SaaS",
    period: "2025 — 2026",
    description: "An AI video and text-to-speech platform built around custom PyTorch models, avatar and dubbing APIs, GPU inference, and a credit-based billing system.",
    image: "/projects/vivid_gen.png",
    imageAlt: "Vivid Gen AI video generation interface",
    tags: ["Python", "FastAPI", "React", "PyTorch", "Modal", "PostgreSQL"],
    link: null,
  },
  {
    number: "03",
    title: "Radse Stock Price Predictor",
    category: "Machine learning · Data",
    period: "2024 — 2025",
    description: "A supervised learning model that forecasts next-day stock prices from historical market data, with a data-cleaning and feature-engineering pipeline.",
    image: "/projects/pred_form.png",
    imageAlt: "Stock price predictor project interface",
    tags: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn"],
    link: null,
  },
  {
    number: "04",
    title: "Prime Routex",
    category: "Logistics · Real time",
    period: "2024",
    description: "A logistics and shipment-tracking system with real-time delivery updates and scalable backend workflows.",
    image: "/projects/1.png",
    imageAlt: "Prime Routex logistics project",
    tags: ["Laravel", "PHP", "JavaScript", "PostgreSQL"],
    link: null,
  },
  {
    number: "05",
    title: "StreamSphere",
    category: "Media · Cloud",
    period: "2024",
    description: "A media streaming platform with secure uploads, FFmpeg transcoding through SQS, AWS Cognito authentication, and a FastAPI backend.",
    image: "/projects/herobg2.jpg",
    imageAlt: "Abstract image representing the StreamSphere media platform",
    tags: ["Flutter", "FastAPI", "FFmpeg", "AWS", "PostgreSQL"],
    link: null,
  },
];

export const experience = [
  {
    period: "Dec 2025 — Mar 2026",
    role: "Python Intern · Machine Learning & AI",
    company: "CodSoft",
    location: "Remote",
    description: "Developed practical AI and machine-learning solutions, building experience in data preparation, model training, evaluation, and visualization.",
    technologies: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "TensorFlow"],
  },
  {
    period: "May 2024 — Mar 2025",
    role: "Junior Software Developer",
    company: "SpecsTech Africa Solutions",
    location: "Enugu, Nigeria",
    description: "Contributed to full-stack web applications with Laravel PHP, created a currency-converter plugin for WordPress, and tested client releases.",
    technologies: ["Laravel", "PHP", "WordPress", "MySQL", "JavaScript"],
  },
  {
    period: "Sep 2023 — May 2024",
    role: "Freelance Full-Stack Developer",
    company: "Upwork",
    location: "Remote",
    description: "Delivered cross-platform mobile apps, designed APIs with FastAPI and Django REST Framework, and managed end-to-end delivery and deployment.",
    technologies: ["Flutter", "FastAPI", "Django", "React Native", "AWS", "Git"],
  },
];

export const testimonials = [
  {
    quote: "Daniel communicates really well and actually listens. I wanted an eCommerce app, but what I got was way better than I expected. He added features I hadn't thought about, like proper analytics and smoother checkout flows.",
    author: "Agatha Chen",
    role: "Ecommerce Business Owner",
  },
  {
    quote: "Daniel helped me build a delivery tracking app with live tracking and real-time updates. He explained things in a way I could understand, and the system has stayed stable as more users joined.",
    author: "Michael Rodriguez",
    role: "Logistics Startup Founder",
  },
  {
    quote: "We worked with Daniel on a health-related app with AI features. He built the APIs, connected everything, and improved the way data was presented on the dashboard. He thinks beyond just coding.",
    author: "Dr. Anita Verma",
    role: "HealthTech Entrepreneur",
  },
  {
    quote: "Working with Daniel was smooth from start to finish. He built our SaaS platform with dashboards, real-time updates, and user roles. Communication was clear throughout.",
    author: "Laura Bennett",
    role: "SaaS Product Manager",
  },
];

export const process = [
  { number: "01", title: "Understand", description: "Get close to the problem, the people using the product, and what success needs to look like." },
  { number: "02", title: "Shape", description: "Turn the requirements into a clear system design, data model, and practical delivery plan." },
  { number: "03", title: "Build", description: "Ship reliable APIs and thoughtful product features in small, reviewable steps." },
  { number: "04", title: "Improve", description: "Measure what matters, fix the rough edges, and keep the product ready for real use." },
];
