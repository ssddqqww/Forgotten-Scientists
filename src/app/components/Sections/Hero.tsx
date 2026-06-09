import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function Hero() {
    return (
        <section
        className="relative flex min-h-[39rem] items-end overflow-hidden bg-cover bg-center sm:min-h-[44rem] sm:items-center"
        style={{ backgroundImage: "url('/HeroBG.jpg')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,.16),rgba(2,8,23,.88))] sm:bg-[linear-gradient(90deg,rgba(2,8,23,.92),rgba(2,8,23,.42),rgba(2,8,23,.12))]" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full border border-white/15 sm:h-[30rem] sm:w-[30rem]" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pb-12 pt-28 text-white sm:px-8 sm:py-24 lg:px-12">
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <Compass size={15} aria-hidden="true" />
            Science history, rediscovered
          </div>
          <h1 className="max-w-4xl text-[3.35rem] font-semibold leading-[0.94] tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]">
            Forgotten Scientists
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-xl sm:leading-8">
            Meet the researchers whose ideas changed the world, even when history
            left their names behind.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/scientists"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-blue-50"
            >
              Explore scientists
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/timeline"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Browse the timeline
            </Link>
          </div>
        </div>
      </section>
    )
}
