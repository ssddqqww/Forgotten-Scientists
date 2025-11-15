"use client";
import React, { useEffect, useState } from "react";

interface Quiz {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface QuizResponse {
  data: Quiz[];
  pages: number;
}

export default function Quizzes() {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 4;

  const fetchQuiz = async (pageNum: number) => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3001/Quiz?_page=${pageNum}&_per_page=${LIMIT}`
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const raw: QuizResponse = await res.json();
      const { data, pages } = raw;

      setQuiz((prev) => {
        const ids = new Set(prev.map((q) => q.id));
        const filtered = data.filter((q) => !ids.has(q.id));
        return [...prev, ...filtered];
      });

      if (pageNum >= pages) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return (
    <section className="pt-20 pb-40">
      <h2 className="text-5xl font-bold mb-2">Quizzes</h2>
      <p className="text-gray-600 mb-6">Check your Knowledge!</p>

      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <button className="flex items-center gap-2 px-4 py-2 border-r">
          <img src="/icons/Atom_light.png" alt="" className="w-8 h-8" /> By Field
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border-r">
          <img src="/icons/Map.png" alt="" className="w-8 h-8" /> By Country
        </button>
        <button className="flex items-center gap-2 px-4 py-2">
          <img src="/icons/Watch.png" alt="" className="w-8 h-8" /> By Century
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {quiz.map((card) => (
          <div
            key={card.id}
            className="pb-10 relative flex flex-col items-start pr-8 border-gray-900 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:!border-r lg:[&:nth-child(4n)]:!border-r-0"
          >
            <h3 className="font-bold mb-1">{card.name}</h3>
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-50 object-cover rounded-md mb-4"
            />
            <p className="text-md text-gray-900 mt-2">{card.description}</p>
            <button className="absolute bottom-0 mt-3 px-4 py-1 bg-black text-white rounded-md text-sm">
              Take Quiz
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="w-xl py-2 bg-black text-white rounded-md text-sm"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        ) : (
          <div className="text-gray-600">No more quiz to load.</div>
        )}
      </div>
    </section>
  );
}
