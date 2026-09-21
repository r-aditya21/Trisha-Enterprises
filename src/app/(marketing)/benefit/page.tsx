import { createMetadata } from "@/lib/seo";
import { SchemeBenefitTimer } from "@/components/sections/benefit-timer";
import SolarBenefits from "@/components/sections/benefit-info"
import { ContactSection } from "@/components/sections/contact-section";
import { WhatsAppCTASection } from "@/components/sections/whatsapp-cta-section";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
});



export default function ContactPage() {
  return (
    <>
              <div><h2 className="py-10 text-center text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">See Benefits</h2></div>
    <div className="flex items-center justify-center py-14">
    <SchemeBenefitTimer/>
    </div>
      <SolarBenefits/>
      <ContactSection />
      <WhatsAppCTASection />
    </>
  );
}
