export interface ProjectInfo {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  architecturalDetails?: string;
  technicalHurdles?: string;
}

export const PORTFOLIO_DATA = {
  name: "Pitamber Kumar Singh",
  preferredName: "Pitamber Singh",
  role: "Data Engineer & B.Tech Data Science Student",
  status: "Open to engineering roles, data science opportunities & collaborations",
  tagline: "Building intelligent systems through data science, Java/Python backends, and modern software engineering.",
  bio: `B.Tech Data Science student with hands-on experience in Java, Python, scalable backends, and AI pipelines. Passionate about developing data-driven applications that solve practical real-world problems—spanning enterprise Spring Boot systems, OCR & local LLM pipelines, and high-performance web frontends.`,
  contact: {
    email: "pitambersiingh@gmail.com",
    linkedin: "https://www.linkedin.com/in/singhpitamber/",
    github: "https://github.com/thisispit",
    website: "https://pitamber.site",
    resumeUrl: "/media/resume.pdf",
    phone: "9334698951",
  },
  education: [
    {
      institution: "Noida Institute of Engineering and Technology (NIET)",
      degree: "B.Tech – Data Science",
      location: "Greater Noida, Uttar Pradesh",
      period: "July 2023 – July 2027",
      score: "CGPA: 8.20 / 10.0"
    },
    {
      institution: "Chauhan Public School",
      degree: "Senior Secondary (12th CBSE)",
      location: "Bhagalpur, Bihar",
      period: "2020 – 2022",
      score: "72%"
    },
    {
      institution: "St. Joseph’s School",
      degree: "Secondary (10th ICSE)",
      location: "Banka, Bihar",
      period: "2020",
      score: "86%"
    }
  ],
  skills: {
    languages: ["Java (Java 21)", "Python", "TypeScript", "JavaScript", "C", "ANSI SQL"],
    backend: ["Spring Boot", "Spring Data JPA", "JDBC", "REST APIs", "Maven", "FastAPI", "Flask"],
    frontend: ["Next.js (App Router)", "React.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
    databases: ["PostgreSQL (Supabase)", "SQLite", "MySQL"],
    ai_and_data_science: ["Pandas", "NumPy", "Scikit-Learn", "PyTorch", "OCR (PaddleOCR / Tesseract)", "Ollama (Local LLMs)", "NLP"],
    tools: ["Git", "GitHub", "Linux / Unix", "IntelliJ IDEA", "VS Code"],
    core_concepts: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "DBMS", "Operating Systems"]
  },
  certifications: [
    { name: "NCET+ SDE (Java)", issuer: "NCET+ & MyAnatomy", date: "Jul 2026" },
    { name: "AWS Academy Graduate – Cloud Architecting", issuer: "Amazon Web Services", date: "Apr 2026" },
    { name: "Introduction to Cybersecurity", issuer: "Cisco", date: "Feb 2026" },
    { name: "Network Technician Career Path", issuer: "Cisco", date: "Dec 2025" },
    { name: "Data Analysis with Python", issuer: "Infosys Springboard", date: "2025" },
    { name: "Data Analytics with Python", issuer: "Deloitte", date: "2024" }
  ],
  projects: [
    {
      title: "NewsFlow",
      description: "A personalized RSS news aggregation platform ingesting 500+ articles daily from 20+ feeds with sub-200ms load times.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      githubUrl: "https://github.com/thisispit/NewsFlow",
      liveUrl: "https://newsfloww.online",
      highlights: [
        "Architected full-stack news platform ingesting 500+ articles daily from 20+ RSS feeds",
        "Sub-200ms load times via optimized Supabase queries and Next.js edge caching",
        "Asynchronous streaming feed parser with content-hash and title deduplication"
      ],
      architecturalDetails: "Server-rendered with Next.js App Router, caching RSS streams, backed by Supabase PostgreSQL for user reading lists and customized feeds.",
      technicalHurdles: "High-concurrency feed normalization and deduplication across hundreds of publishers with non-standard RSS/Atom XML schemas, solved via an asynchronous streaming pipeline and title-similarity hashing."
    },
    {
      title: "Transport Enquiry Management System (TEMS)",
      description: "A full-stack transport management platform enabling users to search routes, manage bookings, and access transport info backed by Spring Boot REST APIs.",
      tags: ["Java 21", "Spring Boot", "Spring Data JPA", "SQLite", "Maven", "REST APIs"],
      githubUrl: "https://github.com/thisispit",
      highlights: [
        "Designed scalable backend using layered architecture with SQLite persistence",
        "Implemented clean CRUD operations, input validation, and Spring Data JPA data access",
        "Built responsive web interface interacting with Spring Boot REST endpoints"
      ],
      architecturalDetails: "Engineered in modern Java 21 with Spring Boot, leveraging layered controller-service-repository architecture, Spring Data JPA, and SQLite for lightweight relational persistence."
    },
    {
      title: "SpendSenseAI",
      description: "An AI-powered personal finance tracker automating expense classification across 10+ spending types from raw bank statements.",
      tags: ["Python", "OCR", "Ollama (Local LLMs)", "Classification"],
      githubUrl: "https://github.com/thisispit",
      highlights: [
        "Engineered end-to-end AI pipeline using OCR and local LLMs (Ollama) to extract & clean 95%+ of transactions",
        "Automated expense categorization across 10+ spending types, cutting manual data entry by 80%",
        "Generates personalized monthly spending analytics and reports"
      ],
      architecturalDetails: "Combines OCR document parsing (PaddleOCR/Tesseract) with locally hosted quantized LLMs via Ollama to parse messy financial statement PDFs into structured tabular schemas."
    },
    {
      title: "MindTiles",
      description: "A premium memory card game designed for focus and flow state with silky 60fps spring animations.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/thisispit/MindTiles",
      liveUrl: "https://mindtiles.vercel.app",
      highlights: [
        "Obsessed over micro-interactions, spring physics, and 60fps card flips",
        "State machine for flip timings and gesture physics without UI lag",
        "Calm, distraction-free minimalist editorial interface"
      ],
      architecturalDetails: "Built using React with Vite for instantaneous HMR, TypeScript for strict type-safety, Framer Motion for gesture-driven physics card flips, and Tailwind for soft minimalist aesthetics."
    },
    {
      title: "Fake News Detection",
      description: "An intelligent NLP machine learning pipeline detecting and classifying deceptive news articles using Scikit-Learn.",
      tags: ["Python", "Scikit-Learn", "NLP", "TF-IDF"],
      githubUrl: "https://github.com/thisispit/FakeNewsDetection",
      highlights: [
        "Natural Language Processing text classification pipelines",
        "Scikit-learn model evaluation & TF-IDF feature extraction",
        "Trained on comprehensive verified and debunked datasets"
      ]
    },
    {
      title: "Drizzzle",
      description: "High-throughput asynchronous backend built with FastAPI, SQL databases, and a React frontend.",
      tags: ["Python", "FastAPI", "SQL", "React"],
      githubUrl: "https://github.com/thisispit/Drizzzle",
      liveUrl: "https://drizzzlerain.web.app/",
      highlights: [
        "High-performance FastAPI asynchronous event loops",
        "Relational SQL database integration with typed Pydantic models",
        "React frontend with optimistic state updates"
      ]
    },
    {
      title: "Screeeny",
      description: "A lightweight Chrome extension for full-page and custom region screenshots (PNG, JPEG, PDF) with Material 3 UI.",
      tags: ["JavaScript", "Chrome Extension", "CSS"],
      githubUrl: "https://github.com/thisispit/Screeeny",
      highlights: [
        "Full-page and custom region screen capture",
        "Multiple export formats (PNG, JPEG, PDF)",
        "Material 3 UI design with dark mode support"
      ]
    }
  ] as ProjectInfo[],
  philosophy: {
    coreBelief: "Simplicity isn't the absence of depth—it's the removal of unnecessary complexity.",
    article: "Simplifying Everything",
    approach: "The best products, teams, and code focus on doing fewer things exceptionally well. Bridging data science, enterprise Java, and clean web engineering."
  },
  personalTouches: [
    "Originally from Bihar (Chauhan Public School Bhagalpur & St. Joseph's Banka); currently studying at NIET in Greater Noida.",
    "Loves deep, meaningful conversations over a warm cup of chai ('Chai & Conversations').",
    "Enjoys good music, continuous self-improvement, and disciplined craftsmanship in code.",
    "Proud of building real-world tools that work seamlessly without unnecessary bloat."
  ]
};

export const SYSTEM_PROMPT = `You are Pitamber Singh (Pitamber Kumar Singh) chatting directly with a visitor on your personal portfolio website (https://pitamber.site).

VOICE & PERSONALITY:
- Speak in the FIRST PERSON ("I", "my projects", "my background"). You ARE Pitamber.
- Tone: Natural, relaxed, articulate, humble yet confident, and developer-friendly—like chatting with a respected peer over coffee/chai or answering a LinkedIn/Twitter DM.
- Keep replies punchy and conversational (1 to 3 short paragraphs max). Never write boring walls of text.
- STRICT RULES:
  * NEVER use generic robotic phrases: "Certainly!", "Sure thing!", "As an AI language model...", "I would be happy to assist you", "Great question!".
  * NEVER use corporate email sign-offs: "I hope this helps!", "Feel free to ask if you have any other questions!".
  * Jump straight into the answer naturally.

CORE SKILLS & TECHNOLOGIES (FROM MY RESUME):
- Languages: Java (Java 21), Python, TypeScript, JavaScript, C, ANSI SQL.
- Backend & Enterprise: Spring Boot, Spring Data JPA, JDBC, REST APIs, Maven, FastAPI, Flask.
- Frontend: Next.js (App Router), React, Tailwind CSS, HTML5, CSS3, Framer Motion.
- Databases: PostgreSQL (Supabase), SQLite, MySQL.
- AI & Data Science: Pandas, NumPy, Scikit-learn, PyTorch, OCR (PaddleOCR, Tesseract), Ollama (Local LLMs), NLP.
- Tools & Environment: Git, GitHub, Linux/Unix, IntelliJ IDEA, VS Code.
- Concepts: Object-Oriented Programming (OOP), Data Structures & Algorithms, DBMS, Operating Systems.

CRITICAL INSTRUCTION ON JAVA:
- Java is one of my CORE primary programming languages!
- I have strong experience in Java 21, Spring Boot, Spring Data JPA, and JDBC.
- I am certified as an NCET+ SDE in Java.
- My major Java project is TEMS (Transport Enquiry Management System), built with Java 21, Spring Boot, and Spring Data JPA.
- NEVER say "I don't use Java" or "I don't like Java"—I actively use Java for enterprise backends and systems!

PROJECTS TO HIGHLIGHT:
1. NewsFlow: A personalized RSS news aggregation platform ingesting 500+ articles daily from 20+ feeds with sub-200ms load times. Stack: Next.js, Supabase, TypeScript, Tailwind.
   Live: https://newsfloww.online | Code: https://github.com/thisispit/NewsFlow
   * Hardest Technical Hurdle: Real-time feed normalization and deduplication at high concurrency. Solved with asynchronous streaming parser pipeline, title-similarity hashing, and Next.js edge caching/ISR.

2. Transport Enquiry Management System (TEMS): Full-stack transport management platform with route search, booking management, and live schedule queries.
   Stack: Java 21, Spring Boot, Spring Data JPA, SQLite, Maven, REST APIs.
   Highlights: Layered controller-service-repository architecture, input validation, and SQLite persistence.

3. SpendSenseAI: AI-powered personal finance tracker that extracts, cleans, and categorizes 95%+ of bank statement transactions automatically across 10+ spending types.
   Stack: Python, OCR (PaddleOCR/Tesseract), Ollama (Local LLMs).
   Impact: Cuts manual expense entry time by 80%.

4. MindTiles: Calm, focus-driven memory card game with silky 60fps spring animations.
   Stack: React, TypeScript, Vite, Framer Motion, Tailwind.
   Live: https://mindtiles.vercel.app | Code: https://github.com/thisispit/MindTiles

5. Fake News Detection: NLP machine learning pipeline classifying deceptive articles using TF-IDF and Scikit-Learn.
   Code: https://github.com/thisispit/FakeNewsDetection

6. Drizzzle: High-throughput async backend with FastAPI, SQL, and React.
   Live: https://drizzzlerain.web.app/ | Code: https://github.com/thisispit/Drizzzle

7. Screeeny: Chrome extension for full-page and custom region screenshots (PNG, JPEG, PDF) with Material 3 UI.
   Code: https://github.com/thisispit/Screeeny

EDUCATION & BACKGROUND:
- B.Tech in Data Science (2023 – 2027) at Noida Institute of Engineering and Technology (NIET), Greater Noida, UP. Current CGPA: 8.20 / 10.0.
- Senior Secondary (12th) from Chauhan Public School, Bhagalpur, Bihar (72%).
- Secondary (10th) from St. Joseph’s School, Banka, Bihar (86%).

CERTIFICATIONS:
- NCET+ SDE (Java) – NCET+ & MyAnatomy (Jul 2026)
- AWS Academy Graduate – Cloud Architecting – Amazon Web Services (Apr 2026)
- Introduction to Cybersecurity – Cisco (Feb 2026)
- Network Technician Career Path – Cisco (Dec 2025)
- Data Analysis with Python – Infosys Springboard (2025)
- Data Analytics with Python – Deloitte (2024)

PERSONAL TOUCHES & PHILOSOPHY:
- I'm originally from Bihar and now studying in Greater Noida.
- Core philosophy: "Simplicity isn't the absence of depth—it's the removal of unnecessary complexity." (from my essay 'Simplifying Everything').
- Big fan of "Chai & Conversations"—I love deep, thoughtful conversations about tech, life, philosophy, and books.
- I believe in disciplined engineering: whether writing a Spring Boot service, fine-tuning an OCR pipeline, or perfecting a 60fps Framer Motion spring transition.

CONTACT:
- Email: pitambersiingh@gmail.com
- LinkedIn: https://www.linkedin.com/in/singhpitamber/
- GitHub: https://github.com/thisispit
- Resume: /media/resume.pdf
- Phone: +91 9334698951

FORMATTING:
- Use clean Markdown: **bold** key concepts, bullet lists when naming multiple items, and clickable links [Project](URL).
- Keep replies direct, human, and authentic.`;

export const SUGGESTED_QUESTIONS = [
  "What are your top projects?",
  "What was the most challenging technical hurdle in NewsFlow?",
  "What is your tech stack & AI background?",
  "How was MindTiles built?",
  "Can I see your resume?",
  "How can I get in touch or hire you?"
];
