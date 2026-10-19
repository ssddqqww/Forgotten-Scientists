type ScientistPortraitFallbackProps = {
  name: string;
  field: string;
  className?: string;
};

type PortraitPalette = {
  background: string;
  accent: string;
  softAccent: string;
  text: string;
};

const palettes: Record<string, PortraitPalette> = {
  astronomy: { background: "#e9edf8", accent: "#596da9", softAccent: "#cdd6ee", text: "#26345f" },
  physics: { background: "#e7f0f1", accent: "#39747a", softAccent: "#c9dfe1", text: "#214c51" },
  chemistry: { background: "#f2e9f2", accent: "#8a5e88", softAccent: "#dfcce0", text: "#593b58" },
  biology: { background: "#e8f0e5", accent: "#5f8057", softAccent: "#cfdfca", text: "#3d5a37" },
  medicine: { background: "#f5e8e6", accent: "#a65f59", softAccent: "#e8cbc7", text: "#6b3d39" },
  mathematics: { background: "#eee8f5", accent: "#705c96", softAccent: "#d8cdea", text: "#493c65" },
  engineering: { background: "#f3ece2", accent: "#9a7040", softAccent: "#e5d3bc", text: "#654a2b" },
  computer: { background: "#e5eef4", accent: "#4c7895", softAccent: "#c7dbe8", text: "#315166" },
  earth: { background: "#eeeade", accent: "#857649", softAccent: "#ddd5ba", text: "#574d30" },
  social: { background: "#f1e9e3", accent: "#936b54", softAccent: "#dfcdbf", text: "#604737" },
  default: { background: "#f0ede6", accent: "#7c725f", softAccent: "#ddd7ca", text: "#514a3e" },
};

function getPalette(field: string) {
  const normalizedField = field.toLowerCase();

  if (normalizedField.includes("astro")) return palettes.astronomy;
  if (normalizedField.includes("phys")) return palettes.physics;
  if (normalizedField.includes("chem") || normalizedField.includes("biochem")) return palettes.chemistry;
  if (normalizedField.includes("bio") || normalizedField.includes("botan") || normalizedField.includes("genetic") || normalizedField.includes("natural")) return palettes.biology;
  if (normalizedField.includes("medicine") || normalizedField.includes("microbio")) return palettes.medicine;
  if (normalizedField.includes("math")) return palettes.mathematics;
  if (normalizedField.includes("engineer") || normalizedField.includes("invent")) return palettes.engineering;
  if (normalizedField.includes("computer")) return palettes.computer;
  if (normalizedField.includes("geo") || normalizedField.includes("climate") || normalizedField.includes("ocean")) return palettes.earth;
  if (normalizedField.includes("political") || normalizedField.includes("psych")) return palettes.social;

  return palettes.default;
}

function getInitials(name: string) {
  return name
    .replace(/\([^)]*\)/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ScientistPortraitFallback({
  name,
  field,
  className = "",
}: ScientistPortraitFallbackProps) {
  const palette = getPalette(field);

  return (
    <div
      role="img"
      aria-label={`Portrait unavailable for ${name}`}
      className={`relative overflow-hidden rounded-md border border-black/10 ${className}`}
      style={{ backgroundColor: palette.background, color: palette.text }}
    >
      <div
        className="absolute -right-12 -top-14 h-44 w-44 rounded-full border-[1.5rem] opacity-35"
        style={{ borderColor: palette.softAccent }}
      />
      <div
        className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full opacity-70"
        style={{ backgroundColor: palette.softAccent }}
      />
      <div
        className="absolute left-0 top-0 h-1.5 w-full opacity-80"
        style={{ backgroundColor: palette.accent }}
      />

      <div className="absolute left-6 top-7 flex items-start sm:left-7 sm:top-8">
        {getInitials(name).split("").map((initial, index) => (
          <span
            key={`${initial}-${index}`}
            className={`text-[3.25rem] font-normal leading-none sm:text-[3.75rem] ${index === 1 ? "-ml-1.5 mt-2 opacity-75" : ""}`}
            style={{
              color: palette.accent,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
            }}
          >
            {initial}
          </span>
        ))}
      </div>

      <div className="absolute bottom-5 left-6 right-6 border-t border-current/20 pt-3">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] opacity-55">
          Forgotten Scientists Archive
        </p>
      </div>
    </div>
  );
}
