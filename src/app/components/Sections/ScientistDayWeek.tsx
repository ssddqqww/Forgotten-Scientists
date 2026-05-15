"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getFeaturedScientists, type FeaturedScientists } from "../../../../data/featuredScientists";
import { type Scientist } from "../../../../data/scientistsData";
import { smoothScrollToId } from "@/app/lib/smoothScroll";

function getNextLocalMidnightDelay() {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  return tomorrow.getTime() - now.getTime();
}

function useFeaturedScientists() {
  const [featuredScientists, setFeaturedScientists] = useState<FeaturedScientists | null>(null);

  useEffect(() => {
    const updateFeaturedScientists = () => setFeaturedScientists(getFeaturedScientists(new Date()));

    updateFeaturedScientists();

    let dailyTimer: number | undefined;
    const midnightTimer = window.setTimeout(() => {
      updateFeaturedScientists();
      dailyTimer = window.setInterval(updateFeaturedScientists, 24 * 60 * 60 * 1000);
    }, getNextLocalMidnightDelay());

    return () => {
      window.clearTimeout(midnightTimer);
      if (dailyTimer) {
        window.clearInterval(dailyTimer);
      }
    };
  }, []);

  return featuredScientists;
}

function makePreview(text: string, maxWords = 34) {
  const words = text.split(/\s+/);

  if (words.length <= maxWords) {
    return text;
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function FeaturedScientistCard({
  eyebrow,
  scientist,
}: {
  eyebrow: "Scientist of the Day" | "Scientist of the Week";
  scientist: Scientist;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-gray-900 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold uppercase text-gray-600">{eyebrow}</p>
        <span className="shrink-0 border border-gray-900 px-2 py-1 text-xs uppercase text-gray-700">{scientist.field}</span>
      </div>
      <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{scientist.name}</h2>

      <div className="mt-6 grid flex-1 gap-5 lg:grid-cols-[minmax(12rem,0.9fr)_1fr]">
        {scientist.image ? (
          <Image
            src={scientist.image}
            alt={scientist.name}
            width={288}
            height={256}
            className="h-52 w-full rounded-md object-cover lg:h-full"
          />
        ) : (
          <div className="flex h-52 w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-400 bg-[#f7f7f2] px-6 text-center text-gray-600 lg:h-full">
            <span className="text-4xl font-bold text-gray-700">{getInitials(scientist.name)}</span>
            <span className="mt-2 text-sm">Portrait pending</span>
          </div>
        )}

        <div className="flex min-h-full flex-col">
          <div className="border-l-2 border-gray-900 pl-4">
            <p className="text-xs font-semibold uppercase text-gray-600">Key contribution</p>
            <p className="mt-2 text-base leading-7 text-gray-900 md:text-lg">{makePreview(scientist.whatOpened)}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-gray-600">
            <span className="border px-2 py-1">{scientist.country}</span>
          </div>

          <Link
            href={`/scientists/${scientist.id}`}
            className="mt-5 inline-flex w-fit rounded-md bg-black px-5 py-2 text-sm text-white transition hover:bg-gray-800 md:text-base"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ScientistDayWeek() {
  const featuredScientists = useFeaturedScientists();

  return (
    <section className="pt-20 pb-40">
      <div className="grid items-stretch gap-8 md:grid-cols-2">
        {featuredScientists ? (
          <>
            <FeaturedScientistCard eyebrow="Scientist of the Day" scientist={featuredScientists.scientistOfTheDay} />
            <FeaturedScientistCard eyebrow="Scientist of the Week" scientist={featuredScientists.scientistOfTheWeek} />
          </>
        ) : (
          <>
            <div className="h-[26rem] animate-pulse rounded-lg bg-gray-100" />
            <div className="h-[26rem] animate-pulse rounded-lg bg-gray-100" />
          </>
        )}
      </div>

      <div className="mt-12 grid grid-cols-2 divide-x divide-gray-900 text-center sm:grid-cols-3 lg:grid-cols-5">
        <button type="button" className="flex flex-col items-center p-6" onClick={() => smoothScrollToId("scientists")}>
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden">
            <Image
              src="/icons/Flask_light.png"
              alt="Scientists"
              width={56}
              height={56}
              className="h-full w-full scale-125 object-cover"
            />
          </div>
          <span className="mt-3 text-sm font-normal">Scientists</span>
        </button>

        <button type="button" className="flex flex-col items-center p-6" onClick={() => smoothScrollToId("timeline")}>
          <Image className="h-16 w-16 object-contain" src="/icons/Hourglass_light.png" alt="Timeline" width={64} height={64} />
          <span className="mt-3 text-sm font-normal">Timeline</span>
        </button>

        <button type="button" className="flex flex-col items-center p-6" onClick={() => smoothScrollToId("map")}>
          <Image className="h-16 w-16 object-contain" src="/icons/Map.png" alt="Map" width={64} height={64} />
          <span className="mt-3 text-sm font-normal">Map</span>
        </button>

        <button type="button" className="flex flex-col items-center p-6" onClick={() => smoothScrollToId("quizzes")}>
          <Image className="h-16 w-16 object-contain" src="/icons/Waterfall.png" alt="Quizzes" width={64} height={64} />
          <span className="mt-3 text-sm font-normal">Quizzes</span>
        </button>

        <button type="button" className="flex flex-col items-center p-6" onClick={() => smoothScrollToId("news")}>
          <Image className="h-16 w-16 object-contain" src="/icons/globe.png" alt="News" width={64} height={64} />
          <span className="mt-3 text-sm font-normal">News</span>
        </button>
      </div>
    </section>
  );
}
