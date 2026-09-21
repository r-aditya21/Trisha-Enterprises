import type { Metadata } from "next";
import { SITE } from "@/constants/site";

const DEFAULT_OG_IMAGE = "/assets/images/og-image.jpg";

export function createMetadata({
  title,
  description = SITE.description,
  path = "",
  image = DEFAULT_OG_IMAGE,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} | ${SITE.tagline}`;
  const url = `${SITE.url}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE.url}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: path || "/" },
    keywords: [
      "solar panels",
      "solar installation",
      "solar energy",
      "Trisha Enterprises",
      "rooftop solar",
      "government subsidy solar",
      "residential solar Maharashtra",
      "commercial solar India",
    ],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
    robots: { index: true, follow: true },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE.url,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phone,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  sameAs: [
    "https://www.facebook.com",
    "https://www.instagram.com",
  ],
};
