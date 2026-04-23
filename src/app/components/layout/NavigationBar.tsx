"use client"

import { useEffect, useState } from "react";
import { Menu, X, User, Search, Mic } from "lucide-react";
import Link from "next/link";
import { AUTH_CHANGE_EVENT, getCurrentUser, logoutUser, type StoredUser } from "../../lib/auth";

export default function NavigationBar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<StoredUser | null>(null);

    useEffect(() => {
        const syncUser = () => setUser(getCurrentUser());

        syncUser();
        window.addEventListener(AUTH_CHANGE_EVENT, syncUser);
        window.addEventListener("storage", syncUser);

        return () => {
            window.removeEventListener(AUTH_CHANGE_EVENT, syncUser);
            window.removeEventListener("storage", syncUser);
        };
    }, []);

    const handleLogout = () => {
        logoutUser();
        setOpen(false);
    };

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
                            <div className="flex flex-col items-center px-4 py-4 text-center border-b border-gray-700">
                                <User size={40} />
                                {user ? (
                                    <>
                                        <p className="mt-2 text-sm font-semibold">{user.fullName}</p>
                                        <p className="text-xs text-gray-400 break-all">{user.email}</p>
                                    </>
                                ) : (
                                    <p className="mt-2 text-sm text-gray-300">Guest</p>
                                )}
                            </div>

                            <nav className="flex flex-col">
                                <Link onClick={() => setOpen(false)} href="/" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Home</Link>
                                {user ? (
                                    <Link onClick={() => setOpen(false)} href="/profile" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Profile</Link>
                                ) : (
                                    <>
                                        <Link onClick={() => setOpen(false)} href="/login" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Log in</Link>
                                        <Link onClick={() => setOpen(false)} href="/signup" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Sign Up</Link>
                                    </>
                                )}
                                <Link onClick={() => setOpen(false)} href="/about" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">About Us</Link>
                                <Link onClick={() => setOpen(false)} href="/#scientists" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Scientists</Link>
                                <Link onClick={() => setOpen(false)} href="/#timeline" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Timeline</Link>
                                <Link onClick={() => setOpen(false)} href="/#map" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Map</Link>
                                <Link onClick={() => setOpen(false)} href="/#quizzes" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Quizzes</Link>
                                <Link onClick={() => setOpen(false)} href="/#news" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">News</Link>
                                <Link onClick={() => setOpen(false)} href="/history" className={`px-4 py-3 hover:bg-gray-800 ${user ? "border-b border-gray-700" : ""}`}>History</Link>
                                {user && (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="px-4 py-3 text-left hover:bg-gray-800"
                                    >
                                        Log out
                                    </button>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
