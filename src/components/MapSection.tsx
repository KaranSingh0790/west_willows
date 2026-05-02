"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Coordinates for West Willows (placeholder - Coorg, Karnataka)
const LAT = 12.3375;
const LNG = 75.8069;

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || !isMounted) return;

      // If already initialized, destroy and recreate
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [LAT, LNG],
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // CartoDB Dark Matter tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Custom gold marker
      const goldMarker = L.divIcon({
        html: `
          <div style="
            width: 16px; height: 16px;
            background: #C5A880;
            border: 3px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 0 4px rgba(197,168,128,0.3), 0 4px 20px rgba(0,0,0,0.5);
          "></div>
        `,
        className: "",
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([LAT, LNG], { icon: goldMarker })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: serif; font-size: 14px; color: #1A1A1A; padding: 4px 8px;">
            <strong>West Willows</strong><br/>
            <span style="font-size: 11px; color: #888; font-family: sans-serif;">Private Luxury Villa</span>
          </div>`,
          { className: "ww-popup" }
        );

      // Add zoom controls (custom position)
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.attribution({ position: "bottomleft" }).addTo(map);
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="location" className="bg-charcoal text-cream py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <motion.p
              className="text-gold uppercase tracking-[0.3em] text-xs mb-4 font-light"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Find Us
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-serif"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              The Estate Location
            </motion.h2>
          </div>
          <motion.p
            className="text-cream/50 text-sm font-light max-w-xs mt-4 md:mt-0 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nestled in the Western Ghats, surrounded by coffee estates and untouched wilderness.
          </motion.p>
        </div>

        {/* Map */}
        <motion.div
          className="relative w-full h-[400px] md:h-[520px] overflow-hidden rounded-sm border border-white/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div ref={mapRef} className="w-full h-full" />
          <style>{`
            .leaflet-container { background: #1A1A1A !important; }
            .ww-popup .leaflet-popup-content-wrapper {
              border-radius: 2px !important;
              box-shadow: 0 8px 40px rgba(0,0,0,0.4) !important;
            }
            .leaflet-popup-tip { display: none !important; }
            .leaflet-control-zoom a {
              background: #1A1A1A !important;
              color: #C5A880 !important;
              border: 1px solid rgba(255,255,255,0.1) !important;
            }
            .leaflet-control-zoom a:hover {
              background: #C5A880 !important;
              color: white !important;
            }
            .leaflet-control-attribution {
              background: rgba(0,0,0,0.5) !important;
              color: rgba(255,255,255,0.3) !important;
              font-size: 10px !important;
            }
            .leaflet-control-attribution a { color: rgba(255,255,255,0.5) !important; }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
