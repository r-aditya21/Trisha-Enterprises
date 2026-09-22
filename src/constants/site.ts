function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.origin;
      }
    } catch {
      // Fall through to the deployment URL when the configured value is invalid.
    }
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    try {
      const url = new URL(
        vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`,
      );
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.origin;
      }
    } catch {
      // Fall through to the local build fallback when the deployment value is invalid.
    }
  }

  return "http://localhost:3000";
}

export const SITE = {
  name: "Trisha Enterprises",
  tagline: "Professional Solar Solutions",
  description:
    "Professional solar panel installation and maintenance for homes and businesses. Reduce electricity bills by up to 80% with premium solar energy solutions.",
  url: getSiteUrl(),
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 7709516900",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917517226212",
  email: "trishaenterprise43@gmail.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Our Work" },
  {
    label: "Calculator",
    href: "/",
    children: [
      { href: "/saving", label: "Saving Calculator" },
      { href: "/loan", label: "Loan Calculator" },
    ],
  },
  // { href: "/benefit", label: "Benefit"},
] as const;

export const FOOTER_LINKS = {
  quick: [
    { href: "/services", label: "Residential Solar" },
    { href: "/#ai-optimization", label: "AI Systems" },
    { href: "/projects", label: "Recent Projects" },
    { href: "/#calculator", label: "Savings Calculator" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/faq", label: "Warranty Info" },
    { href: "/contact", label: "Contact Us" },
  ],
} as const;
