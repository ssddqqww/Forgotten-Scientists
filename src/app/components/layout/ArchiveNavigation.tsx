"use client";

import {
  ArrowUpRight,
  Clock3,
  FlaskConical,
  GraduationCap,
  MapPinned,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { archiveSections } from "../../lib/archiveSections";

const icons = {
  Scientists: FlaskConical,
  Timeline: Clock3,
  Map: MapPinned,
  Quizzes: GraduationCap,
  News: Newspaper,
};

export default function ArchiveNavigation({
  variant = "bar",
}: {
  variant?: "bar" | "cards";
}) {
  const pathname = usePathname();

  if (variant === "cards") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {archiveSections.map((section, index) => {
          const Icon = icons[section.label];

          return (
            <Link
              key={section.href}
              href={section.href}
              className="group flex min-h-48 flex-col justify-between rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#111827] text-white">
                  <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  0{index + 1}
                </span>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">{section.label}</h3>
                  <ArrowUpRight
                    size={18}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {section.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="sticky top-[68px] z-[1000] border-b border-black/10 bg-[#f5f2eb]/95 backdrop-blur-xl">
      <nav
        aria-label="Archive sections"
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:justify-center lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {archiveSections.map((section) => {
          const Icon = icons[section.label];
          const active = pathname === section.href;

          return (
            <Link
              key={section.href}
              href={section.href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "border-black bg-black text-white"
                  : "border-black/15 bg-white/80 text-gray-700 hover:border-black/40 hover:text-black"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              {section.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
