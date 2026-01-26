type ProfileProps = {
  name: string;
  img: string;
  description: string;
};
export default function Profile({ name, img, description }: ProfileProps) {
  return (
    <header className="flex flex-col items-center text-center gap-3 pt-6 pb-4">
      <img
        class="w-26 h-26 rounded-full border-4 border-white shadow-lg/10"
        src={img}
        alt="Avatar"
        transform-images="avif webp jpg 300"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-neutral-900">{name}</h1>
        <p className="text-base text-neutral-400 max-w-sm">{description}</p>
      </div>
    </header>
  );
}
