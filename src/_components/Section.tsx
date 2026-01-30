type SectionProps = {
  title: string;
  subtitle?: string;
};

export default function Section({ title, subtitle }: SectionProps) {
  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
    </div>
  );
}
