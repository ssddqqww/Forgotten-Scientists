import React from "react";

export default function Timeline() {
    const achievements = [
        {
            date: "1905",
            name: "Albert Einstein",
            description:
                "Published the theory of special relativity, revolutionizing physics and our understanding of time and space.",
            image: "/HeroBG.jpg",
        },
        {
            date: "1908",
            name: "Alexander Fleming",
            description:
                "Discovered penicillin, the first antibiotic that transformed modern medicine.",
            image: "/HeroBG.jpg",
        },
        {
            date: "1928",
            name: "Alexander Fleming",
            description:
                "Discovered penicillin, the first antibiotic that transformed modern medicine.",
            image: "/HeroBG.jpg",
        },
        {
            date: "1901",
            name: "Alexander Fleming",
            description:
                "Discovered penicillin, the first antibiotic that transformed modern medicine.",
            image: "/HeroBG.jpg",
        },
    ];

    return (
        <section id="timeline" className="scroll-mt-24 pt-20 pb-40">
            <div className="text-start">
                <h2 className="text-5xl font-bold mb-2">Timeline of Scientific Achievements</h2>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <button className="flex items-center gap-2 pr-4 py-2 border-r">
                        <img
                            src="/icons/Atom_light.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        By Field
                    </button>

                    <button className="flex items-center gap-2 pr-4 py-2 border-r">
                        <img
                            src="/icons/Map.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        By Country
                    </button>

                    <button className="flex items-center gap-2 pr-4 py-2">
                        <img
                            src="/icons/Watch.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        By Century
                    </button>
                </div>

                <div className="relative border-gray-900 max-w-5xl mx-auto mb-20 mt-15">
                    <div className="absolute -top-1 left-[-10rem] w-[calc(100%+20rem)] border-t-4 border-gray-900"></div>
                    <div className="absolute top-[-1.5px] right-[-10rem] w-4 h-4 border-t-[3px] border-r-[3px] border-gray-900 transform rotate-45 translate-y-[-50%]"></div>

                    <div className="absolute top-0 left-0 w-full flex justify-between">
                        {[...achievements]
                            .sort((a, b) => Number(a.date) - Number(b.date))
                            .map((a, i) => (
                                <div key={i} className="relative">
                                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 font-bold text-gray-900">
                                        {a.date}
                                    </span>
                                    <div className="w-6 h-6 bg-gray-100 border-2 border-gray-700 rounded-full absolute top-[-14px] left-1/2 transform -translate-x-1/2"></div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Achievements Cards */}
                <div className="grid md:grid-cols-2 gap-8 mt-25">
                    {[...achievements]
                        .sort((a, b) => Number(a.date) - Number(b.date))
                        .slice(0, 2)
                        .map((a, i) => (
                            <div
                                key={i}
                                className="flex  border-2 border-gray-300 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-4"
                            >
                                <img
                                    src={a.image}
                                    alt={a.name}
                                    className="w-1/2 rounded-lg object-cover aspect-square"
                                />
                                <div className="p-6 flex flex-col justify-between w-1/2 text-left">
                                    <div>
                                        <h3 className="text-lg font-bold">{a.name}</h3>
                                        <p className="text-lg text-gray-600 mt-2 line-clamp-4">
                                            {a.description}
                                        </p>
                                    </div>
                                    <button className="mt-4 bg-black text-white text-sm px-4 py-2 rounded-lg w-fit hover:bg-gray-800">
                                        Read more
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
} 
