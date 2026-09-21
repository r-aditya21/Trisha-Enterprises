import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { PricingCards } from "@/components/sections/pricing-cards";
import { ROICalculator } from "@/components/calculator/roi-calculator";

export const metadata = createMetadata({
  title: "Pricing",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Transparent Pricing"
        description="Flexible packages with federal incentives applied. No hidden fees."
      />
      <section className="py-section px-margin-mobile md:px-margin-desktop">
        <PricingCards />
      </section>
      <ROICalculator />
    </>
  );
}
