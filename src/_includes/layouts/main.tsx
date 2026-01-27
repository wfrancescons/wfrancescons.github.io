import type { Component } from "@/_components/types.d.ts";

type LayoutData = Lume.Data & {
  name: string;
  description: string;
  lang: string;
  components: Component[];
};

type Block =
  | { type: "section"; title: string; subtitle?: string }
  | { type: "grid"; items: Component[] };

export default function Layout(
  { name, description, avatar, lang, components, comp }: LayoutData,
) {
  // Check for specific card types to conditionally load scripts/styles
  const hasMapCard = components.some((item) => "map" in item);

  // Organize components into blocks (sections and grids)
  const blocks: Block[] = [];
  let currentGrid: Component[] = [];

  for (const item of components) {
    if ("section" in item) {
      if (currentGrid.length > 0) {
        blocks.push({ type: "grid", items: currentGrid });
        currentGrid = [];
      }

      blocks.push({
        type: "section",
        title: item.section,
        subtitle: item.subtitle,
      });

      continue;
    }

    currentGrid.push(item);
  }

  if (currentGrid.length > 0) {
    blocks.push({ type: "grid", items: currentGrid });
  }

  return (
    <html lang={lang}>
      <head>
        <title>{`${name} - Gridme`}</title>
        <link rel="stylesheet" href="/style.css" />
        {hasMapCard && (
          <script
            src="https://unpkg.com/maplibre-gl@^5.16.0/dist/maplibre-gl.js"
            defer
          />
        )}
        <script type="module" src="/script.js" inline />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div className="min-h-screen flex justify-center p-6 bg-neutral-50">
          <div className="w-full max-w-5xl flex flex-col">
            <comp.Profile img={avatar} name={name} description={description} />

            <main className="w-full flex flex-col items-center justify-center">
              {blocks.map((block) => {
                switch (block.type) {
                  case "section":
                    return (
                      <comp.Section
                        title={block.title}
                        subtitle={block.subtitle}
                      />
                    );

                  case "grid":
                    return (
                      <comp.Grid>
                        {block.items.map((item) => {
                          switch (true) {
                            case "image" in item:
                              return (
                                <comp.cards.Image
                                  size={item.size}
                                  src={item.src}
                                  alt={item.alt}
                                  caption={item.caption}
                                  url={item.url}
                                />
                              );

                            case "map" in item:
                              return (
                                <comp.cards.Map
                                  size={item.size}
                                  center={item.center}
                                  zoom={item.zoom}
                                  caption={item.caption}
                                />
                              );

                            case "note" in item:
                              return (
                                <comp.cards.Note size={item.size}>
                                  {item.content}
                                </comp.cards.Note>
                              );

                            case "text" in item:
                              return (
                                <comp.cards.Text
                                  size={item.size}
                                  color={item.color}
                                  textSize={item.textSize}
                                >
                                  {item.content}
                                </comp.cards.Text>
                              );

                            case "todo" in item:
                              return (
                                <comp.cards.Todo
                                  size={item.size}
                                  items={item.items}
                                />
                              );

                            default:
                              return null;
                          }
                        })}
                      </comp.Grid>
                    );
                }
              })}
            </main>

            <comp.Footer hasMapCard={hasMapCard} />
          </div>
        </div>
      </body>
    </html>
  );
}
