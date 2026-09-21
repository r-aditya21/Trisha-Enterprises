import { createMetadata } from "@/lib/seo";
import { ServicesGrid } from "@/components/sections/services-grid";

export const metadata = createMetadata({
  title: "Services",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesGrid />
    </>
  );
}
