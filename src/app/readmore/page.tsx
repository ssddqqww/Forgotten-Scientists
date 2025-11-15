export default function readmore() {
  return (
    <section className="p-20 pt-30">

      <a href="/" className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition">
        <span className="text-xl">←</span>
        <span>Back</span>
      </a>

      <div className="flex flex-col md:flex-row items-start gap-8">

        <div className="w-full md:w-1/3 flex-shrink-0">
          <img
            src="planet_bg.png"
            alt="Isaac Newton"
            className="rounded-lg object-cover w-full h-96"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Isaac Newton</h1>
          <p className="text-gray-700 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>

  )
}