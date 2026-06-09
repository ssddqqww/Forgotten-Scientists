import Hero from "@/app/components/Sections/Hero"
import ScientistDayWeek from "@/app/components/Sections/ScientistDayWeek"
import ArchiveNavigation from "@/app/components/layout/ArchiveNavigation"

export default function Home() {
  return (
    <main className="bg-[#f5f2eb]">
      <Hero/>     
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">
            Explore the archive
          </p>
          <div className="mb-8 mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.02] sm:text-5xl">
              Choose where to begin.
            </h2>
            <p className="max-w-md text-sm leading-6 text-gray-600 sm:text-base">
              Each part of the archive now has its own focused page.
            </p>
          </div>
          <ArchiveNavigation variant="cards"/>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScientistDayWeek/>
      </div>
    </main>
  );
}
