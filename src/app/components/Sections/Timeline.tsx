"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { scientists, type Scientist } from "../../../../data/scientistsData";

type TimelineScientist = Scientist & {
    timelineYear: number | null;
};

function makePreview(text: string, maxWords = 42) {
    const words = text.split(/\s+/);

    if (words.length <= maxWords) {
        return text;
    }

    return `${words.slice(0, maxWords).join(" ")}...`;
}

function extractBirthYear(century: string) {
    const match = century.match(/(\d{3,4})\s*-/);
    return match ? Number(match[1]) : null;
}

function extractTimelineYear(scientist: Scientist) {
    const exactYearMatch = scientist.whatOpened.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
    if (exactYearMatch) {
        return Number(exactYearMatch[1]);
    }

    const birthYear = extractBirthYear(scientist.century);
    const longBioYears = Array.from(
        scientist.longBio.matchAll(/\b(1[0-9]{3}|20[0-9]{2})\b/g),
        (match) => Number(match[1])
    );

    if (birthYear) {
        const likelyAchievementYear = longBioYears.find((year) => year >= birthYear + 20);
        if (likelyAchievementYear) {
            return likelyAchievementYear;
        }
    }

    return longBioYears[0] ?? birthYear;
}

export default function Timeline() {
    const [fieldFilter, setFieldFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [centuryFilter, setCenturyFilter] = useState("");
    const [openMenu, setOpenMenu] = useState<"field" | "country" | "century" | null>(null);
    const [markerStart, setMarkerStart] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const fields = useMemo(() => Array.from(new Set(scientists.map((item) => item.field))), []);
    const countries = useMemo(() => Array.from(new Set(scientists.map((item) => item.country))), []);
    const centuries = useMemo(() => Array.from(new Set(scientists.map((item) => item.century))), []);

    const filteredScientists = useMemo<TimelineScientist[]>(() => {
        const filtered = scientists.filter((item) => {
            if (fieldFilter && item.field !== fieldFilter) return false;
            if (countryFilter && item.country !== countryFilter) return false;
            if (centuryFilter && item.century !== centuryFilter) return false;
            return true;
        });

        return filtered
            .map((scientist) => ({
                ...scientist,
                timelineYear: extractTimelineYear(scientist),
            }))
            .sort((a, b) => {
                if (a.timelineYear === undefined || a.timelineYear === null) return 1;
                if (b.timelineYear === undefined || b.timelineYear === null) return -1;
                return a.timelineYear - b.timelineYear;
            });
    }, [fieldFilter, countryFilter, centuryFilter]);

    const maxMarkerStart = Math.max(filteredScientists.length - 5, 0);
    const timelineMarkers = filteredScientists.slice(markerStart, markerStart + 5);
    const selectedScientist = filteredScientists[selectedIndex] ?? null;
    const selectedPosition = selectedIndex + 1;

    useEffect(() => {
        setMarkerStart(0);
        setSelectedIndex(0);
    }, [fieldFilter, countryFilter, centuryFilter]);

    const handleFilterChange = (
        setter: React.Dispatch<React.SetStateAction<string>>,
        value: string
    ) => {
        setter(value);
        setOpenMenu(null);
    };

    const filterButtonClass =
        "flex items-center gap-2 pr-4 py-2 border-r cursor-pointer select-none";

    const dropdownClass =
        "absolute left-0 top-full z-20 mt-2 min-w-[220px] border border-gray-300 bg-white shadow-lg";

    const optionClass =
        "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100";

    const handlePreviousMarker = () => {
        const nextStart = Math.max(markerStart - 1, 0);
        setMarkerStart(nextStart);
        setSelectedIndex(nextStart);
    };

    const handleNextMarker = () => {
        const nextStart = Math.min(markerStart + 1, maxMarkerStart);
        setMarkerStart(nextStart);
        setSelectedIndex(Math.min(nextStart + 4, filteredScientists.length - 1));
    };

    return (
        <section id="timeline" className="scroll-mt-24 pt-20 pb-40">
            <div className="text-start">
                <h2 className="mb-2 text-5xl font-bold">Timeline of Forgotten Scientists</h2>
                <p className="mb-6 max-w-4xl text-gray-600">
                    Move through scientists across centuries. The year is the best available timeline anchor from each profile, while the card highlights what they are remembered for.
                </p>

                <div className="mb-8 grid gap-4 border-y border-gray-200 py-4 text-sm text-gray-700 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                            <p className="font-semibold text-gray-900">Browse</p>
                            <p>Use arrows to move through the timeline.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Select</p>
                            <p>Click a year to focus one scientist.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Open</p>
                            <p>Read the full profile for sources and context.</p>
                        </div>
                    </div>
                    <p className="text-xs uppercase text-gray-500">
                        {filteredScientists.length} visible of {scientists.length} profiles
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-4 text-sm">
                    <div className="relative">
                        <button
                            type="button"
                            className={filterButtonClass}
                            onClick={() => setOpenMenu(openMenu === "field" ? null : "field")}
                        >
                            <Image src="/icons/Atom_light.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                            By Field
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {openMenu === "field" && (
                            <div className={dropdownClass}>
                                <button type="button" className={optionClass} onClick={() => handleFilterChange(setFieldFilter, "")}>
                                    All
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

                    <div className="relative">
                        <button
                            type="button"
                            className={filterButtonClass}
                            onClick={() => setOpenMenu(openMenu === "country" ? null : "country")}
                        >
                            <Image src="/icons/Map.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                            By Country
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {openMenu === "country" && (
                            <div className={dropdownClass}>
                                <button type="button" className={optionClass} onClick={() => handleFilterChange(setCountryFilter, "")}>
                                    All
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

                    <div className="relative">
                        <button
                            type="button"
                            className="flex cursor-pointer select-none items-center gap-2 py-2 pr-4"
                            onClick={() => setOpenMenu(openMenu === "century" ? null : "century")}
                        >
                            <Image src="/icons/Watch.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                            By Century
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {openMenu === "century" && (
                            <div className={dropdownClass}>
                                <button type="button" className={optionClass} onClick={() => handleFilterChange(setCenturyFilter, "")}>
                                    All
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

                    {(fieldFilter || countryFilter || centuryFilter) && (
                        <button
                            type="button"
                            onClick={() => {
                                setFieldFilter("");
                                setCountryFilter("");
                                setCenturyFilter("");
                                setOpenMenu(null);
                            }}
                            className="border px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {timelineMarkers.length > 0 && selectedScientist ? (
                    <>
                        <div className="relative mb-10 mt-12">
                            <div className="mb-3 flex items-center justify-between gap-4 text-sm text-gray-600">
                                <span>
                                    Showing {markerStart + 1}-{Math.min(markerStart + timelineMarkers.length, filteredScientists.length)} of {filteredScientists.length}
                                </span>
                                {selectedScientist && (
                                    <span>
                                        Focus: {selectedPosition} / {filteredScientists.length}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handlePreviousMarker}
                                    disabled={markerStart === 0}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35"
                                    aria-label="Previous timeline dates"
                                >
                                    <ChevronLeft size={22} />
                                </button>

                                <div className="relative min-h-24 flex-1 px-2">
                                    <div className="absolute left-0 right-0 top-12 border-t-4 border-gray-900"></div>
                                    <div className="absolute right-0 top-[42px] h-5 w-5 rotate-45 border-r-4 border-t-4 border-gray-900"></div>

                                    <div
                                        className="relative z-10 grid min-h-24 items-start"
                                        style={{ gridTemplateColumns: `repeat(${timelineMarkers.length}, minmax(0, 1fr))` }}
                                    >
                                        {timelineMarkers.map((item, index) => {
                                            const globalIndex = markerStart + index;
                                            const isSelected = globalIndex === selectedIndex;

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setSelectedIndex(globalIndex)}
                                                    className="group flex flex-col items-center text-center"
                                                >
                                                    <span className={`mb-4 text-lg font-bold ${isSelected ? "text-black" : "text-gray-700"}`}>
                                                        {item.timelineYear ?? item.century}
                                                    </span>
                                                    <span
                                                        className={`h-8 w-8 rounded-full border-2 transition ${
                                                            isSelected
                                                                ? "border-black bg-black"
                                                                : "border-gray-700 bg-gray-100 group-hover:bg-gray-200"
                                                        }`}
                                                    ></span>
                                                    <span className="mt-3 hidden max-w-32 text-xs font-semibold text-gray-700 md:block">
                                                        {item.name}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNextMarker}
                                    disabled={markerStart >= maxMarkerStart}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35"
                                    aria-label="Next timeline dates"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        </div>

                        <article className="grid gap-8 border border-gray-300 bg-white p-6 shadow-md md:grid-cols-[minmax(15rem,0.65fr)_1fr]">
                            {selectedScientist.image ? (
                                <Image
                                    src={selectedScientist.image}
                                    alt={selectedScientist.name}
                                    width={520}
                                    height={420}
                                    className="h-64 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-64 w-full items-center justify-center border border-dashed border-gray-400 bg-gray-50 text-sm text-gray-500">
                                    Photo placeholder
                                </div>
                            )}

                            <div className="flex flex-col text-left">
                                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                    <span className="border border-gray-900 px-2 py-1 font-semibold text-gray-900">
                                        {selectedScientist.timelineYear ?? selectedScientist.century}
                                    </span>
                                    <span className="border px-2 py-1">{selectedScientist.field}</span>
                                    <span className="border px-2 py-1">{selectedScientist.country}</span>
                                </div>
                                <p className="text-sm font-semibold uppercase text-gray-500">Known for</p>
                                <h3 className="mt-2 text-3xl font-bold">{selectedScientist.name}</h3>
                                <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">{makePreview(selectedScientist.whatOpened)}</p>
                                <p className="mt-4 max-w-3xl border-l-2 border-gray-900 pl-4 text-sm leading-6 text-gray-600">
                                    {selectedScientist.shortBio}
                                </p>

                                <Link
                                    href={`/scientists/${selectedScientist.id}`}
                                    className="mt-6 w-fit rounded-lg bg-black px-5 py-2 text-sm text-white hover:bg-gray-800"
                                >
                                    Open scientist profile
                                </Link>
                            </div>
                        </article>
                    </>
                ) : (
                    <div className="mt-12 rounded-2xl border border-gray-300 px-6 py-10 text-center text-gray-600">
                        No scientists match this timeline filter yet.
                    </div>
                )}
            </div>
        </section>
    );
}
