import { RevealText } from "@/components/animations/reveal-text";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="pt-32 pb-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-3xl mx-auto text-center">
        <RevealText as="h1" className="text-headline-xl text-primary mb-4">
          {title}
        </RevealText>
        {description && (
          <p className="text-body-lg text-on-surface-variant">{description}</p>
        )}
      </div>
    </div>
  );
}
