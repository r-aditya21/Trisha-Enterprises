import { createMetadata } from "@/lib/seo";
import { StatsCounter } from "@/components/sections/stats-counter";
import AboutUs  from "@/components/sections/about-us";
import {ContactSection} from "@/components/sections/contact-section";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn about SolarPulse — certified installers powering sustainable futures since 2010.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <StatsCounter />
      <AboutUs/>
      <ContactSection/>
    </>
  );
}
