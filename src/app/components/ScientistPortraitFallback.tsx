type ScientistPortraitFallbackProps = {
  name: string;
  className?: string;
};

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
  className = "",
}: ScientistPortraitFallbackProps) {
  return (
    <div
      role="img"
      aria-label={`Portrait unavailable for ${name}`}
      className={`relative overflow-hidden rounded-md border border-black/15 bg-[#f3f0e7] ${className}`}
    >
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-black/10" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#ded8c7]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-black" />

      <div className="absolute left-5 top-5 flex h-16 w-16 items-center justify-center rounded-sm bg-black text-2xl font-bold tracking-[0.08em] text-white shadow-sm sm:h-18 sm:w-18 sm:text-3xl">
        {getInitials(name)}
      </div>

      <div className="absolute bottom-5 left-5 right-5 border-t border-black/20 pt-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-black/55">
          Forgotten Scientists Archive
        </p>
      </div>
    </div>
  );
}
