import Link from "next/link";

export default function Home() {
  return (
    // Hero
    <>
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

      <div className="px-10 md:px-24 lg:px-40 py-35 space-y-16">
        {/* Section 1: Scientist of the Day & Week */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 md:divide-x md:divide-gray-900">
            {/* Scientist of the Day */}
            <div className="flex flex-col p-6">
              <h2 className="text-3xl md:text-5xl font-bold">Scientist of the Day</h2>
              <span className="text-xl md:text-2xl font-bold my-3">John Doe</span>
              <div className="flex flex-col flex-wrap md:flex-row items-start gap-6">
                <img
                  src="/HeroBG.jpg"
                  alt="Scientist"
                  className="w-full md:w-72 lg:w-70 h-64 md:h-80 object-cover rounded-lg"
                />
                <div>
                  <p className="text-base lg:w-50  md:text-lg text-gray-900 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                    nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat...
                  </p>
                  <button className="mt-3 px-5 py-2 bg-black text-white rounded-md text-sm md:text-base">
                    Read more
                  </button>
                </div>
              </div>
            </div>

            {/* Scientist of the Week */}
            <div className="flex flex-col p-6">
              <h2 className="text-3xl md:text-5xl font-bold">Scientist of the Week</h2>
              <span className="text-xl md:text-2xl font-bold my-3">John Doe</span>
              <div className="flex flex-col flex-wrap md:flex-row items-start gap-6">
                <img
                  src="/HeroBG.jpg"
                  alt="Scientist"
                  className="w-full md:w-72 lg:w-70 h-64 md:h-80 object-cover rounded-lg"
                />
                <div>
                  <p className="text-base lg:w-50 md:text-lg text-gray-900 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                    nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat...
                  </p>
                  <button className="mt-3 px-5 py-2 bg-black text-white rounded-md text-sm md:text-base">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Icons Row */}
          <div className="flex justify-center md:justify-between mt-12 flex-wrap gap-6">

            <div className="flex flex-col items-center text-center p-6 w-28">
              <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
                <img
                  src="/icons/Flask_light.png"
                  alt=""
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <span className="text-sm font-normal mt-3">Scientists</span>
            </div>

            <div className="flex flex-col items-center text-center p-6 w-28">
              <img
                className="w-14 h-14 object-contain"
                src="/icons/Hourglass_light.png"
                alt=""
              />
              <span className="text-sm font-normal mt-3">Timeline</span>
            </div>

            <div className="flex flex-col items-center text-center p-6 w-28">
              <img
                className="w-14 h-14 object-contain"
                src="/icons/Map.png"
                alt=""
              />
              <span className="text-sm font-normal mt-3">Map</span>
            </div>

            <div className="flex flex-col items-center text-center p-6 w-28">
              <img
                className="w-14 h-14 object-contain"
                src="/icons/Waterfall.png"
                alt=""
              />
              <span className="text-sm font-normal mt-3">Quizzes</span>
            </div>

            <div className="flex flex-col items-center text-center p-6 w-28">
              <img
                className="w-14 h-14 object-contain"
                src="/icons/globe.png"
                alt=""
              />
              <span className="text-sm font-normal mt-3">News</span>
            </div>
          </div>
        </section>


        {/* Section 2: Explore Scientists */}
        <section>
          <h2 className="text-5xl font-bold mb-2">Explore Scientists</h2>
          <p className="text-gray-600 mb-6">
            Browse scientists by field, country, or century. Click on a card to
            learn more.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <button className="flex items-center gap-2 px-4 py-2 border-r">
              <img
                src="/icons/Atom_light.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              By Field
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border-r">
              <img
                src="/icons/Map.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              By Country
            </button>

            <button className="flex items-center gap-2 px-4 py-2">
              <img
                src="/icons/Watch.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              By Century
            </button>
          </div>


          {/* Scientist Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-900">
            {[1, 2, 3, 4].map((card) => (
              <div
                key={card}
                className="pr-8 flex flex-col items-start"
              >
                <h3 className="font-bold mb-1" >John Doe</h3>
                <img
                  src="/HeroBG.jpg"
                  alt="Scientist"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-md text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat...
                </p>
                <button className="mt-3 px-4 py-1 bg-black text-white rounded-md text-sm">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
