
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
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
  const [openMenu, setOpenMenu] = useState<"field" | "country" | "century" | null>(null);
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
  const hasActiveFilters = Boolean(query || fieldFilter || countryFilter || centuryFilter);
  const filterButtonClass =
    "flex w-full items-center justify-between gap-3 rounded-full border border-gray-300 px-4 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-50 md:w-auto md:justify-start md:rounded-none md:border-0 md:py-2 md:pl-0 md:pr-6 md:hover:bg-transparent md:hover:text-gray-600";
  const filterDividerClass = "relative min-w-0 md:pr-6 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-12 md:after:w-px md:after:-translate-y-1/2 md:after:bg-gray-900";
  const dropdownClass =
    "absolute left-0 top-full z-[1100] mt-3 max-h-72 w-full min-w-0 overflow-y-auto rounded-xl border border-gray-300 bg-white py-2 shadow-xl md:w-auto md:min-w-56 md:rounded-none";
  const optionClass =
    "block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100";

  const handleFilterChange = (
    setter: (value: string | null) => void,
    value: string
  ) => {
    setter(value || null);
    setOpenMenu(null);
  };

  if (!L)
    return (
      <section id="map" className="pb-4">
        <div className="flex h-96 items-center justify-center text-lg font-semibold">
          Loading scientist map...
        </div>
      </section>
    );

  return (
    <section id="map" className="pb-4">
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Global archive</p>
            <h1 className="text-[2.3rem] font-bold leading-[1.02] sm:text-5xl">Map of Forgotten Scientists</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 md:mt-0">
              {filtered.length} of {mappedScientists.length} scientists shown from verified profile locations
            </p>
          </div>
          <div className="w-full md:w-auto md:pb-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, field, country..."
              className="h-12 w-full rounded-full border border-gray-900 bg-white px-5 text-sm shadow-sm outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-black/10 sm:w-96"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 text-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:gap-6">
            <div className={`relative ${filterDividerClass}`}>
              <button
                type="button"
                className={filterButtonClass}
                onClick={() => setOpenMenu(openMenu === "field" ? null : "field")}
              >
                <Image src="/icons/Atom_light.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                <span>{fieldFilter ?? "By Field"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openMenu === "field" && (
                <div className={dropdownClass}>
                  <button type="button" className={optionClass} onClick={() => handleFilterChange(setFieldFilter, "")}>
                    All Fields
                  </button>
                  {fields.map((field) => (
                    <button
                      key={field}
                      type="button"
                      className={optionClass}
                      onClick={() => handleFilterChange(setFieldFilter, field)}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`relative ${filterDividerClass}`}>
              <button
                type="button"
                className={filterButtonClass}
                onClick={() => setOpenMenu(openMenu === "country" ? null : "country")}
              >
                <Image src="/icons/Map.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                <span>{countryFilter ?? "By Country"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openMenu === "country" && (
                <div className={dropdownClass}>
                  <button type="button" className={optionClass} onClick={() => handleFilterChange(setCountryFilter, "")}>
                    All Countries
                  </button>
                  {countries.map((country) => (
                    <button
                      key={country}
                      type="button"
                      className={optionClass}
                      onClick={() => handleFilterChange(setCountryFilter, country)}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-w-0">
              <button
                type="button"
                className={filterButtonClass}
                onClick={() => setOpenMenu(openMenu === "century" ? null : "century")}
              >
                <Image src="/icons/Watch.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                <span>{centuryFilter ?? "By Century"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openMenu === "century" && (
                <div className={dropdownClass}>
                  <button type="button" className={optionClass} onClick={() => handleFilterChange(setCenturyFilter, "")}>
                    All Centuries
                  </button>
                  {centuries.map((century) => (
                    <button
                      key={century}
                      type="button"
                      className={optionClass}
                      onClick={() => handleFilterChange(setCenturyFilter, century)}
                    >
                      {century}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFieldFilter(null);
                  setCountryFilter(null);
                  setCenturyFilter(null);
                  setOpenMenu(null);
                }}
                className="rounded-full border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 sm:col-span-3 md:rounded-none md:py-2"
              >
                Clear filters
              </button>
            )}
          </div>

          <p className="text-sm text-gray-600">
            Showing {groupedScientists.length} map points
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="min-h-[420px] w-full sm:min-h-[620px]">
            <MapContainer
              center={center}
              zoom={2}
              minZoom={2}
              scrollWheelZoom
              className="h-[420px] w-full sm:h-[620px]"
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
                              href={`/scientists/${scientist.id}?from=map`}
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
