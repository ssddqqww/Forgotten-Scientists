import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-start min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/HeroBG.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 w-full max-w-lg">
        <h1 className="text-6xl lg:text-7xl font-semibold mb-3 leading-tight">
          Forgotten Scientists
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-medium sm:font-semibold mb-6">
          Discover the hidden heroes of science from around the world
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="px-6 py-2 text-sm sm:text-base bg-black text-white rounded-md hover:bg-gray-800 text-center"
          >
            Sign Up Now
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 text-sm sm:text-base bg-black text-white rounded-md hover:bg-gray-800 text-center"
          >
            Log in Here
          </Link>
        </div>
      </div>
    </section>

  );
}
