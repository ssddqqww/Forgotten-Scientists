export type NewsItem = {
  id: number;
  type: "Anniversary" | "Archive / Discovery" | "Project Update" | "Did You Know?";
  title: string;
  author: string;
  publicationDate: string;
  description: string;
  profileNote: string;
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    type: "Anniversary",
    title: "Anniversary of the Birth of Chien-Shiung Wu",
    author: "Forgotten Scientists Team",
    publicationDate: "May 31, 2025",
    description:
      "Chien-Shiung Wu was born on May 31, 1912, in China and became one of the most influential experimental physicists of the 20th century. She is best known for her crucial role in the Wu experiment, which demonstrated the violation of parity conservation in weak interactions. Although this discovery fundamentally changed modern physics, her contribution was not fully recognized at the time. Wu worked for many years at Columbia University, where she made major contributions to nuclear and particle physics. Today, she is widely regarded as a key figure whose work reshaped our understanding of fundamental physical laws.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 2,
    type: "Anniversary",
    title: "Anniversary of Nettie Stevens' Discovery of Sex Chromosomes",
    author: "Forgotten Scientists Team",
    publicationDate: "November 8, 2025",
    description:
      "On November 8, 1905, Nettie Stevens published her groundbreaking research showing that sex is determined by specific chromosomes, the X and Y. This discovery laid the foundation for modern genetics and our understanding of sex determination in organisms. Despite the significance of her work, Stevens' contribution was largely overlooked during her lifetime.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 3,
    type: "Anniversary",
    title: "Commemoration of Mary Sears' Contributions to Oceanography",
    author: "Forgotten Scientists Team",
    publicationDate: "June 20, 2025",
    description:
      "Mary Sears was a pioneering oceanographer who played a key role in developing oceanographic research during World War II. On this day, we honor her extensive work in hydrography and marine science, which provided essential knowledge for naval operations and scientific understanding of the oceans. Sears also contributed to mentoring future generations of women scientists.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 4,
    type: "Anniversary",
    title: "Remembering Annie Easley's Work on NASA Energy Projects",
    author: "Forgotten Scientists Team",
    publicationDate: "October 25, 2025",
    description:
      "On October 25, 1965, Annie Easley contributed to the development of software for NASA's energy conversion systems and early space missions. Her work in applied mathematics and computer programming helped advance technologies that were critical for both space exploration and renewable energy. Easley overcame significant barriers as an African-American woman in STEM, inspiring many who followed.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 5,
    type: "Anniversary",
    title: "Anniversary of Inge Lehmann's Discovery of the Earth's Inner Core",
    author: "Forgotten Scientists Team",
    publicationDate: "February 17, 2025",
    description:
      "On February 17, 1936, seismologist Inge Lehmann published her analysis revealing the existence of a solid inner core inside the Earth. This landmark discovery transformed geophysics and seismic science. Lehmann's careful interpretation of seismic wave data demonstrated her unique analytical skills and secured her place in the history of Earth science.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 6,
    type: "Anniversary",
    title: "Commemoration of Ellen Swallow Richards' Work on Public Health",
    author: "Forgotten Scientists Team",
    publicationDate: "December 3, 2025",
    description:
      "On December 3, 1899, Ellen Swallow Richards published influential research on water quality and sanitary engineering. Her work established scientific standards for nutrition, hygiene, and public health in the United States. Richards' contributions helped lay the groundwork for modern environmental science and public health initiatives.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 7,
    type: "Archive / Discovery",
    title: "Digitized Letters Reveal Henrietta Hill Swope's Early Work on Variable Stars",
    author: "Forgotten Scientists Team",
    publicationDate: "January 10, 2025",
    description:
      "Recently digitized letters from Henrietta Hill Swope provide new insights into her detailed observations of variable stars. These historical documents show her meticulous work in refining stellar brightness measurements, which contributed to the development of modern astronomical methods. Swope's efforts were often overshadowed in her time.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 8,
    type: "Archive / Discovery",
    title: "Rediscovered Manuscripts of Agnes Pockels Highlight Pioneering Surface Chemistry",
    author: "Forgotten Scientists Team",
    publicationDate: "February 5, 2025",
    description:
      "Manuscripts of Agnes Pockels, recently made available in digital archives, demonstrate her experiments on surface tension. Her findings laid the groundwork for modern surface chemistry and materials science, and these newly accessible documents allow researchers to study her original methods.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 9,
    type: "Archive / Discovery",
    title: "Letters of Caroline Lucretia Herschel Shed Light on Comet Discoveries",
    author: "Forgotten Scientists Team",
    publicationDate: "March 12, 2025",
    description:
      "Recently uncovered letters by Caroline Lucretia Herschel reveal details about her discovery of several comets and her observations in astronomy. The documents provide a rare glimpse into her contributions, which were often recorded in correspondence rather than formal publications.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 10,
    type: "Archive / Discovery",
    title: "Archive Materials Highlight Mary Somerville's Role in Science Communication",
    author: "Forgotten Scientists Team",
    publicationDate: "April 2, 2025",
    description:
      "Recently digitized manuscripts and letters of Mary Somerville demonstrate her efforts to communicate complex mathematical and astronomical knowledge to a broader audience. These historical documents reveal her influence on scientific education and cross-European scientific networks.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 11,
    type: "Archive / Discovery",
    title: "Katherine Blodgett's Lab Notes on Non-Reflective Coatings Made Public",
    author: "Forgotten Scientists Team",
    publicationDate: "May 15, 2025",
    description:
      "Laboratory notebooks of Katherine Blodgett, now available in archives, detail her pioneering work on non-reflective glass coatings. These documents provide insight into her experimental process and innovations that have shaped modern optics.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 12,
    type: "Archive / Discovery",
    title: "Beulah Louise Henry's Invention Notebooks Now Digitized",
    author: "Forgotten Scientists Team",
    publicationDate: "June 21, 2025",
    description:
      "The invention notebooks of Beulah Louise Henry, recently digitized, reveal her design process for numerous mechanical devices. Researchers can now study her original sketches and notes, showcasing her inventive contributions.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 13,
    type: "Archive / Discovery",
    title: "Marietta Blau's Early Radioactivity Detection Research Highlighted in Archives",
    author: "Forgotten Scientists Team",
    publicationDate: "July 30, 2025",
    description:
      "Archival documents of Marietta Blau, recently made accessible, show her experimental techniques for detecting radioactive particles. These materials illustrate her contributions to the development of particle physics, which were underrecognized during her lifetime.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 14,
    type: "Project Update",
    title: "Ten New Scientist Profiles Added to the Site",
    author: "Forgotten Scientists Team",
    publicationDate: "October 11, 2025",
    description:
      "We are excited to announce that ten new scientist profiles have been added to the Forgotten Scientists project. The newly added scientists are Mary Styles Harris, Chieko Asakawa, Alessandra Giliani, James Croll, Louise Pearce, Evelyn Boyd Granville, Inge Lehmann, John Michell, Simeon Aisenstein, Jakob Bielfeld, and Johann Heinrich Lambert. Each profile includes detailed biographical information and notable contributions. This addition expands our coverage and provides more opportunities for learning and exploration on the site.",
    profileNote: "Read the full profile of these scientists in the Scientists section.",
  },
  {
    id: 15,
    type: "Project Update",
    title: "New Interactive Map Lets You Explore Scientists by Field, Country, and Century",
    author: "Forgotten Scientists Team",
    publicationDate: "December 15, 2025",
    description:
      "We are excited to introduce a new interactive map on the Forgotten Scientists site. Using this map, users see where scientists were born. The map allows filtering by scientific field, country, and century, making it easy to discover lesser-known scientists and understand the global history of science. This feature provides a visual and engaging way to connect with the lives and work of forgotten scientists.",
    profileNote: "Read more about the interactive map in the Features section.",
  },
  {
    id: 16,
    type: "Did You Know?",
    title: "Did You Know? Josephine Cochran Invented the First Practical Dishwasher",
    author: "Forgotten Scientists Team",
    publicationDate: "September 2, 2025",
    description:
      "Josephine Cochran, an American inventor, created the first practical dishwasher in 1886. She designed it to wash dishes faster than her servants could, using a motor-driven wheel to spray hot soapy water. Cochran's invention was patented and eventually became the basis for modern dishwashers used worldwide.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 17,
    type: "Did You Know?",
    title: "Did You Know? Taqi al-Din Built an Observatory in 1577",
    author: "Forgotten Scientists Team",
    publicationDate: "March 10, 2025",
    description:
      "Taqi al-Din, an Ottoman astronomer and engineer, established one of the largest observatories of his time in Istanbul in 1577. He developed precise astronomical instruments and wrote detailed works on observational techniques, which were influential in both Islamic and European astronomy.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 18,
    type: "Did You Know?",
    title: "Did You Know? Ida Noddack Suggested the Existence of Nuclear Fission",
    author: "Forgotten Scientists Team",
    publicationDate: "May 28, 2025",
    description:
      "Ida Noddack, a German chemist, proposed in 1934 that a heavy nucleus could break into smaller parts when bombarded by neutrons, a concept later known as nuclear fission. Her idea was initially overlooked but later became foundational in nuclear physics and energy research.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 19,
    type: "Did You Know?",
    title: "Did You Know? Fanny Hesse Introduced Agar in Microbiology",
    author: "Forgotten Scientists Team",
    publicationDate: "December 6, 2025",
    description:
      "Fanny Hesse, the wife of a microbiologist, suggested using agar as a solidifying agent for bacterial cultures in the 1880s. This simple idea revolutionized microbiology, allowing scientists to grow and study bacteria more effectively, and is still a standard practice today.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
  {
    id: 20,
    type: "Did You Know?",
    title: "Did You Know? Wang Zhenyi Calculated Lunar Eclipses as a Teenager",
    author: "Forgotten Scientists Team",
    publicationDate: "August 17, 2025",
    description:
      "Wang Zhenyi, an 18th-century Chinese astronomer, mathematician, and poet, accurately calculated the timing of lunar eclipses while still a teenager. She also wrote works explaining astronomical phenomena in ways accessible to women of her time, challenging social norms and advancing scientific understanding.",
    profileNote: "Read the full profile of this scientist in the Scientists section.",
  },
];
