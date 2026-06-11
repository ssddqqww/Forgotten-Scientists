export const HOME_SECTION_IDS = [
  "scientists",
  "timeline",
  "map",
  "quizzes",
  "news",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export const HOME_SECTION_CHANGE_EVENT =
  "forgotten-scientists-home-section-change";

export function isHomeSectionId(value: string): value is HomeSectionId {
  return HOME_SECTION_IDS.includes(value as HomeSectionId);
}

export function announceHomeSection(sectionId: HomeSectionId) {
  window.dispatchEvent(
    new CustomEvent(HOME_SECTION_CHANGE_EVENT, {
      detail: { sectionId },
    }),
  );
}
