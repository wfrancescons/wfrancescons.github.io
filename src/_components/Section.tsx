type SectionProps = {
  title: string;
};

export default function SectionTitle(
  { title }: SectionProps,
) {
  return (
    <div className="pt-5 pb-2 flex flex-col items-center text-center">
      <h2 className="text-xl font-bold text-neutral-800">{title}</h2>
    </div>
  );
}
