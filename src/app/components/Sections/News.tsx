"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { newsItems, type NewsItem } from "../../../../data/news";

const filters = [
  { label: "All News", value: "All", icon: "/icons/globe.png" },
  { label: "By Anniversary", value: "Anniversary", icon: "/icons/Watch.png" },
  { label: "By Archive", value: "Archive / Discovery", icon: "/icons/Map.png" },
  { label: "By Updates", value: "Project Update", icon: "/icons/Flask_light.png" },
  { label: "By Facts", value: "Did You Know?", icon: "/icons/Atom_light.png" },
] as const;

const INITIAL_VISIBLE_NEWS = 6;

export default function News() {
  const [activeCategory, setActiveCategory] = useState<(typeof filters)[number]["value"]>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_NEWS);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    if (activeCategory === "All") return newsItems;
    return newsItems.filter((item) => item.type === activeCategory);
  }, [activeCategory]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleFilterChange = (category: typeof activeCategory) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_NEWS);
  };

  return (
    <section id="news" className="scroll-mt-24 pt-16 pb-28 md:pt-20 md:pb-40">
      <h2 className="mb-2 text-4xl font-bold md:text-5xl">News</h2>
      <p className="mb-6 text-base leading-7 text-gray-600">
        Discover anniversaries, archive discoveries, project updates, and short facts.
      </p>

      <div
        className="mb-8 flex min-h-36 items-end bg-cover bg-center p-5 text-white md:min-h-32 md:p-8"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,.72), rgba(0,0,0,.18)), url('/HeroBG.jpg')" }}
      >
        <div>
          <p className="text-sm font-semibold uppercase">Forgotten Scientists</p>
          <h3 className="text-2xl font-bold leading-tight md:text-3xl">Latest stories from science history</h3>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 text-sm md:mb-6 md:flex md:flex-wrap md:gap-4">
        {filters.map((filter, index) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleFilterChange(filter.value)}
            className={`flex w-full items-center gap-2 rounded-full border border-gray-300 px-3 py-3 text-left transition md:w-auto md:rounded-none md:border-0 md:py-2 ${
              index === filters.length - 1 ? "col-span-2 justify-center md:col-span-1 md:px-4" : "md:pr-4 md:border-r"
            } ${activeCategory === filter.value ? "font-bold text-black" : "text-gray-800 hover:text-black"}`}
          >
            <Image
              src={filter.icon}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleNews.map((item) => (
          <article
            key={item.id}
            className="relative flex flex-col items-start border-gray-900 pb-0 pr-0 sm:border-r sm:pb-12 sm:pr-8 sm:[&:nth-child(2n)]:border-r-0 lg:!border-r lg:[&:nth-child(3n)]:!border-r-0"
          >
            <p className="mb-2 text-sm font-semibold text-gray-600">{item.type}</p>
            <h3 className="font-bold mb-1">{item.title}</h3>
            <p className="mb-3 text-sm text-gray-600">{item.publicationDate}</p>
            <p className="text-md text-gray-900 mt-2 line-clamp-5">
              {item.description}
            </p>

            <button
              type="button"
              onClick={() => setSelectedNews(item)}
              className="mt-4 rounded-md bg-black px-4 py-1 text-sm text-white sm:absolute sm:bottom-0"
            >
              Read more
            </button>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        {hasMore ? (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_NEWS)}
            className="w-xl py-2 bg-black text-white rounded-md text-sm"
          >
            Load more
          </button>
        ) : (
          <div className="text-gray-600">No more news to load.</div>
        )}
      </div>

      {selectedNews && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 px-4 py-8">
          <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">{selectedNews.type}</p>
                <h3 className="mt-1 text-2xl font-bold text-[#090a2a]">{selectedNews.title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {selectedNews.author} | {selectedNews.publicationDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-300 text-gray-900 hover:bg-gray-100"
                aria-label="Close news"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-lg leading-8 text-gray-800">{selectedNews.description}</p>
            <p className="mt-5 font-semibold text-gray-900">{selectedNews.profileNote}</p>
          </article>
        </div>
      )}
    </section>
  );
}
