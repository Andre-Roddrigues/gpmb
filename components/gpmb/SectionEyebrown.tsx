export function SectionEyebrow({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-full">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}

      <h2 className="section-eyebrowaboutall mt-3 text-3xl font-semibold md:text-5xl">
        {title}
      </h2>

      {intro && (
        <p className="mt-5 max-w-full text-base leading-7 text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}