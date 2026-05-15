import { scientists } from "./scientistsData";

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestionType =
  | "recognition"
  | "achievement"
  | "fieldUnderstanding"
  | "trueFalse"
  | "impact"
  | "oddOneOut"
  | "scenario"
  | "timeline"
  | "clue"
  | "compare"
  | "workOn"
  | "wrongMatch";

export type QuizQuestion = {
  id: number;
  type: QuizQuestionType;
  prompt: string;
  image?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export type FieldQuiz = {
  field: string;
  slug: string;
  title: string;
  category: "Fundamentals" | "Scientists" | "Discoveries";
  description: string;
  scientistNames: string[];
  image?: string;
  questions: QuizQuestion[];
};

export function slugifyField(field: string) {
  return field.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const physicsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "A cart's mass stays the same, but the net force on it becomes twice as large. What happens to its acceleration?",
    options: [
      { id: "a", text: "It doubles." },
      { id: "b", text: "It becomes half as large." },
      { id: "c", text: "It stays the same." },
      { id: "d", text: "It becomes zero." },
    ],
    correctOptionId: "a",
    explanation:
      "Newton's second law says acceleration is directly proportional to net force and inversely proportional to mass. With the same mass, doubling force doubles acceleration.",
    sourceLabel: "OpenStax, Newton's Second Law",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/4-3-newtons-second-law-of-motion-concept-of-a-system",
  },
  {
    id: 2,
    type: "wrongMatch",
    prompt: "Which statement about a physical relationship is incorrect?",
    options: [
      { id: "a", text: "For constant mass, F = ma connects net force and acceleration." },
      { id: "b", text: "For many conductors, current increases when voltage increases." },
      { id: "c", text: "For waves, speed equals frequency multiplied by wavelength." },
      { id: "d", text: "For gravity, force increases when distance between two masses doubles." },
    ],
    correctOptionId: "d",
    explanation:
      "Gravity follows an inverse-square relationship with distance, so doubling the distance makes the gravitational force four times smaller, not larger.",
    sourceLabel: "OpenStax, Universal Gravitation",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/6-5-newtons-universal-law-of-gravitation",
  },
  {
    id: 3,
    type: "trueFalse",
    prompt:
      "True or false: In an isolated system, the total momentum before a collision equals the total momentum after it.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only if the objects have equal mass" },
      { id: "d", text: "Only if no object moves after the collision" },
    ],
    correctOptionId: "a",
    explanation:
      "Momentum is conserved for an isolated system. Individual objects can change momentum, but the total system momentum remains constant.",
    sourceLabel: "OpenStax, Conservation of Momentum",
    sourceUrl: "https://openstax.org/books/physics/pages/8-2-conservation-of-momentum",
  },
  {
    id: 4,
    type: "fieldUnderstanding",
    prompt:
      "A wave travels at the same speed, but its frequency becomes higher. What must happen to its wavelength?",
    options: [
      { id: "a", text: "The wavelength becomes shorter." },
      { id: "b", text: "The wavelength becomes longer." },
      { id: "c", text: "The wavelength becomes infinite." },
      { id: "d", text: "The wavelength is not related to frequency." },
    ],
    correctOptionId: "a",
    explanation:
      "For waves, speed equals frequency times wavelength. If speed stays constant and frequency increases, wavelength must decrease.",
    sourceLabel: "OpenStax, Speed, Frequency, and Wavelength",
    sourceUrl: "https://openstax.org/books/college-physics/pages/17-2-speed-of-sound-frequency-and-wavelength",
  },
  {
    id: 5,
    type: "impact",
    prompt:
      "Why is the second law of thermodynamics important for understanding heat engines?",
    options: [
      { id: "a", text: "It explains why no heat engine can convert all input heat into useful work." },
      { id: "b", text: "It proves that engines do not need a temperature difference." },
      { id: "c", text: "It says heat naturally flows from colder objects to hotter objects." },
      { id: "d", text: "It removes the need for energy conservation." },
    ],
    correctOptionId: "a",
    explanation:
      "The second law limits the direction and usefulness of heat transfer. Some heat is always transferred to a cooler reservoir in a cyclic heat engine.",
    sourceLabel: "OpenStax, Second Law of Thermodynamics",
    sourceUrl: "https://openstax.org/books/college-physics/pages/15-3-introduction-to-the-second-law-of-thermodynamics-heat-engines-and-their-efficiency",
  },
  {
    id: 6,
    type: "compare",
    prompt: "Which comparison between kinetic energy and momentum is most accurate?",
    options: [
      { id: "a", text: "Kinetic energy depends on speed squared; momentum depends linearly on velocity." },
      { id: "b", text: "Momentum depends on speed squared; kinetic energy depends linearly on velocity." },
      { id: "c", text: "Both are always conserved in every collision." },
      { id: "d", text: "Neither depends on mass." },
    ],
    correctOptionId: "a",
    explanation:
      "Momentum is mass times velocity, while kinetic energy is one half mass times speed squared. That squared speed makes kinetic energy grow faster as speed increases.",
    sourceLabel: "OpenStax, Momentum and Kinetic Energy",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/8-3-conservation-of-momentum",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "An engineer wants to reduce the current in a simple circuit without changing the voltage source. What change best matches Ohm's law?",
    options: [
      { id: "a", text: "Increase the resistance." },
      { id: "b", text: "Decrease the resistance." },
      { id: "c", text: "Remove the resistance completely." },
      { id: "d", text: "Double both voltage and current by the same amount." },
    ],
    correctOptionId: "a",
    explanation:
      "Ohm's law relates current, voltage, and resistance. For the same voltage, higher resistance means lower current.",
    sourceLabel: "OpenStax, Ohm's Law",
    sourceUrl: "https://openstax.org/books/college-physics/pages/20-2-ohms-law-resistance-and-simple-circuits",
  },
  {
    id: 8,
    type: "clue",
    prompt:
      "Clue: It is measured in amperes and describes how much electric charge passes a point per unit time. What is it?",
    options: [
      { id: "a", text: "Electric current" },
      { id: "b", text: "Mass" },
      { id: "c", text: "Wavelength" },
      { id: "d", text: "Gravitational force" },
    ],
    correctOptionId: "a",
    explanation:
      "Electric current is the rate of flow of electric charge. The ampere is the SI unit used to measure it.",
    sourceLabel: "NIST, Ampere Introduction",
    sourceUrl: "https://www.nist.gov/si-redefinition/ampere-introduction",
  },
];

const physicsScientists = scientists.filter((scientist) => scientist.field === "Physics");

const physicsScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: This experimental physicist conducted the 1956 Wu experiment and showed that weak interactions violate parity symmetry. Who is she?",
    options: [
      { id: "a", text: "Chien-Shiung Wu" },
      { id: "b", text: "Marietta Blau" },
      { id: "c", text: "Joan Feynman" },
      { id: "d", text: "Katharine Burr Blodgett" },
    ],
    correctOptionId: "a",
    explanation:
      "Chien-Shiung Wu's 1956 Wu experiment showed that weak interactions violate parity symmetry.",
    sourceLabel: "Forgotten Scientists profile: Chien-Shiung Wu",
    sourceUrl: "/scientists/3",
  },
  {
    id: 2,
    type: "recognition",
    prompt:
      "Which physicist is connected with one of the earliest clear statements of conservation of energy?",
    options: [
      { id: "a", text: "Julius Robert von Mayer" },
      { id: "b", text: "Domenico Pacini" },
      { id: "c", text: "Elmer Samuel Imes" },
      { id: "d", text: "Harriet Brooks" },
    ],
    correctOptionId: "a",
    explanation:
      "Julius Robert von Mayer is described as a physician and physicist whose 1842 work laid down an early clear statement of energy conservation.",
    sourceLabel: "Forgotten Scientists profile: Julius Robert von Mayer",
    sourceUrl: "/scientists/6",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which scientist-achievement match is incorrect?",
    options: [
      { id: "a", text: "Katharine Burr Blodgett - non-reflective invisible glass" },
      { id: "b", text: "Elmer Samuel Imes - high-resolution infrared spectroscopy" },
      { id: "c", text: "Joan Feynman - solar wind and auroras" },
      { id: "d", text: "Chien-Shiung Wu - first practical method for invisible glass" },
    ],
    correctOptionId: "d",
    explanation:
      "Invisible glass is connected with Katharine Burr Blodgett. Chien-Shiung Wu is connected with parity violation in weak nuclear interactions.",
    sourceLabel: "Forgotten Scientists profiles: Wu and Blodgett",
    sourceUrl: "/scientists/3",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which statement best distinguishes Elmer Samuel Imes from Eunice Newton Foote?",
    options: [
      {
        id: "a",
        text: "Imes worked with infrared spectroscopy and molecular structure; Foote studied heat absorption by atmospheric gases.",
      },
      { id: "b", text: "Imes discovered invisible glass; Foote discovered atomic recoil." },
      { id: "c", text: "Both are described as space physicists studying solar wind." },
      { id: "d", text: "Foote conducted the Wu experiment; Imes worked on parity violation." },
    ],
    correctOptionId: "a",
    explanation:
      "Elmer Samuel Imes is connected with high-resolution infrared spectroscopy of diatomic molecules. Eunice Newton Foote is connected with experiments showing that carbon dioxide and water vapour absorb more heat than air.",
    sourceLabel: "Forgotten Scientists profiles: Imes and Foote",
    sourceUrl: "/scientists/16",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which scientist's key work came earlier?",
    options: [
      { id: "a", text: "Eunice Newton Foote's 1856 heat-absorption experiments" },
      { id: "b", text: "Chien-Shiung Wu's 1956 Wu experiment" },
      { id: "c", text: "Joan Feynman's space-weather research" },
      { id: "d", text: "Marietta Blau's nuclear emulsion work" },
    ],
    correctOptionId: "a",
    explanation:
      "Eunice Newton Foote's 1856 experiments are earlier than the 20th-century work listed in the other options.",
    sourceLabel: "Forgotten Scientists profile: Eunice Newton Foote",
    sourceUrl: "/scientists/19",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "Modern researchers want to improve models for space weather hazards affecting spacecraft. Which scientist's work is most closely connected to that topic?",
    options: [
      { id: "a", text: "Joan Feynman" },
      { id: "b", text: "Domenico Pacini" },
      { id: "c", text: "Julius Robert von Mayer" },
      { id: "d", text: "Katharine Burr Blodgett" },
    ],
    correctOptionId: "a",
    explanation:
      "Joan Feynman's work is connected with solar wind, auroras, sun-Earth interactions, and models for predicting space weather hazards.",
    sourceLabel: "Forgotten Scientists profile: Joan Feynman",
    sourceUrl: "/scientists/56",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Physics field?",
    options: [
      { id: "a", text: "Elizabeth Langdon Williams" },
      { id: "b", text: "Domenico Pacini" },
      { id: "c", text: "Harriet Brooks" },
      { id: "d", text: "Marietta Blau" },
    ],
    correctOptionId: "a",
    explanation:
      "Elizabeth Langdon Williams is listed under Astronomy, while Pacini, Brooks, and Blau are listed under Physics.",
    sourceLabel: "Forgotten Scientists profile: Elizabeth Langdon Williams",
    sourceUrl: "/scientists/7",
  },
  {
    id: 8,
    type: "achievement",
    prompt:
      "Harriet Brooks is connected with early nuclear physics. Which achievement belongs to her?",
    options: [
      { id: "a", text: "Work on radioactive emissions, radon, and atomic recoil" },
      { id: "b", text: "The first practical method for non-reflective glass" },
      { id: "c", text: "The 1956 experiment on parity violation" },
      { id: "d", text: "Underwater measurements pointing to cosmic rays" },
    ],
    correctOptionId: "a",
    explanation:
      "Harriet Brooks's work with Rutherford on radioactive emissions contributed to nuclear science; she also helped characterize radon and discovered atomic recoil.",
    sourceLabel: "Forgotten Scientists profile: Harriet Brooks",
    sourceUrl: "/scientists/66",
  },
];

const physicsDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "recognition",
    prompt:
      "Which discovery or result is connected with Chien-Shiung Wu?",
    options: [
      { id: "a", text: "Experimental proof that parity is violated in weak nuclear interactions" },
      { id: "b", text: "Non-reflective glass using monomolecular coatings" },
      { id: "c", text: "Early evidence that cosmic rays have an extraterrestrial component" },
      { id: "d", text: "Heat absorption by carbon dioxide and water vapour" },
    ],
    correctOptionId: "a",
    explanation:
      "Chien-Shiung Wu provided the first experimental proof that parity is violated in weak nuclear interactions.",
    sourceLabel: "Forgotten Scientists profile: Chien-Shiung Wu",
    sourceUrl: "/scientists/3",
  },
  {
    id: 2,
    type: "achievement",
    prompt:
      "Which achievement is connected with Elmer Samuel Imes?",
    options: [
      { id: "a", text: "High-resolution infrared spectroscopy of diatomic molecules" },
      { id: "b", text: "The first state water-quality standards" },
      { id: "c", text: "The discovery of rhenium" },
      { id: "d", text: "Calculations for Lowell's Planet X project" },
    ],
    correctOptionId: "a",
    explanation:
      "Elmer Samuel Imes is described as using high-resolution infrared spectroscopy of diatomic molecules, helping verify quantum theory and study molecular structure.",
    sourceLabel: "Forgotten Scientists profile: Elmer Samuel Imes",
    sourceUrl: "/scientists/16",
  },
  {
    id: 3,
    type: "scenario",
    prompt:
      "A lesson is about early experimental evidence that carbon dioxide and water vapour trap heat better than ordinary air. Which scientist should it connect to?",
    options: [
      { id: "a", text: "Eunice Newton Foote" },
      { id: "b", text: "Marietta Blau" },
      { id: "c", text: "Harriet Brooks" },
      { id: "d", text: "Joan Feynman" },
    ],
    correctOptionId: "a",
    explanation:
      "Eunice Newton Foote's 1856 experiments showed that carbon dioxide and water vapour trap heat more effectively than ordinary air.",
    sourceLabel: "Forgotten Scientists profile: Eunice Newton Foote",
    sourceUrl: "/scientists/19",
  },
  {
    id: 4,
    type: "clue",
    prompt:
      "Clue: This discovery involved molecular-thin coatings on glass and made clearer lenses, cameras, eyeglasses, and optical instruments possible. What is it?",
    options: [
      { id: "a", text: "Non-reflective invisible glass" },
      { id: "b", text: "Atomic recoil" },
      { id: "c", text: "Parity violation" },
      { id: "d", text: "The greenhouse effect" },
    ],
    correctOptionId: "a",
    explanation:
      "Katharine Burr Blodgett developed the first practical method to create non-reflective invisible glass using monomolecular coatings.",
    sourceLabel: "Forgotten Scientists profile: Katharine Burr Blodgett",
    sourceUrl: "/scientists/32",
  },
  {
    id: 5,
    type: "impact",
    prompt:
      "Why were Domenico Pacini's underwater and sea-level measurements important?",
    options: [
      { id: "a", text: "They provided early evidence that penetrating radiation could not come only from Earth's crust." },
      { id: "b", text: "They proved that heat engines can convert all heat into useful work." },
      { id: "c", text: "They created non-reflective glass for optical instruments." },
      { id: "d", text: "They established the first law of thermodynamics." },
    ],
    correctOptionId: "a",
    explanation:
      "Pacini's underwater and sea-level measurements showed that a significant part of penetrating radiation could not originate from Earth's crust, supporting the extraterrestrial component of cosmic rays.",
    sourceLabel: "Forgotten Scientists profile: Domenico Pacini",
    sourceUrl: "/scientists/36",
  },
  {
    id: 6,
    type: "wrongMatch",
    prompt: "Which discovery-person match is incorrect?",
    options: [
      { id: "a", text: "Marietta Blau - photographic nuclear emulsion method" },
      { id: "b", text: "Julius Robert von Mayer - conservation of energy" },
      { id: "c", text: "Joan Feynman - solar wind and auroras" },
      { id: "d", text: "Harriet Brooks - invisible glass" },
    ],
    correctOptionId: "d",
    explanation:
      "Invisible glass belongs to Katharine Burr Blodgett. Harriet Brooks is connected with radioactive emissions, radon, and atomic recoil.",
    sourceLabel: "Forgotten Scientists profile: Harriet Brooks",
    sourceUrl: "/scientists/66",
  },
  {
    id: 7,
    type: "fieldUnderstanding",
    prompt:
      "Which discovery is most directly connected with detecting or recording subatomic particle tracks?",
    options: [
      { id: "a", text: "Marietta Blau's photographic nuclear emulsion method" },
      { id: "b", text: "Eunice Newton Foote's heat-absorption experiments" },
      { id: "c", text: "Katharine Burr Blodgett's invisible glass" },
      { id: "d", text: "Julius Robert von Mayer's energy conservation statement" },
    ],
    correctOptionId: "a",
    explanation:
      "Marietta Blau pioneered the photographic nuclear emulsion method for detecting subatomic particles and recording particle tracks.",
    sourceLabel: "Forgotten Scientists profile: Marietta Blau",
    sourceUrl: "/scientists/46",
  },
  {
    id: 8,
    type: "compare",
    prompt:
      "Which comparison best matches Julius Robert von Mayer and Joan Feynman?",
    options: [
      {
        id: "a",
        text: "Mayer is connected with energy conservation; Feynman is connected with solar wind, auroras, and space weather.",
      },
      { id: "b", text: "Mayer invented invisible glass; Feynman discovered radon." },
      { id: "c", text: "Both are described as working on photographic nuclear emulsions." },
      { id: "d", text: "Feynman formulated energy conservation; Mayer predicted space weather hazards." },
    ],
    correctOptionId: "a",
    explanation:
      "Mayer is connected with conservation of energy. Joan Feynman is connected with solar wind, auroras, sun-Earth interactions, and space weather hazards.",
    sourceLabel: "Forgotten Scientists profiles: Mayer and Feynman",
    sourceUrl: "/scientists/6",
  },
];

const astronomyScientists = scientists.filter((scientist) => scientist.field === "Astronomy");

const astronomyFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "You watch the Moon for several weeks and see it change from thin crescent to full and back again. What causes these phases?",
    options: [
      { id: "a", text: "The changing view of the Moon's sunlit half as it orbits Earth" },
      { id: "b", text: "Earth's shadow falling on the Moon every night" },
      { id: "c", text: "The Moon producing more or less of its own light" },
      { id: "d", text: "Clouds blocking different parts of the Moon" },
    ],
    correctOptionId: "a",
    explanation:
      "The Moon shines by reflected sunlight. Its phases come from the changing geometry of the Sun, Earth, and Moon as the Moon orbits Earth.",
    sourceLabel: "OpenStax Astronomy, Phases and Motions of the Moon",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/4-5-phases-and-motions-of-the-moon",
  },
  {
    id: 2,
    type: "fieldUnderstanding",
    prompt: "According to Kepler's first law, what shape best describes a planet's orbit around the Sun?",
    options: [
      { id: "a", text: "An ellipse with the Sun at one focus" },
      { id: "b", text: "A perfect circle with Earth at the center" },
      { id: "c", text: "A straight line through space" },
      { id: "d", text: "A spiral moving steadily away from the Sun" },
    ],
    correctOptionId: "a",
    explanation:
      "Kepler's first law says that each planet moves around the Sun in an elliptical orbit, with the Sun at one focus of the ellipse.",
    sourceLabel: "NASA Science, Orbits and Kepler's Laws",
    sourceUrl: "https://science.nasa.gov/solar-system/orbits-and-keplers-laws/",
  },
  {
    id: 3,
    type: "trueFalse",
    prompt:
      "True or false: In Kepler's third law, planets with larger average distances from the Sun generally take longer to complete one orbit.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only for moons, not planets" },
      { id: "d", text: "Only if the orbit is a perfect circle" },
    ],
    correctOptionId: "a",
    explanation:
      "Kepler's third law relates a planet's orbital period to the size of its orbit. A larger semimajor axis corresponds to a longer orbital period.",
    sourceLabel: "OpenStax Astronomy, Laws of Planetary Motion",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion",
  },
  {
    id: 4,
    type: "clue",
    prompt:
      "Clue: Astronomers use these pulsating stars as important tools for measuring cosmic distances. What are they?",
    options: [
      { id: "a", text: "Cepheid variable stars" },
      { id: "b", text: "Solar eclipses" },
      { id: "c", text: "Asteroids" },
      { id: "d", text: "Lunar craters" },
    ],
    correctOptionId: "a",
    explanation:
      "Cepheid variable stars are important distance indicators because their predictable changes in brightness help astronomers estimate distances.",
    sourceLabel: "OpenStax Astronomy, Variable Stars",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/19-3-variable-stars-one-key-to-cosmic-distances",
  },
  {
    id: 5,
    type: "wrongMatch",
    prompt: "Which astronomy statement is incorrect?",
    options: [
      { id: "a", text: "The Moon reflects sunlight rather than producing its own visible light." },
      { id: "b", text: "Kepler's first law describes planetary orbits as ellipses." },
      { id: "c", text: "Cepheid variables can help measure distances in the universe." },
      { id: "d", text: "A lunar phase happens because the Moon changes its physical size." },
    ],
    correctOptionId: "d",
    explanation:
      "The Moon's physical size does not change during its phase cycle. The visible phase changes because we see different portions of the Moon's sunlit side.",
    sourceLabel: "OpenStax Astronomy, Moon Phases",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/4-5-phases-and-motions-of-the-moon",
  },
  {
    id: 6,
    type: "compare",
    prompt: "Which comparison between rotation and revolution is most accurate?",
    options: [
      { id: "a", text: "Rotation is spinning on an axis; revolution is orbiting another body." },
      { id: "b", text: "Rotation means orbiting the Sun; revolution means producing light." },
      { id: "c", text: "Rotation and revolution always mean exactly the same thing." },
      { id: "d", text: "Revolution only applies to stars, not planets or moons." },
    ],
    correctOptionId: "a",
    explanation:
      "In astronomy, rotation refers to an object's spin on its axis, while revolution refers to its motion around another body.",
    sourceLabel: "OpenStax Physics, Kepler's Laws",
    sourceUrl: "https://openstax.org/books/physics/pages/7-1-keplers-laws-of-planetary-motion",
  },
  {
    id: 7,
    type: "impact",
    prompt: "Why were Kepler's laws important for astronomy?",
    options: [
      { id: "a", text: "They gave a precise mathematical description of planetary motion." },
      { id: "b", text: "They proved that stars do not emit light." },
      { id: "c", text: "They replaced the need for all astronomical observations." },
      { id: "d", text: "They showed that the Moon is larger than the Sun." },
    ],
    correctOptionId: "a",
    explanation:
      "Kepler's laws provided a precise geometric description of planetary motion and helped astronomers calculate planetary positions more accurately.",
    sourceLabel: "OpenStax Astronomy, Laws of Planetary Motion",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion",
  },
  {
    id: 8,
    type: "workOn",
    prompt:
      "An astronomer wants to estimate the distance to another galaxy using stars whose brightness varies predictably. Which object type is most relevant?",
    options: [
      { id: "a", text: "Cepheid variable stars" },
      { id: "b", text: "Random meteors" },
      { id: "c", text: "The phases of Earth's Moon" },
      { id: "d", text: "Sunspots alone" },
    ],
    correctOptionId: "a",
    explanation:
      "Cepheid variables are used as distance indicators because their pulsation periods are tied to their intrinsic luminosities.",
    sourceLabel: "OpenStax Astronomy, Variable Stars",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/19-3-variable-stars-one-key-to-cosmic-distances",
  },
];

const astronomyScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: She performed orbit calculations for Percival Lowell's Planet X search, work that helped locate the object later recognized as Pluto. Who is she?",
    options: [
      { id: "a", text: "Elizabeth Langdon Williams" },
      { id: "b", text: "Annie Jump Cannon" },
      { id: "c", text: "Maria Cunitz" },
      { id: "d", text: "Caroline Herschel" },
    ],
    correctOptionId: "a",
    explanation:
      "Elizabeth Langdon Williams is connected with calculations for Lowell Observatory's Planet X project, which contributed to the eventual discovery of Pluto.",
    sourceLabel: "Forgotten Scientists profile: Elizabeth Langdon Williams",
    sourceUrl: "/scientists/7",
  },
  {
    id: 2,
    type: "recognition",
    prompt:
      "Which astronomer created the stellar spectral classification sequence O, B, A, F, G, K, M?",
    options: [
      { id: "a", text: "Annie Jump Cannon" },
      { id: "b", text: "Sophia Brahe" },
      { id: "c", text: "Ibn Yunus" },
      { id: "d", text: "Wang Zhenyi" },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Jump Cannon is connected with the stellar spectral classification system O, B, A, F, G, K, M, which became a universal standard.",
    sourceLabel: "Forgotten Scientists profile: Annie Jump Cannon",
    sourceUrl: "/scientists/47",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which scientist-achievement match is incorrect?",
    options: [
      { id: "a", text: "Caroline Herschel - discovered multiple comets" },
      { id: "b", text: "Henrietta Hill Swope - used Cepheids to measure cosmic distances" },
      { id: "c", text: "Taqi al-Din - established a major observatory in Istanbul" },
      { id: "d", text: "Mary Somerville - created the OBAFGKM stellar classification system" },
    ],
    correctOptionId: "d",
    explanation:
      "The OBAFGKM stellar classification system is connected with Annie Jump Cannon. Mary Somerville is described as making complex science and mathematics more accessible.",
    sourceLabel: "Forgotten Scientists profiles: Somerville and Cannon",
    sourceUrl: "/scientists/28",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which comparison best distinguishes Ibn al-Shatir from Ibn Yunus?",
    options: [
      {
        id: "a",
        text: "Ibn al-Shatir developed new planetary models; Ibn Yunus created precise astronomical tables.",
      },
      { id: "b", text: "Ibn Yunus discovered eight comets; Ibn al-Shatir led the Carte du Ciel project." },
      { id: "c", text: "Both are described as radio astronomers studying the Sun." },
      { id: "d", text: "Ibn al-Shatir invented invisible glass; Ibn Yunus worked on nuclear emulsion." },
    ],
    correctOptionId: "a",
    explanation:
      "Ibn al-Shatir is connected with new planetary models, while Ibn Yunus is connected with highly precise astronomical tables.",
    sourceLabel: "Forgotten Scientists profiles: Ibn al-Shatir and Ibn Yunus",
    sourceUrl: "/scientists/12",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which astronomer worked earlier?",
    options: [
      { id: "a", text: "Ibn Yunus, active around the 10th-11th centuries" },
      { id: "b", text: "Annie Jump Cannon, active in the 19th-20th centuries" },
      { id: "c", text: "Ruby Payne-Scott, active in the 20th century" },
      { id: "d", text: "Dorothea Klumpke Roberts, active in the 19th-20th centuries" },
    ],
    correctOptionId: "a",
    explanation:
      "Ibn Yunus is listed as a 10th-11th century astronomer, earlier than the 19th- and 20th-century astronomers in the other options.",
    sourceLabel: "Forgotten Scientists profile: Ibn Yunus",
    sourceUrl: "/scientists/14",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A museum exhibit is about women who discovered comets and helped make astronomy a profession for women. Which scientist fits best?",
    options: [
      { id: "a", text: "Caroline Lucretia Herschel" },
      { id: "b", text: "Charlotte Moore Sitterly" },
      { id: "c", text: "Maria Cunitz" },
      { id: "d", text: "Annie Maunder" },
    ],
    correctOptionId: "a",
    explanation:
      "Caroline Herschel is described as the first professional female astronomer and as a discoverer of multiple comets.",
    sourceLabel: "Forgotten Scientists profile: Caroline Herschel",
    sourceUrl: "/scientists/27",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Astronomy field?",
    options: [
      { id: "a", text: "Viktor Ambartsumian" },
      { id: "b", text: "Annie Maunder" },
      { id: "c", text: "Wang Zhenyi" },
      { id: "d", text: "John Michell" },
    ],
    correctOptionId: "a",
    explanation:
      "Viktor Ambartsumian is listed under Astrophysics, while Annie Maunder, Wang Zhenyi, and John Michell are listed under Astronomy.",
    sourceLabel: "Forgotten Scientists profile: Viktor Ambartsumian",
    sourceUrl: "/scientists/18",
  },
  {
    id: 8,
    type: "achievement",
    prompt:
      "Which scientist is connected with the first radio interferometry observations of the Sun's radio emission?",
    options: [
      { id: "a", text: "Ruby Violet Payne-Scott" },
      { id: "b", text: "Dorothea Klumpke Roberts" },
      { id: "c", text: "Sophia Brahe" },
      { id: "d", text: "Taqi al-Din" },
    ],
    correctOptionId: "a",
    explanation:
      "Ruby Payne-Scott is connected with helping establish radio astronomy and with early radio interferometry observations of the Sun's radio emission.",
    sourceLabel: "Forgotten Scientists profile: Ruby Payne-Scott",
    sourceUrl: "/scientists/57",
  },
];

const astronomyDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "recognition",
    prompt: "Which achievement is connected with Henrietta Hill Swope?",
    options: [
      { id: "a", text: "Using Cepheid variable stars to measure distances across the universe" },
      { id: "b", text: "Discovering eight comets" },
      { id: "c", text: "Explaining eclipses through experiments and writings" },
      { id: "d", text: "Creating standard atomic data tables from solar spectra" },
    ],
    correctOptionId: "a",
    explanation:
      "Henrietta Hill Swope is connected with precise measurements of Cepheid variable stars and their use in determining galaxy distances.",
    sourceLabel: "Forgotten Scientists profile: Henrietta Hill Swope",
    sourceUrl: "/scientists/15",
  },
  {
    id: 2,
    type: "scenario",
    prompt:
      "An astronomy class is studying how sunspot latitudes shift during the solar cycle. Which scientist's work is most relevant?",
    options: [
      { id: "a", text: "Annie Scott Dill Maunder" },
      { id: "b", text: "Maria Cunitz" },
      { id: "c", text: "Elizabeth Langdon Williams" },
      { id: "d", text: "Mary Somerville" },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Maunder is connected with the butterfly diagram of sunspot latitudes and with documenting solar-cycle behavior.",
    sourceLabel: "Forgotten Scientists profile: Annie Maunder",
    sourceUrl: "/scientists/21",
  },
  {
    id: 3,
    type: "clue",
    prompt:
      "Clue: This 17th-century astronomer published Urania Propitia, making planetary tables simpler and more accessible. Who is she?",
    options: [
      { id: "a", text: "Maria Cunitz" },
      { id: "b", text: "Sophia Brahe" },
      { id: "c", text: "Wang Zhenyi" },
      { id: "d", text: "Charlotte Moore Sitterly" },
    ],
    correctOptionId: "a",
    explanation:
      "Maria Cunitz published Urania Propitia, a simplified and improved version of planetary tables that made astronomical calculations more accessible.",
    sourceLabel: "Forgotten Scientists profile: Maria Cunitz",
    sourceUrl: "/scientists/35",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which discovery-person match is incorrect?",
    options: [
      { id: "a", text: "Charlotte Moore Sitterly - standard atomic spectra and energy-level tables" },
      { id: "b", text: "Dorothea Klumpke Roberts - Carte du Ciel measurement work" },
      { id: "c", text: "Wang Zhenyi - writing on eclipses and celestial motion" },
      { id: "d", text: "Taqi al-Din - discovered eight comets" },
    ],
    correctOptionId: "d",
    explanation:
      "Caroline Herschel is connected with discovering multiple comets. Taqi al-Din is connected with the Istanbul observatory and decimal-fraction-based astronomical calculations.",
    sourceLabel: "Forgotten Scientists profiles: Taqi al-Din and Herschel",
    sourceUrl: "/scientists/11",
  },
  {
    id: 5,
    type: "impact",
    prompt: "Why was Dorothea Klumpke Roberts's work important?",
    options: [
      { id: "a", text: "She contributed to Carte du Ciel and helped open professional astronomy to women." },
      { id: "b", text: "She proved that weak nuclear interactions violate parity." },
      { id: "c", text: "She invented non-reflective glass." },
      { id: "d", text: "She discovered atomic recoil." },
    ],
    correctOptionId: "a",
    explanation:
      "Dorothea Klumpke Roberts is connected with Paris Observatory measurement work for Carte du Ciel and with opening professional astronomy to women.",
    sourceLabel: "Forgotten Scientists profile: Dorothea Klumpke Roberts",
    sourceUrl: "/scientists/31",
  },
  {
    id: 6,
    type: "compare",
    prompt: "Which comparison best matches Wang Zhenyi and Charlotte Moore Sitterly?",
    options: [
      {
        id: "a",
        text: "Wang explained eclipses and celestial motion; Sitterly created authoritative atomic spectra tables.",
      },
      { id: "b", text: "Wang led the Carte du Ciel project; Sitterly discovered Pluto." },
      { id: "c", text: "Both are described as comet discoverers." },
      { id: "d", text: "Sitterly wrote Urania Propitia; Wang created the OBAFGKM system." },
    ],
    correctOptionId: "a",
    explanation:
      "Wang Zhenyi is connected with explanations of eclipses and celestial motion. Charlotte Moore Sitterly is connected with spectroscopic measurements and standard atomic data tables.",
    sourceLabel: "Forgotten Scientists profiles: Wang Zhenyi and Charlotte Moore Sitterly",
    sourceUrl: "/scientists/48",
  },
  {
    id: 7,
    type: "fieldUnderstanding",
    prompt:
      "Which achievement is most directly connected with classifying stars by temperature?",
    options: [
      { id: "a", text: "Annie Jump Cannon's OBAFGKM spectral classification system" },
      { id: "b", text: "Elizabeth Langdon Williams's Planet X calculations" },
      { id: "c", text: "Ruby Payne-Scott's solar radio observations" },
      { id: "d", text: "Sophia Brahe's assistance with Tycho Brahe's observations" },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Jump Cannon's OBAFGKM spectral classification system categorizes stars by temperature and remains foundational in astronomy.",
    sourceLabel: "Forgotten Scientists profile: Annie Jump Cannon",
    sourceUrl: "/scientists/47",
  },
  {
    id: 8,
    type: "workOn",
    prompt:
      "A researcher is writing about the early idea of objects so dense that light could not escape. Which scientist should be included?",
    options: [
      { id: "a", text: "John Michell" },
      { id: "b", text: "Ibn Yunus" },
      { id: "c", text: "Henrietta Hill Swope" },
      { id: "d", text: "Caroline Herschel" },
    ],
    correctOptionId: "a",
    explanation:
      "John Michell is described as proposing the theoretical existence of objects whose gravity would prevent even light from escaping, anticipating the idea later known as black holes.",
    sourceLabel: "Forgotten Scientists profile: John Michell",
    sourceUrl: "/scientists/77",
  },
];

const astronomyQuizCards: FieldQuiz[] = [
  {
    field: "Astronomy",
    slug: "astronomy-fundamentals",
    title: "Astronomy Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about Moon phases, orbits, Kepler's laws, and distance indicators.",
    scientistNames: astronomyScientists.map((scientist) => scientist.name),
    image: "/quiz-images/astronomy-fundamentals.png",
    questions: astronomyFundamentalsQuestions,
  },
  {
    field: "Astronomy",
    slug: "astronomy-scientists",
    title: "Astronomy Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured astronomers and the work connected to them.",
    scientistNames: astronomyScientists.map((scientist) => scientist.name),
    image: "/quiz-images/astronomy-scientists.jpg",
    questions: astronomyScientistQuestions,
  },
  {
    field: "Astronomy",
    slug: "astronomy-discoveries",
    title: "Astronomy Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about astronomy achievements, tools, observations, and historical context.",
    scientistNames: astronomyScientists.map((scientist) => scientist.name),
    image: "/quiz-images/astronomy-discoveries.png",
    questions: astronomyDiscoveryQuestions,
  },
];

const chemistryScientists = scientists.filter((scientist) => scientist.field === "Chemistry");

const chemistryFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt: "Clue: This number equals the number of protons in an atom's nucleus and defines the element. What is it?",
    options: [
      { id: "a", text: "Atomic number" },
      { id: "b", text: "Mass number" },
      { id: "c", text: "pH value" },
      { id: "d", text: "Molecular formula" },
    ],
    correctOptionId: "a",
    explanation:
      "The atomic number is the number of protons in the nucleus and defines the identity of an element.",
    sourceLabel: "OpenStax Chemistry 2e, Chapter 2 Summary",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/2-summary",
  },
  {
    id: 2,
    type: "compare",
    prompt: "Which comparison between isotopes of the same element is most accurate?",
    options: [
      { id: "a", text: "They have the same number of protons but different numbers of neutrons." },
      { id: "b", text: "They have different numbers of protons and are different elements." },
      { id: "c", text: "They always have the same mass number." },
      { id: "d", text: "They differ only in the number of electrons in a neutral atom." },
    ],
    correctOptionId: "a",
    explanation:
      "Isotopes of an element have the same atomic number but different mass numbers, meaning they differ in the number of neutrons.",
    sourceLabel: "OpenStax Chemistry 2e, Chapter 2 Summary",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/2-summary",
  },
  {
    id: 3,
    type: "fieldUnderstanding",
    prompt: "What holds the ions together in an ionic compound?",
    options: [
      { id: "a", text: "Electrostatic attraction between oppositely charged ions" },
      { id: "b", text: "Shared electrons between identical atoms only" },
      { id: "c", text: "Gravity between neutral molecules" },
      { id: "d", text: "The nucleus changing into a different element" },
    ],
    correctOptionId: "a",
    explanation:
      "Ionic compounds are held together by ionic bonds: electrostatic attractions between cations and anions.",
    sourceLabel: "OpenStax Chemistry 2e, Ionic Bonding",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/7-1-ionic-bonding",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which bonding statement is incorrect?",
    options: [
      { id: "a", text: "Covalent bonds involve shared pairs of electrons." },
      { id: "b", text: "Ionic compounds contain ions held together by attraction between opposite charges." },
      { id: "c", text: "Covalent bonding commonly occurs between nonmetal atoms." },
      { id: "d", text: "Covalent bonds form because atoms permanently transfer all electrons to one atom." },
    ],
    correctOptionId: "d",
    explanation:
      "Covalent bonds form through sharing electrons. Electron transfer is associated with ionic bonding.",
    sourceLabel: "OpenStax Chemistry 2e, Covalent Bonding",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/7-2-covalent-bonding",
  },
  {
    id: 5,
    type: "trueFalse",
    prompt: "True or false: At 25 °C, a solution with pH less than 7 is acidic.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only if it contains no water" },
      { id: "d", text: "Only if it has no hydronium ions" },
    ],
    correctOptionId: "a",
    explanation:
      "At 25 °C, acidic solutions have pH values below 7, neutral solutions have pH 7, and basic solutions have pH values above 7.",
    sourceLabel: "OpenStax Chemistry 2e, pH and pOH",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh",
  },
  {
    id: 6,
    type: "scenario",
    prompt:
      "A reaction involves one substance donating a hydrogen ion and another accepting it. Which acid-base model best describes this?",
    options: [
      { id: "a", text: "Brønsted-Lowry acid-base theory" },
      { id: "b", text: "Kepler's laws" },
      { id: "c", text: "Stellar classification" },
      { id: "d", text: "Crystal growth by epitaxy" },
    ],
    correctOptionId: "a",
    explanation:
      "In the Brønsted-Lowry model, acids donate protons and bases accept protons.",
    sourceLabel: "OpenStax Chemistry 2e, Brønsted-Lowry Acids and Bases",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases",
  },
  {
    id: 7,
    type: "recognition",
    prompt: "What does a molecular formula show?",
    options: [
      { id: "a", text: "The exact numbers of different atoms in a molecule or compound" },
      { id: "b", text: "Only the color of a solution" },
      { id: "c", text: "Only whether a substance is hot or cold" },
      { id: "d", text: "The distance from Earth to the Sun" },
    ],
    correctOptionId: "a",
    explanation:
      "A molecular formula uses element symbols and subscripts to show the exact numbers of atoms in a molecule or compound.",
    sourceLabel: "OpenStax Chemistry 2e, Chapter 2 Summary",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/2-summary",
  },
  {
    id: 8,
    type: "impact",
    prompt: "Why is electronegativity useful when thinking about chemical bonds?",
    options: [
      { id: "a", text: "It helps estimate how strongly an atom attracts electrons in a bond." },
      { id: "b", text: "It tells how many planets orbit a star." },
      { id: "c", text: "It measures the age of a fossil directly." },
      { id: "d", text: "It removes the need to know anything about electrons." },
    ],
    correctOptionId: "a",
    explanation:
      "Electronegativity is the ability of an atom to attract a pair of electrons in a chemical bond, helping describe bond polarity.",
    sourceLabel: "OpenStax Chemistry 2e, Covalent Bonding",
    sourceUrl: "https://openstax.org/books/chemistry-2e/pages/7-2-covalent-bonding",
  },
];

const chemistryScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: She was the first woman to graduate from MIT and is connected with sanitary chemistry, water quality, and home economics. Who is she?",
    options: [
      { id: "a", text: "Ellen Henrietta Swallow Richards" },
      { id: "b", text: "Agnes Pockels" },
      { id: "c", text: "Clara Immerwahr" },
      { id: "d", text: "Hazel Bishop" },
    ],
    correctOptionId: "a",
    explanation:
      "Ellen Swallow Richards is described as the first woman to graduate from MIT and as a pioneer of sanitary chemistry and home economics.",
    sourceLabel: "Forgotten Scientists profile: Ellen Swallow Richards",
    sourceUrl: "/scientists/1",
  },
  {
    id: 2,
    type: "recognition",
    prompt: "Which chemist co-discovered rhenium and later suggested the possibility of nuclear fission?",
    options: [
      { id: "a", text: "Ida Eva Noddack" },
      { id: "b", text: "Tapputi-Belatekallim" },
      { id: "c", text: "Ellen Gleditsch" },
      { id: "d", text: "Isabella Karle" },
    ],
    correctOptionId: "a",
    explanation:
      "Ida Noddack is connected with co-discovering rhenium and with an early public hypothesis that atomic nuclei might split.",
    sourceLabel: "Forgotten Scientists profile: Ida Noddack",
    sourceUrl: "/scientists/8",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which scientist-achievement match is incorrect?",
    options: [
      { id: "a", text: "Agnes Pockels - surface films and surface tension" },
      { id: "b", text: "Isabella Karle - X-ray methods for molecular crystal structures" },
      { id: "c", text: "Hazel Bishop - first US-wide water-quality standards" },
      { id: "d", text: "Tapputi-Belatekallim - ancient perfume extraction and distillation" },
    ],
    correctOptionId: "c",
    explanation:
      "Water-quality standards are connected with Ellen Swallow Richards. Hazel Bishop is connected with long-lasting, smudge-proof lipstick.",
    sourceLabel: "Forgotten Scientists profiles: Hazel Bishop and Ellen Swallow Richards",
    sourceUrl: "/scientists/52",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which comparison best distinguishes Agnes Pockels from Isabella Karle?",
    options: [
      {
        id: "a",
        text: "Pockels studied surface films and surface tension; Karle developed X-ray methods for molecular structures.",
      },
      { id: "b", text: "Pockels discovered rhenium; Karle invented smudge-proof lipstick." },
      { id: "c", text: "Both are described as ancient perfume makers." },
      { id: "d", text: "Karle studied water-quality standards; Pockels worked on DNA polymerase." },
    ],
    correctOptionId: "a",
    explanation:
      "Agnes Pockels is connected with surface films and surface tension, while Isabella Karle is connected with X-ray diffraction methods for molecular crystal structures.",
    sourceLabel: "Forgotten Scientists profiles: Agnes Pockels and Isabella Karle",
    sourceUrl: "/scientists/17",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which chemistry figure is earliest in the timeline?",
    options: [
      { id: "a", text: "Tapputi-Belatekallim, around 1200 BC" },
      { id: "b", text: "Ellen Gleditsch, 19th-20th century" },
      { id: "c", text: "Hazel Bishop, 20th century" },
      { id: "d", text: "Ida Noddack, 20th century" },
    ],
    correctOptionId: "a",
    explanation:
      "Tapputi-Belatekallim is described as an ancient Mesopotamian perfume maker from around 1200 BC, earlier than the modern chemists listed.",
    sourceLabel: "Forgotten Scientists profile: Tapputi-Belatekallim",
    sourceUrl: "/scientists/49",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A city wants to improve testing of water, air, and food for public health. Which scientist's work connects most closely?",
    options: [
      { id: "a", text: "Ellen Henrietta Swallow Richards" },
      { id: "b", text: "Ivan Stranski" },
      { id: "c", text: "Hasan al-Rammah" },
      { id: "d", text: "Clara Immerwahr" },
    ],
    correctOptionId: "a",
    explanation:
      "Ellen Swallow Richards's work focused on analyzing water, air, and food for quality and safety and contributed to water-quality standards.",
    sourceLabel: "Forgotten Scientists profile: Ellen Swallow Richards",
    sourceUrl: "/scientists/1",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Chemistry field?",
    options: [
      { id: "a", text: "Ruby Sakae Hirose" },
      { id: "b", text: "Agnes Pockels" },
      { id: "c", text: "Isabella Karle" },
      { id: "d", text: "Ellen Gleditsch" },
    ],
    correctOptionId: "a",
    explanation:
      "Ruby Sakae Hirose is listed under Biochemistry, while Pockels, Karle, and Gleditsch are listed under Chemistry.",
    sourceLabel: "Forgotten Scientists profile: Ruby Hirose",
    sourceUrl: "/scientists/42",
  },
  {
    id: 8,
    type: "achievement",
    prompt: "Which achievement belongs to Clara Immerwahr?",
    options: [
      { id: "a", text: "Becoming one of the earliest women in Germany to earn a doctorate in chemistry" },
      { id: "b", text: "Creating the first practical non-reflective glass" },
      { id: "c", text: "Building the first major observatory in Istanbul" },
      { id: "d", text: "Creating the OBAFGKM stellar classification system" },
    ],
    correctOptionId: "a",
    explanation:
      "Clara Immerwahr is described as one of the earliest women in Germany to earn a doctorate in chemistry and as a pioneering physical chemist.",
    sourceLabel: "Forgotten Scientists profile: Clara Immerwahr",
    sourceUrl: "/scientists/62",
  },
];

const chemistryDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "recognition",
    prompt: "Which achievement is connected with Ellen Swallow Richards?",
    options: [
      { id: "a", text: "Sanitary chemistry, home economics, and early water-quality standards" },
      { id: "b", text: "Rhenium discovery and nuclear fission hypothesis" },
      { id: "c", text: "Smudge-proof lipstick" },
      { id: "d", text: "Gunpowder and rocket compositions" },
    ],
    correctOptionId: "a",
    explanation:
      "Ellen Swallow Richards founded sanitary chemistry and home economics and contributed to early water-quality standards.",
    sourceLabel: "Forgotten Scientists profile: Ellen Swallow Richards",
    sourceUrl: "/scientists/1",
  },
  {
    id: 2,
    type: "clue",
    prompt:
      "Clue: This discovery involved the chemical element rhenium and an early idea that atomic nuclei might split. Who is connected with it?",
    options: [
      { id: "a", text: "Ida Eva Noddack" },
      { id: "b", text: "Hazel Bishop" },
      { id: "c", text: "Agnes Pockels" },
      { id: "d", text: "Hasan al-Rammah" },
    ],
    correctOptionId: "a",
    explanation:
      "Ida Noddack co-discovered rhenium and was among the first to propose the possibility of nuclear fission.",
    sourceLabel: "Forgotten Scientists profile: Ida Noddack",
    sourceUrl: "/scientists/8",
  },
  {
    id: 3,
    type: "scenario",
    prompt:
      "A researcher is studying how contamination and molecular films change the surface tension of liquids. Which scientist's work is most relevant?",
    options: [
      { id: "a", text: "Agnes Pockels" },
      { id: "b", text: "Tapputi-Belatekallim" },
      { id: "c", text: "Ellen Gleditsch" },
      { id: "d", text: "Clara Immerwahr" },
    ],
    correctOptionId: "a",
    explanation:
      "Agnes Pockels showed that liquid surface films change surface tension depending on contamination and area.",
    sourceLabel: "Forgotten Scientists profile: Agnes Pockels",
    sourceUrl: "/scientists/17",
  },
  {
    id: 4,
    type: "impact",
    prompt: "Why were Isabella Karle's X-ray methods important?",
    options: [
      { id: "a", text: "They made determination of molecular crystal structures efficient and reliable." },
      { id: "b", text: "They created the first US-wide water-quality standards." },
      { id: "c", text: "They proved that carbon dioxide absorbs more heat than air." },
      { id: "d", text: "They created a stellar classification system." },
    ],
    correctOptionId: "a",
    explanation:
      "Isabella Karle developed practical X-ray scattering methods that made determining molecular crystal structures efficient and reliable.",
    sourceLabel: "Forgotten Scientists profile: Isabella Karle",
    sourceUrl: "/scientists/23",
  },
  {
    id: 5,
    type: "wrongMatch",
    prompt: "Which discovery-person match is incorrect?",
    options: [
      { id: "a", text: "Ivan Stranski - theories of crystal growth and surface chemistry" },
      { id: "b", text: "Tapputi-Belatekallim - perfume extraction, distillation, and filtration" },
      { id: "c", text: "Ellen Gleditsch - half-life of radium and evidence for isotopes" },
      { id: "d", text: "Hazel Bishop - discovery of rhenium" },
    ],
    correctOptionId: "d",
    explanation:
      "Rhenium is connected with Ida Noddack. Hazel Bishop is connected with long-lasting, smudge-proof lipstick.",
    sourceLabel: "Forgotten Scientists profile: Hazel Bishop",
    sourceUrl: "/scientists/52",
  },
  {
    id: 6,
    type: "fieldUnderstanding",
    prompt:
      "Which achievement is most directly connected with crystal growth, thin-film growth, and materials science?",
    options: [
      { id: "a", text: "Ivan Stranski's crystal-growth theories" },
      { id: "b", text: "Hazel Bishop's no-smear lipstick" },
      { id: "c", text: "Ellen Richards's water-quality survey" },
      { id: "d", text: "Hasan al-Rammah's gunpowder recipes" },
    ],
    correctOptionId: "a",
    explanation:
      "Ivan Stranski developed foundational theories of crystal growth and surface chemistry, including models important for thin-film and epitaxial growth.",
    sourceLabel: "Forgotten Scientists profile: Ivan Stranski",
    sourceUrl: "/scientists/37",
  },
  {
    id: 7,
    type: "compare",
    prompt: "Which comparison best matches Tapputi-Belatekallim and Hasan al-Rammah?",
    options: [
      {
        id: "a",
        text: "Tapputi is connected with perfume-making techniques; Hasan al-Rammah is connected with gunpowder and pyrotechnic devices.",
      },
      { id: "b", text: "Tapputi discovered rhenium; Hasan created smudge-proof lipstick." },
      { id: "c", text: "Both are described as X-ray crystallographers." },
      { id: "d", text: "Hasan worked on sanitary chemistry; Tapputi established radium half-life." },
    ],
    correctOptionId: "a",
    explanation:
      "Tapputi-Belatekallim is connected with early perfume extraction, distillation, and filtration. Hasan al-Rammah is connected with gunpowder formulations and pyrotechnic devices.",
    sourceLabel: "Forgotten Scientists profiles: Tapputi-Belatekallim and Hasan al-Rammah",
    sourceUrl: "/scientists/49",
  },
  {
    id: 8,
    type: "workOn",
    prompt:
      "A cosmetics lab wants to understand the history of long-lasting lipstick. Which chemist should be included?",
    options: [
      { id: "a", text: "Hazel Gladys Bishop" },
      { id: "b", text: "Clara Immerwahr" },
      { id: "c", text: "Ellen Gleditsch" },
      { id: "d", text: "Agnes Pockels" },
    ],
    correctOptionId: "a",
    explanation:
      "Hazel Bishop invented the first long-lasting, smudge-proof lipstick, transforming cosmetic chemistry and consumer beauty products.",
    sourceLabel: "Forgotten Scientists profile: Hazel Bishop",
    sourceUrl: "/scientists/52",
  },
];

const medicineScientists = scientists.filter((scientist) => scientist.field === "Medicine");

const medicineFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: It keeps internal body conditions, such as temperature and blood pressure, within a healthy range. What is it?",
    options: [
      { id: "a", text: "Homeostasis" },
      { id: "b", text: "Torque" },
      { id: "c", text: "Surface tension" },
      { id: "d", text: "A stellar parallax" },
    ],
    correctOptionId: "a",
    explanation:
      "Homeostasis is the maintenance of relatively stable internal conditions, often through feedback systems.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, Homeostasis",
    sourceUrl: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-5-homeostasis",
  },
  {
    id: 2,
    type: "wrongMatch",
    prompt: "Which statement about immunity is incorrect?",
    options: [
      { id: "a", text: "Innate immunity responds relatively quickly and is less specific." },
      { id: "b", text: "Adaptive immunity is more specific and can develop memory." },
      { id: "c", text: "Vaccination can help prepare adaptive immune protection." },
      { id: "d", text: "The immune system never uses cells to respond to pathogens." },
    ],
    correctOptionId: "d",
    explanation:
      "Immune responses involve many cells, including phagocytes in innate immunity and lymphocytes in adaptive immunity.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, Barrier Defenses and Innate Immune Response",
    sourceUrl: "https://openstax.org/books/anatomy-and-physiology-2e/pages/21-2-barrier-defenses-and-the-innate-immune-response",
  },
  {
    id: 3,
    type: "scenario",
    prompt:
      "A community vaccination program reduces the number of people who can easily spread a disease. Which concept explains the wider protection?",
    options: [
      { id: "a", text: "Herd immunity" },
      { id: "b", text: "Green's theorem" },
      { id: "c", text: "Crystal growth" },
      { id: "d", text: "A three-point seatbelt" },
    ],
    correctOptionId: "a",
    explanation:
      "Herd immunity occurs when there are too few susceptible individuals for a disease to spread effectively through a population.",
    sourceLabel: "OpenStax Microbiology, Vaccines",
    sourceUrl: "https://openstax.org/books/microbiology/pages/18-5-vaccines",
  },
  {
    id: 4,
    type: "fieldUnderstanding",
    prompt: "What is selective toxicity in antimicrobial treatment?",
    options: [
      { id: "a", text: "Targeting microbes while causing less harm to human cells" },
      { id: "b", text: "Making every human cell divide faster" },
      { id: "c", text: "Replacing diagnosis with guesswork" },
      { id: "d", text: "Using medicines only for nonliving objects" },
    ],
    correctOptionId: "a",
    explanation:
      "Selective toxicity means a drug affects a microbial target more than it affects the host's cells.",
    sourceLabel: "OpenStax Microbiology, Mechanisms of Antibacterial Drugs",
    sourceUrl: "https://openstax.org/books/microbiology/pages/14-3-mechanisms-of-antibacterial-drugs",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison between innate and adaptive immunity is most accurate?",
    options: [
      { id: "a", text: "Innate responses are rapid and broad; adaptive responses are more specific and develop memory." },
      { id: "b", text: "Innate immunity only works after vaccination; adaptive immunity never recognizes pathogens." },
      { id: "c", text: "Adaptive immunity is a type of bridge engineering." },
      { id: "d", text: "Innate and adaptive immunity are unrelated to infection." },
    ],
    correctOptionId: "a",
    explanation:
      "Innate immunity acts quickly and broadly, while adaptive immunity is more specific and can produce immunological memory.",
    sourceLabel: "OpenStax Biology 2e, Adaptive Immune Response",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/42-2-adaptive-immune-response",
  },
  {
    id: 6,
    type: "trueFalse",
    prompt: "True or false: Overuse and misuse of antimicrobials can contribute to antimicrobial resistance.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only in astronomy" },
      { id: "d", text: "Only when no microbes are present" },
    ],
    correctOptionId: "a",
    explanation:
      "Overuse, misuse, inappropriate use, subtherapeutic dosing, and noncompliance can accelerate antimicrobial resistance.",
    sourceLabel: "OpenStax Microbiology, Drug Resistance",
    sourceUrl: "https://openstax.org/books/microbiology/pages/14-5-drug-resistance",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "A doctor wants to understand both the structure of an organ and how it works. Which pair of fields is most directly involved?",
    options: [
      { id: "a", text: "Anatomy and physiology" },
      { id: "b", text: "Cartography and photometry" },
      { id: "c", text: "Radio telegraphy and pyrotechnics" },
      { id: "d", text: "Crystallography and lipstick chemistry" },
    ],
    correctOptionId: "a",
    explanation:
      "Anatomy studies body structures, while physiology studies how those structures function.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, Introduction",
    sourceUrl: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction",
  },
  {
    id: 8,
    type: "impact",
    prompt: "Why is public health different from treating only one individual patient?",
    options: [
      { id: "a", text: "It focuses on preventing disease and improving health across groups or communities." },
      { id: "b", text: "It ignores prevention and only studies bridges." },
      { id: "c", text: "It is the same as measuring electric current." },
      { id: "d", text: "It applies only to telescope design." },
    ],
    correctOptionId: "a",
    explanation:
      "Public-health work focuses on health at the community or population level, including prevention and education.",
    sourceLabel: "OpenStax Microbiology, Vaccines",
    sourceUrl: "https://openstax.org/books/microbiology/pages/18-5-vaccines",
  },
];

const medicineScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "recognition",
    prompt:
      "Which physician transformed child healthcare in the Philippines by founding its first pediatric hospital?",
    options: [
      { id: "a", text: "Fe Primitiva del Mundo" },
      { id: "b", text: "Louise Pearce" },
      { id: "c", text: "Alessandra Giliani" },
      { id: "d", text: "Alice Catherine Evans" },
    ],
    correctOptionId: "a",
    explanation:
      "Fe del Mundo founded the Children's Memorial Hospital in Quezon City, the first pediatric hospital in the Philippines.",
    sourceLabel: "Forgotten Scientists profile: Fe del Mundo",
    sourceUrl: "/scientists/51",
  },
  {
    id: 2,
    type: "clue",
    prompt:
      "Clue: Her Rockefeller Institute research helped develop treatment for African sleeping sickness. Who is she?",
    options: [
      { id: "a", text: "Louise Pearce" },
      { id: "b", text: "Fe del Mundo" },
      { id: "c", text: "Bessie Blount Griffin" },
      { id: "d", text: "Matilda Moldenhauer Brooks" },
    ],
    correctOptionId: "a",
    explanation:
      "Louise Pearce helped test and develop treatment protocols for African sleeping sickness using arsenic-based compounds.",
    sourceLabel: "Forgotten Scientists profile: Louise Pearce",
    sourceUrl: "/scientists/74",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which medicine-related match is incorrect?",
    options: [
      { id: "a", text: "Fe del Mundo - pediatrics and child healthcare" },
      { id: "b", text: "Louise Pearce - African sleeping sickness treatment research" },
      { id: "c", text: "Alessandra Giliani - early anatomical preparation tradition" },
      { id: "d", text: "Fe del Mundo - discovery of rhenium" },
    ],
    correctOptionId: "d",
    explanation:
      "Rhenium is connected with Ida Noddack. Fe del Mundo is connected with pediatrics, child healthcare, and community-oriented care.",
    sourceLabel: "Forgotten Scientists profile: Fe del Mundo",
    sourceUrl: "/scientists/51",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which comparison best matches Fe del Mundo and Louise Pearce?",
    options: [
      {
        id: "a",
        text: "Del Mundo advanced pediatric and community child healthcare; Pearce worked on infectious-disease treatment research.",
      },
      { id: "b", text: "Del Mundo built a radio network; Pearce designed the Mayfly aircraft." },
      { id: "c", text: "Both are known mainly for proving pi is irrational." },
      { id: "d", text: "Pearce founded the first pediatric hospital in the Philippines; del Mundo treated sleeping sickness at Rockefeller." },
    ],
    correctOptionId: "a",
    explanation:
      "Fe del Mundo focused on pediatrics and child healthcare in the Philippines. Louise Pearce worked on treatment for African sleeping sickness and other medical research.",
    sourceLabel: "Forgotten Scientists profiles: Fe del Mundo and Louise Pearce",
    sourceUrl: "/scientists/51",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which figure in this set is associated with the earliest historical period?",
    options: [
      { id: "a", text: "Alessandra Giliani" },
      { id: "b", text: "Louise Pearce" },
      { id: "c", text: "Fe Primitiva del Mundo" },
      { id: "d", text: "Bessie Blount Griffin" },
    ],
    correctOptionId: "a",
    explanation:
      "Alessandra Giliani is traditionally associated with the early 14th century, much earlier than Pearce, del Mundo, and Griffin.",
    sourceLabel: "Forgotten Scientists profile: Alessandra Giliani",
    sourceUrl: "/scientists/72",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A rural clinic needs child-health programs focused on nutrition, immunization, family planning, and education. Which physician's work is closest?",
    options: [
      { id: "a", text: "Fe Primitiva del Mundo" },
      { id: "b", text: "Alessandra Giliani" },
      { id: "c", text: "Louise Pearce" },
      { id: "d", text: "Nettie Maria Stevens" },
    ],
    correctOptionId: "a",
    explanation:
      "Fe del Mundo promoted community health programs including nutrition, immunization, family planning, and rural health education.",
    sourceLabel: "Forgotten Scientists profile: Fe del Mundo",
    sourceUrl: "/scientists/51",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Medicine field?",
    options: [
      { id: "a", text: "Alice Catherine Evans" },
      { id: "b", text: "Fe Primitiva del Mundo" },
      { id: "c", text: "Alessandra Giliani" },
      { id: "d", text: "Louise Pearce" },
    ],
    correctOptionId: "a",
    explanation:
      "Alice Catherine Evans is listed under Microbiology, while del Mundo, Giliani, and Pearce are listed under Medicine.",
    sourceLabel: "Forgotten Scientists profile: Alice Catherine Evans",
    sourceUrl: "/scientists/53",
  },
  {
    id: 8,
    type: "achievement",
    prompt: "Which achievement belongs to Louise Pearce?",
    options: [
      { id: "a", text: "Helping develop treatment protocols for African sleeping sickness" },
      { id: "b", text: "Creating the first practical dishwasher" },
      { id: "c", text: "Building the Bland Mayfly aircraft" },
      { id: "d", text: "Developing the IBM Home Page Reader" },
    ],
    correctOptionId: "a",
    explanation:
      "Louise Pearce's research helped develop and test treatment protocols for African sleeping sickness.",
    sourceLabel: "Forgotten Scientists profile: Louise Pearce",
    sourceUrl: "/scientists/74",
  },
];

const medicineDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "A public-health lesson discusses how unpasteurized milk could transmit brucellosis to humans. Which scientist's research belongs there?",
    options: [
      { id: "a", text: "Alice Catherine Evans" },
      { id: "b", text: "Alessandra Giliani" },
      { id: "c", text: "Fe Primitiva del Mundo" },
      { id: "d", text: "Louise Pearce" },
    ],
    correctOptionId: "a",
    explanation:
      "Alice Catherine Evans showed that Brucella abortus from unpasteurized milk caused brucellosis in humans, helping promote pasteurization.",
    sourceLabel: "Forgotten Scientists profile: Alice Catherine Evans",
    sourceUrl: "/scientists/53",
  },
  {
    id: 2,
    type: "impact",
    prompt: "Why was Fe del Mundo's pediatric work important?",
    options: [
      { id: "a", text: "It expanded child healthcare, medical education, and community-oriented pediatric care in the Philippines." },
      { id: "b", text: "It replaced all vaccines with astronomy calculations." },
      { id: "c", text: "It proved that insects can learn by trial and error." },
      { id: "d", text: "It created the first voice-based web browser." },
    ],
    correctOptionId: "a",
    explanation:
      "Fe del Mundo's work included founding a pediatric hospital, publishing pediatric research and teaching materials, and promoting community health programs.",
    sourceLabel: "Forgotten Scientists profile: Fe del Mundo",
    sourceUrl: "/scientists/51",
  },
  {
    id: 3,
    type: "clue",
    prompt:
      "Clue: This research connected a dye with possible treatment for cyanide and carbon-monoxide poisoning. Which scientist is connected with it?",
    options: [
      { id: "a", text: "Matilda Moldenhauer Brooks" },
      { id: "b", text: "Louise Pearce" },
      { id: "c", text: "Mary Styles Harris" },
      { id: "d", text: "Alessandra Giliani" },
    ],
    correctOptionId: "a",
    explanation:
      "Matilda Moldenhauer Brooks proposed methylene blue as an antidote for cyanide and carbon-monoxide poisoning.",
    sourceLabel: "Forgotten Scientists profile: Matilda Moldenhauer Brooks",
    sourceUrl: "/scientists/2",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which health-related discovery-person match is incorrect?",
    options: [
      { id: "a", text: "Lydia Villa-Komaroff - bacteria producing mammalian insulin" },
      { id: "b", text: "Bessie Blount Griffin - assistive devices for amputees" },
      { id: "c", text: "Louise Pearce - treatment research for African sleeping sickness" },
      { id: "d", text: "Alice Catherine Evans - first rigorous proof that pi is irrational" },
    ],
    correctOptionId: "d",
    explanation:
      "The proof that pi is irrational is connected with Johann Heinrich Lambert. Alice Evans is connected with brucellosis, unpasteurized milk, and pasteurization.",
    sourceLabel: "Forgotten Scientists profile: Alice Catherine Evans",
    sourceUrl: "/scientists/53",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison best matches Bessie Blount Griffin and Lydia Villa-Komaroff?",
    options: [
      {
        id: "a",
        text: "Griffin worked on rehabilitative technology for amputees; Villa-Komaroff helped show bacteria could produce mammalian insulin.",
      },
      { id: "b", text: "Griffin discovered rhenium; Villa-Komaroff built the Brooklyn Bridge." },
      { id: "c", text: "Both are known mainly for medieval anatomical preparation." },
      { id: "d", text: "Villa-Komaroff invented assistive feeding devices; Griffin led recombinant insulin research." },
    ],
    correctOptionId: "a",
    explanation:
      "Bessie Blount Griffin developed devices for amputees. Lydia Villa-Komaroff contributed to work showing bacteria could synthesize mammalian insulin.",
    sourceLabel: "Forgotten Scientists profiles: Bessie Blount Griffin and Lydia Villa-Komaroff",
    sourceUrl: "/scientists/67",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A diabetes-treatment history exhibit focuses on biotechnology-based insulin production. Which scientist should be included?",
    options: [
      { id: "a", text: "Lydia Villa-Komaroff" },
      { id: "b", text: "Fe Primitiva del Mundo" },
      { id: "c", text: "Alessandra Giliani" },
      { id: "d", text: "Alice Catherine Evans" },
    ],
    correctOptionId: "a",
    explanation:
      "Lydia Villa-Komaroff helped demonstrate that bacteria could be genetically engineered to produce mammalian insulin.",
    sourceLabel: "Forgotten Scientists profile: Lydia Villa-Komaroff",
    sourceUrl: "/scientists/33",
  },
  {
    id: 7,
    type: "recognition",
    prompt: "Which contribution is connected with Bessie Blount Griffin?",
    options: [
      { id: "a", text: "Devices that helped amputees regain independence" },
      { id: "b", text: "A practical water-pressure dishwasher" },
      { id: "c", text: "The three-point safety belt" },
      { id: "d", text: "A mathematical proof about pi" },
    ],
    correctOptionId: "a",
    explanation:
      "Bessie Blount Griffin developed assistive devices for amputees as part of her work in physical therapy and rehabilitative technology.",
    sourceLabel: "Forgotten Scientists profile: Bessie Blount Griffin",
    sourceUrl: "/scientists/67",
  },
  {
    id: 8,
    type: "fieldUnderstanding",
    prompt:
      "Which example best connects medicine with public communication and health education?",
    options: [
      { id: "a", text: "Mary Styles Harris's health media and public-health communication work" },
      { id: "b", text: "Simeon Aisenstein's radio transmitters" },
      { id: "c", text: "Lilian Bland's aircraft design" },
      { id: "d", text: "George Green's potential theory" },
    ],
    correctOptionId: "a",
    explanation:
      "Mary Styles Harris used genetics and biology training in public health communication, producing health media and education focused on underserved communities.",
    sourceLabel: "Forgotten Scientists profile: Mary Styles Harris",
    sourceUrl: "/scientists/70",
  },
];

const medicineQuizCards: FieldQuiz[] = [
  {
    field: "Medicine",
    slug: "medicine-fundamentals",
    title: "Medicine Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about homeostasis, immunity, vaccines, antimicrobial resistance, and public health.",
    scientistNames: medicineScientists.map((scientist) => scientist.name),
    image: "/quiz-images/medicine-fundamentals.png",
    questions: medicineFundamentalsQuestions,
  },
  {
    field: "Medicine",
    slug: "medicine-scientists",
    title: "Medicine Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured medical figures and the work connected to them.",
    scientistNames: medicineScientists.map((scientist) => scientist.name),
    image: "/quiz-images/medicine-scientists.png",
    questions: medicineScientistQuestions,
  },
  {
    field: "Medicine",
    slug: "medicine-discoveries",
    title: "Medicine Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about medical discoveries, public health, rehabilitation, biotechnology, and treatment history.",
    scientistNames: medicineScientists.map((scientist) => scientist.name),
    image: "/quiz-images/medicine-discoveries.png",
    questions: medicineDiscoveryQuestions,
  },
];

const engineeringScientists = scientists.filter((scientist) => scientist.field === "Engineering");

const engineeringFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "A bridge is standing still and is not rotating. Which condition must be true for static equilibrium?",
    options: [
      { id: "a", text: "The net external force and net torque are balanced." },
      { id: "b", text: "The bridge has no forces acting on it at all." },
      { id: "c", text: "The bridge must be made from only one material." },
      { id: "d", text: "The bridge must have zero mass." },
    ],
    correctOptionId: "a",
    explanation:
      "Static equilibrium requires balanced forces and balanced torques, so there is no linear or rotational acceleration.",
    sourceLabel: "OpenStax College Physics 2e, Statics and Torque",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/9-introduction-to-statics-and-torque",
  },
  {
    id: 2,
    type: "clue",
    prompt:
      "Clue: It measures how strongly a force tends to rotate an object around a pivot. What is it?",
    options: [
      { id: "a", text: "Torque" },
      { id: "b", text: "pH" },
      { id: "c", text: "A gene" },
      { id: "d", text: "A galaxy cluster" },
    ],
    correctOptionId: "a",
    explanation:
      "Torque is the rotational effect of a force and depends on force, distance from the pivot, and angle.",
    sourceLabel: "OpenStax College Physics 2e, Section Summary: Statics and Torque",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/9-section-summary",
  },
  {
    id: 3,
    type: "fieldUnderstanding",
    prompt: "In materials engineering, what is stress?",
    options: [
      { id: "a", text: "Force divided by area" },
      { id: "b", text: "The total mass of a planet" },
      { id: "c", text: "The number of variables in a program" },
      { id: "d", text: "The color of a flame" },
    ],
    correctOptionId: "a",
    explanation:
      "Stress is defined as force per unit area and is used to understand how materials deform or fail.",
    sourceLabel: "OpenStax College Physics 2e, Elasticity: Stress and Strain",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/5-3-elasticity-stress-and-strain",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which engineering idea is matched incorrectly?",
    options: [
      { id: "a", text: "Ohm's law - relates current, voltage, and resistance in simple circuits" },
      { id: "b", text: "Mechanical advantage - compares output force with input force" },
      { id: "c", text: "Strain - change in length divided by original length" },
      { id: "d", text: "Efficiency - useful output is always greater than total input" },
    ],
    correctOptionId: "d",
    explanation:
      "Efficiency compares useful output with input; real processes cannot produce more useful energy than the energy put in.",
    sourceLabel: "OpenStax College Physics 2e, Conservation of Energy",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/7-6-conservation-of-energy",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison between voltage and resistance is most accurate in a simple circuit?",
    options: [
      { id: "a", text: "Voltage helps drive current; resistance impedes current." },
      { id: "b", text: "Resistance creates planets; voltage measures bacterial growth." },
      { id: "c", text: "Voltage and resistance are always the same quantity." },
      { id: "d", text: "Resistance increases current when voltage stays fixed." },
    ],
    correctOptionId: "a",
    explanation:
      "In Ohm's law, voltage drives current while resistance limits it; for fixed voltage, greater resistance means less current.",
    sourceLabel: "OpenStax College Physics 2e, Ohm's Law",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/20-2-ohms-law-resistance-and-simple-circuits",
  },
  {
    id: 6,
    type: "trueFalse",
    prompt: "True or false: A simple machine can reduce the input force needed, but it cannot create extra energy.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only in electronics" },
      { id: "d", text: "Only when no distance is involved" },
    ],
    correctOptionId: "a",
    explanation:
      "Simple machines can trade force for distance, but conservation of energy means they cannot do more work than the input energy allows.",
    sourceLabel: "OpenStax College Physics 2e, Simple Machines",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "An engineer is choosing a material for a support beam and wants to understand how much it deforms under load. Which concept is most relevant?",
    options: [
      { id: "a", text: "Stress and strain" },
      { id: "b", text: "Stellar classification" },
      { id: "c", text: "Sex chromosomes" },
      { id: "d", text: "Perfume extraction" },
    ],
    correctOptionId: "a",
    explanation:
      "Stress and strain describe how materials respond to applied forces, which is central to structural and materials engineering.",
    sourceLabel: "OpenStax College Physics 2e, Elasticity: Stress and Strain",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/5-3-elasticity-stress-and-strain",
  },
  {
    id: 8,
    type: "impact",
    prompt: "Why do engineers care about energy efficiency?",
    options: [
      { id: "a", text: "Because real systems transform some input energy into less useful forms, such as thermal energy." },
      { id: "b", text: "Because efficient machines violate conservation of energy." },
      { id: "c", text: "Because efficiency only matters in ancient astronomy." },
      { id: "d", text: "Because output energy must always be larger than input energy." },
    ],
    correctOptionId: "a",
    explanation:
      "Efficiency measures the fraction of input energy converted into useful output rather than less useful forms such as thermal energy.",
    sourceLabel: "OpenStax College Physics 2e, Conservation of Energy",
    sourceUrl: "https://openstax.org/books/college-physics-2e/pages/7-6-conservation-of-energy",
  },
];

const engineeringScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: She introduced a practical water-pressure dishwashing machine that became the basis for modern dishwashers. Who is she?",
    options: [
      { id: "a", text: "Josephine Garis Cochran" },
      { id: "b", text: "Emily Warren Roebling" },
      { id: "c", text: "Hertha Marks Ayrton" },
      { id: "d", text: "Lilian E. Bland" },
    ],
    correctOptionId: "a",
    explanation:
      "Josephine Garis Cochran introduced the first practical water-pressure dishwashing machine.",
    sourceLabel: "Forgotten Scientists profile: Josephine Garis Cochran",
    sourceUrl: "/scientists/10",
  },
  {
    id: 2,
    type: "recognition",
    prompt: "Which engineer introduced the modern three-point safety belt?",
    options: [
      { id: "a", text: "Nils Ivar Bohlin" },
      { id: "b", text: "Simeon Aisenstein" },
      { id: "c", text: "Mary Golda Ross" },
      { id: "d", text: "Bessie Blount Griffin" },
    ],
    correctOptionId: "a",
    explanation:
      "Nils Ivar Bohlin introduced the modern three-point safety belt, which became a global automotive safety standard.",
    sourceLabel: "Forgotten Scientists profile: Nils Ivar Bohlin",
    sourceUrl: "/scientists/25",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which engineer-achievement match is incorrect?",
    options: [
      { id: "a", text: "Hertha Ayrton - electric arc research and the Ayrton fan" },
      { id: "b", text: "Emily Warren Roebling - leadership in completing the Brooklyn Bridge" },
      { id: "c", text: "Mary Golda Ross - aerospace design and Skunk Works" },
      { id: "d", text: "Lilian Bland - IBM Home Page Reader" },
    ],
    correctOptionId: "d",
    explanation:
      "The IBM Home Page Reader is connected with Chieko Asakawa. Lilian Bland is connected with early aviation and the Bland Mayfly aircraft.",
    sourceLabel: "Forgotten Scientists profile: Lilian Bland",
    sourceUrl: "/scientists/64",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which statement best compares Emily Warren Roebling and Mary Golda Ross?",
    options: [
      {
        id: "a",
        text: "Roebling helped complete a major bridge; Ross worked on aerospace design and spaceflight concepts.",
      },
      { id: "b", text: "Roebling invented the three-point seatbelt; Ross invented the dishwasher." },
      { id: "c", text: "Both are known mainly for microbiology and pasteurization." },
      { id: "d", text: "Ross built the Brooklyn Bridge; Roebling developed Skunk Works rocket calculations." },
    ],
    correctOptionId: "a",
    explanation:
      "Emily Warren Roebling's technical leadership was critical to completing the Brooklyn Bridge. Mary Golda Ross worked on aerospace design, rocket and satellite projects, and interplanetary mission concepts.",
    sourceLabel: "Forgotten Scientists profiles: Emily Warren Roebling and Mary Golda Ross",
    sourceUrl: "/scientists/63",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which engineer in this set was born earliest?",
    options: [
      { id: "a", text: "Josephine Garis Cochran" },
      { id: "b", text: "Emily Warren Roebling" },
      { id: "c", text: "Hertha Marks Ayrton" },
      { id: "d", text: "Lilian E. Bland" },
    ],
    correctOptionId: "a",
    explanation:
      "Josephine Garis Cochran was born in 1839, earlier than Roebling, Ayrton, and Bland.",
    sourceLabel: "Forgotten Scientists profile: Josephine Garis Cochran",
    sourceUrl: "/scientists/10",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A human-spaceflight exhibit focuses on a first Hispanic woman in space who later led NASA's Johnson Space Center. Which featured engineer fits best?",
    options: [
      { id: "a", text: "Ellen Ochoa" },
      { id: "b", text: "Nils Ivar Bohlin" },
      { id: "c", text: "Simeon Aisenstein" },
      { id: "d", text: "Beulah Louise Henry" },
    ],
    correctOptionId: "a",
    explanation:
      "Ellen Ochoa became the first Hispanic woman in space, flew on four Space Shuttle missions, and later led NASA's Johnson Space Center.",
    sourceLabel: "Forgotten Scientists profile: Ellen Ochoa",
    sourceUrl: "/scientists/54",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Engineering field?",
    options: [
      { id: "a", text: "Chieko Asakawa" },
      { id: "b", text: "Mary Golda Ross" },
      { id: "c", text: "Nils Ivar Bohlin" },
      { id: "d", text: "Emily Warren Roebling" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa is listed under Computer Science, while Ross, Bohlin, and Roebling are listed under Engineering.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
  {
    id: 8,
    type: "achievement",
    prompt: "Which achievement belongs to Hertha Marks Ayrton?",
    options: [
      { id: "a", text: "Improving understanding of the electric arc and inventing the Ayrton fan" },
      { id: "b", text: "Leading the Model 107 computer project" },
      { id: "c", text: "Developing the modern three-point seatbelt" },
      { id: "d", text: "Calculating Planet X positions at Lowell Observatory" },
    ],
    correctOptionId: "a",
    explanation:
      "Hertha Ayrton studied the electric arc, ripple formation, and invented practical devices including the Ayrton fan.",
    sourceLabel: "Forgotten Scientists profile: Hertha Marks Ayrton",
    sourceUrl: "/scientists/39",
  },
];

const engineeringDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "impact",
    prompt: "Why was Nils Bohlin's three-point safety belt important?",
    options: [
      { id: "a", text: "It restrained both upper and lower body and became a worldwide automotive safety standard." },
      { id: "b", text: "It was a method for growing bacteria on agar." },
      { id: "c", text: "It proved pi is irrational." },
      { id: "d", text: "It classified stars by spectral type." },
    ],
    correctOptionId: "a",
    explanation:
      "Bohlin's three-point belt combined lap and diagonal restraint and became standard in cars worldwide.",
    sourceLabel: "Forgotten Scientists profile: Nils Ivar Bohlin",
    sourceUrl: "/scientists/25",
  },
  {
    id: 2,
    type: "scenario",
    prompt:
      "A documentary is about technical leadership that kept the Brooklyn Bridge project moving after the chief engineer became ill. Who should it feature?",
    options: [
      { id: "a", text: "Emily Warren Roebling" },
      { id: "b", text: "Beulah Louise Henry" },
      { id: "c", text: "Ellen Elgin" },
      { id: "d", text: "Bessie Blount Griffin" },
    ],
    correctOptionId: "a",
    explanation:
      "Emily Warren Roebling relayed instructions, learned advanced engineering concepts, coordinated work, and helped bring the Brooklyn Bridge to completion.",
    sourceLabel: "Forgotten Scientists profile: Emily Warren Roebling",
    sourceUrl: "/scientists/63",
  },
  {
    id: 3,
    type: "clue",
    prompt:
      "Clue: This aviation pioneer designed, built, and flew her own aircraft, the Bland Mayfly, in 1910. Who was she?",
    options: [
      { id: "a", text: "Lilian E. Bland" },
      { id: "b", text: "Mary Golda Ross" },
      { id: "c", text: "Hertha Marks Ayrton" },
      { id: "d", text: "Josephine Garis Cochran" },
    ],
    correctOptionId: "a",
    explanation:
      "Lilian Bland became one of the first women to design, build, and fly her own aircraft, known as the Bland Mayfly.",
    sourceLabel: "Forgotten Scientists profile: Lilian Bland",
    sourceUrl: "/scientists/64",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which invention-person match is incorrect?",
    options: [
      { id: "a", text: "Josephine Cochran - practical dishwashing machine" },
      { id: "b", text: "Ellen Elgin - clothes-wringer mechanism" },
      { id: "c", text: "Beulah Louise Henry - multiple practical household and office devices" },
      { id: "d", text: "Bessie Blount Griffin - Green's theorem" },
    ],
    correctOptionId: "d",
    explanation:
      "Green's theorem is connected with George Green. Bessie Blount Griffin is connected with rehabilitative technology and devices for amputees.",
    sourceLabel: "Forgotten Scientists profile: Bessie Blount Griffin",
    sourceUrl: "/scientists/67",
  },
  {
    id: 5,
    type: "workOn",
    prompt:
      "A rehabilitation design project focuses on devices that help amputees regain independence. Which innovator fits best?",
    options: [
      { id: "a", text: "Bessie Blount Griffin" },
      { id: "b", text: "Mary Golda Ross" },
      { id: "c", text: "Simeon Aisenstein" },
      { id: "d", text: "Hertha Marks Ayrton" },
    ],
    correctOptionId: "a",
    explanation:
      "Bessie Blount Griffin developed devices to help amputees regain independence and later worked in forensic document examination.",
    sourceLabel: "Forgotten Scientists profile: Bessie Blount Griffin",
    sourceUrl: "/scientists/67",
  },
  {
    id: 6,
    type: "compare",
    prompt: "Which comparison best matches Josephine Cochran and Ellen Elgin?",
    options: [
      {
        id: "a",
        text: "Cochran developed a practical dishwasher; Elgin devised a clothes-wringer mechanism for laundry.",
      },
      { id: "b", text: "Cochran designed the Mayfly aircraft; Elgin planned interplanetary missions." },
      { id: "c", text: "Both are mainly known for radio submarine communication." },
      { id: "d", text: "Elgin invented the seatbelt; Cochran discovered radon." },
    ],
    correctOptionId: "a",
    explanation:
      "Cochran is connected with a practical dishwashing machine. Ellen Elgin is connected with a clothes-wringer mechanism that eased hand laundry.",
    sourceLabel: "Forgotten Scientists profiles: Josephine Cochran and Ellen Elgin",
    sourceUrl: "/scientists/10",
  },
  {
    id: 7,
    type: "fieldUnderstanding",
    prompt:
      "Which achievement best connects engineering with early radio infrastructure and submarine communication?",
    options: [
      { id: "a", text: "Simeon Aisenstein's radio communication networks and very low-frequency submarine communication" },
      { id: "b", text: "Fanny Hesse's agar culture media" },
      { id: "c", text: "Nettie Stevens's sex-chromosome research" },
      { id: "d", text: "Hazel Bishop's lipstick chemistry" },
    ],
    correctOptionId: "a",
    explanation:
      "Simeon Aisenstein expanded radio infrastructure and achieved very low-frequency communication with a submerged submarine during World War I.",
    sourceLabel: "Forgotten Scientists profile: Simeon Aisenstein",
    sourceUrl: "/scientists/78",
  },
  {
    id: 8,
    type: "recognition",
    prompt: "Which engineer was one of the founding engineers of Lockheed's Skunk Works program?",
    options: [
      { id: "a", text: "Mary Golda Ross" },
      { id: "b", text: "Ellen Ochoa" },
      { id: "c", text: "Ellen Elgin" },
      { id: "d", text: "Lilian E. Bland" },
    ],
    correctOptionId: "a",
    explanation:
      "Mary Golda Ross was one of the founding engineers of Lockheed's Skunk Works and worked on aerospace design and spaceflight concepts.",
    sourceLabel: "Forgotten Scientists profile: Mary Golda Ross",
    sourceUrl: "/scientists/40",
  },
];

const engineeringQuizCards: FieldQuiz[] = [
  {
    field: "Engineering",
    slug: "engineering-fundamentals",
    title: "Engineering Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about equilibrium, torque, stress, circuits, machines, and efficiency.",
    scientistNames: engineeringScientists.map((scientist) => scientist.name),
    image: "/quiz-images/engineering-fundamentals.png",
    questions: engineeringFundamentalsQuestions,
  },
  {
    field: "Engineering",
    slug: "engineering-scientists",
    title: "Engineering Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured engineers, inventors, and the work connected to them.",
    scientistNames: engineeringScientists.map((scientist) => scientist.name),
    image: "/quiz-images/engineering-scientists.png",
    questions: engineeringScientistQuestions,
  },
  {
    field: "Engineering",
    slug: "engineering-discoveries",
    title: "Engineering Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about engineering inventions, infrastructure, safety, radio, aviation, and accessibility.",
    scientistNames: engineeringScientists.map((scientist) => scientist.name),
    image: "/quiz-images/engineering-discoveries.png",
    questions: engineeringDiscoveryQuestions,
  },
];

const computerScienceScientists = scientists.filter((scientist) => scientist.field === "Computer Science");

const computerScienceFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "recognition",
    prompt: "In programming, what is a variable mainly used for?",
    options: [
      { id: "a", text: "Storing a value under a name so the program can use it later" },
      { id: "b", text: "Turning every number into a picture" },
      { id: "c", text: "Stopping the computer from running instructions" },
      { id: "d", text: "Replacing all data with random text" },
    ],
    correctOptionId: "a",
    explanation:
      "A variable lets a program refer to a value using a name rather than directly using a memory location or repeating the value.",
    sourceLabel: "OpenStax Introduction to Python Programming, Variables",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/1-3-variables",
  },
  {
    id: 2,
    type: "wrongMatch",
    prompt: "Which programming concept is matched incorrectly?",
    options: [
      { id: "a", text: "Conditional statement - chooses which block of code runs based on a condition" },
      { id: "b", text: "Function - a named block of code that can be called" },
      { id: "c", text: "Loop - repeats code while following a control structure" },
      { id: "d", text: "Variable - a permanent law of nature that cannot change in a program" },
    ],
    correctOptionId: "d",
    explanation:
      "Variables are program names for values. They are not permanent laws of nature, and programs can assign values to them.",
    sourceLabel: "OpenStax Introduction to Python Programming, Variables",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/1-3-variables",
  },
  {
    id: 3,
    type: "scenario",
    prompt:
      "A program should print a warning only when a battery level is below 10%. Which structure is most appropriate?",
    options: [
      { id: "a", text: "An if statement" },
      { id: "b", text: "A bibliography" },
      { id: "c", text: "A map projection" },
      { id: "d", text: "A chemical formula" },
    ],
    correctOptionId: "a",
    explanation:
      "An if statement lets a program execute code only when a condition is true.",
    sourceLabel: "OpenStax Introduction to Python Programming, If-else Statements",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/4-2-if-else-statements",
  },
  {
    id: 4,
    type: "clue",
    prompt:
      "Clue: It is the sequence in which a program's statements and function calls execute. What is it called?",
    options: [
      { id: "a", text: "Control flow" },
      { id: "b", text: "Surface tension" },
      { id: "c", text: "A stellar association" },
      { id: "d", text: "Radioactive recoil" },
    ],
    correctOptionId: "a",
    explanation:
      "Control flow is the order in which a program executes statements and moves into and out of function calls.",
    sourceLabel: "OpenStax Introduction to Python Programming, Control Flow",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/6-2-control-flow",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison between a list and a single variable is most accurate?",
    options: [
      { id: "a", text: "A list can hold multiple items; a single variable usually refers to one value at a time." },
      { id: "b", text: "A list is always a telescope; a variable is always a star." },
      { id: "c", text: "A list cannot be used in a program." },
      { id: "d", text: "A variable must always contain exactly five values." },
    ],
    correctOptionId: "a",
    explanation:
      "Lists are containers that can hold multiple objects, while a variable name can refer to a value or object.",
    sourceLabel: "OpenStax Introduction to Python Programming, Lists",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/3-4-list-basics",
  },
  {
    id: 6,
    type: "trueFalse",
    prompt: "True or false: A function can help avoid rewriting the same block of code many times.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only in astronomy" },
      { id: "d", text: "Only if the program has no inputs" },
    ],
    correctOptionId: "a",
    explanation:
      "Functions are named blocks of code that can be called when needed, which helps organize and reuse code.",
    sourceLabel: "OpenStax Introduction to Python Programming, Defining Functions",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/6-1-defining-functions",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "A researcher has a table of measurements and wants to filter and summarize patterns in it. Which area of computing is closest?",
    options: [
      { id: "a", text: "Data analysis" },
      { id: "b", text: "Perfume distillation" },
      { id: "c", text: "Planetary epicycles only" },
      { id: "d", text: "Agar culture media" },
    ],
    correctOptionId: "a",
    explanation:
      "Data analysis involves organizing, filtering, and interpreting data to find patterns and answer questions.",
    sourceLabel: "OpenStax Introduction to Python Programming, Data Science",
    sourceUrl: "https://openstax.org/books/introduction-python-programming/pages/15-1-introduction-to-data-science",
  },
  {
    id: 8,
    type: "impact",
    prompt: "Why is accessibility an important goal in computer science?",
    options: [
      { id: "a", text: "It helps more people use digital tools, including users with disabilities." },
      { id: "b", text: "It makes software impossible to test." },
      { id: "c", text: "It removes the need for user interfaces." },
      { id: "d", text: "It only applies to printed books." },
    ],
    correctOptionId: "a",
    explanation:
      "Accessible computing is about designing digital systems so more people can use them effectively, including people with disabilities.",
    sourceLabel: "W3C Web Accessibility Initiative, Introduction to Web Accessibility",
    sourceUrl: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
  },
];

const computerScienceScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: She began at NACA/NASA as a human computer, later learned programming, and worked on software for the Centaur rocket stage. Who is she?",
    options: [
      { id: "a", text: "Annie Jean Easley" },
      { id: "b", text: "Chieko Asakawa" },
      { id: "c", text: "Xia Peisu" },
      { id: "d", text: "Evelyn Boyd Granville" },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Easley worked at NACA/NASA, moved from manual computation into programming, and contributed to Centaur rocket-stage software.",
    sourceLabel: "Forgotten Scientists profile: Annie Jean Easley",
    sourceUrl: "/scientists/13",
  },
  {
    id: 2,
    type: "recognition",
    prompt:
      "Which computer scientist led work on China's first domestically designed general-purpose electronic computer?",
    options: [
      { id: "a", text: "Xia Peisu" },
      { id: "b", text: "Annie Jean Easley" },
      { id: "c", text: "Chieko Asakawa" },
      { id: "d", text: "Mary Lucy Cartwright" },
    ],
    correctOptionId: "a",
    explanation:
      "Xia Peisu led the development of China's first domestically designed general-purpose electronic computer, the Model 107.",
    sourceLabel: "Forgotten Scientists profile: Xia Peisu",
    sourceUrl: "/scientists/59",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which scientist-achievement match is incorrect?",
    options: [
      { id: "a", text: "Chieko Asakawa - IBM Home Page Reader and accessibility technologies" },
      { id: "b", text: "Annie Jean Easley - rocket-stage and energy-conversion software" },
      { id: "c", text: "Xia Peisu - China's early computer science education and Model 107" },
      { id: "d", text: "Annie Jean Easley - discovery of rhenium" },
    ],
    correctOptionId: "d",
    explanation:
      "Rhenium is connected with Ida Noddack. Annie Easley is connected with computing work at NACA/NASA, including rocket-stage software.",
    sourceLabel: "Forgotten Scientists profile: Annie Jean Easley",
    sourceUrl: "/scientists/13",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which comparison best matches Chieko Asakawa and Xia Peisu?",
    options: [
      {
        id: "a",
        text: "Asakawa pioneered accessibility technologies; Xia helped establish computer science infrastructure and education in China.",
      },
      { id: "b", text: "Asakawa discovered sex chromosomes; Xia invented agar culture media." },
      { id: "c", text: "Both are described mainly as chemists studying rhenium." },
      { id: "d", text: "Xia created the IBM Home Page Reader; Asakawa developed Model 107." },
    ],
    correctOptionId: "a",
    explanation:
      "Asakawa is known for accessibility tools such as the IBM Home Page Reader. Xia Peisu helped build computer science in China through hardware, teaching, textbooks, and journals.",
    sourceLabel: "Forgotten Scientists profiles: Chieko Asakawa and Xia Peisu",
    sourceUrl: "/scientists/71",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which computer scientist in this set was born earliest?",
    options: [
      { id: "a", text: "Xia Peisu" },
      { id: "b", text: "Annie Jean Easley" },
      { id: "c", text: "Chieko Asakawa" },
      { id: "d", text: "Mary Styles Harris" },
    ],
    correctOptionId: "a",
    explanation:
      "Xia Peisu was born in 1923, earlier than Annie Easley, Chieko Asakawa, and Mary Styles Harris.",
    sourceLabel: "Forgotten Scientists profile: Xia Peisu",
    sourceUrl: "/scientists/59",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A team is designing tools so blind users can navigate web pages and digital information more independently. Which scientist's work is most relevant?",
    options: [
      { id: "a", text: "Chieko Asakawa" },
      { id: "b", text: "Annie Jean Easley" },
      { id: "c", text: "Xia Peisu" },
      { id: "d", text: "Elizabeth Langdon Williams" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa pioneered accessibility technologies, including the IBM Home Page Reader, a text-to-speech web browser.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Computer Science field?",
    options: [
      { id: "a", text: "Evelyn Boyd Granville" },
      { id: "b", text: "Annie Jean Easley" },
      { id: "c", text: "Xia Peisu" },
      { id: "d", text: "Chieko Asakawa" },
    ],
    correctOptionId: "a",
    explanation:
      "Evelyn Boyd Granville is listed under Mathematics, while Easley, Xia, and Asakawa are listed under Computer Science.",
    sourceLabel: "Forgotten Scientists profile: Evelyn Boyd Granville",
    sourceUrl: "/scientists/75",
  },
  {
    id: 8,
    type: "achievement",
    prompt: "Which achievement belongs to Chieko Asakawa?",
    options: [
      { id: "a", text: "Developing the IBM Home Page Reader and other accessibility technologies" },
      { id: "b", text: "Calculating possible positions for Planet X at Lowell Observatory" },
      { id: "c", text: "Formulating Green's theorem" },
      { id: "d", text: "Showing that methylene blue could counteract poisoning" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa developed the IBM Home Page Reader and other technologies that expanded digital accessibility for blind and visually impaired users.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
];

const computerScienceDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "A spaceflight exhibit focuses on software for launching heavy payloads with the Centaur upper stage. Which scientist should it include?",
    options: [
      { id: "a", text: "Annie Jean Easley" },
      { id: "b", text: "Chieko Asakawa" },
      { id: "c", text: "Xia Peisu" },
      { id: "d", text: "Charlotte Moore Sitterly" },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Easley wrote and implemented code for NASA projects, including software connected with the Centaur rocket upper stage.",
    sourceLabel: "Forgotten Scientists profile: Annie Jean Easley",
    sourceUrl: "/scientists/13",
  },
  {
    id: 2,
    type: "impact",
    prompt: "Why was Xia Peisu's Model 107 work significant?",
    options: [
      { id: "a", text: "It marked a major step in China's domestic development of electronic computers." },
      { id: "b", text: "It replaced all mathematical education with astronomy." },
      { id: "c", text: "It discovered a new planet." },
      { id: "d", text: "It made bacterial cultures grow on agar." },
    ],
    correctOptionId: "a",
    explanation:
      "Xia Peisu led development of the Model 107, described as China's first domestically designed general-purpose electronic computer.",
    sourceLabel: "Forgotten Scientists profile: Xia Peisu",
    sourceUrl: "/scientists/59",
  },
  {
    id: 3,
    type: "clue",
    prompt:
      "Clue: This invention converted web text and navigation elements into speech so blind users could browse the internet. What was it?",
    options: [
      { id: "a", text: "IBM Home Page Reader" },
      { id: "b", text: "Piola-Kirchhoff stress tensor" },
      { id: "c", text: "Green's theorem" },
      { id: "d", text: "Methylene blue antidote research" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa developed the IBM Home Page Reader, a voice-based browser that converted web content into speech.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which technology-person match is incorrect?",
    options: [
      { id: "a", text: "Annie Jean Easley - Centaur rocket-stage software" },
      { id: "b", text: "Xia Peisu - Principles of the Electronic Computer textbook" },
      { id: "c", text: "Chieko Asakawa - AI-powered navigation and accessibility tools" },
      { id: "d", text: "Xia Peisu - IBM Home Page Reader" },
    ],
    correctOptionId: "d",
    explanation:
      "The IBM Home Page Reader is connected with Chieko Asakawa. Xia Peisu is connected with early Chinese computer hardware, theory education, and textbooks.",
    sourceLabel: "Forgotten Scientists profiles: Xia Peisu and Chieko Asakawa",
    sourceUrl: "/scientists/59",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison best shows two different kinds of computing impact?",
    options: [
      {
        id: "a",
        text: "Easley's work supported aerospace and energy systems; Asakawa's work expanded digital accessibility.",
      },
      { id: "b", text: "Easley invented agar; Asakawa discovered rhenium." },
      { id: "c", text: "Both are known mainly for classifying stars by spectra." },
      { id: "d", text: "Asakawa created the Centaur upper stage; Easley created the Home Page Reader." },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Easley contributed to rocket-stage and energy-conversion software. Chieko Asakawa developed accessibility technologies for digital information and navigation.",
    sourceLabel: "Forgotten Scientists profiles: Annie Easley and Chieko Asakawa",
    sourceUrl: "/scientists/13",
  },
  {
    id: 6,
    type: "fieldUnderstanding",
    prompt:
      "Which achievement best shows computer science as both hardware development and education-building?",
    options: [
      { id: "a", text: "Xia Peisu's computer design work, computer theory course, textbook, and journals" },
      { id: "b", text: "Fanny Hesse's agar suggestion for bacteriology" },
      { id: "c", text: "Annie Maunder's butterfly diagram of sunspots" },
      { id: "d", text: "Ellen Richards's sanitary chemistry work" },
    ],
    correctOptionId: "a",
    explanation:
      "Xia Peisu helped develop early Chinese computer hardware and also taught computer theory, wrote a textbook, and helped establish journals.",
    sourceLabel: "Forgotten Scientists profile: Xia Peisu",
    sourceUrl: "/scientists/59",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "A museum section is about the transition from human computers to electronic programming at NASA. Which profile fits best?",
    options: [
      { id: "a", text: "Annie Jean Easley" },
      { id: "b", text: "Alice Catherine Evans" },
      { id: "c", text: "Ida Noddack" },
      { id: "d", text: "Fanny Hesse" },
    ],
    correctOptionId: "a",
    explanation:
      "Easley began as a human computer at NACA and later adapted to electronic programming as computing technology changed.",
    sourceLabel: "Forgotten Scientists profile: Annie Jean Easley",
    sourceUrl: "/scientists/13",
  },
  {
    id: 8,
    type: "recognition",
    prompt: "Which achievement is connected with AI-assisted navigation and intelligent navigation tools for blind users?",
    options: [
      { id: "a", text: "Chieko Asakawa's later accessibility research" },
      { id: "b", text: "George Green's potential theory" },
      { id: "c", text: "Evelyn Boyd Granville's orbit programs" },
      { id: "d", text: "Nettie Stevens's chromosome research" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa's later research includes AI-powered navigation tools and intelligent navigation devices for blind users.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
];

const computerScienceQuizCards: FieldQuiz[] = [
  {
    field: "Computer Science",
    slug: "computer-science-fundamentals",
    title: "Computer Science Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about variables, control flow, functions, lists, data analysis, and accessibility.",
    scientistNames: computerScienceScientists.map((scientist) => scientist.name),
    image: "/quiz-images/computer-science-fundamentals.png",
    questions: computerScienceFundamentalsQuestions,
  },
  {
    field: "Computer Science",
    slug: "computer-science-scientists",
    title: "Computer Science Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured computer scientists and the work connected to them.",
    scientistNames: computerScienceScientists.map((scientist) => scientist.name),
    image: "/quiz-images/computer-science-scientists.jpg",
    questions: computerScienceScientistQuestions,
  },
  {
    field: "Computer Science",
    slug: "computer-science-discoveries",
    title: "Computer Science Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about computing technologies, accessibility, spaceflight software, and education-building.",
    scientistNames: computerScienceScientists.map((scientist) => scientist.name),
    image: "/quiz-images/computer-science-discoveries.png",
    questions: computerScienceDiscoveryQuestions,
  },
];

const mathematicsScientists = scientists.filter((scientist) => scientist.field === "Mathematics");

const mathematicsFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "A graph is a straight line, and every time x increases by 2, y increases by 6. What is the slope?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "6" },
      { id: "c", text: "8" },
      { id: "d", text: "12" },
    ],
    correctOptionId: "a",
    explanation:
      "Slope is the change in y divided by the change in x. Here that is 6 divided by 2, so the slope is 3.",
    sourceLabel: "OpenStax College Algebra 2e, Linear Functions",
    sourceUrl: "https://openstax.org/books/college-algebra-2e/pages/4-1-linear-functions",
  },
  {
    id: 2,
    type: "wrongMatch",
    prompt: "Which statement about functions is incorrect?",
    options: [
      { id: "a", text: "Each input in a function has exactly one output." },
      { id: "b", text: "A vertical line test can help identify whether a graph represents a function." },
      { id: "c", text: "A function can be represented by a table, graph, formula, or words." },
      { id: "d", text: "One input in a function must always have two different outputs." },
    ],
    correctOptionId: "d",
    explanation:
      "A relation is a function only if each input is paired with exactly one output.",
    sourceLabel: "OpenStax College Algebra 2e, Functions and Function Notation",
    sourceUrl: "https://openstax.org/books/college-algebra-2e/pages/3-1-functions-and-function-notation",
  },
  {
    id: 3,
    type: "fieldUnderstanding",
    prompt: "What does the derivative of a function describe at a point?",
    options: [
      { id: "a", text: "The instantaneous rate of change or slope of the tangent line" },
      { id: "b", text: "The total area of every possible graph" },
      { id: "c", text: "The number of terms in a sequence only" },
      { id: "d", text: "The value of pi rounded to two decimals" },
    ],
    correctOptionId: "a",
    explanation:
      "The derivative gives the instantaneous rate of change of a function, which corresponds to the slope of the tangent line.",
    sourceLabel: "OpenStax Calculus Volume 1, Defining the Derivative",
    sourceUrl: "https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative",
  },
  {
    id: 4,
    type: "clue",
    prompt:
      "Clue: It can represent accumulated change and is often interpreted as signed area under a curve. What is it?",
    options: [
      { id: "a", text: "A definite integral" },
      { id: "b", text: "A prime factor" },
      { id: "c", text: "A vertical asymptote" },
      { id: "d", text: "A random sample" },
    ],
    correctOptionId: "a",
    explanation:
      "A definite integral can represent accumulation and signed area under a function over an interval.",
    sourceLabel: "OpenStax Calculus Volume 1, The Definite Integral",
    sourceUrl: "https://openstax.org/books/calculus-volume-1/pages/5-2-the-definite-integral",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison between a sequence and a series is most accurate?",
    options: [
      { id: "a", text: "A sequence is an ordered list of terms; a series is the sum of terms." },
      { id: "b", text: "A sequence is always a circle; a series is always a triangle." },
      { id: "c", text: "A series has no connection to addition." },
      { id: "d", text: "A sequence must contain exactly two numbers." },
    ],
    correctOptionId: "a",
    explanation:
      "A sequence lists terms in order, while a series is formed by adding terms of a sequence.",
    sourceLabel: "OpenStax Precalculus 2e, Sequences and Their Notations",
    sourceUrl: "https://openstax.org/books/precalculus-2e/pages/11-1-sequences-and-their-notations",
  },
  {
    id: 6,
    type: "trueFalse",
    prompt: "True or false: A quadratic equation can have two real solutions, one real solution, or no real solutions.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only if its graph is a line" },
      { id: "d", text: "Only for positive coefficients" },
    ],
    correctOptionId: "a",
    explanation:
      "The discriminant determines whether a quadratic has two real roots, one repeated real root, or no real roots.",
    sourceLabel: "OpenStax College Algebra 2e, Quadratic Equations",
    sourceUrl: "https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "An engineer needs to solve several linear equations at once. Which mathematical tool is especially useful?",
    options: [
      { id: "a", text: "Matrices" },
      { id: "b", text: "A food chain" },
      { id: "c", text: "A spectroscope" },
      { id: "d", text: "A bacterial culture plate" },
    ],
    correctOptionId: "a",
    explanation:
      "Matrices are commonly used to organize and solve systems of linear equations.",
    sourceLabel: "OpenStax College Algebra 2e, Matrices and Matrix Operations",
    sourceUrl: "https://openstax.org/books/college-algebra-2e/pages/7-1-matrices-and-matrix-operations",
  },
  {
    id: 8,
    type: "impact",
    prompt: "Why are mathematical models useful in science?",
    options: [
      { id: "a", text: "They represent relationships so scientists can analyze, predict, and test ideas." },
      { id: "b", text: "They remove the need for evidence." },
      { id: "c", text: "They make measurements unnecessary." },
      { id: "d", text: "They only work for historical dates." },
    ],
    correctOptionId: "a",
    explanation:
      "Mathematical models express relationships between quantities and help scientists analyze patterns and make predictions.",
    sourceLabel: "OpenStax College Algebra 2e, Models and Applications",
    sourceUrl: "https://openstax.org/books/college-algebra-2e/pages/2-3-models-and-applications",
  },
];

const mathematicsScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: A largely self-taught English mathematician introduced mathematical potential and formulated a theorem used in electricity and magnetism. Who was he?",
    options: [
      { id: "a", text: "George Green" },
      { id: "b", text: "Johann Heinrich Lambert" },
      { id: "c", text: "Gabrio Piola" },
      { id: "d", text: "Mary Lucy Cartwright" },
    ],
    correctOptionId: "a",
    explanation:
      "George Green introduced the concept of mathematical potential and formulated what is now known as Green's theorem.",
    sourceLabel: "Forgotten Scientists profile: George Green",
    sourceUrl: "/scientists/5",
  },
  {
    id: 2,
    type: "recognition",
    prompt:
      "Which mathematician is connected with nonlinear differential equations and foundations of what later became chaos theory?",
    options: [
      { id: "a", text: "Mary Lucy Cartwright" },
      { id: "b", text: "Martha Euphemia Lofton Haynes" },
      { id: "c", text: "Evelyn Boyd Granville" },
      { id: "d", text: "Gabrio Piola" },
    ],
    correctOptionId: "a",
    explanation:
      "Mary Lucy Cartwright's work on nonlinear differential equations helped lay foundations for what later became known as chaos theory.",
    sourceLabel: "Forgotten Scientists profile: Mary Lucy Cartwright",
    sourceUrl: "/scientists/58",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which mathematician-achievement match is incorrect?",
    options: [
      { id: "a", text: "Johann Heinrich Lambert - first rigorous proof that pi is irrational" },
      { id: "b", text: "George Green - potential theory and Green's theorem" },
      { id: "c", text: "Martha Euphemia Lofton Haynes - first African American woman to earn a Ph.D. in mathematics" },
      { id: "d", text: "Gabrio Piola - discovery of lambda phage" },
    ],
    correctOptionId: "d",
    explanation:
      "Lambda phage is connected with Esther Lederberg. Gabrio Piola is connected with continuum mechanics and elasticity theory.",
    sourceLabel: "Forgotten Scientists profile: Gabrio Piola",
    sourceUrl: "/scientists/38",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which statement best compares Martha Euphemia Lofton Haynes and Evelyn Boyd Granville?",
    options: [
      {
        id: "a",
        text: "Haynes broke barriers in mathematics education and earned a historic Ph.D.; Granville contributed to mathematics, computing, and early U.S. space-program calculations.",
      },
      { id: "b", text: "Haynes discovered rhenium; Granville invented agar culture media." },
      { id: "c", text: "Both are known mainly for solar eclipse photography." },
      { id: "d", text: "Granville proved pi irrational; Haynes founded the Istanbul Observatory." },
    ],
    correctOptionId: "a",
    explanation:
      "Haynes is known for mathematics education and becoming the first African American woman to earn a mathematics Ph.D. Granville worked across mathematics, computing, and space-program calculations.",
    sourceLabel: "Forgotten Scientists profiles: Martha Haynes and Evelyn Boyd Granville",
    sourceUrl: "/scientists/60",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which scientist in this set lived earliest?",
    options: [
      { id: "a", text: "Johann Heinrich Lambert" },
      { id: "b", text: "George Green" },
      { id: "c", text: "Martha Euphemia Lofton Haynes" },
      { id: "d", text: "Evelyn Boyd Granville" },
    ],
    correctOptionId: "a",
    explanation:
      "Johann Heinrich Lambert lived from 1728 to 1777, earlier than Green, Haynes, and Granville.",
    sourceLabel: "Forgotten Scientists profile: Johann Heinrich Lambert",
    sourceUrl: "/scientists/80",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A materials-science course is introducing continuum mechanics and stress tensors. Which mathematician belongs in that lesson?",
    options: [
      { id: "a", text: "Gabrio Piola" },
      { id: "b", text: "Mary Lucy Cartwright" },
      { id: "c", text: "Martha Euphemia Lofton Haynes" },
      { id: "d", text: "Johann Heinrich Lambert" },
    ],
    correctOptionId: "a",
    explanation:
      "Gabrio Piola's work in continuum mechanics and elasticity theory led to concepts such as the Piola-Kirchhoff stress tensor.",
    sourceLabel: "Forgotten Scientists profile: Gabrio Piola",
    sourceUrl: "/scientists/38",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Mathematics field?",
    options: [
      { id: "a", text: "Annie Jean Easley" },
      { id: "b", text: "George Green" },
      { id: "c", text: "Mary Lucy Cartwright" },
      { id: "d", text: "Martha Euphemia Lofton Haynes" },
    ],
    correctOptionId: "a",
    explanation:
      "Annie Jean Easley is listed under Computer Science, while Green, Cartwright, and Haynes are listed under Mathematics.",
    sourceLabel: "Forgotten Scientists profile: Annie Jean Easley",
    sourceUrl: "/scientists/13",
  },
  {
    id: 8,
    type: "achievement",
    prompt: "Which achievement belongs to Johann Heinrich Lambert?",
    options: [
      { id: "a", text: "Providing the first rigorous proof that pi is irrational" },
      { id: "b", text: "Developing bacterial replica plating" },
      { id: "c", text: "Showing that insects can learn and adapt behavior" },
      { id: "d", text: "Helping create insulin-producing bacteria" },
    ],
    correctOptionId: "a",
    explanation:
      "Johann Heinrich Lambert is best known in mathematics for the first rigorous proof that pi is irrational.",
    sourceLabel: "Forgotten Scientists profile: Johann Heinrich Lambert",
    sourceUrl: "/scientists/80",
  },
];

const mathematicsDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "impact",
    prompt: "Why did George Green's mathematical work matter beyond pure mathematics?",
    options: [
      { id: "a", text: "It gave tools for treating electricity, magnetism, potential theory, and later engineering problems." },
      { id: "b", text: "It created the first text-to-speech web browser." },
      { id: "c", text: "It discovered a new chemical element." },
      { id: "d", text: "It established milk pasteurization." },
    ],
    correctOptionId: "a",
    explanation:
      "Green's work on potential theory and Green's theorem became widely used in mathematical physics, electromagnetism, engineering, and applied sciences.",
    sourceLabel: "Forgotten Scientists profile: George Green",
    sourceUrl: "/scientists/5",
  },
  {
    id: 2,
    type: "scenario",
    prompt:
      "A historian is tracing early mathematical ideas behind nonlinear systems and unpredictable behavior. Which scientist's work fits best?",
    options: [
      { id: "a", text: "Mary Lucy Cartwright" },
      { id: "b", text: "Martha Euphemia Lofton Haynes" },
      { id: "c", text: "Johann Heinrich Lambert" },
      { id: "d", text: "George Green" },
    ],
    correctOptionId: "a",
    explanation:
      "Cartwright's research on nonlinear differential equations helped lay foundations for later chaos theory.",
    sourceLabel: "Forgotten Scientists profile: Mary Lucy Cartwright",
    sourceUrl: "/scientists/58",
  },
  {
    id: 3,
    type: "clue",
    prompt:
      "Clue: Her mathematics and computing work supported early U.S. space programs, including Project Vanguard and Mercury. Who is she?",
    options: [
      { id: "a", text: "Evelyn Boyd Granville" },
      { id: "b", text: "Xia Peisu" },
      { id: "c", text: "Mary Styles Harris" },
      { id: "d", text: "Chieko Asakawa" },
    ],
    correctOptionId: "a",
    explanation:
      "Evelyn Boyd Granville wrote programs that computed satellite orbits for Project Vanguard and Project Mercury.",
    sourceLabel: "Forgotten Scientists profile: Evelyn Boyd Granville",
    sourceUrl: "/scientists/75",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which contribution-person match is incorrect?",
    options: [
      { id: "a", text: "Martha Euphemia Lofton Haynes - mathematics education and equal schooling opportunities" },
      { id: "b", text: "Xia Peisu - China's first domestically designed general-purpose electronic computer" },
      { id: "c", text: "Johann Heinrich Lambert - photometry, map projections, and pi's irrationality" },
      { id: "d", text: "Mary Lucy Cartwright - smudge-proof lipstick" },
    ],
    correctOptionId: "d",
    explanation:
      "Smudge-proof lipstick is connected with Hazel Bishop. Mary Lucy Cartwright is connected with nonlinear differential equations.",
    sourceLabel: "Forgotten Scientists profile: Mary Lucy Cartwright",
    sourceUrl: "/scientists/58",
  },
  {
    id: 5,
    type: "workOn",
    prompt:
      "A lesson connects mathematics with light measurement, map projections, and geometry. Which scientist should be included?",
    options: [
      { id: "a", text: "Johann Heinrich Lambert" },
      { id: "b", text: "Gabrio Piola" },
      { id: "c", text: "Martha Euphemia Lofton Haynes" },
      { id: "d", text: "Evelyn Boyd Granville" },
    ],
    correctOptionId: "a",
    explanation:
      "Lambert worked on photometry, map projections, analytic mathematics, and early explorations in geometry.",
    sourceLabel: "Forgotten Scientists profile: Johann Heinrich Lambert",
    sourceUrl: "/scientists/80",
  },
  {
    id: 6,
    type: "compare",
    prompt: "Which comparison best matches George Green and Gabrio Piola?",
    options: [
      {
        id: "a",
        text: "Green developed tools for potential theory and electromagnetism; Piola contributed to continuum mechanics and elasticity.",
      },
      { id: "b", text: "Green founded computer science in China; Piola created Project Mercury orbit programs." },
      { id: "c", text: "Both are mainly known for milk safety research." },
      { id: "d", text: "Piola discovered sex chromosomes; Green invented home economics." },
    ],
    correctOptionId: "a",
    explanation:
      "Green is connected with potential theory and mathematical electromagnetism. Piola is connected with continuum mechanics and elasticity theory.",
    sourceLabel: "Forgotten Scientists profiles: George Green and Gabrio Piola",
    sourceUrl: "/scientists/5",
  },
  {
    id: 7,
    type: "recognition",
    prompt: "Which achievement is connected with Martha Euphemia Lofton Haynes?",
    options: [
      { id: "a", text: "Becoming the first African American woman to earn a Ph.D. in mathematics" },
      { id: "b", text: "Discovering rhenium" },
      { id: "c", text: "Inventing the IBM Home Page Reader" },
      { id: "d", text: "Identifying the solid inner core of Earth" },
    ],
    correctOptionId: "a",
    explanation:
      "Haynes is best known as the first African American woman to earn a Ph.D. in mathematics and for her career in mathematics education.",
    sourceLabel: "Forgotten Scientists profile: Martha Euphemia Lofton Haynes",
    sourceUrl: "/scientists/60",
  },
  {
    id: 8,
    type: "fieldUnderstanding",
    prompt:
      "Which achievement best shows mathematics crossing into computer science and national technology development?",
    options: [
      { id: "a", text: "Xia Peisu's leadership in developing China's first domestically designed general-purpose electronic computer" },
      { id: "b", text: "Fanny Hesse's suggestion of agar for microbiology" },
      { id: "c", text: "Alice Evans's work on brucellosis and milk pasteurization" },
      { id: "d", text: "Matilda Brooks's methylene blue antidote research" },
    ],
    correctOptionId: "a",
    explanation:
      "Xia Peisu was a computer scientist whose work helped establish computer science in China and led the development of China's first domestically designed general-purpose electronic computer.",
    sourceLabel: "Forgotten Scientists profile: Xia Peisu",
    sourceUrl: "/scientists/59",
  },
];

const mathematicsQuizCards: FieldQuiz[] = [
  {
    field: "Mathematics",
    slug: "mathematics-fundamentals",
    title: "Mathematics Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about functions, slope, derivatives, integrals, sequences, and models.",
    scientistNames: mathematicsScientists.map((scientist) => scientist.name),
    image: "/quiz-images/mathematics-fundamentals.png",
    questions: mathematicsFundamentalsQuestions,
  },
  {
    field: "Mathematics",
    slug: "mathematics-scientists",
    title: "Mathematics Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured mathematicians and the work connected to them.",
    scientistNames: mathematicsScientists.map((scientist) => scientist.name),
    image: "/quiz-images/mathematics-scientists.jpg",
    questions: mathematicsScientistQuestions,
  },
  {
    field: "Mathematics",
    slug: "mathematics-discoveries",
    title: "Mathematics Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about mathematical ideas, applied mathematics, computing, and historical impact.",
    scientistNames: mathematicsScientists.map((scientist) => scientist.name),
    image: "/quiz-images/mathematics-discoveries.png",
    questions: mathematicsDiscoveryQuestions,
  },
];

const biologyScientists = scientists.filter((scientist) => scientist.field === "Biology");

const biologyFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "recognition",
    prompt: "What is the smallest unit of life?",
    options: [
      { id: "a", text: "A cell" },
      { id: "b", text: "An organ system" },
      { id: "c", text: "A population" },
      { id: "d", text: "A chromosome only" },
    ],
    correctOptionId: "a",
    explanation:
      "Cells are the basic building blocks of organisms and are described as the smallest unit of life.",
    sourceLabel: "OpenStax Biology 2e, Studying Cells",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/4-1-studying-cells",
  },
  {
    id: 2,
    type: "wrongMatch",
    prompt: "Which statement about cell theory is incorrect?",
    options: [
      { id: "a", text: "All organisms are made of one or more cells." },
      { id: "b", text: "The cell is the basic unit of life." },
      { id: "c", text: "New cells arise from existing cells." },
      { id: "d", text: "Cells appear only in animals, not in plants or bacteria." },
    ],
    correctOptionId: "d",
    explanation:
      "Cell theory says organisms are composed of one or more cells; cells are not limited to animals.",
    sourceLabel: "OpenStax Biology 2e, Chapter 4 Summary",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/4-chapter-summary",
  },
  {
    id: 3,
    type: "clue",
    prompt:
      "Clue: These biological catalysts speed up chemical reactions by lowering activation energy. What are they?",
    options: [
      { id: "a", text: "Enzymes" },
      { id: "b", text: "Comets" },
      { id: "c", text: "Ionic crystals" },
      { id: "d", text: "Spectral classes" },
    ],
    correctOptionId: "a",
    explanation:
      "Enzymes are biological catalysts that lower the activation energy of biochemical reactions.",
    sourceLabel: "OpenStax Biology 2e, Enzymes",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which comparison between DNA and RNA is most accurate in the central dogma?",
    options: [
      { id: "a", text: "DNA stores genetic information; RNA can carry a copy used to make proteins." },
      { id: "b", text: "RNA is never involved in protein synthesis." },
      { id: "c", text: "DNA is translated directly into protein without RNA." },
      { id: "d", text: "DNA and RNA are unrelated to genes." },
    ],
    correctOptionId: "a",
    explanation:
      "The central dogma describes biological information flowing from DNA to RNA to protein.",
    sourceLabel: "OpenStax Biology 2e, The Genetic Code",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/15-1-the-genetic-code",
  },
  {
    id: 5,
    type: "trueFalse",
    prompt: "True or false: In translation, information in mRNA is used to synthesize a protein.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Only in plants" },
      { id: "d", text: "Only when no ribosomes are present" },
    ],
    correctOptionId: "a",
    explanation:
      "Translation uses an mRNA template on ribosomes to build a protein product.",
    sourceLabel: "OpenStax Biology 2e, The Genetic Code",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/15-1-the-genetic-code",
  },
  {
    id: 6,
    type: "scenario",
    prompt:
      "A trait helps some organisms survive and reproduce more successfully in a particular environment. Which concept is most relevant?",
    options: [
      { id: "a", text: "Natural selection" },
      { id: "b", text: "The pH scale" },
      { id: "c", text: "Kepler's first law" },
      { id: "d", text: "Ionic bonding" },
    ],
    correctOptionId: "a",
    explanation:
      "Natural selection favors heritable traits that improve survival or reproduction in a given environment.",
    sourceLabel: "OpenStax Biology 2e, Life Histories and Natural Selection",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/45-2-life-histories-and-natural-selection",
  },
  {
    id: 7,
    type: "fieldUnderstanding",
    prompt: "What is the active site of an enzyme?",
    options: [
      { id: "a", text: "The region where the substrate binds and the reaction is catalyzed" },
      { id: "b", text: "The chromosome that determines biological sex" },
      { id: "c", text: "A planet's path around the Sun" },
      { id: "d", text: "The part of a microscope that stores DNA" },
    ],
    correctOptionId: "a",
    explanation:
      "The active site is the location within an enzyme where the substrate binds and catalytic action occurs.",
    sourceLabel: "OpenStax Biology 2e, Enzymes",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
  },
  {
    id: 8,
    type: "impact",
    prompt: "Why are microscopes important in biology?",
    options: [
      { id: "a", text: "They allow scientists to study cells and structures too small to see with the naked eye." },
      { id: "b", text: "They replace the need for experiments." },
      { id: "c", text: "They turn RNA into proteins." },
      { id: "d", text: "They directly change an organism's inherited traits." },
    ],
    correctOptionId: "a",
    explanation:
      "Most cells are too small to see with the naked eye, so scientists use microscopes to study them.",
    sourceLabel: "OpenStax Biology 2e, Studying Cells",
    sourceUrl: "https://openstax.org/books/biology-2e/pages/4-1-studying-cells",
  },
];

const biologyScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: She connected cell physiology with toxicology by proposing methylene blue as an antidote for cyanide and carbon-monoxide poisoning. Who is she?",
    options: [
      { id: "a", text: "Matilda Moldenhauer Brooks" },
      { id: "b", text: "Fanny Hesse" },
      { id: "c", text: "Nettie Maria Stevens" },
      { id: "d", text: "Alice Catherine Evans" },
    ],
    correctOptionId: "a",
    explanation:
      "Matilda Moldenhauer Brooks studied living cells and proposed methylene blue as an antidote for cyanide and carbon-monoxide poisoning.",
    sourceLabel: "Forgotten Scientists profile: Matilda Moldenhauer Brooks",
    sourceUrl: "/scientists/2",
  },
  {
    id: 2,
    type: "recognition",
    prompt: "Which scientist showed through experiments that insects can learn, remember, and adapt behavior?",
    options: [
      { id: "a", text: "Charles Henry Turner" },
      { id: "b", text: "Lydia Villa-Komaroff" },
      { id: "c", text: "Fanny Hesse" },
      { id: "d", text: "Mary Styles Harris" },
    ],
    correctOptionId: "a",
    explanation:
      "Charles Henry Turner carried out pioneering experiments on insect behavior, including learning, memory, and adaptation.",
    sourceLabel: "Forgotten Scientists profile: Charles Henry Turner",
    sourceUrl: "/scientists/24",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which scientist-achievement match is incorrect?",
    options: [
      { id: "a", text: "Fanny Hesse - agar as a solid culture medium" },
      { id: "b", text: "Lydia Villa-Komaroff - bacterial production of mammalian insulin" },
      { id: "c", text: "Charles Henry Turner - discovery of lambda phage" },
      { id: "d", text: "Matilda Moldenhauer Brooks - methylene blue antidote research" },
    ],
    correctOptionId: "c",
    explanation:
      "Lambda phage is connected with Esther Lederberg. Turner is connected with experimental studies of insect learning and behavior.",
    sourceLabel: "Forgotten Scientists profile: Esther Lederberg",
    sourceUrl: "/scientists/44",
  },
  {
    id: 4,
    type: "compare",
    prompt: "Which statement best shows the difference between Fanny Hesse and Lydia Villa-Komaroff?",
    options: [
      {
        id: "a",
        text: "Hesse improved bacterial culture methods with agar; Villa-Komaroff helped show bacteria could produce mammalian insulin.",
      },
      { id: "b", text: "Both are known mainly for studying insect learning." },
      { id: "c", text: "Hesse discovered sex chromosomes; Villa-Komaroff created agar media." },
      { id: "d", text: "Both worked primarily on astronomy calculations." },
    ],
    correctOptionId: "a",
    explanation:
      "Fanny Hesse suggested agar for reliable bacterial culture. Lydia Villa-Komaroff contributed to early recombinant-DNA work showing bacteria could synthesize mammalian insulin.",
    sourceLabel: "Forgotten Scientists profiles: Fanny Hesse and Lydia Villa-Komaroff",
    sourceUrl: "/scientists/29",
  },
  {
    id: 5,
    type: "timeline",
    prompt: "Which scientist in this set was born earliest?",
    options: [
      { id: "a", text: "Fanny Hesse" },
      { id: "b", text: "Charles Henry Turner" },
      { id: "c", text: "Matilda Moldenhauer Brooks" },
      { id: "d", text: "Lydia Villa-Komaroff" },
    ],
    correctOptionId: "a",
    explanation:
      "Fanny Hesse was born in 1850, earlier than Turner, Brooks, and Villa-Komaroff.",
    sourceLabel: "Forgotten Scientists profile: Fanny Hesse",
    sourceUrl: "/scientists/29",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A lab needs a reliable solid surface for growing and separating bacteria. Which scientist's contribution fits this problem most closely?",
    options: [
      { id: "a", text: "Fanny Hesse" },
      { id: "b", text: "Matilda Moldenhauer Brooks" },
      { id: "c", text: "Charles Henry Turner" },
      { id: "d", text: "Nettie Maria Stevens" },
    ],
    correctOptionId: "a",
    explanation:
      "Fanny Hesse suggested using agar instead of gelatin, making it possible to grow bacteria reliably on solid media.",
    sourceLabel: "Forgotten Scientists profile: Fanny Hesse",
    sourceUrl: "/scientists/29",
  },
  {
    id: 7,
    type: "oddOneOut",
    prompt: "Which person is not listed under the Biology field?",
    options: [
      { id: "a", text: "Nettie Maria Stevens" },
      { id: "b", text: "Matilda Moldenhauer Brooks" },
      { id: "c", text: "Charles Henry Turner" },
      { id: "d", text: "Lydia Villa-Komaroff" },
    ],
    correctOptionId: "a",
    explanation:
      "Nettie Maria Stevens is listed under Genetics, while Brooks, Turner, and Villa-Komaroff are listed under Biology.",
    sourceLabel: "Forgotten Scientists profile: Nettie Maria Stevens",
    sourceUrl: "/scientists/4",
  },
  {
    id: 8,
    type: "achievement",
    prompt: "Which achievement belongs to Lydia Villa-Komaroff?",
    options: [
      { id: "a", text: "Helping demonstrate that bacteria could synthesize mammalian insulin" },
      { id: "b", text: "Suggesting agar for bacterial culture media" },
      { id: "c", text: "Proving that insects could learn through behavior experiments" },
      { id: "d", text: "Linking sex determination to X and Y chromosomes" },
    ],
    correctOptionId: "a",
    explanation:
      "Lydia Villa-Komaroff played a key role in work showing that bacterial cells could synthesize mammalian insulin.",
    sourceLabel: "Forgotten Scientists profile: Lydia Villa-Komaroff",
    sourceUrl: "/scientists/33",
  },
];

const biologyDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "scenario",
    prompt:
      "A medical-history exhibit discusses an antidote approach for cyanide and carbon-monoxide poisoning. Which discovery should it include?",
    options: [
      { id: "a", text: "Matilda Moldenhauer Brooks's work on methylene blue" },
      { id: "b", text: "Fanny Hesse's agar suggestion" },
      { id: "c", text: "Nettie Stevens's sex-chromosome work" },
      { id: "d", text: "Esther Lederberg's lambda phage discovery" },
    ],
    correctOptionId: "a",
    explanation:
      "Brooks proposed methylene blue as an antidote for cyanide and carbon-monoxide poisoning, connecting cell physiology with medical toxicology.",
    sourceLabel: "Forgotten Scientists profile: Matilda Moldenhauer Brooks",
    sourceUrl: "/scientists/2",
  },
  {
    id: 2,
    type: "impact",
    prompt: "Why was agar important for microbiology?",
    options: [
      { id: "a", text: "It stayed solid at incubation temperatures and helped researchers culture bacteria reliably." },
      { id: "b", text: "It made insects learn faster in maze experiments." },
      { id: "c", text: "It directly identified X and Y chromosomes." },
      { id: "d", text: "It replaced all microscopes in cell biology." },
    ],
    correctOptionId: "a",
    explanation:
      "Fanny Hesse's agar suggestion solved problems with gelatin media and helped make reliable bacterial culturing possible.",
    sourceLabel: "Forgotten Scientists profile: Fanny Hesse",
    sourceUrl: "/scientists/29",
  },
  {
    id: 3,
    type: "recognition",
    prompt: "Which achievement helped establish recombinant-DNA biotechnology and changed diabetes treatment?",
    options: [
      { id: "a", text: "Bacteria producing mammalian insulin" },
      { id: "b", text: "Agar replacing gelatin in culture media" },
      { id: "c", text: "Insects recognizing visual patterns" },
      { id: "d", text: "A bacterium from unpasteurized milk causing brucellosis" },
    ],
    correctOptionId: "a",
    explanation:
      "Lydia Villa-Komaroff contributed to the first demonstration that bacteria could synthesize mammalian insulin, a milestone for biotechnology and diabetes treatment.",
    sourceLabel: "Forgotten Scientists profile: Lydia Villa-Komaroff",
    sourceUrl: "/scientists/33",
  },
  {
    id: 4,
    type: "fieldUnderstanding",
    prompt: "What made Charles Henry Turner's insect-behavior research significant?",
    options: [
      { id: "a", text: "It challenged the idea that insects act only by simple reflex." },
      { id: "b", text: "It proved that bacteria cannot adapt to laboratory media." },
      { id: "c", text: "It showed that milk never transmits disease." },
      { id: "d", text: "It discovered the molecular structure of DNA." },
    ],
    correctOptionId: "a",
    explanation:
      "Turner's experiments showed that insects could learn, remember, navigate, and respond to patterns, challenging the view of insects as mere automatons.",
    sourceLabel: "Forgotten Scientists profile: Charles Henry Turner",
    sourceUrl: "/scientists/24",
  },
  {
    id: 5,
    type: "wrongMatch",
    prompt: "Which discovery-person match is incorrect?",
    options: [
      { id: "a", text: "Matilda Moldenhauer Brooks - plant collecting across the Americas" },
      { id: "b", text: "Alice Catherine Evans - brucellosis and unpasteurized milk" },
      { id: "c", text: "Esther Lederberg - lambda phage and replica plating" },
      { id: "d", text: "Nettie Maria Stevens - X and Y chromosomes in sex determination" },
    ],
    correctOptionId: "a",
    explanation:
      "Plant collecting across the Americas is connected with Ynés Mexía. Brooks is connected with cell physiology and methylene blue antidote research.",
    sourceLabel: "Forgotten Scientists profile: Ynés Mexía",
    sourceUrl: "/scientists/43",
  },
  {
    id: 6,
    type: "workOn",
    prompt:
      "A biotechnology lesson explains how bacteria can be used to produce a human medical hormone. Which scientist fits best?",
    options: [
      { id: "a", text: "Lydia Villa-Komaroff" },
      { id: "b", text: "Alice Catherine Evans" },
      { id: "c", text: "Fanny Hesse" },
      { id: "d", text: "Charles Henry Turner" },
    ],
    correctOptionId: "a",
    explanation:
      "Villa-Komaroff helped demonstrate that bacterial cells could synthesize mammalian insulin.",
    sourceLabel: "Forgotten Scientists profile: Lydia Villa-Komaroff",
    sourceUrl: "/scientists/33",
  },
  {
    id: 7,
    type: "compare",
    prompt: "Which comparison best matches Nettie Stevens and Mary Styles Harris?",
    options: [
      {
        id: "a",
        text: "Stevens linked chromosomes with sex determination; Harris combined genetics with public health education and communication.",
      },
      { id: "b", text: "Stevens discovered agar; Harris discovered lambda phage." },
      { id: "c", text: "Both are described mainly as astronomy calculators." },
      { id: "d", text: "Harris co-discovered rhenium; Stevens created insulin-producing bacteria." },
    ],
    correctOptionId: "a",
    explanation:
      "Nettie Stevens is known for sex-chromosome research. Mary Styles Harris is described as a biologist and geneticist whose work includes public health education and communication.",
    sourceLabel: "Forgotten Scientists profiles: Nettie Stevens and Mary Styles Harris",
    sourceUrl: "/scientists/4",
  },
  {
    id: 8,
    type: "clue",
    prompt:
      "Clue: Her microbiology research helped connect unpasteurized milk with brucellosis in humans and supported milk pasteurization. Who is she?",
    options: [
      { id: "a", text: "Alice Catherine Evans" },
      { id: "b", text: "Fanny Hesse" },
      { id: "c", text: "Matilda Moldenhauer Brooks" },
      { id: "d", text: "Mary Styles Harris" },
    ],
    correctOptionId: "a",
    explanation:
      "Alice Catherine Evans showed that Brucella abortus from unpasteurized milk caused brucellosis in humans, helping promote pasteurization.",
    sourceLabel: "Forgotten Scientists profile: Alice Catherine Evans",
    sourceUrl: "/scientists/53",
  },
];

const biologyQuizCards: FieldQuiz[] = [
  {
    field: "Biology",
    slug: "biology-fundamentals",
    title: "Biology Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about cells, enzymes, DNA, translation, and natural selection.",
    scientistNames: biologyScientists.map((scientist) => scientist.name),
    image: "/quiz-images/biology-fundamentals.png",
    questions: biologyFundamentalsQuestions,
  },
  {
    field: "Biology",
    slug: "biology-scientists",
    title: "Biology Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured biologists and the work connected to them.",
    scientistNames: biologyScientists.map((scientist) => scientist.name),
    image: "/quiz-images/biology-scientists.jpg",
    questions: biologyScientistQuestions,
  },
  {
    field: "Biology",
    slug: "biology-discoveries",
    title: "Biology Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about biological discoveries, laboratory methods, and public-health impact.",
    scientistNames: biologyScientists.map((scientist) => scientist.name),
    image: "/quiz-images/biology-discoveries.png",
    questions: biologyDiscoveryQuestions,
  },
];

const chemistryQuizCards: FieldQuiz[] = [
  {
    field: "Chemistry",
    slug: "chemistry-fundamentals",
    title: "Chemistry Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about atoms, bonding, formulas, pH, and acid-base ideas.",
    scientistNames: chemistryScientists.map((scientist) => scientist.name),
    image: "/quiz-images/chemistry-fundamentals.png",
    questions: chemistryFundamentalsQuestions,
  },
  {
    field: "Chemistry",
    slug: "chemistry-scientists",
    title: "Chemistry Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured chemists and the work connected to them.",
    scientistNames: chemistryScientists.map((scientist) => scientist.name),
    image: "/quiz-images/chemistry-scientists.jpg",
    questions: chemistryScientistQuestions,
  },
  {
    field: "Chemistry",
    slug: "chemistry-discoveries",
    title: "Chemistry Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about chemistry achievements, methods, materials, and historical context.",
    scientistNames: chemistryScientists.map((scientist) => scientist.name),
    image: "/quiz-images/chemistry-discoveries.png",
    questions: chemistryDiscoveryQuestions,
  },
];

const physicsQuizCards: FieldQuiz[] = [
  {
    field: "Physics",
    slug: "physics-fundamentals",
    title: "Physics Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about motion, waves, heat, gravity, and simple circuits.",
    scientistNames: physicsScientists.map((scientist) => scientist.name),
    image: "/quiz-images/physics.png",
    questions: physicsQuestions,
  },
  {
    field: "Physics",
    slug: "physics-scientists",
    title: "Physics Scientists Quiz",
    category: "Scientists",
    description: "A quiz about featured physicists and the work connected to them.",
    scientistNames: physicsScientists.map((scientist) => scientist.name),
    image: "/quiz-images/physics-scientists.jpg",
    questions: physicsScientistQuestions,
  },
  {
    field: "Physics",
    slug: "physics-discoveries",
    title: "Physics Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about physics-related achievements, ideas, and their historical context.",
    scientistNames: physicsScientists.map((scientist) => scientist.name),
    image: "/quiz-images/physics-discoveries.png",
    questions: physicsDiscoveryQuestions,
  },
];

const psychologyNeuroscienceScientists = scientists.filter((scientist) =>
  [2, 24, 67, 71, 72].includes(scientist.id),
);

const psychologyNeuroscienceFundamentalsQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "fieldUnderstanding",
    prompt: "Which description best matches psychology as a scientific field?",
    options: [
      { id: "a", text: "The scientific study of behavior and mental processes" },
      { id: "b", text: "Only the study of stars and planets" },
      { id: "c", text: "Only the study of chemical bonding" },
      { id: "d", text: "A field that never uses evidence from experiments" },
    ],
    correctOptionId: "a",
    explanation:
      "Psychology studies behavior and mental processes using scientific methods, including observation, experiments, and evidence-based reasoning.",
    sourceLabel: "OpenStax Psychology 2e, What Is Psychology?",
    sourceUrl: "https://openstax.org/books/psychology-2e/pages/1-1-what-is-psychology",
  },
  {
    id: 2,
    type: "compare",
    prompt: "Which comparison between the central and peripheral nervous systems is most accurate?",
    options: [
      { id: "a", text: "The central nervous system includes the brain and spinal cord; the peripheral nervous system includes nerves outside them." },
      { id: "b", text: "The peripheral nervous system includes only the brain." },
      { id: "c", text: "The central nervous system is made only of bones." },
      { id: "d", text: "The two systems have no connection to sensation or response." },
    ],
    correctOptionId: "a",
    explanation:
      "The central nervous system is the brain and spinal cord. The peripheral nervous system includes nerves and ganglia outside those central structures.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, Basic Structure and Function of the Nervous System",
    sourceUrl:
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-1-basic-structure-and-function-of-the-nervous-system",
  },
  {
    id: 3,
    type: "wrongMatch",
    prompt: "Which nervous-system statement is incorrect?",
    options: [
      { id: "a", text: "Neurons are electrically active cells involved in communication." },
      { id: "b", text: "Glial cells support nervous tissue and help maintain the environment around neurons." },
      { id: "c", text: "The brain and spinal cord are part of the central nervous system." },
      { id: "d", text: "Neurotransmitters are bones that protect the skull." },
    ],
    correctOptionId: "d",
    explanation:
      "Neurotransmitters are chemical messengers involved in communication between neurons or target cells, not bones.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, Nervous Tissue",
    sourceUrl: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue",
  },
  {
    id: 4,
    type: "scenario",
    prompt:
      "A neuron receives enough stimulation to reach threshold. What happens next in a normal action potential?",
    options: [
      { id: "a", text: "An all-or-none electrical signal is generated along the neuron." },
      { id: "b", text: "The signal becomes halfway complete and then stops by definition." },
      { id: "c", text: "The neuron turns into a glial cell." },
      { id: "d", text: "The spinal cord stops being part of the nervous system." },
    ],
    correctOptionId: "a",
    explanation:
      "Action potentials are all-or-none events. If threshold is reached, the signal proceeds; if threshold is not reached, no full action potential occurs.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, The Action Potential",
    sourceUrl: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-4-the-action-potential",
  },
  {
    id: 5,
    type: "clue",
    prompt:
      "Clue: It is the small space where a chemical messenger travels from one neuron toward another cell. What is it?",
    options: [
      { id: "a", text: "Synaptic cleft" },
      { id: "b", text: "Ribosome" },
      { id: "c", text: "Chromosome pair" },
      { id: "d", text: "Agar plate" },
    ],
    correctOptionId: "a",
    explanation:
      "At a chemical synapse, neurotransmitters cross the synaptic cleft and bind to receptors on the target cell.",
    sourceLabel: "OpenStax Anatomy and Physiology 2e, Communication Between Neurons",
    sourceUrl: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons",
  },
  {
    id: 6,
    type: "compare",
    prompt: "Which statement best separates classical conditioning from operant conditioning?",
    options: [
      {
        id: "a",
        text: "Classical conditioning links stimuli; operant conditioning links behavior with consequences.",
      },
      { id: "b", text: "Classical conditioning only happens in computers; operant conditioning only happens in stars." },
      { id: "c", text: "Operant conditioning never involves reinforcement or punishment." },
      { id: "d", text: "Classical conditioning is the same thing as DNA replication." },
    ],
    correctOptionId: "a",
    explanation:
      "Classical conditioning involves learned associations between stimuli. Operant conditioning focuses on how consequences affect the future likelihood of behavior.",
    sourceLabel: "OpenStax Psychology 2e, Operant Conditioning",
    sourceUrl: "https://openstax.org/books/psychology-2e/pages/6-3-operant-conditioning",
  },
  {
    id: 7,
    type: "recognition",
    prompt: "Which sequence best describes the three basic functions of memory?",
    options: [
      { id: "a", text: "Encoding, storage, retrieval" },
      { id: "b", text: "Evaporation, condensation, precipitation" },
      { id: "c", text: "Voltage, resistance, current" },
      { id: "d", text: "Translation, orbit, filtration" },
    ],
    correctOptionId: "a",
    explanation:
      "Memory involves encoding information, storing it, and retrieving it later into awareness or use.",
    sourceLabel: "OpenStax Psychology 2e, How Memory Functions",
    sourceUrl: "https://openstax.org/books/psychology-2e/pages/8-1-how-memory-functions",
  },
  {
    id: 8,
    type: "workOn",
    prompt:
      "A researcher is especially interested in declarative and episodic memory. Which brain structure is most closely connected with that topic?",
    options: [
      { id: "a", text: "Hippocampus" },
      { id: "b", text: "Kidney" },
      { id: "c", text: "Patella" },
      { id: "d", text: "Trachea" },
    ],
    correctOptionId: "a",
    explanation:
      "The hippocampus is strongly associated with declarative and episodic memory, as well as recognition memory.",
    sourceLabel: "OpenStax Psychology 2e, Parts of the Brain Involved with Memory",
    sourceUrl: "https://openstax.org/books/psychology-2e/pages/8-2-parts-of-the-brain-involved-with-memory",
  },
];

const psychologyNeuroscienceScientistQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "clue",
    prompt:
      "Clue: This zoologist tested insects and showed that bees, ants, and cockroaches could learn and adapt through experience. Who is he?",
    options: [
      { id: "a", text: "Charles Henry Turner" },
      { id: "b", text: "George Green" },
      { id: "c", text: "Simeon Aisenstein" },
      { id: "d", text: "John Michell" },
    ],
    correctOptionId: "a",
    explanation:
      "Charles Henry Turner carried out experimental studies of insect learning, memory, and adaptive behavior, making his work important for animal cognition.",
    sourceLabel: "Forgotten Scientists profile: Charles Henry Turner",
    sourceUrl: "/scientists/24",
  },
  {
    id: 2,
    type: "workOn",
    prompt:
      "A rehabilitation center wants historical examples of assistive devices designed to help amputees regain independence. Which person fits best?",
    options: [
      { id: "a", text: "Bessie Blount Griffin" },
      { id: "b", text: "Ida Noddack" },
      { id: "c", text: "Caroline Herschel" },
      { id: "d", text: "Tapputi-Belatekallim" },
    ],
    correctOptionId: "a",
    explanation:
      "Bessie Blount Griffin worked as a physical therapist and developed assistive devices for disabled veterans and amputees.",
    sourceLabel: "Forgotten Scientists profile: Bessie Blount Griffin",
    sourceUrl: "/scientists/67",
  },
  {
    id: 3,
    type: "compare",
    prompt: "Which comparison best matches Charles Henry Turner and Chieko Asakawa?",
    options: [
      {
        id: "a",
        text: "Turner studied animal learning and behavior; Asakawa built accessibility technologies for blind and visually impaired users.",
      },
      { id: "b", text: "Turner discovered rhenium; Asakawa proved that pi is irrational." },
      { id: "c", text: "Both are known mainly for medieval anatomical preparation." },
      { id: "d", text: "Asakawa studied insect learning; Turner created a text-to-speech web browser." },
    ],
    correctOptionId: "a",
    explanation:
      "Turner's work is connected with animal cognition. Asakawa's work is connected with digital accessibility, including tools for blind and visually impaired people.",
    sourceLabel: "Forgotten Scientists profiles: Charles Henry Turner and Chieko Asakawa",
    sourceUrl: "/scientists/24",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which scientist-work match is incorrect?",
    options: [
      { id: "a", text: "Charles Henry Turner - insect learning and behavior experiments" },
      { id: "b", text: "Chieko Asakawa - accessibility technologies for blind users" },
      { id: "c", text: "Bessie Blount Griffin - rehabilitative technology for amputees" },
      { id: "d", text: "Alessandra Giliani - discovery of X and Y chromosomes" },
    ],
    correctOptionId: "d",
    explanation:
      "X and Y chromosomes are connected with Nettie Stevens. Alessandra Giliani is traditionally described in connection with anatomical preparation, though her story is historically debated.",
    sourceLabel: "Forgotten Scientists profiles: Alessandra Giliani and Nettie Stevens",
    sourceUrl: "/scientists/72",
  },
  {
    id: 5,
    type: "recognition",
    prompt:
      "Which person is traditionally described as an early female anatomist and prosector associated with the University of Bologna?",
    options: [
      { id: "a", text: "Alessandra Giliani" },
      { id: "b", text: "Mary Golda Ross" },
      { id: "c", text: "Ruby Payne-Scott" },
      { id: "d", text: "Annie Jump Cannon" },
    ],
    correctOptionId: "a",
    explanation:
      "Alessandra Giliani is traditionally described as an early female anatomist and prosector, although modern historians debate the reliability of the surviving story.",
    sourceLabel: "Forgotten Scientists profile: Alessandra Giliani",
    sourceUrl: "/scientists/72",
  },
  {
    id: 6,
    type: "timeline",
    prompt: "Which figure in this set is associated with the earliest historical period?",
    options: [
      { id: "a", text: "Alessandra Giliani" },
      { id: "b", text: "Charles Henry Turner" },
      { id: "c", text: "Bessie Blount Griffin" },
      { id: "d", text: "Chieko Asakawa" },
    ],
    correctOptionId: "a",
    explanation:
      "Giliani is traditionally associated with the early 14th century, much earlier than Turner, Griffin, and Asakawa.",
    sourceLabel: "Forgotten Scientists profile: Alessandra Giliani",
    sourceUrl: "/scientists/72",
  },
  {
    id: 7,
    type: "scenario",
    prompt:
      "A design team wants to make web information usable for blind and visually impaired people through speech and accessible navigation. Which scientist's work is closest?",
    options: [
      { id: "a", text: "Chieko Asakawa" },
      { id: "b", text: "Eunice Newton Foote" },
      { id: "c", text: "Florence Bascom" },
      { id: "d", text: "Hasan al-Rammah" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa developed major accessibility technologies, including the IBM Home Page Reader and later navigation tools for blind and visually impaired users.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
  {
    id: 8,
    type: "oddOneOut",
    prompt: "Which person is least directly connected with behavior, accessibility, rehabilitation, or anatomy?",
    options: [
      { id: "a", text: "Ida Noddack" },
      { id: "b", text: "Charles Henry Turner" },
      { id: "c", text: "Bessie Blount Griffin" },
      { id: "d", text: "Chieko Asakawa" },
    ],
    correctOptionId: "a",
    explanation:
      "Ida Noddack is connected with chemistry, rhenium, and early ideas about nuclear fission. Turner, Griffin, and Asakawa connect more closely to behavior, rehabilitation, or accessibility.",
    sourceLabel: "Forgotten Scientists profiles: Ida Noddack and Charles Henry Turner",
    sourceUrl: "/scientists/8",
  },
];

const psychologyNeuroscienceDiscoveryQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "impact",
    prompt: "Why was Charles Henry Turner's insect-behavior research important?",
    options: [
      { id: "a", text: "It challenged the idea that insects act only through simple reflexes." },
      { id: "b", text: "It proved that planets move in perfect circles." },
      { id: "c", text: "It discovered the element rhenium." },
      { id: "d", text: "It created the first practical dishwasher." },
    ],
    correctOptionId: "a",
    explanation:
      "Turner's experiments showed that insects could learn, remember, and adapt behavior, which challenged simpler views of insect action.",
    sourceLabel: "Forgotten Scientists profile: Charles Henry Turner",
    sourceUrl: "/scientists/24",
  },
  {
    id: 2,
    type: "clue",
    prompt:
      "Clue: This technology read web pages aloud and helped blind users access digital information. Which innovation is it?",
    options: [
      { id: "a", text: "IBM Home Page Reader" },
      { id: "b", text: "The three-point safety belt" },
      { id: "c", text: "The Rudolphine Tables" },
      { id: "d", text: "The Stranski-Krastanov growth mode" },
    ],
    correctOptionId: "a",
    explanation:
      "Chieko Asakawa developed the IBM Home Page Reader, a voice-based web browser that became important in digital accessibility.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
  {
    id: 3,
    type: "scenario",
    prompt:
      "A museum exhibit focuses on how invention can support motor independence after injury or amputation. Which contribution belongs there?",
    options: [
      { id: "a", text: "Bessie Blount Griffin's assistive feeding and rehabilitation devices" },
      { id: "b", text: "Annie Jump Cannon's stellar classification system" },
      { id: "c", text: "Ida Noddack's co-discovery of rhenium" },
      { id: "d", text: "Elizabeth Langdon Williams's Planet X calculations" },
    ],
    correctOptionId: "a",
    explanation:
      "Bessie Blount Griffin's work in physical therapy and assistive devices was aimed at helping disabled veterans and amputees regain independence.",
    sourceLabel: "Forgotten Scientists profile: Bessie Blount Griffin",
    sourceUrl: "/scientists/67",
  },
  {
    id: 4,
    type: "wrongMatch",
    prompt: "Which contribution-person match is incorrect?",
    options: [
      { id: "a", text: "Charles Henry Turner - experiments on insect learning" },
      { id: "b", text: "Chieko Asakawa - digital accessibility tools" },
      { id: "c", text: "Bessie Blount Griffin - assistive devices for amputees" },
      { id: "d", text: "Matilda Moldenhauer Brooks - discovery of Pluto" },
    ],
    correctOptionId: "d",
    explanation:
      "Brooks is connected with cell physiology and methylene-blue antidote research. Pluto's discovery history is not connected with her profile.",
    sourceLabel: "Forgotten Scientists profile: Matilda Moldenhauer Brooks",
    sourceUrl: "/scientists/2",
  },
  {
    id: 5,
    type: "compare",
    prompt: "Which comparison best shows the difference between Turner's and Griffin's contributions?",
    options: [
      {
        id: "a",
        text: "Turner studied learning and behavior in insects; Griffin created practical rehabilitation devices for people.",
      },
      { id: "b", text: "Turner created a feeding device for veterans; Griffin studied insect navigation." },
      { id: "c", text: "Both are known mainly for astronomical distance measurements." },
      { id: "d", text: "Both co-discovered rhenium." },
    ],
    correctOptionId: "a",
    explanation:
      "Turner is connected with animal cognition and insect behavior. Griffin is connected with physical therapy, assistive technology, and rehabilitation.",
    sourceLabel: "Forgotten Scientists profiles: Charles Henry Turner and Bessie Blount Griffin",
    sourceUrl: "/scientists/24",
  },
  {
    id: 6,
    type: "recognition",
    prompt: "Which contribution is connected with Matilda Moldenhauer Brooks?",
    options: [
      { id: "a", text: "Methylene blue as an antidote approach for cyanide and carbon-monoxide poisoning" },
      { id: "b", text: "A voice-based browser for blind web users" },
      { id: "c", text: "Experiments showing that insects learn through experience" },
      { id: "d", text: "A method for calculating planetary positions" },
    ],
    correctOptionId: "a",
    explanation:
      "Brooks studied living cells and proposed methylene blue as an antidote for cyanide and carbon-monoxide poisoning.",
    sourceLabel: "Forgotten Scientists profile: Matilda Moldenhauer Brooks",
    sourceUrl: "/scientists/2",
  },
  {
    id: 7,
    type: "workOn",
    prompt:
      "A lesson connects sensory disability, information access, and inclusive technology. Which scientist's work should it highlight?",
    options: [
      { id: "a", text: "Chieko Asakawa" },
      { id: "b", text: "Hasan al-Rammah" },
      { id: "c", text: "John Michell" },
      { id: "d", text: "Maria Cunitz" },
    ],
    correctOptionId: "a",
    explanation:
      "Asakawa's work transformed digital accessibility for blind and visually impaired people through web access and navigation technologies.",
    sourceLabel: "Forgotten Scientists profile: Chieko Asakawa",
    sourceUrl: "/scientists/71",
  },
  {
    id: 8,
    type: "fieldUnderstanding",
    prompt:
      "Which statement is the most careful way to describe Alessandra Giliani's place in this topic?",
    options: [
      {
        id: "a",
        text: "Her profile connects to anatomical study and medical history, but the historical evidence for her story is debated.",
      },
      { id: "b", text: "She is securely documented as the inventor of modern brain imaging." },
      { id: "c", text: "She discovered classical conditioning through dog experiments." },
      { id: "d", text: "She built the first electronic computer in China." },
    ],
    correctOptionId: "a",
    explanation:
      "The profile presents Giliani as traditionally associated with anatomical preparation while clearly noting that modern historians debate the surviving account.",
    sourceLabel: "Forgotten Scientists profile: Alessandra Giliani",
    sourceUrl: "/scientists/72",
  },
];

const psychologyNeuroscienceQuizCards: FieldQuiz[] = [
  {
    field: "Psychology & Neuroscience",
    slug: "psychology-neuroscience-fundamentals",
    title: "Psychology & Neuroscience Fundamentals Quiz",
    category: "Fundamentals",
    description: "A medium-level quiz about behavior, memory, neurons, synapses, and the nervous system.",
    scientistNames: psychologyNeuroscienceScientists.map((scientist) => scientist.name),
    image: "/quiz-images/psychology-neuroscience-fundamentals.png",
    questions: psychologyNeuroscienceFundamentalsQuestions,
  },
  {
    field: "Psychology & Neuroscience",
    slug: "psychology-neuroscience-scientists",
    title: "Psychology & Neuroscience Scientists Quiz",
    category: "Scientists",
    description: "A quiz about behavior, accessibility, rehabilitation, and anatomy-related profiles.",
    scientistNames: psychologyNeuroscienceScientists.map((scientist) => scientist.name),
    image: "/quiz-images/psychology-neuroscience-scientists.png",
    questions: psychologyNeuroscienceScientistQuestions,
  },
  {
    field: "Psychology & Neuroscience",
    slug: "psychology-neuroscience-discoveries",
    title: "Psychology & Neuroscience Discoveries Quiz",
    category: "Discoveries",
    description: "A mixed quiz about animal cognition, accessibility technology, rehabilitation, and nervous-system ideas.",
    scientistNames: psychologyNeuroscienceScientists.map((scientist) => scientist.name),
    image: "/quiz-images/psychology-neuroscience-discoveries.png",
    questions: psychologyNeuroscienceDiscoveryQuestions,
  },
];

export const fieldQuizzes: FieldQuiz[] = [
  ...physicsQuizCards,
  ...astronomyQuizCards,
  ...chemistryQuizCards,
  ...biologyQuizCards,
  ...mathematicsQuizCards,
  ...computerScienceQuizCards,
  ...engineeringQuizCards,
  ...medicineQuizCards,
  ...psychologyNeuroscienceQuizCards,
];

export function getQuizBySlug(slug: string) {
  if (slug === "physics") {
    return fieldQuizzes.find((quiz) => quiz.slug === "physics-fundamentals");
  }

  if (slug === "astronomy") {
    return fieldQuizzes.find((quiz) => quiz.slug === "astronomy-fundamentals");
  }

  if (slug === "chemistry") {
    return fieldQuizzes.find((quiz) => quiz.slug === "chemistry-fundamentals");
  }

  if (slug === "biology") {
    return fieldQuizzes.find((quiz) => quiz.slug === "biology-fundamentals");
  }

  if (slug === "mathematics") {
    return fieldQuizzes.find((quiz) => quiz.slug === "mathematics-fundamentals");
  }

  if (slug === "computer-science") {
    return fieldQuizzes.find((quiz) => quiz.slug === "computer-science-fundamentals");
  }

  if (slug === "engineering") {
    return fieldQuizzes.find((quiz) => quiz.slug === "engineering-fundamentals");
  }

  if (slug === "medicine") {
    return fieldQuizzes.find((quiz) => quiz.slug === "medicine-fundamentals");
  }

  if (slug === "psychology-neuroscience") {
    return fieldQuizzes.find((quiz) => quiz.slug === "psychology-neuroscience-fundamentals");
  }

  return fieldQuizzes.find((quiz) => quiz.slug === slug);
}
