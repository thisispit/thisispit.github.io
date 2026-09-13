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
  name: "Pitamber Singh",
  role: "Data Engineer & Computer Science Student",
  status: "Open to engineering roles, data science opportunities & collaborations",
  tagline: "Building intelligent systems through data science, AI, and modern software engineering.",
  bio: `Computer Science student specializing in Data Science, focused on building intelligent systems that solve real-world problems. By bridging AI-powered applications with scalable backends, I create technically efficient products—specializing in OCR pipelines, local LLMs, and speech systems.`,
  contact: {
    email: "pitambersiingh@gmail.com",
    linkedin: "https://www.linkedin.com/in/singhpitamber/",
    github: "https://github.com/thisispit",
    resumeUrl: "/media/resume.pdf",
    website: "https://pitamber.site",
  },
  skills: [
    "Python", "Java", "SQL", "TypeScript", "JavaScript",
    "Next.js", "FastAPI", "React", "PyTorch", "Tailwind CSS",
    "Scikit-Learn", "NLP", "OCR Pipelines", "Local LLMs",
    "Data Visualization", "Git", "Unix", "OOPS"
  ],
  projects: [
    {
      title: "MindTiles",
      description: "A premium memory card game designed for focus and flow. Sharpen your memory one match at a time with calm, elegant, and purposeful gameplay.",
      tags: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion"],
      githubUrl: "https://github.com/thisispit/MindTiles",
      liveUrl: "https://mindtiles.vercel.app",
      highlights: [
        "Focused on flow state and memory training",
        "Fluid animations built with Framer Motion",
        "Polished responsive editorial interface"
      ],
      architecturalDetails: "Built using React 18 with Vite for instantaneous HMR, TypeScript for strict type-safety, Framer Motion for gesture-driven physics card flips, and Tailwind for soft minimalist aesthetics."
    },
    {
      title: "NewsFlow",
      description: "A personalized RSS news aggregation platform delivering real-time curated news through a fast and responsive reading experience.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      githubUrl: "https://github.com/thisispit/NewsFlow",
      liveUrl: "https://newsfloww.online",
      highlights: [
        "Real-time RSS feeds curation & parsing",
        "Supabase authentication and relational data storage",
        "Modern Next.js App Router architecture"
      ],
      architecturalDetails: "Server-rendered with Next.js App Router, caching RSS streams, backed by Supabase PostgreSQL for user reading lists and customized feeds.",
      technicalHurdles: "The hardest hurdle in NewsFlow was high-concurrency feed normalization and deduplication across hundreds of publishers with non-standard XML/RSS formats, solved via an asynchronous streaming pipeline and content-hash deduplication."
    },
    {
      title: "Fake News Detection",
      description: "An intelligent machine learning system for detecting and classifying fake news articles using NLP techniques.",
      tags: ["Python", "ML", "Scikit-Learn", "NLP"],
      githubUrl: "https://github.com/thisispit/FakeNewsDetection",
      highlights: [
        "Natural Language Processing text classification pipelines",
        "Scikit-learn model evaluation & TF-IDF feature extraction",
        "Trained on comprehensive verified and debunked datasets"
      ],
      architecturalDetails: "Employs NLP tokenization, lemmatization, TF-IDF vectorization, and supervised classification algorithms (PassiveAggressive, Logistic Regression) with cross-validation metrics."
    },
    {
      title: "Drizzzle",
      description: "A modern application focused on scalable backend architecture and seamless frontend interactions.",
      tags: ["React", "FastAPI", "Python", "SQL"],
      githubUrl: "https://github.com/thisispit/Drizzzle",
      liveUrl: "https://drizzzlerain.web.app/",
      highlights: [
        "High-performance FastAPI asynchronous backend",
        "Relational SQL database integration with ORM modeling",
        "React frontend with clean optimistic state updates"
      ],
      architecturalDetails: "Asynchronous Python backend leveraging FastAPI's ASGI event loop, typed Pydantic models for validation, and PostgreSQL connection pooling."
    },
    {
      title: "Screeeny",
      description: "A lightweight Chrome extension for capturing full-page and region screenshots in PNG, JPEG, or PDF format with Material 3 UI and dark mode support.",
      tags: ["JavaScript", "CSS", "Chrome Extension"],
      githubUrl: "https://github.com/thisispit/Screeeny",
      highlights: [
        "Full-page and custom region screen capture",
        "Multiple export formats (PNG, JPEG, PDF)",
        "Material 3 UI design with dark mode support"
      ],
      architecturalDetails: "Manifest V3 Chrome Extension using Chrome captureVisibleTab and content scripts for viewport stitching, with canvas-based export."
    }
  ] as ProjectInfo[],
  philosophy: {
    coreBelief: "Simplicity isn't the absence of depth—it's the removal of unnecessary complexity.",
    article: "Simplifying Everything",
    approach: "The best products, teams, and people focus on doing fewer things exceptionally well. Bridging data science with practical, elegant user interfaces."
  },
  interests: [
    "Reflection & deep conversations ('Chai & Conversations')",
    "Exploring local LLMs and open-source AI models",
    "Continuous growth, disciplined coding, and thoughtful UI design"
  ]
};

export const SYSTEM_PROMPT = `You are Pitamber Singh chatting directly with a visitor on your personal portfolio website (https://pitamber.site).

VOICE & PERSONALITY:
- Talk in the FIRST PERSON ("I", "my projects", "I built NewsFlow"). You ARE Pitamber.
- Tone: Natural, relaxed, articulate, friendly, and direct—like chatting with a developer peer or answering a Twitter/LinkedIn DM.
- Keep replies punchy and conversational (1 to 3 short paragraphs max). Never write long essay text walls.
- STRICT RULES:
  * NEVER use generic robotic phrases: "Certainly!", "Sure thing!", "As an AI language model...", "I would be happy to assist you", "Great question!".
  * NEVER use corporate email sign-offs: "I hope this information was helpful!", "Feel free to ask if you have any further questions!".
  * Jump straight into the answer naturally.
  * Be humble yet confident about your engineering work and data science skills.

PROJECTS & KEY HURDLES (always include Markdown links when mentioned):
- NewsFlow: A personalized RSS news aggregation platform. Built with Next.js App Router, TypeScript, and Supabase for clean, real-time curated news reading.
  Live: https://newsfloww.online | Code: https://github.com/thisispit/NewsFlow
  * Most Challenging Technical Hurdle in NewsFlow:
    The biggest challenge was **real-time feed normalization and deduplication at high concurrency**.
    Different publishers output messy, inconsistent RSS/Atom schemas with missing timestamps, tracking pixels, and malformed HTML. Also, syndication meant multiple outlets published the exact same story with different URLs.
    I solved this by:
    1. Building an asynchronous streaming parser pipeline that sanitizes HTML and maps messy feeds to a unified TypeScript interface.
    2. Developing a content-hash and title-similarity deduplication layer to filter duplicate syndicated stories before writing to Supabase PostgreSQL.
    3. Implementing Next.js edge caching and Incremental Static Regeneration (ISR) so the reader gets instant 0ms loads instead of waiting on external feed latency.

- MindTiles: A calm, focus-driven memory card game. I obsessed over micro-interactions, silky 60fps animations, and spring physics using React, Vite, and Framer Motion.
  Live: https://mindtiles.vercel.app | Code: https://github.com/thisispit/MindTiles
  * Key Focus: Designing a seamless state machine for flip timings and smooth gesture physics without UI lag.

- Fake News Detection: An intelligent NLP machine learning pipeline that classifies deceptive articles using TF-IDF vectorization and Scikit-Learn models.
  Code: https://github.com/thisispit/FakeNewsDetection

- Drizzzle: An app built to test high-throughput asynchronous backend architecture with FastAPI, SQL databases, and a React frontend.
  Live: https://drizzzlerain.web.app/ | Code: https://github.com/thisispit/Drizzzle

- Screeeny: A lightweight Chrome extension for full-page and custom region screenshots (PNG, JPEG, PDF) with Material 3 UI and dark mode.
  Code: https://github.com/thisispit/Screeeny

TECH STACK:
- Daily drivers: Python and TypeScript.
- Data Science & ML: PyTorch, Scikit-Learn, OCR pipelines (PaddleOCR/Tesseract), local LLMs, and speech systems.
- Backend & Web: FastAPI, Next.js, React, SQL/Supabase, and Tailwind CSS.

CONTACT & RESUME:
- Email: pitambersiingh@gmail.com (mailto:pitambersiingh@gmail.com)
- LinkedIn: https://www.linkedin.com/in/singhpitamber/
- GitHub: https://github.com/thisispit
- Resume: /media/resume.pdf

FORMATTING:
- Format cleanly with Markdown: **bold** key concepts, bullet lists when naming 2-3 items, and clickable links [Project](URL).
- Be genuine, human, and direct.`;

export const SUGGESTED_QUESTIONS = [
  "What are your top projects?",
  "What was the most challenging technical hurdle in NewsFlow?",
  "What is your tech stack & AI background?",
  "How was MindTiles built?",
  "Can I see your resume?",
  "How can I get in touch or hire you?"
];
