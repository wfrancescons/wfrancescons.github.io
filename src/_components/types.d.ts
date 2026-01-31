import type { FolderProps } from "@/_components/cards/Folder/comp.tsx";
import type { ImageProps } from "@/_components/cards/Image.tsx";
import type { MapProps } from "@/_components/cards/Map/comp.tsx";
import type { NoteProps } from "@/_components/cards/Note/comp.tsx";
import type { TextProps } from "@/_components/cards/Text.tsx";
import type { TodoProps } from "@/_components/cards/Todo.tsx";
import type { SectionProps } from "@/_components/Section.tsx";

type FolderComponent = FolderProps & {
  folder: null;
};

type ImageComponent = ImageProps & {
  image: null;
};

type MapComponent = MapProps & {
  map: null;
};

type NoteComponent = NoteProps & {
  note: null;
};

type TextComponent = TextProps & {
  text: null;
};

type TodoComponent = TodoProps & {
  todo: null;
};

export type Component =
  | FolderComponent
  | ImageComponent
  | MapComponent
  | NoteComponent
  | SectionProps
  | TextComponent
  | TodoComponent;
