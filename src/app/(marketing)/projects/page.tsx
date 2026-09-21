import { createMetadata } from "@/lib/seo";
import { CaseStudies } from "@/components/sections/case-studies";

export const metadata = createMetadata({
  title: "Projects",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <CaseStudies />
    </>
  );
}
