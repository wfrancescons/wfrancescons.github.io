import type { CardProps } from "@/_components/Card.tsx";

type TodoProps = CardProps & {
  items: { text: string; completed?: boolean }[];
};

export default function Todo({ items, size, comp }: TodoProps) {
  const total = items.length;
  const completedCount = items.filter((i) => i.completed).length;

  const percentage = total === 0
    ? 0
    : Math.round((completedCount / total) * 100);

  const isCompleted = percentage === 100;

  return (
    <comp.Card size={size}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex flex-row justify-between bg-stone-200 p-4 items-center">
          <h3 className="font-semibold leading-tight text-stone-900">To-do</h3>

          <div className="flex flex-row items-center gap-1">
            <span className="text-xs font-semibold text-stone-950/50">
              {isCompleted ? "Done" : `${percentage}%`}
            </span>

            {isCompleted
              ? (
                <div className="size-5 flex items-center justify-center rounded-full bg-stone-600 text-stone-100">
                  <img
                    src="/icons/check.svg"
                    alt=""
                    className="w-3 h-3"
                    inline
                  />
                </div>
              )
              : (
                /* Progress Ring */
                <div className="grid grid-cols-1 grid-rows-1">
                  <div className="size-5 border-4 rounded-full border-stone-600/30 col-start-1 row-start-1" />
                  <div
                    className={`size-5 rounded-full border-4 border-stone-700/80 col-start-1 row-start-1 mask-conic-from-${percentage}% mask-conic-to-${percentage}%`}
                  />
                </div>
              )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-4 py-3 bg-stone-100 text-zinc-600 flex flex-col gap-2 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 flex items-center justify-center rounded-full ${
                  item.completed
                    ? "bg-stone-600 text-stone-100 outline-1 outline-stone-700"
                    : "bg-stone-50 outline-1 outline-stone-300"
                }`}
              >
                {item.completed && (
                  <img
                    src="/icons/check.svg"
                    alt=""
                    className="w-3 h-3"
                    inline
                  />
                )}
              </div>

              <span
                className={`text-sm ${
                  item.completed ? "line-through opacity-85 italic" : ""
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </comp.Card>
  );
}
