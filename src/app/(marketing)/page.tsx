import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PricingCards } from "@/components/sections/pricing-cards";
import { CaseStudies } from "@/components/sections/case-studies";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ContactSection } from "@/components/sections/contact-section";
import { WhatsAppCTASection } from "@/components/sections/whatsapp-cta-section";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { StatsCounter } from "@/components/sections/stats-counter";
import { HorizontalScrollSection } from "@/components/sections/horizontal-scroll-section";
import { SchemeBenefitTimer } from "@/components/sections/benefit-timer";
import { FAQSection } from "@/components/sections/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <LogoMarquee />
      <CaseStudies />
      <ServicesGrid />
      <div className="flex items-center justify-center px-margin-mobile md:px-margin-desktop">
        <SchemeBenefitTimer />
      </div>
      <PricingCards />
      <StatsCounter />
      <div className="section-lazy">
        <HorizontalScrollSection />
      </div>
      <div className="section-lazy">
        <TestimonialCarousel />
      </div>
      <ContactSection />
      <WhatsAppCTASection />
      <div className="section-lazy">
        <FAQSection />
      </div>
    </>
  );
}
