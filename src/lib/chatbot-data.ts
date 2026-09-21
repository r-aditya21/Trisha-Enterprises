export const SUGGESTED_QUESTIONS = [
  "How does solar installation work?",
  "How much can I save?",
  "What are your pricing options?",
  "Tell me about financing",
  "Book a site visit",
] as const;

type FAQEntry = {
  keywords: string[];
  response: string;
};

export const CHAT_FAQ: FAQEntry[] = [
  {
    keywords: ["install", "installation", "process", "how does"],
    response:
      "SolarPulse handles everything: free site assessment, custom system design, permitting, professional installation, and utility interconnection. Most homes are live within 4–8 weeks.",
  },
  {
    keywords: ["save", "savings", "bill", "cost", "roi"],
    response:
      "Homeowners typically reduce electricity bills by 50–80%. Use our ROI calculator on the homepage — enter your monthly bill and roof size for an instant estimate.",
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "package"],
    response:
      "Systems start around $15,000 after incentives for average homes. Commercial projects are custom-quoted. Request a free quote for a tailored proposal.",
  },
  {
    keywords: ["finance", "financing", "loan", "lease", "payment"],
    response:
      "We offer $0-down solar loans, leases, and PPAs. Federal ITC covers 30% of costs. Our team helps you choose the best option for your budget.",
  },
  {
    keywords: ["book", "appointment", "visit", "schedule", "consult"],
    response:
      "Book a free site visit via our contact form or call us. An expert will assess your roof, shading, and energy usage within 48 hours.",
  },
  {
    keywords: ["warranty", "guarantee"],
    response:
      "Every installation includes a 25-year panel performance warranty and 10-year workmanship coverage.",
  },
  {
    keywords: ["commercial", "business"],
    response:
      "Our commercial division designs scalable systems for warehouses, offices, and retail — often achieving 3–5 year payback periods.",
  },
  {
    keywords: ["battery", "storage"],
    response:
      "We install Tesla Powerwall and Enphase battery systems for backup power and peak-rate optimization.",
  },
];

export function getMockChatResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const entry of CHAT_FAQ) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.response;
    }
  }
  return "Thanks for reaching out! A SolarPulse expert can help with installation, savings estimates, financing, and scheduling. Try asking about savings, pricing, or booking a site visit — or contact us directly for personalized guidance.";
}
