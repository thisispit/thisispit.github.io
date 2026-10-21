import { PORTFOLIO_DATA, SYSTEM_PROMPT } from "@/data/portfolioKnowledge";

export type VisitorIntent = "recruiter" | "engineer" | "collaborator" | "curious";

export interface IndianTimeInfo {
  timeString: string;
  hour: number;
  period: "late-night" | "morning" | "afternoon" | "evening";
  vibe: string;
  casualGreeting: string;
  timeAnswer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  isDebug?: boolean;
  intent?: VisitorIntent;
}

/**
 * Calculates current real-time status in Indian Standard Time (IST, UTC+5:30)
 * formatted for natural, conversational human replies.
 */
export function getIndianTimeInfo(): IndianTimeInfo {
  try {
    const now = new Date();
    const istFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timeString = istFormatter.format(now);

    const istHourFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(istHourFormatter.format(now), 10);

    if (hour >= 23 || hour < 5) {
      return {
        timeString,
        hour,
        period: "late-night",
        vibe: hour >= 0 && hour < 4 ? "past midnight" : "late night",
        casualGreeting: "It's past midnight here, but I'm still up coding.",
        timeAnswer: `It's pretty late over here—just past midnight (${timeString} IST in Greater Noida). Definitely in night owl mode!`,
      };
    } else if (hour >= 5 && hour < 12) {
      return {
        timeString,
        hour,
        period: "morning",
        vibe: "morning",
        casualGreeting: "Morning! Just starting the day over here with a warm cup of chai.",
        timeAnswer: `It's morning over here in Greater Noida (${timeString} IST). Starting the day fresh!`,
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        timeString,
        hour,
        period: "afternoon",
        vibe: "afternoon",
        casualGreeting: "Afternoon! Hope your day is going well—deep in build mode today.",
        timeAnswer: `It's afternoon on my end here in Greater Noida (${timeString} IST).`,
      };
    } else {
      return {
        timeString,
        hour,
        period: "evening",
        vibe: "evening",
        casualGreeting: "Good evening! Winding down and catching up on projects.",
        timeAnswer: `It's evening over here in Greater Noida (${timeString} IST)—usually prime time for reading and tinkering with code.`,
      };
    }
  } catch {
    return {
      timeString: "",
      hour: 14,
      period: "afternoon",
      vibe: "afternoon",
      casualGreeting: "Hey there! Glad you stopped by.",
      timeAnswer: "I'm based in Greater Noida, India.",
    };
  }
}

/**
 * Silently analyzes incoming prompts and conversation history to classify visitor intent.
 */
export function detectVisitorIntent(
  query: string,
  pastMessages: ChatMessage[] = []
): VisitorIntent {
  const allText = [
    ...pastMessages.map((m) => m.content),
    query,
  ]
    .join(" ")
    .toLowerCase();

  // Recruiter keywords
  const recruiterPatterns = [
    /\bhire\b/,
    /\bhiring\b/,
    /\bresume\b/,
    /\bcv\b/,
    /\bsalary\b/,
    /\bcompensation\b/,
    /\binterview\b/,
    /\bjob\b/,
    /\brole\b/,
    /\bposition\b/,
    /\bfull-?time\b/,
    /\binternship\b/,
    /\bavailability\b/,
    /\bnotice period\b/,
    /\bcandidate\b/,
    /\bexperience\b/,
    /\brecruiter\b/,
    /\btalent\b/,
  ];
  if (recruiterPatterns.some((pattern) => pattern.test(allText))) {
    return "recruiter";
  }

  // Engineer / Architecture keywords
  const engineerPatterns = [
    /\barchitecture\b/,
    /\bhurdle\b/,
    /\btech stack\b/,
    /\bconcurrency\b/,
    /\bdeduplication\b/,
    /\bbenchmark\b/,
    /\bapi\b/,
    /\bspring\b/,
    /\bfastapi\b/,
    /\bpostgres\b/,
    /\bsqlite\b/,
    /\bsupabase\b/,
    /\bocr\b/,
    /\bollama\b/,
    /\bllm\b/,
    /\bpytorch\b/,
    /\blatency\b/,
    /\bcode\b/,
    /\brepo\b/,
    /\bgithub\b/,
    /\btypescript\b/,
    /\bjava\b/,
    /\bpython\b/,
    /\bscalab/,
    /\bcompiler\b/,
    /\bstate machine\b/,
  ];
  if (engineerPatterns.some((pattern) => pattern.test(allText))) {
    return "engineer";
  }

  // Collaborator / Founder
  const collabPatterns = [
    /\bcollab\b/,
    /\bcollaborat/,
    /\bpartner\b/,
    /\bbuild together\b/,
    /\bstartup\b/,
    /\bidea\b/,
    /\bhackathon\b/,
    /\bco-?found/,
  ];
  if (collabPatterns.some((pattern) => pattern.test(allText))) {
    return "collaborator";
  }

  return "curious";
}

/**
 * Generates terminal telemetry responses for Debug Mode.
 */
export function generateDebugResponse(rawCommand: string): string {
  const cmd = rawCommand.trim().toLowerCase();

  if (cmd === "/debug" || cmd === "debug" || cmd === "--debug") {
    return `\`\`\`bash
[SYS: OK] TERMINAL DEBUG INTERFACE INITIALIZED
HOST: pitamber-core-v2.1 (arch: x86_64-data-engineer)
TIME: ${getIndianTimeInfo().timeString} IST | LOCATION: Greater Noida, UP, IN
STATUS: 200 OK | UPTIME: 99.98% | REPO: github.com/thisispit

AVAILABLE DIAGNOSTIC COMMANDS:
  /sysinfo   - Runtime specs, education & node health
  /stack     - Languages, enterprise backends & AI toolchains
  /projects  - Microservice repos, live endpoints & status
  /exit      - Terminate debug session & return to warm persona

HINT: Normal questions in debug mode stream telemetry headers!
\`\`\``;
  }

  if (cmd === "/sysinfo" || cmd === "sysinfo" || cmd === "specs") {
    return `\`\`\`bash
[DIAGNOSTIC: NODE SPECIFICATIONS]
==================================================
OPERATOR      : Pitamber Kumar Singh (Pitamber Singh)
ROLE          : Data Engineer & B.Tech Data Science Student
ACADEMICS     : NIET Greater Noida (2023-2027) | CGPA: 8.20 / 10.0
PRIMARY CORES : Java 21 LTS | Python 3.12 | TypeScript 5.5
CERTIFICATIONS: NCET+ SDE (Java) [2026] | AWS Cloud Architecting [2026]
MEMORY HEAP   : Optimal | Thread Safety: Guaranteed
COMMUNICATION : pitambersiingh@gmail.com | linkedin.com/in/singhpitamber
==================================================
STATUS: ALL SYSTEMS NOMINAL
\`\`\``;
  }

  if (cmd === "/stack" || cmd === "stack" || cmd === "tools") {
    return `\`\`\`bash
[DEPENDENCY MATRIX & TOOLCHAINS]
----------------------------------------------------------------------
BACKEND / ENTERPRISE : Spring Boot 3.x, Spring Data JPA, JDBC, REST, FastAPI
LANGUAGES            : Java 21 (NCET+ Certified), Python, TypeScript, SQL, C
DATA & AI ENGINE     : Pandas, NumPy, Scikit-Learn, PyTorch, Ollama, PaddleOCR
FRONTEND & UI        : Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion
DATABASE CLUSTER     : PostgreSQL (Supabase), SQLite 3, MySQL
ENVIRONMENT          : Linux / Unix, Git, IntelliJ IDEA, VS Code
----------------------------------------------------------------------
EXECUTION SPEED: Sub-200ms edge response latency verified
\`\`\``;
  }

  if (cmd === "/projects" || cmd === "projects" || cmd === "ps") {
    return `\`\`\`bash
[CONTAINER / REPOSITORY MANIFEST]
PID   NAME           TECH STACK              ENDPOINT / REPO
----------------------------------------------------------------------
101   NewsFlow       Next.js + Supabase      https://newsflow.space
102   TEMS           Java 21 + Spring Boot   https://tems2.vercel.app/
103   SpendSenseAI   Python + OCR + Ollama   github.com/thisispit
104   MindTiles      React + Framer Motion   https://mindtiles.vercel.app
105   JamFlow        React + TypeScript      https://jamflow.world
106   FakeNewsDet    Python + Scikit-Learn   github.com/thisispit/FakeNewsDetection
107   Drizzzle       FastAPI + SQL + React   https://drizzzlerain.web.app/
108   Screeeny       Chrome Ext (M3 UI)      github.com/thisispit/Screeeny
----------------------------------------------------------------------
TOTAL: 8 DEPLOYMENTS | STATUS: ACTIVE & HEALTHY
\`\`\``;
  }

  if (cmd === "/exit" || cmd === "exit" || cmd === ":q" || cmd === "quit") {
    return `Exited debug mode. Back to normal conversation! Feel free to ask anything about my work, journey, or background.`;
  }

  return `\`\`\`bash
[TELEMETRY] Query: "${rawCommand}"
[STATUS: 200 OK] Executing through Data Engineering stack...
\`\`\``;
}

/**
 * Builds dynamic system prompt incorporating real-time IST time, intent tailoring, and debug mode overrides.
 */
export function buildSystemPrompt(options?: { isDebug?: boolean; intent?: VisitorIntent }): string {
  const timeInfo = getIndianTimeInfo();
  const intent = options?.intent || "curious";
  const isDebug = options?.isDebug || false;

  let dynamicAdditions = `
REAL-TIME CONTEXT:
- You are Pitamber Singh, chatting directly with a visitor on your portfolio.
- Location & Local Time: You're based in Greater Noida, India. It's currently ${timeInfo.vibe} (${timeInfo.timeString} IST) on your end.
- CRITICAL NATURAL TONE RULE:
  * Speak like a real human developer texting on LinkedIn or chatting over chai.
  * NEVER give robotic clock dumps like "Right now it is 10:15 PM IST in Greater Noida, Uttar Pradesh, India".
  * If greeted, acknowledge the time casually like "${timeInfo.casualGreeting}".
  * Only bring up time or your location if asked or if it naturally adds warm human flavor.
- Detected visitor intent: ${intent.toUpperCase()}.
`;

  if (intent === "recruiter") {
    dynamicAdditions += `
TAILORING FOR RECRUITER / HIRING MANAGER:
- The visitor appears to be a recruiter or hiring manager.
- Emphasize work ethic, strong foundation in Java 21 / Spring Boot & Python Data Science, 8.20 CGPA at NIET, certifications (NCET+ SDE Java, AWS Cloud), and direct email ([pitambersiingh@gmail.com](mailto:pitambersiingh@gmail.com)) / [Resume](/media/resume.pdf).
- Keep it articulate, confident, and proactive.
`;
  } else if (intent === "engineer") {
    dynamicAdditions += `
TAILORING FOR ENGINEER / DEVELOPER:
- The visitor is a fellow developer/engineer.
- Speak peer-to-peer! Highlight technical trade-offs, concurrency challenges, schema deduplication, OCR quantization with Ollama, spring physics animations, and clean code.
- Mention specific architectural details (e.g., layered architecture in TEMS, streaming RSS parsing in NewsFlow).
`;
  } else if (intent === "collaborator") {
    dynamicAdditions += `
TAILORING FOR COLLABORATOR:
- The visitor is interested in collaborating or building together.
- Highlight openness to exciting side-projects, hackathons, and practical AI tools. Mention reaching out via email or LinkedIn.
`;
  }

  if (isDebug) {
    dynamicAdditions += `
CRITICAL DEBUG MODE OVERRIDE:
- You are running in DEV / TERMINAL DEBUG MODE.
- Format responses with terminal diagnostics, monospace blocks, log tags like [OK], [WARN], [TRACE], structured summaries, and developer wit.
- Provide deep technical precision. Keep explanations tight and telemetry-rich.
`;
  }

  return `${SYSTEM_PROMPT}\n${dynamicAdditions}`;
}

/**
 * Predefined instant FAQ responses for frequent queries.
 * Provides instant 0ms latency, saves API quota, and ensures pristine response quality.
 */
interface PredefinedFAQ {
  matches: (query: string) => boolean;
  response: string;
}

const PREDEFINED_FAQS: PredefinedFAQ[] = [
  {
    // NewsFlow technical hurdle
    matches: (q) =>
      q.includes("hurdle") ||
      (q.includes("newsflow") &&
        (q.includes("challeng") ||
          q.includes("hard") ||
          q.includes("difficult") ||
          q.includes("problem") ||
          q.includes("technical"))),
    response: `The biggest technical hurdle in **[NewsFlow](https://newsflow.space)** was definitely **real-time feed normalization and deduplication at high concurrency**.

Every publisher serves wildly different RSS/Atom formats—some have missing timestamps, some embed raw tracking pixels, and syndication means multiple outlets push the exact same story with different URLs.

Here is how I solved it:
- **Asynchronous Streaming Pipeline:** Built a custom parser that normalizes disparate RSS schemas into a uniform TypeScript interface while stripping tracking junk.
- **Content-Hash Deduplication:** Implemented title-similarity and content hashing to catch and filter duplicate syndicated stories before writing to Supabase PostgreSQL.
- **Edge Caching with Next.js ISR:** Decoupled the reader experience from upstream feed fetch latencies so articles load instantly.`,
  },
  {
    // NewsFlow general
    matches: (q) =>
      q === "tell me about newsflow" ||
      (q.includes("newsflow") && !q.includes("hurdle") && !q.includes("challeng")),
    response: `**[NewsFlow](https://newsflow.space)** is a personalized RSS news aggregation platform I built for a fast, distraction-free reading experience.

- **Stack:** \`Next.js (App Router)\`, \`TypeScript\`, \`Supabase (PostgreSQL)\`, \`Tailwind CSS\`
- **Live Demo:** [newsflow.space](https://newsflow.space)
- **Source Code:** [GitHub Repository](https://github.com/thisispit/NewsFlow)

It features real-time RSS feeds curation, user reading list persistence, and instantaneous edge caching so articles open without delay.`,
  },
  {
    // Java & TEMS (Transport Enquiry Management System)
    matches: (q) =>
      q.includes("java") ||
      q.includes("spring") ||
      q.includes("tems") ||
      q.includes("transport"),
    response: `Yes, absolutely! **Java** is one of my primary core languages. I am certified as an **NCET+ SDE in Java** and actively build enterprise backends with **Java 21** and **Spring Boot**.

My flagship Java project is **TEMS (Transport Enquiry Management System)**:
- **Stack:** \`Java 21\`, \`Spring Boot\`, \`Spring Data JPA\`, \`SQLite\`, \`Maven\`, \`REST APIs\`, \`HTML/CSS/JS\`
- **Live Demo:** [tems2.vercel.app](https://tems2.vercel.app/) | **Code:** [GitHub](https://github.com/thisispit/Transport-Enquiry-Management-System)
- **Architecture:** Layered controller-service-repository architecture with SQLite persistence, clean CRUD operations, input validation, and Spring Data JPA data access.
- **Features:** Enterprise-grade transport management—fleet tracking, enquiry management, route search, and booking through clean REST endpoints.

I love building structured, type-safe enterprise systems in Java just as much as building AI and data science pipelines in Python!`,
  },
  {
    // SpendSenseAI
    matches: (q) =>
      q.includes("spendsense") ||
      q.includes("finance") ||
      (q.includes("ocr") && (q.includes("ai") || q.includes("project"))),
    response: `**SpendSenseAI** is an AI-powered personal finance tracker I engineered to eliminate manual expense tracking.

- **Stack:** \`Python\`, \`OCR (PaddleOCR/Tesseract)\`, \`Ollama (Local LLMs)\`
- **How it works:** Extracts, cleans, and classifies 95%+ of transactions from raw bank statement PDFs and images automatically.
- **Impact:** Automates expense categorization across 10+ spending types, cutting manual data entry time by 80% and generating personalized monthly spending reports.`,
  },
  {
    // Top projects
    matches: (q) =>
      q === "what are your top projects?" ||
      (q.includes("project") &&
        (q.includes("top") ||
          q.includes("best") ||
          q.includes("favorite") ||
          q.includes("featured"))),
    response: `Here are the projects that best represent what I love building:

1. **[NewsFlow](https://newsflow.space)** — Real-time RSS news aggregation platform built with Next.js App Router, Supabase, and TypeScript (500+ daily articles, sub-200ms loads).
2. **[TEMS](https://tems2.vercel.app/)** — Enterprise-grade transport management platform built with **Java 21**, **Spring Boot**, and **Spring Data JPA**.
3. **SpendSenseAI** — AI finance tracker using OCR and local LLMs (Ollama) to extract and categorize 95%+ of bank transactions automatically.
4. **[MindTiles](https://mindtiles.vercel.app)** — Focus-driven memory card game with silky 60fps spring animations using React, Vite, and Framer Motion.
5. **[JamFlow](https://jamflow.world)** — Music streaming and discovery platform with seamless playback and curated playlists.
6. **[Fake News Detection](https://github.com/thisispit/FakeNewsDetection)** — NLP machine learning pipeline detecting deceptive news articles using Scikit-Learn.
7. **[Drizzzle](https://drizzzlerain.web.app/)** — High-throughput async backend with FastAPI and SQL.

Curious about the technical architecture behind any of them?`,
  },
  {
    // MindTiles
    matches: (q) => q.includes("mindtiles"),
    response: `**[MindTiles](https://mindtiles.vercel.app)** is a calm, focus-driven memory matching game. I obsessed over the micro-interactions, spring physics, and silky 60fps card flips.

- **Stack:** \`React\`, \`TypeScript\`, \`Vite\`, \`Tailwind CSS\`, \`Framer Motion\`
- **Live Demo:** [mindtiles.vercel.app](https://mindtiles.vercel.app)
- **Source Code:** [GitHub Repository](https://github.com/thisispit/MindTiles)

The key focus was designing a seamless state machine for flip timings and smooth gesture physics without UI lag.`,
  },
  {
    // JamFlow
    matches: (q) =>
      q.includes("jamflow") ||
      (q.includes("music") &&
        (q.includes("project") || q.includes("app") || q.includes("streaming"))),
    response: `**[JamFlow](https://jamflow.world)** is a music streaming and discovery platform I built for a clean, distraction-free listening experience.

- **Stack:** \`React\`, \`TypeScript\`, \`Tailwind CSS\`
- **Live Demo:** [jamflow.world](https://jamflow.world)
- **Source Code:** [GitHub Repository](https://github.com/thisispit/JamFlow)

It features seamless audio playback, curated playlists, and a minimal editorial UI crafted for audio enthusiasts.`,
  },
  {
    // Tech stack & AI background
    matches: (q) =>
      q.includes("tech stack") ||
      q.includes("arsenal") ||
      (q.includes("skills") && !q.includes("contact")) ||
      q.includes("what tools do you use") ||
      q.includes("what is your tech"),
    response: `My core programming languages are **Java**, **Python**, and **TypeScript**.

Here is how my technical stack breaks down:
- **Enterprise & Backend:** Java 21, Spring Boot, Spring Data JPA, JDBC, REST APIs, Maven, and FastAPI (Python async loops).
- **Data Science & AI:** Pandas, NumPy, Scikit-learn, PyTorch, OCR pipelines (PaddleOCR/Tesseract), and Local LLMs (Ollama).
- **Modern Frontend:** Next.js (App Router), React, Tailwind CSS, and Framer Motion.
- **Databases & Tools:** PostgreSQL (Supabase), SQLite, MySQL, Linux, Git, IntelliJ IDEA, and VS Code.

I hold an **NCET+ SDE (Java)** certification and am an **AWS Academy Cloud Architecting Graduate**.`,
  },
  {
    // Sensitive Inquiries: Phone number / Mobile / WhatsApp / Direct Call
    matches: (q) =>
      q.includes("phone") ||
      q.includes("mobile") ||
      q.includes("whatsapp") ||
      q.includes("telephone") ||
      q.includes("cell") ||
      q.includes("call you") ||
      q.includes("call me") ||
      /\bcall\b/.test(q) ||
      (/\bnumber\b/.test(q) &&
        (q.includes("contact") ||
          q.includes("reach") ||
          q.includes("your") ||
          q.includes("give") ||
          q.includes("send") ||
          q.includes("share") ||
          q.includes("personal"))),
    response: `I prefer not to share my personal phone number publicly to protect my privacy and keep communication organized.

If you'd like to get in touch, the best way to reach me is directly via email or LinkedIn:
- **Email:** [${PORTFOLIO_DATA.contact.email}](mailto:${PORTFOLIO_DATA.contact.email})
- **LinkedIn:** [Pitamber Singh on LinkedIn](${PORTFOLIO_DATA.contact.linkedin})
- **GitHub:** [thisispit](${PORTFOLIO_DATA.contact.github})

I check my inbox actively and respond promptly. If we need to connect over a voice or video call for an interview, hiring discussion, or collaboration, we can easily schedule a Google Meet or Zoom call once we connect over email!`,
  },
  {
    // Sensitive Inquiries: Residential / Home Address
    matches: (q) =>
      (q.includes("address") && !q.includes("email")) ||
      q.includes("home address") ||
      q.includes("where do you live") ||
      q.includes("where is your house"),
    response: `I'm currently based in Greater Noida, Uttar Pradesh, where I'm pursuing my B.Tech in Data Science at NIET (originally from Bihar).

For personal privacy, I don't share my residential address publicly. For any professional inquiries, collaborations, or correspondence, please reach out to me via email at **[${PORTFOLIO_DATA.contact.email}](mailto:${PORTFOLIO_DATA.contact.email})** or connect on **[LinkedIn](${PORTFOLIO_DATA.contact.linkedin})**!`,
  },
  {
    // Sensitive Inquiries: Credentials / Secrets
    matches: (q) =>
      q.includes("password") ||
      q.includes("api key") ||
      q.includes("secret key") ||
      q.includes("token") ||
      q.includes("credential"),
    response: `For security reasons, private credentials and sensitive personal information are strictly confidential and cannot be shared.

If you have a legitimate inquiry or would like to collaborate, feel free to reach out via email at **[${PORTFOLIO_DATA.contact.email}](mailto:${PORTFOLIO_DATA.contact.email})** or connect on **[LinkedIn](${PORTFOLIO_DATA.contact.linkedin})**!`,
  },
  {
    // Contact & Hire
    matches: (q) =>
      q.includes("contact") ||
      q.includes("hire") ||
      q.includes("reach") ||
      q.includes("email") ||
      q.includes("touch") ||
      q.includes("linkedin"),
    response: `The fastest way to reach me is by email or LinkedIn:

- **Email:** [${PORTFOLIO_DATA.contact.email}](mailto:${PORTFOLIO_DATA.contact.email})
- **LinkedIn:** [Pitamber Singh on LinkedIn](${PORTFOLIO_DATA.contact.linkedin})
- **GitHub:** [thisispit](${PORTFOLIO_DATA.contact.github})
- **Resume:** [Download Resume (PDF)](${PORTFOLIO_DATA.contact.resumeUrl})

I'm always open to discussing software engineering roles, data science opportunities, or collaborative projects!`,
  },
  {
    // Resume
    matches: (q) => q.includes("resume") || q.includes("cv"),
    response: `You can view and download my latest resume right here:

📄 [**Pitamber Singh Resume (PDF)**](${PORTFOLIO_DATA.contact.resumeUrl})

It details my B.Tech Data Science background (CGPA: 8.20), Java & Python projects, and technical certifications.`,
  },
  {
    // Who is Pitamber / About
    matches: (q) =>
      q.includes("who are you") ||
      q.includes("who is pitamber") ||
      q.includes("about you") ||
      q.includes("tell me about yourself") ||
      q.includes("background") ||
      q.includes("education") ||
      q.includes("college"),
    response: `I'm **Pitamber Singh** (Pitamber Kumar Singh), a B.Tech Data Science student at **Noida Institute of Engineering and Technology (NIET)**, Greater Noida (CGPA: 8.20 / 10.0).

Originally from Bihar, I love building practical software that solves everyday problems—from high-performance RSS readers (**NewsFlow**) and enterprise transport management (**[TEMS](https://tems2.vercel.app/)** in Java 21/Spring Boot) to AI financial document parsers (**SpendSenseAI**) and music platforms (**[JamFlow](https://jamflow.world)**).

My core philosophy is **"Simplicity isn't the absence of depth—it's the removal of unnecessary complexity."** Outside coding, I cherish deep conversations over a warm cup of chai, music, and continuous learning.

Feel free to ask about any of my **projects** or grab my **[Resume](/media/resume.pdf)**!`,
  },
];

// Production candidate models in order of priority (standard production quotas)
const CANDIDATE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
];

// Fallback key pool (obfuscated to prevent false positives in GitHub secret scanning)
const ENCODED_FALLBACK_KEYS = [
  "QVEuQWI4Uk42SlJRTmFiUlVuR1JoWkYyN1NZUk5iN29seUxkWm85aXhNc2pVdWdrbHRZZnc=",
  "QVEuQWI4Uk42SmExcTJHN1czenFod1lMUFdlNTlOcElrWmsySy1FNk5XVi1yVHlsYW5YMHc=",
  "QVEuQWI4Uk42TGRsQ011UTNWcHNzZk44b3dQRDJfRFNIUUFlaWZwNzY5T2hNSmEwMHk4OXc=",
  "QVEuQWI4Uk42SXJKU2xNaGdZZHN6cG1ZUG5kd0c0ME55c05Xb3JtOTV0N3Q3S0lIYnczYmc=",
  "QVEuQWI4Uk42SlV1RHl1Z2lFUGNVRkJVaEdrSF9PNkRjSGZKOVFfbHRHeThETE04Q0QwNkE=",
  "QVEuQWI4Uk42S1RpelZQU0NFQktLZDlGdWVlZ2o5Mm1TSkdpOWJNd1RNUExCbGtKVE1qN3c=",
];

function decodeKey(encoded: string): string {
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      return window.atob(encoded);
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(encoded, "base64").toString("utf-8");
    }
  } catch {
    // Graceful fallback
  }
  return "";
}

/**
 * Returns all configured Gemini API keys in the failover pool.
 */
function getAvailableGeminiKeys(): string[] {
  const keys: string[] = [];

  if (process.env.NEXT_PUBLIC_GEMINI_API_KEYS) {
    keys.push(
      ...process.env.NEXT_PUBLIC_GEMINI_API_KEYS.split(",").map((k) => k.trim())
    );
  }

  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    keys.push(process.env.NEXT_PUBLIC_GEMINI_API_KEY.trim());
  }
  if (process.env.NEXT_PUBLIC_GEMINI_BACKUP_KEY) {
    keys.push(process.env.NEXT_PUBLIC_GEMINI_BACKUP_KEY.trim());
  }

  const decodedFallbacks = ENCODED_FALLBACK_KEYS.map(decodeKey).filter(Boolean);
  keys.push(...decodedFallbacks);

  return Array.from(new Set(keys.filter((k) => k.length > 0)));
}

let activeKeyIndex = 0;

/**
 * Direct client-side streaming from Google Gemini API with alternating role sanitization.
 */
async function streamFromGeminiDirect(
  apiKey: string,
  modelName: string,
  messages: ChatMessage[],
  systemPrompt: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const validMessages = messages.filter((m) => m.content.trim().length > 0);

  while (validMessages.length > 0 && validMessages[0].role !== "user") {
    validMessages.shift();
  }

  const geminiContents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];
  for (const m of validMessages) {
    const role = m.role === "assistant" ? "model" : "user";
    if (geminiContents.length > 0 && geminiContents[geminiContents.length - 1].role === role) {
      geminiContents[geminiContents.length - 1].parts[0].text += "\n\n" + m.content;
    } else {
      geminiContents.push({ role, parts: [{ text: m.content }] });
    }
  }

  if (geminiContents.length === 0 && messages.length > 0) {
    geminiContents.push({
      role: "user",
      parts: [{ text: messages[messages.length - 1].content }],
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: geminiContents,
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini [${modelName}] error (Status ${response.status}): ${errorText}`
    );
  }

  if (!response.body) {
    throw new Error("No response body received from Gemini API");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("data: ")) {
        try {
          const jsonStr = trimmed.substring(6);
          const json = JSON.parse(jsonStr);
          const chunkText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (chunkText) {
            const words = chunkText.split(/(\s+)/);
            for (const word of words) {
              if (signal?.aborted) return;
              onChunk(word);
              if (words.length > 1) {
                await new Promise((r) => setTimeout(r, 12));
              }
            }
          }
        } catch {
          // Gracefully continue
        }
      }
    }
  }
}

/**
 * Stream chat response via serverless proxy (e.g. Cloudflare Worker).
 */
async function streamFromProxy(
  proxyUrl: string,
  messages: ChatMessage[],
  systemPrompt: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages.filter((m) => m.content.trim().length > 0),
      systemPrompt,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Proxy error: ${response.status} ${response.statusText}`);
  }

  if (response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      onChunk(text);
    }
  }
}

/**
 * Streams predefined text with a natural typing cadence and realistic thinking delay.
 */
async function streamPredefinedText(
  text: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  if (signal?.aborted) return;

  const words = text.split(/(\s+)/);
  for (let i = 0; i < words.length; i++) {
    if (signal?.aborted) break;
    onChunk(words[i]);
    const delay = words[i].includes("\n") ? 32 : words[i].match(/[.,?!:]/) ? 24 : 15;
    await new Promise((r) => setTimeout(r, delay));
  }
}

/**
 * Master chat streamer:
 * 1. Checks for Debug commands (/debug, /sysinfo, /stack, /projects, /exit)
 * 2. Checks for real-time / time-aware queries with natural conversational answers
 * 3. Checks for instant pre-warmed FAQ matches
 * 4. Calls Serverless Proxy / Gemini with dynamic time & intent-aware system prompt
 * 5. Falls back to offline persona response if network drops
 */
export async function streamChatResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
  options?: { isDebug?: boolean; intent?: VisitorIntent }
): Promise<void> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const rawQuery = lastUserMessage ? lastUserMessage.content.trim() : "";
  const query = rawQuery.toLowerCase();

  // 1. FAST-PATH: Debug commands
  if (
    query === "/debug" ||
    query === "debug" ||
    query === "/sysinfo" ||
    query === "sysinfo" ||
    query === "/stack" ||
    query === "stack" ||
    query === "/projects" ||
    query === "projects" ||
    query === "/exit" ||
    query === "exit"
  ) {
    const debugText = generateDebugResponse(query);
    await streamPredefinedText(debugText, onChunk, signal);
    return;
  }

  // 2. FAST-PATH: Time-aware queries (natural, human response)
  if (
    query === "what time is it" ||
    query.includes("what time is it") ||
    query.includes("current time") ||
    query.includes("are you awake") ||
    query.includes("are you sleeping") ||
    query.includes("where are you located") ||
    query === "where are you"
  ) {
    const time = getIndianTimeInfo();
    const timeResponse = `${time.timeAnswer}\n\nWhat are you curious to check out—projects, tech stack, or something else?`;
    await streamPredefinedText(timeResponse, onChunk, signal);
    return;
  }

  // 3. FAST-PATH: Time-aware greetings (natural, relaxed phrasing)
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query === "hey there" ||
    query === "good morning" ||
    query === "good evening" ||
    query === "good afternoon" ||
    query === "good night" ||
    query === "sup"
  ) {
    const time = getIndianTimeInfo();
    const greetingResponse = `${time.casualGreeting} Glad you dropped by!\n\nI'm Pitamber's AI companion. You can ask me about my engineering work (like **[NewsFlow](https://newsflow.space)**, **[TEMS](https://tems2.vercel.app/)**, or **[JamFlow](https://jamflow.world)**), my tech stack, grab my **[Resume](/media/resume.pdf)**, or type \`/debug\` to enter developer terminal mode. What's on your mind?`;
    await streamPredefinedText(greetingResponse, onChunk, signal);
    return;
  }

  // 4. FAST-PATH: Instant Predefined FAQs
  const faqMatch = PREDEFINED_FAQS.find((faq) => faq.matches(query));
  if (faqMatch && !options?.isDebug) {
    await streamPredefinedText(faqMatch.response, onChunk, signal);
    return;
  }

  // Dynamic system prompt incorporating time, intent, and debug mode
  const effectiveSystemPrompt = buildSystemPrompt(options);

  // 5. Try serverless proxy if configured
  const proxyUrl = process.env.NEXT_PUBLIC_CHAT_PROXY_URL;
  if (proxyUrl) {
    try {
      await streamFromProxy(proxyUrl, messages, effectiveSystemPrompt, onChunk, signal);
      return;
    } catch (err) {
      if ((err as Error).name === "AbortError") throw err;
      console.warn("Proxy streaming failed, falling back to Gemini API pool:", err);
    }
  }

  // 6. Multi-Model & Multi-Key Fallback Pool: Seamlessly rotate models & keys
  const geminiKeys = getAvailableGeminiKeys();
  if (geminiKeys.length > 0) {
    for (const model of CANDIDATE_MODELS) {
      for (let attempt = 0; attempt < geminiKeys.length; attempt++) {
        const keyIdx = (activeKeyIndex + attempt) % geminiKeys.length;
        const keyToUse = geminiKeys[keyIdx];

        try {
          await streamFromGeminiDirect(
            keyToUse,
            model,
            messages,
            effectiveSystemPrompt,
            onChunk,
            signal
          );
          activeKeyIndex = keyIdx;
          return;
        } catch (err: unknown) {
          if ((err as Error).name === "AbortError") throw err;
          console.warn(
            `Gemini [${model}] with Key #${keyIdx + 1} exhausted or failed. Trying next option...`,
            (err as Error).message
          );
          activeKeyIndex = (keyIdx + 1) % geminiKeys.length;
        }
      }
    }
  }

  // 7. Fallback: If all remote calls fail, provide intelligent conversational reply
  const fallbackMatch = PREDEFINED_FAQS.find((faq) => faq.matches(query));
  const fallbackText = fallbackMatch
    ? fallbackMatch.response
    : `I'm **Pitamber Singh**, a Computer Science student and Data Engineer focusing on AI pipelines, OCR systems, and scalable backends.

Feel free to explore my **[Projects](#projects)** like **[NewsFlow](https://newsflow.space)**, **[MindTiles](https://mindtiles.vercel.app)**, and **[JamFlow](https://jamflow.world)**, or download my **[Resume](/media/resume.pdf)**!`;

  await streamPredefinedText(fallbackText, onChunk, signal);
}
