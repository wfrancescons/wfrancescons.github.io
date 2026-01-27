export type CardSize = "square" | "wide" | "large";

export type CardProps = Lume.Data & {
  size: CardSize;
  url?: string;
  children: JSX.Children;
};

export default function Card({ size, url, children }: CardProps) {
  return (
    <div
      className={`card card-${size} shadow-xl/5 hover:shadow-xl/10 duration-300 transition-all ${
        url ? "active:scale-95" : ""
      }`}
    >
      {url
        ? (
          <a
            href={url}
            className="block h-full w-full"
            noopener
            noreferrer
            target="_blank"
          >
            {children}
          </a>
        )
        : children}
    </div>
  );
}
