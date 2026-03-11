export default function ScientistDayWeek() {
    return (
        <section className="pt-20 pb-40">
            <div className="grid md:grid-cols-2 gap-8 md:divide-x md:divide-gray-900">

                {/* Scientist of the Day */}
                <div className="flex flex-col p-6">
                    <h2 className="text-3xl md:text-5xl font-bold">Scientist of the Day</h2>
                    <span className="text-xl md:text-2xl font-bold my-3">Viktor Amazaspovich Ambartsumian</span>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <img
                            src="/scientist18.png"
                            alt="Scientist"
                            className="w-full md:w-72 h-64 object-cover rounded-lg"
                        />

                        <div className="max-w-sm">
                            <p className="text-base md:text-lg text-gray-900 mt-2">
Showed that many stars form continuously in associations — stellar formation is ongoing, not a once‑in‑a‑lifetime event. 

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
                    <span className="text-xl md:text-2xl font-bold my-3">Mary Fairfax Somerville</span>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <img
                            src="/scientist28.png"
                            alt="Scientist"
                            className="w-full md:w-72 h-64 object-cover rounded-lg"
                        />

                        <div className="max-w-sm">
                            <p className="text-base md:text-lg text-gray-900 mt-2">
                                Demonstrated that science and mathematical knowledge can be accessible, and unified many fields into a coherent view — laying groundwork for modern interdisciplinary science.

                            </p>

                            <button className="mt-3 px-5 py-2 bg-black text-white rounded-md text-sm md:text-base">
                                Read more
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Icons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-900 mt-12 text-center">

                <div className="flex flex-col items-center p-6">
                    <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
                        <img
                            src="/icons/Flask_light.png"
                            alt="Scientists"
                            className="w-full h-full object-cover scale-125"
                        />
                    </div>
                    <span className="text-sm font-normal mt-3">Scientists</span>
                </div>

                <div className="flex flex-col items-center p-6">
                    <img
                        className="w-16 h-16 object-contain"
                        src="/icons/Hourglass_light.png"
                        alt="Timeline"
                    />
                    <span className="text-sm font-normal mt-3">Timeline</span>
                </div>

                <div className="flex flex-col items-center p-6">
                    <img
                        className="w-16 h-16 object-contain"
                        src="/icons/Map.png"
                        alt="Map"
                    />
                    <span className="text-sm font-normal mt-3">Map</span>
                </div>

                <div className="flex flex-col items-center p-6">
                    <img
                        className="w-16 h-16 object-contain"
                        src="/icons/Waterfall.png"
                        alt="Quizzes"
                    />
                    <span className="text-sm font-normal mt-3">Quizzes</span>
                </div>

                <div className="flex flex-col items-center p-6">
                    <img
                        className="w-16 h-16 object-contain"
                        src="/icons/globe.png"
                        alt="News"
                    />
                    <span className="text-sm font-normal mt-3">News</span>
                </div>

            </div>
        </section>
    )
}