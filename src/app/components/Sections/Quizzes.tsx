"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { fieldQuizzes } from "../../../../data/quizzes";

const categoryStyles = {
    Fundamentals: {
        card: "border-[#8eb1dc] bg-[#f5f9ff]",
        bar: "bg-[#5e8fc8]",
        badge: "border-[#6f99c8] bg-white text-[#223f5f]",
        meta: "border-[#9cb9d8] bg-white",
    },
    Scientists: {
        card: "border-[#88aa92] bg-[#f6fbf7]",
        bar: "bg-[#527d62]",
        badge: "border-[#71967d] bg-white text-[#284634]",
        meta: "border-[#9fb5a6] bg-white",
    },
    Discoveries: {
        card: "border-[#c4aa62] bg-[#fffaf0]",
        bar: "bg-[#b99022]",
        badge: "border-[#aa8c37] bg-white text-[#533f12]",
        meta: "border-[#c9b36e] bg-white",
    },
};

export default function Quizzes() {
    const [visibleCount, setVisibleCount] = useState(8);
    const [fieldFilter, setFieldFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [openMenu, setOpenMenu] = useState(false);

    const fields = useMemo(() => Array.from(new Set(fieldQuizzes.map((quiz) => quiz.field))), []);
    const categories = useMemo(() => Array.from(new Set(fieldQuizzes.map((quiz) => quiz.category))), []);

    const filteredQuizzes = useMemo(() => {
        return fieldQuizzes.filter((quiz) => {
            if (fieldFilter && quiz.field !== fieldFilter) return false;
            if (categoryFilter && quiz.category !== categoryFilter) return false;
            return true;
        });
    }, [fieldFilter, categoryFilter]);

    const visibleQuizzes = filteredQuizzes.slice(0, visibleCount);
    const hasMore = visibleCount < filteredQuizzes.length;

    const handleFieldChange = (field: string) => {
        setFieldFilter(field);
        setVisibleCount(8);
        setOpenMenu(false);
    };

    const handleCategoryChange = (category: string) => {
        setCategoryFilter(category);
        setVisibleCount(8);
    };

    const filterButtonClass =
        "flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-full border border-gray-300 px-4 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-50 md:w-auto md:justify-start md:gap-2 md:rounded-none md:border-0 md:border-r md:py-2 md:pl-0 md:pr-4 md:hover:bg-transparent";

    const dropdownClass =
        "absolute left-0 top-full z-[1120] mt-2 max-h-72 w-full min-w-0 overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-lg md:w-auto md:min-w-[220px] md:rounded-none";

    const optionClass =
        "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100";

    return (
        <section id="quizzes" className="scroll-mt-24 pt-14 pb-28 sm:pt-20 sm:pb-40">
            <h2 className="mb-2 text-[2.75rem] font-bold leading-none sm:text-5xl">Quizzes</h2>
            <p className="mb-6 text-sm leading-6 text-gray-600 sm:text-base sm:leading-normal">
                Choose a field first, then narrow the quiz by challenge type.
            </p>

            <div className="mb-4 grid grid-cols-1 gap-3 text-sm md:flex md:flex-wrap md:items-center md:gap-4">
                <div className="relative min-w-0">
                    <button
                        type="button"
                        className={filterButtonClass}
                        onClick={() => setOpenMenu((open) => !open)}
                    >
                        <Image
                            src="/icons/Atom_light.png"
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                        />
                        By Field
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    {openMenu && (
                        <div className={dropdownClass}>
                            <button type="button" className={optionClass} onClick={() => handleFieldChange("")}>
                                All
                            </button>
                            {fields.map((field) => (
                                <button
                                    key={field}
                                    type="button"
                                    className={optionClass}
                                    onClick={() => handleFieldChange(field)}
                                >
                                    {field}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {(fieldFilter || categoryFilter) && (
                    <button
                        type="button"
                        onClick={() => {
                            handleFieldChange("");
                            handleCategoryChange("");
                        }}
                        className="rounded-full border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 md:rounded-none md:py-2"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            <div className="mb-8 border-y border-gray-200 py-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Quiz type
                </p>
                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => handleCategoryChange("")}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                            !categoryFilter
                                ? "border-black bg-black text-white"
                                : "border-gray-300 text-gray-700 hover:border-black"
                        }`}
                    >
                        All types
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryChange(category)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                                categoryFilter === category
                                    ? "border-black bg-black text-white"
                                    : "border-gray-300 text-gray-700 hover:border-black"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                    Fundamentals focus on subject knowledge. Scientists focus on people featured on this educational platform. Discoveries mix ideas, achievements, and context.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {visibleQuizzes.map((quiz) => {
                    const styles = categoryStyles[quiz.category];

                    return (
                        <div
                            key={quiz.slug}
                            className={`group relative flex flex-col items-start overflow-hidden rounded-md border p-3 pb-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-h-[520px] sm:p-4 sm:pb-16 ${styles.card}`}
                        >
                            <div className={`absolute left-0 top-0 h-1.5 w-full ${styles.bar}`} />
                            <div className="mb-3 flex w-full items-start justify-between gap-3 pt-1 sm:min-h-16 sm:pt-2">
                                <h3 className="text-base font-bold leading-tight text-gray-950 sm:text-lg">{quiz.title}</h3>
                                <span className={`shrink-0 border px-2 py-1 text-[0.65rem] font-semibold sm:text-xs ${styles.badge}`}>
                                    {quiz.category}
                                </span>
                            </div>

                            {quiz.image ? (
                                <div className="mb-3 w-full overflow-hidden rounded-md border border-black/10 bg-white sm:mb-4">
                                    <Image
                                        src={quiz.image}
                                        alt={quiz.title}
                                        width={420}
                                        height={315}
                                        className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    />
                                </div>
                            ) : (
                                <div className="mb-3 flex aspect-[4/3] w-full items-center justify-center rounded-md border border-dashed border-gray-400 bg-gray-50 text-sm text-gray-500 sm:mb-4">
                                    Quiz image placeholder
                                </div>
                            )}

                            <p className="text-sm leading-6 text-gray-900 sm:text-base sm:leading-7">{quiz.description}</p>
                            <div className="mt-2.5 flex flex-wrap gap-2 text-xs text-gray-600 sm:mt-3">
                                <span className={`border px-2 py-1 ${styles.meta}`}>{quiz.field}</span>
                                <span className={`border px-2 py-1 ${styles.meta}`}>{quiz.questions.length} questions</span>
                                <span className={`border px-2 py-1 ${styles.meta}`}>{quiz.scientistNames.length} scientists</span>
                            </div>
                            <Link
                                href={`/quizzes/${quiz.slug}`}
                                className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white sm:absolute sm:bottom-4 sm:left-4 sm:mt-3"
                            >
                                Take Quiz
                            </Link>
                        </div>
                )})}
            </div>

            <div className="mt-10 flex justify-center">
                {hasMore ? (
                    <button
                        type="button"
                        onClick={() => setVisibleCount((count) => count + 4)}
                        className="w-xl rounded-md bg-black py-2 text-sm text-white"
                    >
                        Load more
                    </button>
                ) : (
                    <div className="text-gray-600">No more quizzes to load.</div>
                )}
            </div>
        </section>
    );
}
