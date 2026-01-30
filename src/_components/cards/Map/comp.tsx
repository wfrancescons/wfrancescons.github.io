import type { CardProps } from "@/_components/Card.tsx";

type MapProps = CardProps & {
  center: [lng: number, lat: number];
  zoom?: number;
  caption?: string;
};

export default function Map(
  { size, center, zoom = 10, caption, comp }: MapProps,
) {
  const mapInfos = {
    center: center.map((coord) => coord.toFixed(3)),
    zoom,
  };

  return (
    <comp.Card
      size={size}
      url={`https://www.google.com/maps/@${center[1]},${center[0]},${zoom}z`}
    >
      <div className="w-full h-full bg-white p-2">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {/* Map */}
          <div
            data-map-infos={JSON.stringify(mapInfos)}
            className="w-full h-full"
          >
          </div>

          {/* Placeholder */}
          <div
            data-map-placeholder
            className="absolute pointer-events-none inset-0 z-10 flex items-center justify-center bg-zinc-100 opacity-100 transition-opacity duration-1000"
          >
            <img
              src="/img/map-placeholder.jpg"
              alt="Map placeholder"
              className="w-full h-full object-cover"
              loading="lazy"
              fetchpriority="high"
              transform-images="avif webp jpg 500"
            />
          </div>

          {/* Caption */}
          {caption && (
            <div className="pointer-events-none absolute z-20 bottom-0 left-0 p-2">
              <div className="inline-block max-w-full rounded-xl bg-white/45 backdrop-blur-sm px-3 py-2 shadow-md/10">
                <span className="block text-zinc-700 text-sm/4 font-semibold truncate">
                  {caption}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </comp.Card>
  );
}
