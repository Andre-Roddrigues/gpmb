export function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className={`section-eyebrowabout mt-3 text-3xl font-semibold  md:text-5xl ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
      {intro && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}