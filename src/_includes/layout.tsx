import type { Component } from "../_components/cards/types.d.ts";

type LayoutData = Lume.Data & {
  name: string;
  description: string;
  components: Component[];
};

type Block =
  | { type: "section"; title: string }
  | { type: "grid"; items: Component[] };

export default function Layout(
  { name, description, avatar, components, comp }: LayoutData,
) {
  // UI components
  const { Grid, Profile, Section, Footer } = comp;
  const { Note, Todo, Image, Text, Map } = comp.cards;

  // Check for specific card types to conditionally load scripts/styles
  const hasNoteCard = components.some((item) => "note" in item);
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
      });

      continue;
    }

    currentGrid.push(item);
  }

  if (currentGrid.length > 0) {
    blocks.push({ type: "grid", items: currentGrid });
  }

  return (
    <html>
      <head>
        <title>{`${name} - Gridme`}</title>
        <link rel="stylesheet" href="/style.css" />
        {hasNoteCard && (
          <script
            type="module"
            src="/scripts/copyNote.js"
          />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {hasMapCard && (
          <>
            <script src="https://unpkg.com/maplibre-gl@^5.16.0/dist/maplibre-gl.js" />
            <link
              href="https://unpkg.com/maplibre-gl@^5.16.0/dist/maplibre-gl.css"
              rel="stylesheet"
            />
            <script
              type="module"
              src="/scripts/loadMap.js"
            />
          </>
        )}
      </head>

      <body>
        <div className="min-h-screen flex justify-center p-6 bg-neutral-50">
          <div className="w-full max-w-5xl flex flex-col">
            <Profile img={avatar} name={name} description={description} />

            <main className="w-full flex flex-col items-center justify-center">
              {blocks.map((block) => {
                switch (block.type) {
                  case "section":
                    return (
                      <Section
                        title={block.title}
                      />
                    );

                  case "grid":
                    return (
                      <Grid>
                        {block.items.map((item) => {
                          switch (true) {
                            case "image" in item:
                              return (
                                <Image
                                  size={item.size}
                                  src={item.src}
                                  alt={item.alt}
                                  caption={item.caption}
                                  url={item.url}
                                />
                              );

                            case "map" in item:
                              return (
                                <Map
                                  size={item.size}
                                  center={item.center}
                                  zoom={item.zoom}
                                  caption={item.caption}
                                />
                              );

                            case "note" in item:
                              return (
                                <Note size={item.size}>
                                  {item.content}
                                </Note>
                              );

                            case "text" in item:
                              return (
                                <Text
                                  size={item.size}
                                  color={item.color}
                                  textSize={item.textSize}
                                >
                                  {item.content}
                                </Text>
                              );

                            case "todo" in item:
                              return (
                                <Todo
                                  size={item.size}
                                  items={item.items}
                                />
                              );

                            default:
                              return null;
                          }
                        })}
                      </Grid>
                    );
                }
              })}
            </main>

            <Footer hasMapCard={hasMapCard} />
          </div>
        </div>
      </body>
    </html>
  );
}
