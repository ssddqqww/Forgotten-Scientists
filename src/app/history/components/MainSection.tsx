'use client'
import React, { useState } from 'react'
import data from '../fakeData/Data'
    interface History {
        id: number;
        button: string;
        name: string;
        description: string;
        image: string;
    }
function MainSection() {
    const [hasMore, setHasMore] = useState(true);
    const [quiz, setQuiz] = useState<History[]>(data);

    const handleLoadMore = () => {
        const moreQuiz = [
            { id: 9, button:"Watch results", name: "Physics Quiz", description: "Test your knowledge in Physics with this exciting quiz covering fundamental concepts and theories.", image: "/HeroBG.jpg" },
            { id: 10, button:"Watch results", name: "Chemistry Quiz", description: "Challenge yourself with our Chemistry Quiz, featuring questions on elements, compounds, and reactions.", image: "/HeroBG.jpg" },
            { id: 11,  button:"Watch results", name: "Biology Quiz", description: "Explore the wonders of life with our Biology Quiz, covering topics from cell structure to ecosystems.", image: "/HeroBG.jpg" },
            { id: 12, button:"Watch results", name: "Mathematics Quiz", description: "Sharpen your math skills with this quiz that includes questions on algebra, geometry, and calculus.", image: "/HeroBG.jpg" },
        ];
        setQuiz((prevQuiz) => [...prevQuiz, ...moreQuiz]);
        setHasMore(false); // Assuming only one more load is available
    }
  return (
        <div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {quiz.map((card, i) => (
                    <div
                        key={i}
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
                            {card.button}
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                {hasMore ? <button onClick={handleLoadMore} className="w-xl py-2 bg-black text-white rounded-md text-sm">
                    Load more
                </button> : <div className="text-gray-600">No more quiz to load.</div>}
            </div>
        </div>
  )
}

export default MainSection