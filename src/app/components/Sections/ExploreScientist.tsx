"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ExploreScientist() {
    interface Scientist {
        id: number;
        name: string;
        description: string;
        image: string;
    }

    const [scientist, setScientist] = useState<Scientist[]>([
        // Initial dummy data
         { id: 1, name: "John Doe", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 2, name: "Jane Smith", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 3, name: "Alice Johnson", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 4, name: "Bob Brown", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 5, name: "John Doe", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 6, name: "Jane Smith", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 7, name: "Alice Johnson", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
         { id: 8, name: "Bob Brown", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...", image: "/HeroBG.jpg" },
    ]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 8;

    const fetchScientist = async (pageNum: number) => {
        setLoading(true);
        try {
            // Example API endpoint (replace this with actual API)
            const res = await fetch(
                `http://localhost:3001/Scientist?_page=${pageNum}&_per_page=${LIMIT}`
            );

            if (!res.ok) throw new Error("Failed to fetch data");
            const raw = await res.json();
            console.log(raw);
            const data = raw.data || [];
            const totalPages = raw.pages || 1;
            const currentPage = pageNum;

            setScientist((prev) => [...prev, ...data]);

            if (currentPage >= totalPages) {
                setHasMore(false);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        if (hasMore) fetchScientist(page);
    }, [page]);

    // Load more handler
    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
        console.log(page, hasMore);
    };

    return (
        <section className="pt-20 pb-40">
            <h2 className="text-5xl font-bold mb-2">Explore Scientists</h2>
            <p className="text-gray-600 mb-6">
                Browse scientists by field, country, or century. Click on a card to
                learn more.
            </p>

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

                <button className="flex items-center gap-2 px-4 py-2">
                    <img
                        src="/icons/Watch.png"
                        alt=""
                        className="w-8 h-8 object-contain"
                    />
                    By Century
                </button>
            </div>

            {/* Scientist Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {scientist.map((card, i) => (
                    <div
                        key={i}
                        className="pb-10 relative flex flex-col items-start pr-8 border-gray-900 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:!border-r lg:[&:nth-child(4n)]:!border-r-0"
                    >
                        <h3 className="font-bold mb-1">{card.name}</h3>
                        <img
                            src={card.image}
                            alt="Scientist"
                            className="w-full h-50 object-cover rounded-md mb-4"
                        />
                        <p className="text-md text-gray-900 mt-2">
                            {card.description}
                        </p>
                        <Link href="/readmore" className="absolute bottom-0 mt-3 px-4 py-1 bg-black text-white rounded-md text-sm">
                            Read more
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                {hasMore ? <button onClick={handleLoadMore} className="w-xl py-2 bg-black text-white rounded-md text-sm">
                    Load more
                </button> : <div className="text-gray-600">No more scientists to load.</div>}
            </div>
        </section>
    )
}