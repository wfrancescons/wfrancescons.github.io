import type { CardSize } from "./Card.tsx";

type SectionComponent = {
  section: string;
  subtitle?: string;
};

type ImageComponent = {
  image: null;
  size: CardSize;
  src: string;
  alt: string;
  caption?: string;
  url?: string;
};

type MapComponent = {
  map: null;
  size: CardSize;
  center: [lng: number, lat: number];
  zoom: number;
  caption?: string;
};

type NoteComponent = {
  note: null;
  size: CardSize;
  content: string;
};

type TextComponent = {
  text: null;
  size: CardSize;
  content: string;
  color?: string;
  textSize?: "small" | "medium" | "large";
};

type TodoComponent = {
  todo: null;
  size: CardSize;
  items: { text: string; completed?: boolean }[];
};

type FolderComponent = {
  folder: null;
  size: CardSize;
  name: string;
  components: Component[];
};

export type Component =
  | FolderComponent
  | SectionComponent
  | ImageComponent
  | MapComponent
  | NoteComponent
  | TextComponent
  | TodoComponent;
