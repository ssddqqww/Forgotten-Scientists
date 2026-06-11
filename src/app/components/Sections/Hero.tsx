import Link from "next/link";

export default function Hero() {
    return (
        <section
        className="relative flex min-h-[calc(100svh-5.25rem)] items-center justify-start bg-cover bg-center sm:min-h-screen"
        style={{ backgroundImage: "url('/HeroBG.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/27 to-transparent" />
        <div className="relative z-10 flex w-full max-w-lg flex-col justify-center px-5 py-10 sm:px-10 sm:py-0 lg:px-16">
          <h1 className="mb-4 text-[3.15rem] font-semibold leading-[1] sm:mb-3 sm:text-6xl sm:leading-tight lg:text-7xl">
            Forgotten Scientists
          </h1>
          <p className="mb-6 max-w-[19rem] text-base font-medium leading-7 sm:mb-6 sm:max-w-none sm:text-xl sm:font-semibold sm:leading-normal lg:text-2xl">
            Discover the hidden heroes of science from around the world
          </p>

          <div className="flex w-full max-w-[18rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-4">
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
