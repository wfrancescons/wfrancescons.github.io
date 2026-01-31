import type { CardProps } from "@/_components/Card.tsx";

export type FolderProps = CardProps & {
  name: string;
  itemCount: number;
  color?: "amber" | "blue" | "green" | "red" | "purple" | "neutral";
  children: JSX.Children;
};

let folderId = 0;

function generateFolderId() {
  folderId += 1;
  return `folder-${folderId}`;
}

export default function Folder(
  { name, itemCount, color = "neutral", children, size, comp }: FolderProps,
) {
  const id = generateFolderId();

  const colorsMap = {
    amber: ["bg-amber-200", "fill-amber-300", "text-amber-950"],
    blue: ["bg-blue-200", "fill-blue-300", "text-blue-950"],
    green: ["bg-lime-200", "fill-lime-300", "text-lime-950"],
    neutral: ["bg-stone-200", "fill-stone-300", "text-stone-950"],
    red: ["bg-red-200", "fill-red-300", "text-red-950"],
    purple: ["bg-purple-200", "fill-purple-300", "text-purple-950"],
  };

  return (
    <>
      {/* Folder card */}
      <comp.Card size={size} clickable>
        <button
          type="button"
          data-folder-id={id}
          className="h-full w-full cursor-pointer"
        >
          <div class="group/folder relative size-full overflow-hidden rounded-3xl">
            <div class={`absolute inset-0 z-0 ${colorsMap[color][0]}`} />

            <div class="absolute inset-0 z-10 flex items-end justify-center pb-2">
              <div class="relative h-full w-full *:absolute *:bottom-1 *:left-1/2 *:size-[85%] *:-translate-x-1/2 *:rounded-2xl *:shadow-lg/30 *:transition-all *:duration-500 group-hover/folder:*:bottom-4">
                <div class="z-10 translate-y-2 -rotate-2 bg-neutral-50"></div>

                <div class="z-20 flex translate-y-6 rotate-1 flex-col gap-2 bg-neutral-50 p-4">
                  <div class="h-2 w-3/4 rounded-full bg-black/10"></div>
                  <div class="h-2 w-full rounded-full bg-black/5"></div>
                  <div class="h-2 w-5/6 rounded-full bg-black/5"></div>
                  <div class="h-2 w-2/3 rounded-full bg-black/3"></div>
                </div>
              </div>
            </div>

            <div class="absolute bottom-0 left-0 z-20 h-[65%] w-full">
              <svg
                viewBox="0 0 400 280"
                class="h-full w-full drop-shadow-[0_0px_8px_rgba(0,0,0,0.3)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <mask id={`folder-mask-${id}`} maskUnits="userSpaceOnUse">
                    <rect width="100%" height="100%" fill="white" />
                    <path
                      d="M 400 0 L 400 50 L 250 50 C 190 50 180 0 90 0 L 0 0 Z"
                      fill="black"
                    />
                  </mask>
                </defs>

                <rect
                  width="100%"
                  height="100%"
                  rx="16"
                  class={colorsMap[color][1]}
                  mask={`url(#folder-mask-${id})`}
                />
              </svg>

              <div class="absolute bottom-0 left-0 flex flex-col gap-1 h-full w-full justify-end items-start p-4">
                <span
                  class={`text-base truncate leading-none font-semibold ${
                    colorsMap[color][2]
                  }/70`}
                >
                  {name}
                </span>
                <span class={`text-sm font-semibold ${colorsMap[color][2]}/50`}>
                  {itemCount}
                </span>
              </div>
            </div>
          </div>
        </button>
      </comp.Card>

      {/* Folder dialog */}
      <dialog
        id={id}
        closedby="any"
        className="fixed inset-0 m-0 p-0 backdrop:bg-transparent bg-black/5 h-dvh w-screen max-h-none max-w-none grid items-end justify-center md:items-center
        overflow-clip pointer-events-none transition-discrete invisible opacity-0 backdrop-blur-none open:visible open:opacity-100 open:pointer-events-auto
        open:backdrop-blur-sm starting:open:opacity-0 group transition-all duration-300 ease-in-out"
      >
        {/* Backdrop to close modal on outside click */}
        <form
          method="dialog"
          className="fixed inset-0 -z-10 cursor-default"
        >
          <button
            type="submit"
            className="h-full w-full"
            aria-label="Close"
          />
        </form>

        {/* Modal Box */}
        <div className="scale-90 group-open:scale-100 transition-transform duration-300 ease-in-out origin-bottom
      bg-neutral-50 w-screen h-dvh max-w-full md:max-w-4xl max-h-9/10 md:max-h-8/10 overflow-hidden flex flex-col
        rounded-t-2xl md:rounded-2xl shadow-xl">
          {/* Modal Header */}
          <div className="flex items-center p-4">
            <div className="w-10" /> {/* espaçador esquerdo */}

            <h2 className="flex-1 text-center font-bold text-lg text-neutral-700">
              {name}
            </h2>

            <form method="dialog" className="w-10 flex justify-end">
              <button
                type="submit"
                className="text-2xl hover:opacity-70 p-2 bg-neutral-400/20 text-neutral-500 rounded-full transition-transform active:scale-90 duration-150"
                aria-label="Close"
              >
                <img
                  src="/icons/close.svg"
                  className="h-4.5 w-4.5"
                  alt=""
                  inline
                />
              </button>
            </form>
          </div>

          {/* Modal Body */}
          <div className="flex-1 flex flex-col gap-10 overflow-y-auto p-2 overscroll-contain">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
