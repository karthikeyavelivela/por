export type SkillCard = {
  title: string;
  accent: "orange" | "teal";
  items: string[];
};

export const skillCards: SkillCard[] = [
  {
    title: "Security",
    accent: "orange",
    items: [
      "OWASP Top 10",
      "OWASP LLM Top 10",
      "Threat Modeling",
      "Burp Suite",
      "Recon & OSINT",
      "Secure Code Review",
    ],
  },
  {
    title: "Backend",
    accent: "teal",
    items: ["Python", "FastAPI", "Node.js", "Express", "MongoDB", "Socket.io"],
  },
  {
    title: "Frontend",
    accent: "orange",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js"],
  },
  {
    title: "Cloud & DevOps",
    accent: "teal",
    items: ["AWS", "Docker", "Kubernetes", "Prometheus", "Grafana", "Vercel"],
  },
];

export const marqueePhrases = [
  "Application Security",
  "Threat Modeling",
  "Full-Stack Engineering",
  "LLM Red Teaming",
  "Product Building",
  "OSINT & Recon",
];

export const toolMarquee = [
  "Python", "FastAPI", "Next.js", "TypeScript", "GSAP", "Three.js",
  "Burp Suite", "Docker", "Kubernetes", "MongoDB", "AWS", "Socket.io",
  "Prometheus", "Grafana", "Razorpay", "Linux",
];
