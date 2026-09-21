import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = createMetadata({
  title: "Terms of Service",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" />
      <article className="py-section px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <p className="text-body-md text-on-surface-variant">
          Services are subject to site assessment, permitting approval, and signed installation
          agreements. Warranty terms are provided per project documentation.
        </p>
      </article>
    </>
  );
}
