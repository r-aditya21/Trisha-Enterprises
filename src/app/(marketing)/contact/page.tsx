import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { ContactSection } from "@/components/sections/contact-section";
import { WhatsAppCTASection } from "@/components/sections/whatsapp-cta-section";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        description="Free quotes, site visits, and expert consultations — response within 30 minutes."
      />
      <ContactSection />
      <WhatsAppCTASection />
    </>
  );
}
