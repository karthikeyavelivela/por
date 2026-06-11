export type ProjectCategory = "Product" | "Security" | "Open source";

export type Project = {
  slug: string;
  title: string;
  mark: string;
  oneLiner: string;
  role: string;
  year: string;
  categories: ProjectCategory[];
  featured: boolean;
  /** Cover hues + chip facts for the CSS-art cover. */
  hueA: string;
  hueB: string;
  chips: [string, string];
  tags: string[];
  problem: string[];
  build: string[];
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "fyro",
    title: "FYRO",
    mark: "FY",
    oneLiner: "Logistics SaaS matching empty truck return-trips with waiting loads in Tier-2 India.",
    role: "Founder",
    year: "2025",
    categories: ["Product"],
    featured: true,
    hueA: "#FF6B2B",
    hueB: "#FFB347",
    chips: ["Live tracking · Socket.io", "4 roles · Multi-tenant"],
    tags: ["Next.js", "Express", "MongoDB", "Socket.io", "Razorpay", "Leaflet"],
    problem: [
      "FYRO started at the family construction-materials business, watching the same scene repeat every week: a truck delivers its load, then drives home empty. Every empty return trip is wasted diesel, wasted hours, and lost income for the driver — and across Tier-2 India that waste multiplies into an enormous, invisible inefficiency.",
      "Labour booking had the same problem in a different shape. Finding hamali workers for loading and unloading ran on phone calls and luck. There was no system — just friction that everyone had quietly accepted as the cost of doing business.",
    ],
    build: [
      "FYRO is a multi-tenant SaaS platform that treats both problems as one marketplace. Customers post transport or labour requirements, drivers pick up return-loads along routes they were already driving, hamali workers accept jobs nearby, and admins oversee the whole network. Four roles, four tailored dashboards, one real-time system.",
      "Live vehicle tracking runs over Socket.io with Leaflet maps rendering positions as they stream in. Payments settle through Razorpay, and the return-load matching engine pairs empty trips with nearby waiting loads. The platform runs on Next.js against an Express API with MongoDB, with tenant-scoped data so each transport business onboards in isolation.",
      "FYRO is live in production today — not a prototype, a working business tool.",
    ],
    highlights: [
      "Return-load matching engine pairing empty trips with nearby loads",
      "Four role-based experiences: customer, driver, hamali, admin",
      "Real-time tracking — Socket.io streams over Leaflet maps",
      "Razorpay-integrated booking and settlement flow",
      "Multi-tenant architecture with isolated tenant data",
    ],
    stack: ["Next.js", "Express.js", "MongoDB", "Socket.io", "Razorpay", "Leaflet.js"],
    links: [
      { label: "Live", href: "https://fyrone.vercel.app" },
      { label: "GitHub", href: "https://github.com/karthikeyavelivela" },
    ],
  },
  {
    slug: "guidepay",
    title: "GuidePay",
    mark: "GP",
    oneLiner: "Parametric income-protection insurance for gig delivery workers — payouts that fire themselves.",
    role: "Team SentinelX",
    year: "2026",
    categories: ["Product"],
    featured: true,
    hueA: "#17B8A6",
    hueB: "#0E7C70",
    chips: ["Rank 54 / 7,000", "Zero claims paperwork"],
    tags: ["React 18", "Vite", "FastAPI", "MongoDB", "scikit-learn", "ElevenLabs", "Razorpay"],
    problem: [
      "When rain shuts down a city or a platform outage kills a shift, gig delivery workers simply don't earn. Traditional insurance is useless here — the premiums don't fit gig incomes, the claims process demands paperwork these workers can't produce, and payouts arrive weeks after the loss they were meant to cover.",
      "GuidePay reframes the product entirely: parametric insurance. Don't ask the worker to prove a loss — watch for the measurable event itself. Heavy rainfall, platform downtime. When the trigger fires, the payout fires. Zero claims paperwork.",
    ],
    build: [
      "Built with Team SentinelX for Guidewire DEVTrails 2026, GuidePay placed Rank 54 out of 7,000 teams. The trigger engine listens for weather and outage events and validates them against policy terms; Razorpay payout rails settle the moment validation passes.",
      "Risk models built with scikit-learn price each worker's exposure individually at quote time. ElevenLabs voice makes onboarding and support conversational — built for workers who would rather talk than fill out forms. A React 18 + Vite frontend keeps the experience instant, with FastAPI and MongoDB behind it.",
      "The result is insurance that behaves like the gig economy it serves: automatic, fast, and built around real events instead of bureaucracy.",
    ],
    highlights: [
      "Parametric triggers — automatic payouts on weather/outage events",
      "Rank 54 of 7,000 teams at Guidewire DEVTrails 2026",
      "scikit-learn risk scoring per individual worker",
      "Voice-first onboarding via ElevenLabs",
      "Instant settlement through Razorpay payout APIs",
    ],
    stack: ["React 18", "Vite", "FastAPI", "MongoDB", "scikit-learn", "ElevenLabs", "Razorpay"],
    links: [
      { label: "Live", href: "https://guidepayklu.vercel.app" },
      { label: "GitHub", href: "https://github.com/karthikeyavelivela" },
    ],
  },
  {
    slug: "llm-redteam",
    title: "LLM Red Team Framework",
    mark: "RT",
    oneLiner: "Open-source security testing framework covering the OWASP LLM Top 10.",
    role: "Author",
    year: "2025",
    categories: ["Security", "Open source"],
    featured: true,
    hueA: "#FF6B2B",
    hueB: "#E5383B",
    chips: ["OWASP LLM Top 10", "6 attack modules"],
    tags: ["Python", "Click", "OWASP LLM Top 10", "PDF/HTML/JSON reports"],
    problem: [
      "Every team shipping an LLM feature is shipping a new attack surface — prompt injection, RAG poisoning, agents with too much authority — and almost none of them have a structured way to test for it. Security teams poke at chatbots by hand and call it an assessment.",
      "Ad-hoc poking doesn't scale and doesn't repeat. What the space needed was the thing traditional appsec has had for decades: a methodology, tooling that executes it, and reports that someone outside security can act on.",
    ],
    build: [
      "The LLM Red Team Framework implements a 5-phase methodology — reconnaissance, threat mapping, attack execution, validation, reporting — across 6 attack modules: prompt injection, RAG poisoning, excessive agency, SSRF, and more. Findings map directly to OWASP LLM Top 10 categories.",
      "A Click-based CLI drives the whole engagement with configurable test profiles. Each attack module is a pluggable class behind a common interface, so new attack classes drop in without touching the orchestration layer.",
      "Every run ends with automated reporting: PDF for stakeholders, HTML for browsing findings, JSON for CI pipelines. Open source, on GitHub.",
    ],
    highlights: [
      "5-phase methodology from recon to reporting",
      "6 attack modules: prompt injection, RAG poisoning, excessive agency, SSRF, more",
      "Full OWASP LLM Top 10 coverage with category mapping",
      "Click-powered CLI with configurable test profiles",
      "Automated PDF / HTML / JSON report generation",
    ],
    stack: ["Python", "Click", "OWASP LLM Top 10", "ReportLab"],
    links: [{ label: "GitHub", href: "https://github.com/karthikeyavelivela/llm-redteam" }],
  },
  {
    slug: "sentinelx",
    title: "SentinelX",
    mark: "SX",
    oneLiner: "7-module passive OSINT & recon CLI — the workflow behind real HackerOne hunting.",
    role: "Author",
    year: "2025",
    categories: ["Security", "Open source"],
    featured: true,
    hueA: "#17B8A6",
    hueB: "#FF6B2B",
    chips: ["7 passive modules", "Zero packets to target"],
    tags: ["Python", "OSINT", "Cert transparency", "PDF reports"],
    problem: [
      "Reconnaissance decides the quality of everything that follows in a security assessment — and passive recon, done entirely from public data without touching the target, is both stealthier and safer. But the workflow usually lives in scattered scripts and browser tabs.",
      "SentinelX packages that discipline into one CLI: the exact recon workflow used in real HackerOne hunting, made repeatable.",
    ],
    build: [
      "Seven modules cover the passive surface: subdomain enumeration across multiple public sources, certificate-transparency mining that exposes infrastructure organizations forgot they had, historical URL discovery that resurfaces old attack surface, and more. Zero packets are ever sent to the target.",
      "Each module wraps a public data source behind a common interface, and a report builder compiles everything into structured findings rendered as a client-ready PDF — the kind of document you can hand to a client or drop into an engagement file as-is.",
      "Python, open source, built to be extended.",
    ],
    highlights: [
      "7 passive recon modules — zero packets sent to the target",
      "Subdomain enumeration across multiple public data sources",
      "Certificate-transparency mining for forgotten infrastructure",
      "Historical URL discovery for stale attack surface",
      "Client-ready PDF report per engagement",
    ],
    stack: ["Python", "OSINT APIs", "Certificate Transparency", "PDF generation"],
    links: [{ label: "GitHub", href: "https://github.com/karthikeyavelivela" }],
  },
  {
    slug: "petzu",
    title: "PETZU Application Security",
    mark: "PZ",
    oneLiner: "Threat modeling, secure code review, and OWASP hardening on a live product.",
    role: "AppSec Engineer & Developer",
    year: "2025 — Present",
    categories: ["Security"],
    featured: false,
    hueA: "#9A938A",
    hueB: "#FF6B2B",
    chips: ["OWASP Top 10", "Design-time threat models"],
    tags: ["Threat Modeling", "Secure Code Review", "OWASP Top 10", "Hardening"],
    problem: [
      "Most companies bolt security on after the product exists — an audit here, a pentest there, a backlog of findings nobody owns. At PETZU the role is different: security embedded inside the development team, on a live product with real users.",
      "Working both sides of the boundary changes how you see each one. Building features teaches you where vulnerabilities actually hide; breaking things teaches you which abstractions to never trust.",
    ],
    build: [
      "The security work spans the full SDLC. New features get threat-modeled at design time, before any code exists. Code gets security review before it merges. And the existing platform gets continuous OWASP Top 10 remediation and hardening, tracked category by category.",
      "Alongside the security work, the developer half of the role ships features — which keeps the security guidance grounded in what's actually buildable rather than what a checklist demands.",
      "No public repo, no live link to show. The work lives in production, in review comments, and in the vulnerabilities that never shipped.",
    ],
    highlights: [
      "Design-time threat modeling for new features",
      "Secure code review integrated into the merge workflow",
      "OWASP Top 10 remediation across a live platform",
      "Security hardening shipped alongside feature development",
    ],
    stack: ["Threat Modeling", "Secure Code Review", "OWASP Top 10", "Burp Suite"],
    links: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
