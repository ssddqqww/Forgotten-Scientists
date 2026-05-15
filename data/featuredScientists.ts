import { scientists, type Scientist } from "./scientistsData";

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_LENGTH = 7;
const WEEK_OFFSET = 11;
const WEEK_STEP = 17;

export type FeaturedScientists = {
  scientistOfTheDay: Scientist;
  scientistOfTheWeek: Scientist;
  totalScientists: number;
};

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDayNumber(date: Date) {
  return Math.floor(startOfLocalDay(date).getTime() / DAY_MS);
}

function getMondayBasedDayOfWeek(date: Date) {
  return (startOfLocalDay(date).getDay() + 6) % WEEK_LENGTH;
}

function getWeeklyIndex(date: Date, total: number) {
  const dayNumber = getDayNumber(date);
  const weekNumber = Math.floor(dayNumber / WEEK_LENGTH);

  return (weekNumber * WEEK_STEP + WEEK_OFFSET) % total;
}

function getDailyIndex(date: Date, weeklyIndex: number, total: number) {
  const dayNumber = getDayNumber(date);
  const weekNumber = Math.floor(dayNumber / WEEK_LENGTH);
  const dayOfWeek = getMondayBasedDayOfWeek(date);
  const dailyPosition = (weekNumber * WEEK_LENGTH + dayOfWeek) % (total - 1);
  const dayPool = scientists.filter((_, index) => index !== weeklyIndex);

  return scientists.indexOf(dayPool[dailyPosition]);
}

export function getFeaturedScientists(date = new Date()): FeaturedScientists {
  const totalScientists = scientists.length;

  if (totalScientists < 2) {
    throw new Error("Scientist of the Day and Scientist of the Week need at least two scientists.");
  }

  const weeklyIndex = getWeeklyIndex(date, totalScientists);
  const dailyIndex = getDailyIndex(date, weeklyIndex, totalScientists);

  return {
    scientistOfTheDay: scientists[dailyIndex],
    scientistOfTheWeek: scientists[weeklyIndex],
    totalScientists,
  };
}
