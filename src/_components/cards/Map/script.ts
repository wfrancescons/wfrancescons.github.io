declare const maplibregl: any;

function createElement(tag: string, className: string) {
  const e = document.createElement(tag);
  e.className = className;
  return e;
}

function addFakeUserLocationHTML(map: any, lngLat: [number, number]) {
  const container = createElement(
    "div",
    "relative w-14 h-14 pointer-events-none",
  );

  const pulse = createElement(
    "div",
    `
    absolute inset-0
    rounded-full
    bg-blue-400/40
    animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]
  `,
  );

  const dot = createElement(
    "div",
    `
    absolute left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2
    w-6 h-6
    rounded-full
    bg-blue-400
    ring-4 ring-white
    drop-shadow-lg/30
    z-10
  `,
  );

  container.append(pulse, dot);

  new maplibregl.Marker({
    element: container,
    anchor: "center",
  })
    .setLngLat(lngLat)
    .addTo(map);
}

document.querySelectorAll("[data-map-infos]").forEach((mapEl) => {
  const mapInfos = JSON.parse(mapEl.getAttribute("data-map-infos")!);
  const mapPlaceholder = mapEl.parentElement?.querySelector<HTMLElement>(
    "[data-map-placeholder]",
  );

  const map = new maplibregl.Map({
    container: mapEl,
    style: "/map-style.json",
    center: mapInfos.center,
    zoom: mapInfos.zoom,
    interactive: false,
    attributionControl: false,
  });

  map.on("load", () => {
    addFakeUserLocationHTML(map, mapInfos.center);

    if (mapPlaceholder) {
      mapPlaceholder.style.opacity = "0";
    }
  });
});
