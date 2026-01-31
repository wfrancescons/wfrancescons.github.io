export type CardSize = "square" | "wide" | "large";

export type CardProps = Lume.Data & {
  size: CardSize;
  clickable?: boolean;
  url?: string;
  children: JSX.Children;
};

export default function Card({ size, clickable, url, children }: CardProps) {
  return (
    <div
      className={`card card-${size} group/card shadow-xl/5 hover:shadow-xl/10 duration-300 transition-all ${
        url || clickable ? "active:scale-95 cursor-pointer" : ""
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
