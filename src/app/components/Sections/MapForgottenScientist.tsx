
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { scientistMapLocations } from "../../../../data/scientistMapLocations";
import { scientists } from "../../../../data/scientistsData";

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
  location: string;
  century: string;
  whatOpened: string;
  shortBio: string;
  image?: string;
  mapLabel: string;
  lat: number;
  lng: number;
};

type ScientistGroup = {
  key: string;
  lat: number;
  lng: number;
  label: string;
  scientists: Scientist[];
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

const mapLocationById = new Map(scientistMapLocations.map((location) => [location.id, location]));

export default function MapForgottenScientist() {
  const [query, setQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState<string | null>(null);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [centuryFilter, setCenturyFilter] = useState<string | null>(null);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  // Динамічний імпорт Leaflet на клієнті
  useEffect(() => {
    import("leaflet").then((Leaflet) => setL(Leaflet));
  }, []);

  const mappedScientists = useMemo<Scientist[]>(() => {
    return scientists.flatMap((scientist) => {
      const mapLocation = mapLocationById.get(scientist.id);
      if (!mapLocation) return [];

      return [
        {
          ...scientist,
          mapLabel: mapLocation.label,
          lat: mapLocation.lat,
          lng: mapLocation.lng,
        },
      ];
    });
  }, []);

  const fields = useMemo(
    () => Array.from(new Set(mappedScientists.map((s) => s.field))).sort((a, b) => a.localeCompare(b)),
    [mappedScientists]
  );
  const countries = useMemo(
    () => Array.from(new Set(mappedScientists.map((s) => s.country))).sort((a, b) => a.localeCompare(b)),
    [mappedScientists]
  );
  const centuries = useMemo(
    () =>
      Array.from(
        new Set(
          mappedScientists.map((s) => (s.century ? String(s.century) : "Unknown"))
        )
      ).sort((a, b) => a.localeCompare(b)),
    [mappedScientists]
  );

  const filtered = useMemo(() => {
    const search = normalize(query);

    return mappedScientists.filter((s) => {
      if (search) {
        const searchable = normalize(
          [s.name, s.field, s.country, s.location, s.mapLabel, s.century, s.whatOpened].join(" ")
        );
        if (!searchable.includes(search)) return false;
      }
      if (fieldFilter && s.field !== fieldFilter) return false;
      if (countryFilter && s.country !== countryFilter) return false;
      if (centuryFilter && String(s.century ?? "Unknown") !== centuryFilter)
        return false;
      return true;
    });
  }, [mappedScientists, query, fieldFilter, countryFilter, centuryFilter]);

  const groupedScientists = useMemo<ScientistGroup[]>(() => {
    const groups = new Map<string, ScientistGroup>();

    filtered.forEach((scientist) => {
      const key = `${scientist.lat.toFixed(4)},${scientist.lng.toFixed(4)}`;
      const group = groups.get(key);

      if (group) {
        group.scientists.push(scientist);
      } else {
        groups.set(key, {
          key,
          lat: scientist.lat,
          lng: scientist.lng,
          label: scientist.mapLabel,
          scientists: [scientist],
        });
      }
    });

    return Array.from(groups.values());
  }, [filtered]);

  const createIcon = (group: ScientistGroup) => {
    if (!L) return undefined;
    const count = group.scientists.length;
    const label = count > 1 ? String(count) : group.scientists[0].name.slice(0, 1);

    return L.divIcon({
      html: `<div style="display:grid;place-items:center;width:42px;height:42px;border-radius:9999px;background:#000;color:#fff;border:3px solid #dbeafe;box-shadow:0 10px 22px rgba(0,0,0,.22);font-weight:800;font-size:${count > 1 ? "15px" : "18px"};">${label}</div>`,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -18],
      className: "",
    });
  };

  const center: [number, number] = [20, 0];

  if (!L)
    return (
      <div className="flex items-center justify-center h-96 text-lg font-semibold">
        Loading scientist map...
      </div>
    );

  return (
    <section id="map" className="scroll-mt-24 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold">Map of Forgotten Scientists</h1>
            <p className="text-gray-600">
              {filtered.length} of {mappedScientists.length} scientists shown from verified profile locations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, field, country..."
              className="px-4 py-2 rounded-full border shadow-sm w-56"
            />
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <aside className="absolute left-4 top-4 z-[1000] bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-1">Filters</h3>
            <p className="mb-3 text-xs text-gray-600">
              {groupedScientists.length} map points
            </p>
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
                  setQuery("");
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

              {groupedScientists.map((group) => (
                <Marker
                  key={group.key}
                  position={[group.lat, group.lng]}
                  icon={createIcon(group)}
                >
                  <Popup>
                    <div className="max-h-72 w-64 overflow-y-auto pr-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {group.label}
                      </p>
                      <div className="space-y-3">
                        {group.scientists.map((scientist) => (
                          <div key={scientist.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                            <h3 className="font-bold leading-tight">{scientist.name}</h3>
                            <p className="mt-1 text-sm text-gray-700">{scientist.field}</p>
                            <p className="mt-1 text-xs text-gray-500">{scientist.location}</p>
                            <a
                              href={`/scientists/${scientist.id}`}
                              className="mt-2 inline-block rounded-md bg-black px-3 py-1 text-xs font-semibold text-white"
                            >
                              Open profile
                            </a>
                          </div>
                        ))}
                      </div>
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
