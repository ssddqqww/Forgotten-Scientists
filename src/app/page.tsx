import Hero from "@/app/components/Sections/Hero"
import ScientistDayWeek from "@/app/components/Sections/ScientistDayWeek"
import HomeSectionExplorer from "@/app/components/Sections/HomeSectionExplorer"
import ExploreScientist from "@/app/components/Sections/ExploreScientist"
import Timeline from "@/app/components/Sections/Timeline"
import MapForgottenScientist from "@/app/components/Sections/MapForgottenScientist"
import Quizzes from "@/app/components/Sections/Quizzes"
import News from "@/app/components/Sections/News"

export default function Home() {
  return (
    <div>
      <Hero/>     
      <div className="px-5 sm:px-8 md:px-2 lg:px-20">
        <ScientistDayWeek/>
        <div className="lg:hidden">
          <HomeSectionExplorer/>
        </div>
        <div id="desktop-home-sections" className="hidden lg:block">
          <ExploreScientist/>
          <Timeline/>
          <MapForgottenScientist/>
          <Quizzes/>
          <News/>
        </div>
      </div>
    </div>
  );
}
