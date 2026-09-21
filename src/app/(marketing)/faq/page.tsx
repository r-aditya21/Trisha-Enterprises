import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { FAQAccordion } from "@/components/sections/faq-accordion";

export const metadata = createMetadata({
  title: "FAQ",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <section className="py-section px-margin-mobile md:px-margin-desktop">
        <FAQAccordion />
      </section>
    </>
  );
}
