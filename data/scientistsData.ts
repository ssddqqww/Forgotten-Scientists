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
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageScale?: number;
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
  1: "/scientist-photos/01-ellen-swallow-richards.jpg",
  3: "/scientist-photos/03-chien-shiung-wu.png",
  4: "/scientist-photos/04-nettie-maria-stevens.jpg",
  6: "/scientist-photos/06-julius-robert-von-mayer.jpg",
  7: "/scientist-photos/07-elizabeth-langdon-williams.jpg",
  8: "/scientist-photos/08-ida-noddack.png",
  9: "/scientist-photos/09-florence-bascom.jpg",
  10: "/scientist-photos/10-josephine-garis-cochrane.png",
  13: "/scientist-photos/13-annie-easley.jpg",
  15: "/scientist-photos/15-henrietta-swope.png",
  17: "/scientist-photos/17-agnes-pockels.jpg",
  18: "/scientist-photos/18-viktor-ambartsumian.png",
  21: "/scientist-photos/21-annie-scott-dill-maunder.jpg",
  22: "/scientist-photos/22-zonia-baber.jpg",
  23: "/scientist-photos/23-isabella-karle.jpg",
  24: "/scientist-photos/24-charles-henry-turner.jpg",
  26: "/scientist-photos/26-sophie-brahe.jpg",
  27: "/scientist-photos/27-caroline-herschel.jpg",
  28: "/scientist-photos/28-mary-somerville.jpg",
  29: "/scientist-photos/29-fanny-hesse.jpg",
  30: "/scientist-photos/30-rosalba-carriera.jpg",
  31: "/scientist-photos/31-dorothea-klumpke-roberts.jpg",
  33: "/scientist-photos/33-lydia-villa-komaroff.jpg",
  34: "/scientist-photos/34-beulah-louise-henry.jpg",
  36: "/scientist-photos/36-domenico-pacini.png",
  37: "/scientist-photos/37-ivan-stranski.jpg",
  38: "/scientist-photos/38-gabrio-piola.jpg",
  39: "/scientist-photos/39-hertha-ayrton.jpg",
  42: "/scientist-photos/42-ruby-hirose.jpg",
  44: "/scientist-photos/44-esther-lederberg.jpg",
  45: "/scientist-photos/45-charlotte-moore-sitterly.jpg",
  46: "/scientist-photos/46-marietta-blau.jpg",
  47: "/scientist-photos/47-annie-jump-cannon.jpg",
  50: "/scientist-photos/50-ellen-gleditsch.jpg",
  51: "/scientist-photos/51-fe-del-mundo.jpg",
  53: "/scientist-photos/53-alice-evans.jpg",
  54: "/scientist-photos/54-ellen-ochoa.jpg",
  55: "/scientist-photos/55-margarita-salas.jpg",
  56: "/scientist-photos/56-joan-feynman.jpg",
  57: "/scientist-photos/57-ruby-payne-scott.jpg",
  58: "/scientist-photos/58-mary-cartwright.jpg",
  59: "/scientist-photos/59-xia-peisu.jpg",
  60: "/scientist-photos/60-martha-haynes.jpg",
  62: "/scientist-photos/62-clara-immerwahr.jpg",
  63: "/scientist-photos/63-emily-warren-roebling.jpg",
  65: "/scientist-photos/65-mary-sears.jpg",
  66: "/scientist-photos/66-harriet-brooks.png",
  68: "/scientist-photos/68-alice-eastwood.jpg",
  72: "/scientist-photos/72-alessandra-giliani.jpg",
  73: "/scientist-photos/73-james-croll.jpg",
  76: "/scientist-photos/76-inge-lehmann.jpg",
  78: "/scientist-photos/78-simeon-aisenstein.jpg",
  79: "/scientist-photos/79-jakob-von-bielfeld.jpg",
  80: "/scientist-photos/80-johann-heinrich-lambert.jpg",
};

const imagePositionById: Partial<Record<number, string>> = {
  9: "center 38%",
  10: "center 38%",
  13: "center 38%",
  17: "center 22%",
  18: "center 30%",
  22: "center 38%",
  24: "center 35%",
  26: "center 18%",
  28: "center 40%",
  29: "center 24%",
  30: "center 38%",
  31: "center 35%",
  38: "center top",
  39: "center 58%",
  50: "center top",
  51: "center 35%",
  57: "center 38%",
  58: "center 38%",
  62: "center 18%",
  63: "center 62%",
  68: "center 58%",
  72: "center top",
  73: "center 58%",
  76: "center 58%",
  79: "center 38%",
  80: "center 38%",
};

const imageFitById: Partial<Record<number, "cover" | "contain">> = {
  37: "contain",
  50: "contain",
  62: "contain",
  68: "contain",
  72: "contain",
};

const imageScaleById: Partial<Record<number, number>> = {
  39: 1.08,
  63: 1.08,
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
  imagePosition: imagePositionById[scientist.id],
  imageFit: imageFitById[scientist.id],
  imageScale: imageScaleById[scientist.id],
}));

export function getScientistById(id: number) {
  return scientists.find((scientist) => scientist.id === id);
}
