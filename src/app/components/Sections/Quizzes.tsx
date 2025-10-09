"use client";

import React, { useEffect, useState } from "react";

export default function Quizzes() {
    interface Quiz {
        id: number;
        name: string;
        description: string;
        image: string;
    }

    const [quiz, setQuiz] = useState<Quiz[]>([
        // Initial dummy data
        // { id: 1, name: "Physics Quiz", description: "Test your knowledge in Physics with this exciting quiz covering fundamental concepts and theories.", image: "/HeroBG.jpg" },
        // { id: 2, name: "Chemistry Quiz", description: "Challenge yourself with our Chemistry Quiz, featuring questions on elements, compounds, and reactions.", image: "/HeroBG.jpg" },
        // { id: 3, name: "Biology Quiz", description: "Explore the wonders of life with our Biology Quiz, covering topics from cell structure to ecosystems.", image: "/HeroBG.jpg" },
        // { id: 4, name: "Mathematics Quiz", description: "Sharpen your math skills with this quiz that includes questions on algebra, geometry, and calculus.", image: "/HeroBG.jpg" },
        // { id: 5, name: "Astronomy Quiz", description: "Test your knowledge of the cosmos with our Astronomy Quiz, featuring questions about stars, planets, and galaxies.", image: "/HeroBG.jpg" },
        // { id: 6, name: "Geology Quiz", description: "Discover the Earth's secrets with our Geology Quiz, covering rocks, minerals, and geological processes.", image: "/HeroBG.jpg" },
        // { id: 7, name: "Environmental Science Quiz", description: "Learn about environmental issues and sustainability with our Environmental Science Quiz.", image: "/HeroBG.jpg" },
        // { id: 8, name: "Computer Science Quiz", description: "Challenge your understanding of algorithms, data structures, and programming with our Computer Science Quiz.", image: "/HeroBG.jpg" },
    ]);
    const [page, setPage] = useState(3);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 4;

    const fetchQuiz = async (pageNum: number) => {
        setLoading(true);
        try {
            // Example API endpoint (replace this with actual API)
            const res = await fetch(
                `http://localhost:3001/Quiz?_page=${pageNum}&_per_page=${LIMIT}`
            );

            if (!res.ok) throw new Error("Failed to fetch data");

            const raw = await res.json();
            const data = raw.data || [];
            const totalPages = raw.pages || 1;
            const currentPage = pageNum;

            setQuiz((prev) => [...prev, ...data]);

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
        if (hasMore) fetchQuiz(page);
    }, [page]);

    // Load more handler
    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };
    return (
        <section className="pt-20 pb-40">
            <h2 className="text-5xl font-bold mb-2">Quizzes</h2>
            <p className="text-gray-600 mb-6">
                Check your Knowledge!
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <button className="flex items-center gap-2 px-4 py-2 border-r">
                    <img
                        src="/icons/Atom_light.png"
                        alt=""
                        className="w-8 h-8 object-contain"
                    />
                    By Field
                </button>

                <button className="flex items-center gap-2 px-4 py-2 border-r">
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

            {/* Quiz Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {quiz.map((card) => (
                    <div
                        key={card.id}
                        className="pb-10 relative flex flex-col items-start pr-8 border-gray-900 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:!border-r lg:[&:nth-child(4n)]:!border-r-0"
                    >
                        <h3 className="font-bold mb-1">{card.name}</h3>
                        <img
                            src={card.image}
                            alt="Quiz"
                            className="w-full h-50 object-cover rounded-md mb-4"
                        />
                        <p className="text-md text-gray-900 mt-2">
                            {card.description}
                        </p>
                        <button className="absolute bottom-0 mt-3 px-4 py-1 bg-black text-white rounded-md text-sm">
                            Take Quiz
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                {hasMore ? <button onClick={handleLoadMore} className="w-xl py-2 bg-black text-white rounded-md text-sm">
                    Load more
                </button> : <div className="text-gray-600">No more quiz to load.</div>}
            </div>
        </section>
    )
}