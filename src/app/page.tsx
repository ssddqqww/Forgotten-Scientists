import Hero from "@/app/components/Sections/Hero"
import ScientistDayWeek from "@/app/components/Sections/ScientistDayWeek"
import ExploreScientist from "@/app/components/Sections/ExploreScientist"
import Timeline from "./components/Sections/Timeline";
import Quizzes from "./components/Sections/Quizzes";
import MapForgottenScientist from "./components/Sections/MapForgottenScientist";

export default function Home() {
  return (
    <div>
      <Hero/>     
      <div className="px-10 md:px-2 lg:px-20">
        <ScientistDayWeek/>
        <ExploreScientist/>
        <Timeline/>
        <MapForgottenScientist/>
        <Quizzes/>
      </div>
    </div>
  );
}
