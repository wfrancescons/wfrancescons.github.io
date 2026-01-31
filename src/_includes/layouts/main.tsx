import type { Component } from "@/_components/types.d.ts";

type LayoutData = Lume.Data & {
  name: string;
  description: string;
  lang: string;
  components: Component[];
};

type Block = {
  title?: string;
  subtitle?: string;
  items: Component[];
};

export default function Layout(
  { name, description, avatar, lang, components, comp }: LayoutData,
) {
  // Check for specific card types to conditionally load scripts/styles
  let hasMapCard = false;

  const blocks = buildBlocks(components);

  function buildBlocks(components: Component[]): Block[] {
    const blocks: Block[] = [];
    let currentBlock: Block = { items: [] };

    for (const item of components) {
      if ("section" in item) {
        if (currentBlock.items.length > 0) {
          blocks.push(currentBlock);
        }

        currentBlock = {
          title: item.section,
          subtitle: item.subtitle,
          items: [],
        };

        continue;
      }

      currentBlock.items.push(item);
    }

    if (currentBlock.items.length > 0) {
      blocks.push(currentBlock);
    }

    return blocks;
  }

  function renderBlocks(blocks: Block[]) {
    return blocks.map((block) => (
      <section className="flex flex-col gap-5 p-2">
        {(block.title || block.subtitle) && (
          <comp.Section
            title={block.title}
            subtitle={block.subtitle}
          />
        )}

        <comp.Grid>
          {renderGridItems(block.items)}
        </comp.Grid>
      </section>
    ));
  }

  function renderGridItems(items: Component[]) {
    return items.map((item) => {
      if ("folder" in item) {
        const blocks = buildBlocks(item.components);
        const itemCount = item.components.reduce(
          (count: number, component: Component) => {
            if ("section" in component) {
              return count;
            }
            return count + 1;
          },
          0,
        );

        return (
          <comp.cards.Folder
            size={item.size}
            name={item.name}
            itemCount={itemCount}
            color={item.color}
          >
            {renderBlocks(blocks)}
          </comp.cards.Folder>
        );
      }

      if ("image" in item) {
        return (
          <comp.cards.Image
            size={item.size}
            src={item.src}
            alt={item.alt}
            caption={item.caption}
            url={item.url}
          />
        );
      }

      if ("map" in item) {
        hasMapCard = true;
        return (
          <comp.cards.Map
            size={item.size}
            center={item.center}
            zoom={item.zoom}
            caption={item.caption}
          />
        );
      }

      if ("note" in item) {
        return (
          <comp.cards.Note size={item.size}>
            {item.content}
          </comp.cards.Note>
        );
      }

      if ("text" in item) {
        return (
          <comp.cards.Text
            size={item.size}
            color={item.color}
            textSize={item.textSize}
          >
            {item.content}
          </comp.cards.Text>
        );
      }

      if ("todo" in item) {
        return (
          <comp.cards.Todo
            size={item.size}
            items={item.items}
          />
        );
      }

      return null;
    });
  }

  const renderedBlocks = renderBlocks(blocks);

  return (
    <html lang={lang}>
      <head>
        <title>{`${name} - Gridme`}</title>
        <link rel="stylesheet" href="/style.css" />

        {hasMapCard && (
          <>
            <script
              src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.17.0/dist/maplibre-gl.min.js"
              crossorigin="anonymous"
              defer
            />
            <link
              href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.17.0/dist/maplibre-gl.min.css"
              rel="stylesheet"
            />
          </>
        )}

        <script type="module" src="/script.js" inline />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div className="min-h-screen flex justify-center p-6 bg-neutral-50">
          <div className="w-full max-w-5xl flex flex-col">
            <comp.Profile
              img={avatar}
              name={name}
              description={description}
            />

            <main className="w-full flex flex-col gap-10 p-4 items-center justify-center">
              {renderedBlocks}
            </main>

            <comp.Footer hasMapCard={hasMapCard} />
          </div>
        </div>
      </body>
    </html>
  );
}
