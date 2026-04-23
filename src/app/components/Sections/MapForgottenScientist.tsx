
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { scientists as rawScientists } from "../../../../data/scientists.js";

// React-Leaflet dynamic imports
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

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
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  // Динамічний імпорт Leaflet на клієнті
  useEffect(() => {
    import("leaflet").then((Leaflet) => setL(Leaflet));
  }, []);

  // AUTO-GEOCODE
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
          const res = await fetch(url, {
            headers: { "User-Agent": "forgotten-scientists-app" },
          });
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

  const fields = useMemo(
    () => Array.from(new Set(scientists.map((s) => s.field))),
    [scientists]
  );
  const countries = useMemo(
    () => Array.from(new Set(scientists.map((s) => s.country))),
    [scientists]
  );
  const centuries = useMemo(
    () =>
      Array.from(
        new Set(
          scientists.map((s) => (s.century ? String(s.century) : "Unknown"))
        )
      ),
    [scientists]
  );

  const filtered = useMemo(() => {
    return scientists.filter((s) => {
      if (!s.lat || !s.lng) return false;
      if (query && !s.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (fieldFilter && s.field !== fieldFilter) return false;
      if (countryFilter && s.country !== countryFilter) return false;
      if (centuryFilter && String(s.century ?? "Unknown") !== centuryFilter)
        return false;
      return true;
    });
  }, [scientists, query, fieldFilter, countryFilter, centuryFilter]);

  const createIcon = (img: string) => {
    if (!L) return undefined;
    return L.icon({
      iconUrl: img,
      iconSize: [52, 52],
      iconAnchor: [26, 52],
      className: "custom-marker",
    });
  };

  const center: [number, number] = [20, 0];

  if (loadingGeo || !L)
    return (
      <div className="flex items-center justify-center h-96 text-lg font-semibold">
        Geocoding scientist locations...
      </div>
    );

  return (
    <section id="map" className="scroll-mt-24 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold">Map of Forgotten Scientists</h1>
            <p className="text-gray-600">Discover science across the world</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search scientist..."
              className="px-4 py-2 rounded-full border shadow-sm w-56"
            />
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <aside className="absolute left-4 top-4 z-[1000] bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Filters</h3>
            <div className="flex flex-col gap-2 text-sm">
              <select
                className="px-3 py-2 rounded-md border"
                value={fieldFilter ?? ""}
                onChange={(e) =>
                  setFieldFilter(e.target.value || null)
                }
              >
                <option value="">All Fields</option>
                {fields.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 rounded-md border"
                value={countryFilter ?? ""}
                onChange={(e) =>
                  setCountryFilter(e.target.value || null)
                }
              >
                <option value="">All Countries</option>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 rounded-md border"
                value={centuryFilter ?? ""}
                onChange={(e) =>
                  setCenturyFilter(e.target.value || null)
                }
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

          <div className="min-h-[620px] w-full">
            <MapContainer
              center={center}
              zoom={2}
              minZoom={2}
              scrollWheelZoom
              className="h-[620px] w-full"
            >
              <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />

              {filtered.map((s) => (
                <Marker
                  key={s.id}
                  position={[s.lat!, s.lng!]}
                  icon={createIcon(s.image)}
                >
                  <Popup>
                    <div className="text-center w-40">
                      <Image
                        src={s.image}
                        alt={s.name}
                        width={64}
                        height={64}
                        className="rounded-full mx-auto mb-2"
                      />
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
