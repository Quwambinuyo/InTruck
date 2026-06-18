import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapMarker = {
  id: string;
  coords: [number, number];
  color: string;
  label: string;
  sublabel?: string;
  active?: boolean;
  onClick?: () => void;
};

type MapViewProps = {
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
  pickupLabel?: string;
  dropoffLabel?: string;
  progress?: number;
  showTruck?: boolean;
  height?: number;
  className?: string;
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
};

const RASTER_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "carto-tiles",
      type: "raster",
      source: "carto",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const createPinEl = (type: "pickup" | "dropoff") => {
  const el = document.createElement("div");
  el.style.cssText = `
    width: 14px;
    height: 14px;
    border-radius: ${type === "pickup" ? "50%" : "3px"};
    background: ${type === "pickup" ? "#000" : "rgba(0,0,0,0.4)"};
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px ${type === "pickup" ? "#000" : "rgba(0,0,0,0.4)"};
    cursor: pointer;
  `;
  return el;
};

const createTruckEl = () => {
  const el = document.createElement("div");
  el.style.cssText = `
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.35);
  `;
  el.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  `;
  return el;
};

const createCustomMarkerEl = (color: string, active: boolean) => {
  const size = active ? 44 : 36;
  const pinH = active ? 54 : 44;
  const r = active ? 11 : 9;
  const cx = size / 2;
  const el = document.createElement("div");
  el.style.cssText = `width:${size}px;height:${pinH}px;cursor:pointer;`;
  el.innerHTML = `
    <svg width="${size}" height="${pinH}" viewBox="0 0 ${size} ${pinH}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="${cx}" cy="${pinH - 2}" rx="${active ? 7 : 6}" ry="2" fill="rgba(0,0,0,0.18)"/>
      <path d="M${cx} 0C${cx - 9.94} 0 0 ${cx - 9.94} 0 ${cx}c0 ${active ? 14.7 : 12} ${cx} ${active ? 32 : 26} ${cx} ${active ? 32 : 26}S${size} ${active ? 37 : 30} ${size} ${cx}C${size} ${cx - 9.94} ${cx + 9.94} 0 ${cx} 0z" fill="${color}"/>
      ${active ? `<circle cx="${cx}" cy="${cx}" r="${r + 3}" fill="white" opacity="0.25"/>` : ""}
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="white" opacity="0.9"/>
    </svg>
  `;
  return el;
};

const MapView = ({
  pickupCoords,
  dropoffCoords,
  pickupLabel,
  dropoffLabel,
  progress = 0,
  showTruck = false,
  height = 280,
  className = "",
  markers,
  center,
  zoom,
}: MapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const isMarkersMode = markers && markers.length > 0;

    const defaultCenter: [number, number] = center
      ? [center[1], center[0]]
      : isMarkersMode
        ? [8.6753, 9.082]
        : pickupCoords && dropoffCoords
          ? [
              (pickupCoords[1] + dropoffCoords[1]) / 2,
              (pickupCoords[0] + dropoffCoords[0]) / 2,
            ]
          : [8.6753, 9.082];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: RASTER_STYLE,
      center: defaultCenter,
      zoom: zoom ?? (isMarkersMode ? 6 : 10),
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left",
    );

    map.on("load", () => {
      if (isMarkersMode) {
        markers.forEach((m) => {
          const el = createCustomMarkerEl(m.color, m.active ?? false);
          const popup = new maplibregl.Popup({
            offset: [0, -(m.active ? 54 : 44)],
            closeButton: false,
          }).setHTML(
            `<div style="font-size:12px;font-weight:700;color:#000">${m.label}</div>
             ${m.sublabel ? `<div style="font-size:11px;color:#888">${m.sublabel}</div>` : ""}`,
          );
          const marker = new maplibregl.Marker({
            element: el,
            anchor: "bottom",
          })
            .setLngLat([m.coords[1], m.coords[0]])
            .setPopup(popup)
            .addTo(map);
          if (m.onClick) {
            el.addEventListener("click", m.onClick);
          }
          el.addEventListener("mouseenter", () =>
            marker.getPopup()?.addTo(map),
          );
          el.addEventListener("mouseleave", () => marker.getPopup()?.remove());
        });
        return;
      }

      if (!pickupCoords || !dropoffCoords) return;

      const pickupLat = pickupCoords[0];
      const pickupLng = pickupCoords[1];
      const dropoffLat = dropoffCoords[0];
      const dropoffLng = dropoffCoords[1];
      const midLat = pickupLat + (dropoffLat - pickupLat) * (progress / 100);
      const midLng = pickupLng + (dropoffLng - pickupLng) * (progress / 100);

      map.addSource("route-full", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [pickupLng, pickupLat],
              [dropoffLng, dropoffLat],
            ],
          },
        },
      });

      map.addLayer({
        id: "route-dashed",
        type: "line",
        source: "route-full",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#000",
          "line-width": 2,
          "line-opacity": 0.2,
          "line-dasharray": [2, 2],
        },
      });

      map.addSource("route-progress", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [pickupLng, pickupLat],
              [midLng, midLat],
            ],
          },
        },
      });

      map.addLayer({
        id: "route-progress-line",
        type: "line",
        source: "route-progress",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#000",
          "line-width": 3,
          "line-opacity": 0.9,
        },
      });

      new maplibregl.Marker({ element: createPinEl("pickup") })
        .setLngLat([pickupLng, pickupLat])
        .setPopup(
          new maplibregl.Popup({ offset: 12 }).setHTML(
            `<p style="font-size:12px;font-weight:600;margin:0">${pickupLabel}</p>
             <p style="font-size:11px;color:#888;margin:2px 0 0">Pickup</p>`,
          ),
        )
        .addTo(map);

      new maplibregl.Marker({ element: createPinEl("dropoff") })
        .setLngLat([dropoffLng, dropoffLat])
        .setPopup(
          new maplibregl.Popup({ offset: 12 }).setHTML(
            `<p style="font-size:12px;font-weight:600;margin:0">${dropoffLabel}</p>
             <p style="font-size:11px;color:#888;margin:2px 0 0">Drop-off</p>`,
          ),
        )
        .addTo(map);

      if (showTruck) {
        new maplibregl.Marker({ element: createTruckEl() })
          .setLngLat([midLng, midLat])
          .addTo(map);
      }

      const latPad = Math.abs(dropoffLat - pickupLat) * 0.3;
      const lngPad = Math.abs(dropoffLng - pickupLng) * 0.3;

      map.fitBounds(
        [
          [
            Math.min(pickupLng, dropoffLng) - lngPad,
            Math.min(pickupLat, dropoffLat) - latPad,
          ],
          [
            Math.max(pickupLng, dropoffLng) + lngPad,
            Math.max(pickupLat, dropoffLat) + latPad,
          ],
        ],
        { animate: true, duration: 800 },
      );
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [
    pickupCoords,
    dropoffCoords,
    pickupLabel,
    dropoffLabel,
    progress,
    showTruck,
    markers,
    center,
    zoom,
  ]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full ${className}`}
      style={{ height }}
    />
  );
};

export default MapView;
