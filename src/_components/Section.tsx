type SectionProps = {
  title: string;
  subtitle?: string;
};

export default function Section({ title, subtitle }: SectionProps) {
  return (
    <div className="pt-5 pb-2 flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
    </div>
  );
}
