import Link from "next/link";

export default function Hero() {
    return (
        <section
        className="relative flex min-h-[calc(100svh-5.25rem)] items-end justify-start bg-cover bg-[center_top] pb-14 sm:min-h-screen sm:items-center sm:bg-center sm:pb-0"
        style={{ backgroundImage: "url('/HeroBG.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/45 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-white/27 to-transparent sm:block" />
        <div className="relative z-10 flex w-full max-w-lg flex-col justify-end px-5 pb-4 pt-20 sm:justify-center sm:px-10 sm:py-0 lg:px-16">
          <h1 className="mb-4 text-[3.55rem] font-semibold leading-[0.98] sm:mb-3 sm:text-6xl sm:leading-tight lg:text-7xl">
            Forgotten Scientists
          </h1>
          <p className="mb-7 max-w-[21rem] text-[1.05rem] font-medium leading-7 sm:mb-6 sm:max-w-none sm:text-xl sm:font-semibold sm:leading-normal lg:text-2xl">
            Discover the hidden heroes of science from around the world
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-black px-6 py-3 text-center text-sm text-white hover:bg-gray-800 sm:py-2 sm:text-base"
            >
              Sign Up Now
            </Link>
            <Link
              href="/login"
              className="rounded-md bg-black px-6 py-3 text-center text-sm text-white hover:bg-gray-800 sm:py-2 sm:text-base"
            >
              Log in Here
            </Link>
          </div>
        </div>
      </section>
    )
}
