import Hero from "@/app/components/Sections/Hero"
import ScientistDayWeek from "@/app/components/Sections/ScientistDayWeek"
import HomeSectionExplorer from "@/app/components/Sections/HomeSectionExplorer"

export default function Home() {
  return (
    <div>
      <Hero/>     
      <div className="px-5 sm:px-8 md:px-2 lg:px-20">
        <ScientistDayWeek/>
        <HomeSectionExplorer/>
      </div>
    </div>
  );
}
