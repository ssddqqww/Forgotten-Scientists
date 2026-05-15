import scientistsRaw from "./scientists_raw.json";

export type Scientist = {
  id: number;
  name: string;
  field: string;
  country: string;
  location: string;
  century: string;
  whatOpened: string;
  shortBio: string;
  longBio: string;
  sources: string[];
  image?: string;
};

type RawScientist = {
  id: number;
  name: string;
  century: string;
  location: string;
  major: string;
  whatOpened: string;
  short: string;
  long: string;
  sources: string[];
};

const imageById: Partial<Record<number, string>> = {
  1: "/scientist01.png",
  2: "/scientist02.png",
  3: "/3scientist.png",
  4: "/scientist4.png",
  5: "/scientist5.png",
  6: "/scientist6.png",
  7: "/scientist7.png",
  8: "/0.008scientist.png",
};

const fieldById: Record<number, string> = {
  1: "Chemistry",
  2: "Biology",
  3: "Physics",
  4: "Genetics",
  5: "Mathematics",
  6: "Physics",
  7: "Astronomy",
  8: "Chemistry",
  9: "Geology",
  10: "Engineering",
  11: "Astronomy",
  12: "Astronomy",
  13: "Computer Science",
  14: "Astronomy",
  15: "Astronomy",
  16: "Physics",
  17: "Chemistry",
  18: "Astrophysics",
  19: "Physics",
  20: "Geochemistry",
  21: "Astronomy",
  22: "Geology",
  23: "Chemistry",
  24: "Biology",
  25: "Engineering",
  26: "Astronomy",
  27: "Astronomy",
  28: "Astronomy",
  29: "Biology",
  30: "Art",
  31: "Astronomy",
  32: "Physics",
  33: "Biology",
  34: "Engineering",
  35: "Astronomy",
  36: "Physics",
  37: "Chemistry",
  38: "Mathematics",
  39: "Engineering",
  40: "Engineering",
  41: "Natural History",
  42: "Biochemistry",
  43: "Botany",
  44: "Microbiology",
  45: "Astronomy",
  46: "Physics",
  47: "Astronomy",
  48: "Astronomy",
  49: "Chemistry",
  50: "Chemistry",
  51: "Medicine",
  52: "Chemistry",
  53: "Microbiology",
  54: "Engineering",
  55: "Biochemistry",
  56: "Physics",
  57: "Astronomy",
  58: "Mathematics",
  59: "Computer Science",
  60: "Mathematics",
  61: "Engineering",
  62: "Chemistry",
  63: "Engineering",
  64: "Engineering",
  65: "Oceanography",
  66: "Physics",
  67: "Engineering",
  68: "Botany",
  69: "Chemistry",
  70: "Genetics",
  71: "Computer Science",
  72: "Medicine",
  73: "Climate Science",
  74: "Medicine",
  75: "Mathematics",
  76: "Geophysics",
  77: "Astronomy",
  78: "Engineering",
  79: "Political Science",
  80: "Mathematics",
};

const countryById: Record<number, string> = {
  1: "United States",
  2: "United States",
  3: "China",
  4: "United States",
  5: "United Kingdom",
  6: "Germany",
  7: "United States",
  8: "Germany",
  9: "United States",
  10: "United States",
  11: "Syria",
  12: "Syria",
  13: "United States",
  14: "Egypt",
  15: "United States",
  16: "United States",
  17: "Germany",
  18: "Georgia",
  19: "United States",
  20: "Japan",
  21: "Ireland",
  22: "United States",
  23: "United States",
  24: "United States",
  25: "Sweden",
  26: "Denmark",
  27: "Germany",
  28: "United Kingdom",
  29: "United States",
  30: "Italy",
  31: "United States",
  32: "United States",
  33: "United States",
  34: "United States",
  35: "Poland",
  36: "Italy",
  37: "Bulgaria",
  38: "Italy",
  39: "United Kingdom",
  40: "United States",
  41: "United States",
  42: "United States",
  43: "United States",
  44: "United States",
  45: "United States",
  46: "Austria",
  47: "United States",
  48: "China",
  49: "Iraq",
  50: "Norway",
  51: "Philippines",
  52: "United States",
  53: "United States",
  54: "United States",
  55: "Spain",
  56: "United States",
  57: "Australia",
  58: "United Kingdom",
  59: "China",
  60: "United States",
  61: "United States",
  62: "Germany",
  63: "United States",
  64: "United Kingdom",
  65: "United States",
  66: "Canada",
  67: "United States",
  68: "United States",
  69: "Syria",
  70: "United States",
  71: "Japan",
  72: "Italy",
  73: "United Kingdom",
  74: "United States",
  75: "United States",
  76: "Denmark",
  77: "United Kingdom",
  78: "Ukraine",
  79: "Germany",
  80: "Germany",
};

function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/(?<=\.)\s+\d{1,3}\s+(?=[A-Z])/g, " ")
    .replace(/(?<=\d)\s+\d{1,3}\s+(?=[A-Za-z])/g, " ")
    .replace(/^:\s*/, "")
    .replace(/\s-\s/g, " - ")
    .trim();
}

function cleanSource(source: string) {
  return cleanText(source)
    .replace(/\+\d+/g, "")
    .replace(/\s+\d{1,3}$/, "")
    .trim();
}

export const scientists: Scientist[] = (scientistsRaw as RawScientist[]).map((scientist) => ({
  id: scientist.id,
  name: cleanText(scientist.name),
  field: fieldById[scientist.id],
  country: countryById[scientist.id],
  location: cleanText(scientist.location),
  century: cleanText(scientist.century),
  whatOpened: cleanText(scientist.whatOpened),
  shortBio: cleanText(scientist.short),
  longBio: cleanText(scientist.long),
  sources: scientist.sources.map(cleanSource),
  image: imageById[scientist.id],
}));

export function getScientistById(id: number) {
  return scientists.find((scientist) => scientist.id === id);
}
