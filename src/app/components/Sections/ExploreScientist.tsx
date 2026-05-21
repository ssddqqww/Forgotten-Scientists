"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { scientists } from "../../../../data/scientistsData";

export default function ExploreScientist() {
    const [visibleCount, setVisibleCount] = useState(8);
    const [fieldFilter, setFieldFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [centuryFilter, setCenturyFilter] = useState("");
    const [openMenu, setOpenMenu] = useState<"field" | "country" | "century" | null>(null);

    const fields = useMemo(() => Array.from(new Set(scientists.map((item) => item.field))), []);
    const countries = useMemo(() => Array.from(new Set(scientists.map((item) => item.country))), []);
    const centuries = useMemo(() => Array.from(new Set(scientists.map((item) => item.century))), []);

    const filteredScientists = useMemo(() => {
        return scientists.filter((item) => {
            if (fieldFilter && item.field !== fieldFilter) return false;
            if (countryFilter && item.country !== countryFilter) return false;
            if (centuryFilter && item.century !== centuryFilter) return false;
            return true;
        });
    }, [fieldFilter, countryFilter, centuryFilter]);

    const visibleScientists = filteredScientists.slice(0, visibleCount);
    const hasMore = visibleCount < filteredScientists.length;

    const handleFilterChange = (
        setter: React.Dispatch<React.SetStateAction<string>>,
        value: string
    ) => {
        setter(value);
        setVisibleCount(8);
        setOpenMenu(null);
    };

    const filterButtonClass =
        "flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-full border border-gray-300 px-4 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-50 md:w-auto md:justify-start md:gap-2 md:rounded-none md:border-0 md:border-r md:py-2 md:pl-0 md:pr-4 md:hover:bg-transparent";

    const filterButtonPlainClass =
        "flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-full border border-gray-300 px-4 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-50 md:w-auto md:justify-start md:gap-2 md:rounded-none md:border-0 md:border-r md:py-2 md:pl-0 md:pr-4 md:hover:bg-transparent";

    const dropdownClass =
        "absolute left-0 top-full z-[1120] mt-2 max-h-72 w-full min-w-0 overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-lg md:w-auto md:min-w-[220px] md:rounded-none";

    const optionClass =
        "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100";

    return (
<section id="scientists" className="scroll-mt-24 pt-12 pb-28 sm:pt-20 sm:pb-40">
    <h2 className="mb-2 text-[2.85rem] font-bold leading-none sm:text-5xl">Explore Scientists</h2>
            <p className="mb-6 text-sm leading-6 text-gray-600 sm:text-base sm:leading-normal">
                Browse scientists by field, country, or century. Click on a card to
                learn more.
            </p>

            {/* Filter Tabs */}
            <div className="mb-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 md:mb-6 md:flex md:flex-wrap md:gap-4">
                <div className="relative min-w-0">
                    <button
                        type="button"
                        className={filterButtonClass}
                        onClick={() => setOpenMenu(openMenu === "field" ? null : "field")}
                    >
                        <Image
                            src="/icons/Atom_light.png"
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                        />
                        By Field
                        <ChevronDown className="w-4 h-4" />
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
                        <Image
                            src="/icons/Map.png"
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                        />
                        By Country
                        <ChevronDown className="w-4 h-4" />
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
                        <Image
                            src="/icons/Watch.png"
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                        />
                        By Century
                        <ChevronDown className="w-4 h-4" />
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
                            setVisibleCount(8);
                            setOpenMenu(null);
                        }}
                        className="rounded-full border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 sm:col-span-3 md:rounded-none md:py-2"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Scientist Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {visibleScientists.map((card) => (
                    <div
                        key={card.id}
                        className="pb-10 relative flex flex-col items-start pr-8 border-gray-900 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:!border-r lg:[&:nth-child(4n)]:!border-r-0"
                    >
                        <h3 className="font-bold mb-1">{card.name}</h3>
                        {card.image ? (
                            <div className="mb-4 h-50 w-full overflow-hidden rounded-md bg-gray-50">
                                <Image
                                    src={card.image}
                                    alt={card.name}
                                    width={320}
                                    height={240}
                                    className="h-full w-full"
                                    style={{
                                        objectFit: card.imageFit ?? "cover",
                                        objectPosition: card.imagePosition ?? "center",
                                        transform: card.imageScale ? `scale(${card.imageScale})` : undefined,
                                        transformOrigin: card.imagePosition ?? "center",
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="mb-4 flex h-50 w-full items-center justify-center rounded-md border border-dashed border-gray-400 bg-gray-50 text-sm text-gray-500">
                                Photo placeholder
                            </div>
                        )}
                        <p className="text-md text-gray-900 mt-2">
                            {card.shortBio}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                            <span className="border px-2 py-1">{card.field}</span>
                            <span className="border px-2 py-1">{card.country}</span>
                            <span className="border px-2 py-1">{card.century}</span>
                        </div>
                        <Link
                            href={`/scientists/${card.id}?from=scientists`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-0 mt-3 px-4 py-1 bg-black text-white rounded-md text-sm"
                        >
                            Read more
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                {hasMore ? <button onClick={() => setVisibleCount((count) => count + 4)} className="w-xl py-2 bg-black text-white rounded-md text-sm">
                    Load more
                </button> : <div className="text-gray-600">No more scientists to load.</div>}
            </div>
        </section>
    );
}
