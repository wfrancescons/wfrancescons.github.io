import type { CardProps } from "@/_components/Card.tsx";

type TextProps = CardProps & {
  color?: "amber" | "blue" | "green" | "red" | "purple" | "neutral";
  textSize?: "small" | "medium" | "large" | "extra-large";
  children: JSX.Children;
};

export default function Text(
  { children, size, comp, color = "neutral", textSize = "medium" }: TextProps,
) {
  const { Card } = comp;

  const colorsMap = {
    amber: ["bg-amber-600/25", "bg-amber-500", "text-amber-100"],
    blue: ["bg-sky-600/25", "bg-sky-500", "text-sky-100"],
    green: ["bg-lime-600/25", "bg-lime-500", "text-lime-100"],
    neutral: ["bg-neutral-500/25", "bg-neutral-500", "text-neutral-100"],
    red: ["bg-red-600/25", "bg-red-500", "text-red-100"],
    purple: ["bg-purple-600/25", "bg-purple-500", "text-purple-100"],
  };

  const textSizeMap = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    "extra-large": "text-xl",
  };

  return (
    <Card size={size}>
      <div
        className={`flex h-full w-full overflow-hidden items-center ${
          colorsMap[color][0]
        } p-2`}
      >
        <div
          className={`flex items-center justify-center h-full w-full ${
            colorsMap[color][1]
          } p-4 rounded-2xl ${
            colorsMap[color][2]
          } font-bold text-shadow-lg/10 text-center ${textSizeMap[textSize]}`}
        >
          <p>{children}</p>
        </div>
      </div>
    </Card>
  );
}
