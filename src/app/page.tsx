import Hero from "@/app/components/Sections/Hero"
import ScientistDayWeek from "@/app/components/Sections/ScientistDayWeek"
import ExploreScientist from "@/app/components/Sections/ExploreScientist"

export default function Home() {
  return (
    <>
      <Hero/>     
      <div className="px-10 md:px-24 lg:px-40 py-35 space-y-16">
        <ScientistDayWeek/>
        <ExploreScientist/>
      </div>
    </>
  );
}
