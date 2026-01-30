import type { CardProps } from "@/_components/Card.tsx";

type FolderProps = CardProps & {
  name: string;
  children?: JSX.Children;
};

let folderId = 0;

function generateFolderId() {
  folderId += 1;
  return `folder-${folderId}`;
}

export default function Folder({ name, children, size, comp }: FolderProps) {
  const id = generateFolderId();

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
            <div class="absolute inset-0 z-0 bg-stone-200" />

            <div class="absolute inset-0 z-10 flex items-end justify-center pb-2">
              <div class="relative h-full w-full [&>div]:absolute [&>div]:bottom-1 [&>div]:left-1/2 [&>div]:size-[85%] [&>div]:-translate-x-1/2 [&>div]:rounded-2xl [&>div]:outline-5 [&>div]:outline-white [&>div]:transition-all [&>div]:duration-500 group-hover/folder:[&>div]:bottom-3">
                <div class="z-10 translate-y-2 -rotate-2 bg-gray-300"></div>

                <div class="z-20 flex translate-y-6 rotate-1 flex-col gap-2 bg-gray-200 p-4">
                  <div class="h-3 w-3/4 rounded-full bg-white/70"></div>
                  <div class="h-3 w-full rounded-full bg-white/50"></div>
                  <div class="h-3 w-5/6 rounded-full bg-white/50"></div>
                  <div class="h-3 w-2/3 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>

            <div class="absolute bottom-0 left-0 z-20 h-[65%] w-full">
              <svg
                viewBox="0 0 400 280"
                class="h-full w-full"
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
                  class="fill-stone-300"
                  mask={`url(#folder-mask-${id})`}
                />
              </svg>

              <div class="absolute bottom-4 left-1/2 flex h-8 w-full -translate-x-1/2 items-center justify-center px-2 text-center">
                <span class="text-md truncate leading-none font-semibold text-stone-700">
                  {name}
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
        className="fixed inset-0 m-0 p-0 bg-white/20 h-dvh w-screen max-h-none max-w-none grid items-end justify-center md:items-center
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
          <div className="flex items-center justify-between p-4 shrink-0">
            <h2 className="font-bold text-lg text-neutral-700">{name}</h2>
            <form method="dialog">
              <button
                type="submit"
                className="text-2xl hover:opacity-70 p-2 bg-neutral-400/20 text-neutral-500 rounded-full"
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
          <div className="flex-1 overflow-y-auto p-2 overscroll-contain">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
