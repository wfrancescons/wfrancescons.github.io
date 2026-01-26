import type { CardProps } from "@/_components/Card.tsx";

type TodoProps = CardProps & {
  items: { text: string; completed?: boolean }[];
};

export default function Todo({ items, size, comp }: TodoProps) {
  const { Card } = comp;

  return (
    <Card size={size}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex flex-row justify-between bg-stone-200 p-4 items-center">
          <h3 className="font-semibold leading-tight text-stone-900">To-do</h3>
        </div>

        <div className="flex-1 px-4 py-3 bg-stone-100 text-zinc-600 flex flex-col gap-2">
          {items.map((item) => {
            return (
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    item.completed
                      ? "bg-stone-600 text-stone-100 outline-1 outline-stone-700"
                      : "bg-stone-50 outline-1 outline-stone-300"
                  }   `}
                >
                  {item.completed && (
                    <img
                      src="/icons/check.svg"
                      alt=""
                      className="w-3 h-3 stroke-3"
                      inline
                    />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    item.completed ? "line-through opacity-75 italic" : ""
                  }`}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
