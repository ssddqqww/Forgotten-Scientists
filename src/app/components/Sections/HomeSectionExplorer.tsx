"use client";

import {
  Clock3,
  FlaskConical,
  GraduationCap,
  MapPinned,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  HOME_SECTION_CHANGE_EVENT,
  isHomeSectionId,
  type HomeSectionId,
} from "../../lib/homeSections";
import ExploreScientist from "./ExploreScientist";
import MapForgottenScientist from "./MapForgottenScientist";
import News from "./News";
import Quizzes from "./Quizzes";
import Timeline from "./Timeline";

type SectionDefinition = {
  id: HomeSectionId;
  label: string;
  description: string;
  icon: LucideIcon;
};

const sections: SectionDefinition[] = [
  {
    id: "scientists",
    label: "Scientists",
    description:
      "Discover overlooked researchers and the ideas that changed our world.",
    icon: FlaskConical,
  },
  {
    id: "timeline",
    label: "Timeline",
    description:
      "Move through the discoveries, breakthroughs, and lives behind the archive.",
    icon: Clock3,
  },
  {
    id: "map",
    label: "Map",
    description:
      "Explore where forgotten scientists lived, worked, and made history.",
    icon: MapPinned,
  },
  {
    id: "quizzes",
    label: "Quizzes",
    description:
      "Test what you know and uncover new stories through short challenges.",
    icon: GraduationCap,
  },
  {
    id: "news",
    label: "News",
    description:
      "Read recent stories, research highlights, and updates from the project.",
    icon: Newspaper,
  },
];

function getSectionFromHash(): HomeSectionId | null {
  const hash = window.location.hash.slice(1);
  return isHomeSectionId(hash) ? hash : null;
}

export default function HomeSectionExplorer() {
  const [activeSection, setActiveSection] =
    useState<HomeSectionId>("scientists");

  useEffect(() => {
    const syncFromHash = () => {
      const section = getSectionFromHash();
      setActiveSection(section ?? "scientists");
    };

    const handleSectionChange = (event: Event) => {
      const { sectionId } = (event as CustomEvent<{ sectionId: string }>).detail;

      if (isHomeSectionId(sectionId)) {
        setActiveSection(sectionId);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    window.addEventListener(HOME_SECTION_CHANGE_EVENT, handleSectionChange);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener(HOME_SECTION_CHANGE_EVENT, handleSectionChange);
    };
  }, []);

  const selectSection = (sectionId: HomeSectionId) => {
    setActiveSection(sectionId);
    window.history.pushState({}, "", `/#${sectionId}`);
  };

  const activeDefinition = sections.find(
    (section) => section.id === activeSection,
  )!;

  return (
    <section
      id="explore-workspace"
      className="scroll-mt-24 border-t border-[#1a1a1a]/15 pb-20 pt-6 sm:pb-28 sm:pt-8"
    >
      <div className="mb-8 lg:hidden">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#6c6c6c]">
          Explore the archive
        </p>
        <div
          role="tablist"
          aria-label="Archive sections"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                id={`home-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`home-panel-${id}`}
                onClick={() => selectSection(id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                    : "border-[#1a1a1a]/20 bg-white text-[#1a1a1a] hover:border-[#1a1a1a]/60"
                }`}
              >
                <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#666]">
          {activeDefinition.description}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[19rem_minmax(0,1fr)] xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c6c6c]">
              Explore the archive
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-[#1a1a1a]">
              Choose a way
              <br />
              into the story.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[#666]">
              One focused view at a time. Switch sections without losing your
              place.
            </p>

            <div
              role="tablist"
              aria-label="Archive sections"
              className="mt-8 border-t border-[#1a1a1a]/15"
            >
              {sections.map(({ id, label, description, icon: Icon }) => {
                const isActive = activeSection === id;

                return (
                  <button
                    key={id}
                    id={`home-tab-desktop-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`home-panel-${id}`}
                    onClick={() => selectSection(id)}
                    className={`group w-full border-b border-[#1a1a1a]/15 py-4 text-left transition-colors ${
                      isActive ? "text-[#1a1a1a]" : "text-[#777]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                          isActive
                            ? "bg-[#1a1a1a] text-white"
                            : "bg-[#1a1a1a]/5 group-hover:bg-[#1a1a1a]/10"
                        }`}
                      >
                        <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="font-semibold">{label}</span>
                    </span>
                    {isActive && (
                      <span className="mt-3 block pl-12 text-xs leading-5 text-[#666]">
                        {description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div
          id={`home-panel-${activeSection}`}
          role="tabpanel"
          aria-labelledby={`home-tab-${activeSection}`}
          className="min-w-0"
        >
          {activeSection === "scientists" && <ExploreScientist />}
          {activeSection === "timeline" && <Timeline />}
          {activeSection === "map" && <MapForgottenScientist />}
          {activeSection === "quizzes" && <Quizzes />}
          {activeSection === "news" && <News />}
        </div>
      </div>
    </section>
  );
}
