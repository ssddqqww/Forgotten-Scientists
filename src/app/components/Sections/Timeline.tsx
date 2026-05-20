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
        "flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-full border border-gray-300 px-4 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-50 md:w-auto md:justify-start md:gap-2 md:rounded-none md:border-0 md:border-r md:py-2 md:pl-0 md:pr-4 md:hover:bg-transparent";

    const filterButtonPlainClass =
        "flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-full border border-gray-300 px-4 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-50 md:w-auto md:justify-start md:gap-2 md:rounded-none md:border-0 md:py-2 md:pl-0 md:pr-4 md:hover:bg-transparent";

    const dropdownClass =
        "absolute left-0 top-full z-[1120] mt-2 max-h-72 w-full min-w-0 overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-lg md:w-auto md:min-w-[220px] md:rounded-none";

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
        <section id="timeline" className="scroll-mt-24 pt-16 pb-28 md:pt-20 md:pb-40">
            <div className="text-start">
                <h2 className="mb-3 text-[2.75rem] font-bold leading-[1.03] md:mb-2 md:text-5xl md:leading-none">
                    Timeline of Forgotten Scientists
                </h2>
                <p className="mb-7 max-w-4xl text-base leading-7 text-gray-600 md:mb-6">
                    Move through scientists across centuries. The year is the best available timeline anchor from each profile, while the card highlights what they are remembered for.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 md:mb-6 md:flex md:flex-wrap md:gap-4">
                    <div className="relative min-w-0">
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

                    <div className="relative min-w-0">
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

                    <div className="relative min-w-0">
                        <button
                            type="button"
                            className={filterButtonPlainClass}
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
                            className="rounded-full border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 sm:col-span-3 md:rounded-none md:py-2"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {timelineMarkers.length > 0 && selectedScientist ? (
                    <>
                        <div className="relative mb-8 mt-10 md:mb-10 md:mt-12">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 md:text-sm">
                                <span>
                                    Showing {markerStart + 1}-{Math.min(markerStart + timelineMarkers.length, filteredScientists.length)} of {filteredScientists.length}
                                </span>
                                {selectedScientist && (
                                    <span>
                                        Focus: {selectedPosition} / {filteredScientists.length}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4 flex items-end justify-between gap-4 md:hidden">
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                                    Current anchor
                                </span>
                                <span className="text-2xl font-bold leading-none text-black">
                                    {selectedScientist.timelineYear ?? selectedScientist.century}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 md:gap-4">
                                <button
                                    type="button"
                                    onClick={handlePreviousMarker}
                                    disabled={markerStart === 0}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35 md:h-11 md:w-11"
                                    aria-label="Previous timeline dates"
                                >
                                    <ChevronLeft size={22} />
                                </button>

                                <div className="relative min-h-14 flex-1 px-1 md:min-h-24 md:px-2">
                                    <div className="absolute left-0 right-0 top-5 border-t-4 border-gray-900 md:top-12"></div>
                                    <div className="absolute right-0 top-[14px] h-5 w-5 rotate-45 border-r-4 border-t-4 border-gray-900 md:top-[42px]"></div>

                                    <div
                                        className="relative z-10 grid min-h-14 items-start md:min-h-24"
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
                                                    <span className={`hidden md:mb-4 md:block md:text-lg md:font-bold ${isSelected ? "text-black" : "text-gray-700"}`}>
                                                        {item.timelineYear ?? item.century}
                                                    </span>
                                                    <span
                                                        className={`mt-1 h-7 w-7 rounded-full border-2 transition md:mt-0 md:h-8 md:w-8 ${
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
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35 md:h-11 md:w-11"
                                    aria-label="Next timeline dates"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        </div>

                        <article className="relative overflow-hidden border-y border-gray-900 bg-[#fbfaf7] py-7 md:grid md:grid-cols-[minmax(12rem,0.45fr)_1fr] md:gap-10 md:py-10">
                            <div className="relative px-5 pb-8 md:border-r md:border-gray-300 md:px-6 md:pb-0 md:pr-10">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                                    Timeline anchor
                                </p>
                                <p className="mt-3 text-5xl font-bold leading-none text-black md:text-7xl">
                                    {selectedScientist.timelineYear ?? selectedScientist.century}
                                </p>
                                <div className="mt-8 flex items-center gap-3">
                                    <span className="h-5 w-5 rounded-full border-4 border-black bg-[#fbfaf7]"></span>
                                    <span className="h-[3px] flex-1 bg-black"></span>
                                </div>
                                <div className="mt-8 space-y-4 text-sm">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Position</p>
                                        <p className="mt-1 font-semibold text-gray-900">
                                            {selectedPosition} of {filteredScientists.length}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Field</p>
                                        <p className="mt-1 font-semibold text-gray-900">{selectedScientist.field}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Country</p>
                                        <p className="mt-1 font-semibold text-gray-900">{selectedScientist.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Era</p>
                                        <p className="mt-1 font-semibold text-gray-900">{selectedScientist.century}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-5 text-left md:px-6 md:pl-0 md:pr-8">
                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                    <span className="border border-gray-900 px-2 py-1 font-semibold text-gray-900">
                                        Focused profile
                                    </span>
                                    <span className="border px-2 py-1">{selectedScientist.field}</span>
                                    <span className="border px-2 py-1">{selectedScientist.country}</span>
                                </div>
                                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                                    Known for
                                </p>
                                <h3 className="mt-2 text-2xl font-bold leading-tight md:text-4xl">
                                    {selectedScientist.name}
                                </h3>
                                <p className="mt-5 max-w-4xl text-base leading-7 text-gray-800 md:text-lg md:leading-8">
                                    {makePreview(selectedScientist.whatOpened)}
                                </p>
                                <div className="mt-6 border-l-4 border-black pl-5">
                                    <p className="max-w-4xl text-sm leading-7 text-gray-600">
                                        {selectedScientist.shortBio}
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-col gap-4 border-t border-gray-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="max-w-xl text-sm text-gray-600">
                                        Trace the breakthroughs that slipped out of the spotlight, one story at a time.
                                    </p>
                                    <Link
                                        href={`/scientists/${selectedScientist.id}?from=timeline`}
                                        className="w-full rounded-md bg-black px-5 py-2 text-center text-sm text-white hover:bg-gray-800 sm:w-fit"
                                    >
                                        Open scientist profile
                                    </Link>
                                </div>
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
