"use client"

import { useState } from "react";
import { Menu, X, User, Search, Mic } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="border-gray-200 bg-black p-4 sticky top-0 left-0 w-full z-[1100]">
            <div className=" flex lg:gap-30 items-center mx-auto lg:p-2">

                <form className="flex w-full items-center">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-4 h-4 text-gray-900" aria-hidden="true" />
                        </div>
                        <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search" required />
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                            <Mic className="w-4 h-4 text-gray-900 hover:text-gray-900" aria-label="Microphone" />
                        </button>
                    </div>
                </form>


                <div className="relative">
                    <button
                        className="p-2 text-white"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle Menu"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {open && (
                        <div className="absolute top-12 right-0 w-56 bg-black text-white rounded shadow-lg">
                            <div className="flex justify-center py-4 border-b border-gray-700">
                                <User size={40} />
                            </div>

                            <nav className="flex flex-col">
                                <Link href="/" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Home</Link>
                                <Link href="/about" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">About Us</Link>
                                <Link href="/scientists" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Scientists</Link>
                                <Link href="/timeline" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Timeline</Link>
                                <Link href="/map" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Map</Link>
                                <Link href="/quizzes" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Quizzes</Link>
                                <Link href="/news" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">News</Link>
                                <Link href="/history" className="px-4 py-3 hover:bg-gray-800">History</Link>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}