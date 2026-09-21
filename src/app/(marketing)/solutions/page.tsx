import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "From battery storage to commercial-scale solar deployments — intelligent systems built for your energy goals.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        title="Intelligent Solar Solutions"
        description="From battery storage to commercial-scale deployments — systems built for your goals."
      />
      <ServicesGrid />
      <ContactSection />
    </>
  );
}
