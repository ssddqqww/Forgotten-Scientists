export default function ScientistDayWeek() {
    return (
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
    )
}