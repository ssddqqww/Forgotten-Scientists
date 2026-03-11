"use client";

import dynamic from "next/dynamic";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";

import { scientists as rawScientists } from "../../../../data/scientists";

// react-leaflet dynamic imports
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

type Scientist = {
  id: number;
  name: string;
  field: string;
  country: string;
  image: string;
  location: string;
  description: string;
  century?: string | number;
  lat?: number;
  lng?: number;
};

export default function MapForgottenScientist() {
  const [scientists, setScientists] = useState<Scientist[]>([]);
  const [loadingGeo, setLoadingGeo] = useState(true);

  const [query, setQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState<string | null>(null);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [centuryFilter, setCenturyFilter] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // =====================================================
  // AUTO-GEOCODE USING NOMINATIM
  // =====================================================
  useEffect(() => {
    async function geocodeAll() {
      const results: Scientist[] = [];

      for (const s of rawScientists as Scientist[]) {
        if (s.lat && s.lng) {
          results.push(s);
          continue;
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          s.location
        )}`;

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (data?.[0]) {
            results.push({
              ...s,
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            });
          } else {
            results.push({ ...s, lat: 0, lng: 0 });
          }
        } catch {
          results.push({ ...s, lat: 0, lng: 0 });
        }
      }

      setScientists(results);
      setLoadingGeo(false);
    }

    geocodeAll();
  }, []);

  // =====================================================
  // FILTER OPTIONS
  // =====================================================
  const fields = useMemo(() => Array.from(new Set(scientists.map((s) => s.field))), [scientists]);
  const countries = useMemo(() => Array.from(new Set(scientists.map((s) => s.country))), [scientists]);
  const centuries = useMemo(
    () => Array.from(new Set(scientists.map((s) => (s.century ? String(s.century) : "Unknown")))),
    [scientists]
  );

  // =====================================================
  // APPLY FILTERS + SEARCH
  // =====================================================
  const filtered = useMemo(() => {
    return scientists.filter((s) => {
      if (!s.lat || !s.lng) return false;

      if (query && !s.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (fieldFilter && s.field !== fieldFilter) return false;
      if (countryFilter && s.country !== countryFilter) return false;
      if (centuryFilter && String(s.century ?? "Unknown") !== centuryFilter) return false;

      return true;
    });
  }, [scientists, query, fieldFilter, countryFilter, centuryFilter]);

  // =====================================================
  // CREATE ICON (only on client!)
  // =====================================================
  const createIcon = (img: string) => {
    if (typeof window === "undefined") return null; // не створюємо на сервері
    return L.icon({
      iconUrl: img,
      iconSize: [52, 52],
      iconAnchor: [26, 52],
      className: "custom-marker",
    });
  };

  const center: [number, number] = [20, 0];

  if (loadingGeo)
    return (
      <div className="flex items-center justify-center h-96 text-lg font-semibold">
        Geocoding scientist locations...
      </div>
    );

  // =====================================================
  // RENDER MAP
  // =====================================================
  return (
    <section className="pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold">Map of Forgotten Scientists</h1>
            <p className="text-gray-600">Discover science across the world</p>
          </div>

          {/* SEARCH + TOGGLES */}
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search scientist..."
              className="px-4 py-2 rounded-full border shadow-sm w-56"
            />
          </div>
        </div>

        {/* MAP WRAPPER */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">

          {/* LEFT FILTER PANEL */}
          <aside className="absolute left-4 top-4 z-[1000] bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Filters</h3>

            <div className="flex flex-col gap-2 text-sm">
              <select
                className="px-3 py-2 rounded-md border"
                value={fieldFilter ?? ""}
                onChange={(e) => setFieldFilter(e.target.value || null)}
              >
                <option value="">All Fields</option>
                {fields.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 rounded-md border"
                value={countryFilter ?? ""}
                onChange={(e) => setCountryFilter(e.target.value || null)}
              >
                <option value="">All Countries</option>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 rounded-md border"
                value={centuryFilter ?? ""}
                onChange={(e) => setCenturyFilter(e.target.value || null)}
              >
                <option value="">All Centuries</option>
                {centuries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setFieldFilter(null);
                  setCountryFilter(null);
                  setCenturyFilter(null);
                }}
                className="mt-2 px-3 py-1 bg-gray-100 rounded-md"
              >
                Reset
              </button>
            </div>
          </aside>

          {/* MAP */}
          <div className="min-h-[620px] w-full">
            <MapContainer
              center={center}
              zoom={2}
              minZoom={2}
              scrollWheelZoom
              className="h-[620px] w-full"
              whenReady={() => setMapLoaded(true)}
            >
              <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
              />

               { filtered.map((s) => (
                  <Marker
                    key={s.id}
                    position={[s.lat!, s.lng!]}
                    icon={createIcon(s.image) || undefined} // <-- без server-side помилки
                    eventHandlers={{
                      mouseover: () => setHoverId(s.id),
                      mouseout: () => setHoverId(null),
                    }}
                  >
                    <Popup>
                      <div className="text-center w-40">
                        <img src={s.image} className="h-16 w-16 rounded-full mx-auto mb-2" />
                        <h3 className="font-bold">{s.name}</h3>
                        <p className="text-sm text-gray-600">{s.field}</p>
                        <p className="text-xs text-gray-500 mt-1">{s.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}