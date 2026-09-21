import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = createMetadata({
  title: "Privacy Policy",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <article className="py-section px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto prose prose-neutral">
        <p className="text-body-md text-on-surface-variant">
          SolarPulse respects your privacy. We collect contact information solely to provide quotes
          and installation services. We do not sell personal data to third parties.
        </p>
      </article>
    </>
  );
}
