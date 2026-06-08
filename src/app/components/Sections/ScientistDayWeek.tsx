"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getFeaturedScientists, type FeaturedScientists } from "../../../../data/featuredScientists";
import { type Scientist } from "../../../../data/scientistsData";

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
    <article className="flex h-full flex-col rounded-lg border border-gray-900 bg-white p-4 shadow-sm sm:p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase text-gray-600 sm:text-sm">{eyebrow}</p>
        <span className="shrink-0 border border-gray-900 px-2 py-1 text-[0.65rem] uppercase text-gray-700 sm:text-xs">{scientist.field}</span>
      </div>
      <h2 className="mt-3 text-2xl font-bold leading-tight sm:mt-4 sm:text-3xl md:text-4xl">{scientist.name}</h2>

      <div className="mt-4 grid flex-1 gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-[minmax(12rem,0.9fr)_1fr]">
        {scientist.image ? (
          <Image
            src={scientist.image}
            alt={scientist.name}
            width={288}
            height={256}
            className="h-40 w-full rounded-md object-cover sm:h-52 lg:h-full"
          />
        ) : (
          <div className="flex h-40 w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-400 bg-[#f7f7f2] px-6 text-center text-gray-600 sm:h-52 lg:h-full">
            <span className="text-3xl font-bold text-gray-700 sm:text-4xl">{getInitials(scientist.name)}</span>
            <span className="mt-2 text-sm">Portrait pending</span>
          </div>
        )}

        <div className="flex min-h-full flex-col">
          <div className="border-l-2 border-gray-900 pl-4">
            <p className="text-xs font-semibold uppercase text-gray-600">Key contribution</p>
            <p className="mt-2 text-sm leading-6 text-gray-900 sm:hidden">{makePreview(scientist.whatOpened, 22)}</p>
            <p className="mt-2 hidden text-base leading-7 text-gray-900 sm:block md:text-lg">{makePreview(scientist.whatOpened)}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600 sm:mt-5">
            <span className="border px-2 py-1">{scientist.country}</span>
          </div>

          <Link
            href={`/scientists/${scientist.id}?from=featured`}
            className="mt-4 inline-flex w-fit rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 sm:mt-5 sm:px-5 md:text-base"
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
    <section id="featured-scientists" className="scroll-mt-24 pb-12 pt-14 sm:pb-20 sm:pt-20">
      <div className="grid items-stretch gap-5 sm:gap-8 md:grid-cols-2">
        {featuredScientists ? (
          <>
            <FeaturedScientistCard eyebrow="Scientist of the Day" scientist={featuredScientists.scientistOfTheDay} />
            <FeaturedScientistCard eyebrow="Scientist of the Week" scientist={featuredScientists.scientistOfTheWeek} />
          </>
        ) : (
          <>
            <div className="h-80 animate-pulse rounded-lg bg-gray-100 sm:h-[26rem]" />
            <div className="h-80 animate-pulse rounded-lg bg-gray-100 sm:h-[26rem]" />
          </>
        )}
      </div>

    </section>
  );
}
