export default function ExploreScientist() {
    return (
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
    )
}