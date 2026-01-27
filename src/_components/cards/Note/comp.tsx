import type { CardProps } from "@/_components/Card.tsx";

type NoteProps = CardProps & {
  children: JSX.Children;
};

let noteId = 0;

function generateNoteId() {
  noteId += 1;
  return `note-${noteId}`;
}

export default function Note({ children, size, comp }: NoteProps) {
  const id = generateNoteId();

  return (
    <comp.Card size={size}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex flex-row justify-between bg-amber-200 p-4 items-center">
          <h3 className="font-semibold leading-tight text-amber-950">Note</h3>
          <div className="flex flex-row-reverse gap-1 justify-center items-center">
            <button
              type="button"
              className="text-amber-950/60 inline-flex justify-center items-center bg-amber-500/30 hover:bg-amber-500/50 rounded-full p-2 transition-all duration-200 active:scale-85"
              aria-label="Copy"
              data-note-id={id}
            >
              <img
                className="w-3 h-3"
                src="/icons/copy.svg"
                alt=""
                inline
              />
            </button>
            <span className="scale-0 select-none origin-right transition-transform duration-150 ease-in-out text-xs text-amber-950/50">
              Copied!
            </span>
          </div>
        </div>

        <div
          className="flex-1 px-4 py-3 bg-amber-100 text-zinc-600"
          data-note-content={id}
        >
          <p>{children}</p>
        </div>
      </div>
    </comp.Card>
  );
}
