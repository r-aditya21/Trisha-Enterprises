import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Careers",
  path: "/careers",
});

const ROLES = [
  { title: "Solar Installation Technician", location: "California · Full-time" },
  { title: "Commercial Sales Engineer", location: "Remote · Full-time" },
  { title: "Customer Success Manager", location: "Texas · Hybrid" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Join SolarPulse"
        description="Build the future of clean energy with a team that values craft and impact."
      />
      <section className="py-section px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto space-y-6">
        {ROLES.map((role) => (
          <article
            key={role.title}
            className="glass-card p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-headline-sm text-primary">{role.title}</h3>
              <p className="text-body-md text-on-surface-variant">{role.location}</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Apply</Link>
            </Button>
          </article>
        ))}
      </section>
    </>
  );
}
