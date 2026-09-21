import { createMetadata } from "@/lib/seo";
import { SavingsCalculator } from "@/components/sections/saving-calculator";
import { ContactSection } from "@/components/sections/contact-section";


export const metadata = createMetadata({
  title: "FAQ",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
          <div><h2 className="py-10 text-center text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">Saving Calculator</h2></div>

      <section className=" px-margin-mobile md:px-margin-desktop">
        <SavingsCalculator />
        <ContactSection/>
      </section>
    </>
  );
}
