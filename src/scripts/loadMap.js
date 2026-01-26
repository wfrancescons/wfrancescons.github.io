const mapCards = document.querySelectorAll("[data-map-id]");

mapCards.forEach((mapEl) => {
  const mapInfos = JSON.parse(mapEl.getAttribute("data-map-infos"));

  const map = new maplibregl.Map({
    container: mapEl,
    style: "/map-style.json",
    center: mapInfos.center,
    zoom: mapInfos.zoom,
    interactive: false,
    attributionControl: false,
  });

  map.on("load", () => {
    addFakeUserLocation(map, mapInfos.center, {
      size: 125,
      pulseDuration: 1250,
      pulseDelay: 2000,
      innerColor: "rgba(2, 132, 199, 1)",
      outerColor: "rgba(2, 132, 199, 1)",
      strokeColor: "#ffffff",
      strokeWidth: 5,
    });
  });
});

function createPulsingDot(map, options) {
  const {
    size,
    pulseDuration,
    pulseDelay,
    innerColor,
    outerColor,
    strokeColor,
    strokeWidth,
  } = options;

  const cycleDuration = pulseDuration + pulseDelay;

  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd() {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;

      this.context = canvas.getContext("2d", {
        willReadFrequently: true,
      });
    },

    render() {
      const now = performance.now();
      const cycleTime = now % cycleDuration;

      const ctx = this.context;
      ctx.clearRect(0, 0, this.width, this.height);

      const center = this.width / 2;
      const baseRadius = center * 0.3;

      if (cycleTime < pulseDuration) {
        const maxAlpha = 0.5;
        const t = cycleTime / pulseDuration;
        const outerRadius = baseRadius + center * 0.7 * t;

        ctx.beginPath();
        ctx.arc(center, center, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerColor.replace("1)", `${(1 - t) * maxAlpha})`);
        ctx.fill();
      }

      // Pin shadow
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      ctx.beginPath();
      ctx.arc(center, center, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth + 0.5;
      ctx.lineJoin = "round";
      ctx.fill();
      ctx.stroke();

      this.data = ctx.getImageData(0, 0, this.width, this.height).data;
      map.triggerRepaint();
      return true;
    },
  };
}

function addFakeUserLocation(map, lngLat, options) {
  const imageId = `pulsing-dot-${Math.random().toString(36).slice(2)}`;
  const sourceId = `fake-user-location-${imageId}`;

  const pulsingDot = createPulsingDot(map, options);

  map.addImage(imageId, pulsingDot, { pixelRatio: 2 });

  map.addSource(sourceId, {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: lngLat,
      },
    },
  });

  map.addLayer({
    id: sourceId,
    type: "symbol",
    source: sourceId,
    layout: {
      "icon-image": imageId,
      "icon-allow-overlap": true,
    },
  }, "label_city");
}
