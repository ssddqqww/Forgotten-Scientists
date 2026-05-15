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
        "flex items-center gap-2 pr-4 py-2 border-r cursor-pointer select-none";

    const dropdownClass =
        "absolute left-0 top-full z-20 mt-2 min-w-[220px] border border-gray-300 bg-white shadow-lg";

    const optionClass =
        "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100";

    return (
        <section id="quizzes" className="scroll-mt-24 pt-20 pb-40">
            <h2 className="text-5xl font-bold mb-2">Quizzes</h2>
            <p className="text-gray-600 mb-6">
                Choose a field first, then narrow the quiz by challenge type.
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="relative">
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
                        className="px-4 py-2 border text-gray-700 hover:bg-gray-50"
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
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
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
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleQuizzes.map((quiz) => {
                    const styles = categoryStyles[quiz.category];

                    return (
                        <div
                            key={quiz.slug}
                            className={`group relative flex min-h-[520px] flex-col items-start overflow-hidden rounded-md border p-4 pb-16 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
                        >
                            <div className={`absolute left-0 top-0 h-1.5 w-full ${styles.bar}`} />
                            <div className="mb-3 flex min-h-16 w-full items-start justify-between gap-3 pt-2">
                                <h3 className="text-lg font-bold leading-tight text-gray-950">{quiz.title}</h3>
                                <span className={`shrink-0 border px-2 py-1 text-xs font-semibold ${styles.badge}`}>
                                    {quiz.category}
                                </span>
                            </div>

                            {quiz.image ? (
                                <div className="mb-4 w-full overflow-hidden rounded-md border border-black/10 bg-white">
                                    <Image
                                        src={quiz.image}
                                        alt={quiz.title}
                                        width={420}
                                        height={315}
                                        className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    />
                                </div>
                            ) : (
                                <div className="mb-4 flex aspect-[4/3] w-full items-center justify-center rounded-md border border-dashed border-gray-400 bg-gray-50 text-sm text-gray-500">
                                    Quiz image placeholder
                                </div>
                            )}

                            <p className="text-base leading-7 text-gray-900">{quiz.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                                <span className={`border px-2 py-1 ${styles.meta}`}>{quiz.field}</span>
                                <span className={`border px-2 py-1 ${styles.meta}`}>{quiz.questions.length} questions</span>
                                <span className={`border px-2 py-1 ${styles.meta}`}>{quiz.scientistNames.length} scientists</span>
                            </div>
                            <Link
                                href={`/quizzes/${quiz.slug}`}
                                className="absolute bottom-4 left-4 mt-3 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white"
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
