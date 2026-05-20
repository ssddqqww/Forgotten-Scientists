"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, User, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AUTH_CHANGE_EVENT, getCurrentUser, logoutUser, type StoredUser } from "../../lib/auth";
import { smoothScrollToId } from "../../lib/smoothScroll";
import { scientistDirectory } from "../../../../data/scientistDirectory";

export default function NavigationBar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<StoredUser | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [logoutNotice, setLogoutNotice] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchNotice, setSearchNotice] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement | null>(null);

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return [];

        return scientistDirectory
            .filter((scientist) => scientist.name.toLowerCase().includes(query))
            .slice(0, 8);
    }, [searchQuery]);

    const showSearchDropdown = searchFocused && searchQuery.trim().length > 0;

    useEffect(() => {
        let active = true;

        const syncUser = async () => {
            const currentUser = await getCurrentUser();

            if (active) {
                setUser(currentUser);
            }
        };

        syncUser();
        window.addEventListener(AUTH_CHANGE_EVENT, syncUser);

        return () => {
            active = false;
            window.removeEventListener(AUTH_CHANGE_EVENT, syncUser);
        };
    }, []);

    useEffect(() => {
        if (!logoutNotice) return;

        const timer = window.setTimeout(() => {
            setLogoutNotice(false);
        }, 2600);

        return () => window.clearTimeout(timer);
    }, [logoutNotice]);

    useEffect(() => {
        if (!searchNotice) return;

        const timer = window.setTimeout(() => {
            setSearchNotice("");
        }, 2600);

        return () => window.clearTimeout(timer);
    }, [searchNotice]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!searchRef.current?.contains(event.target as Node)) {
                setSearchFocused(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const confirmLogout = async () => {
        await logoutUser();
        setOpen(false);
        setShowLogoutConfirm(false);
        setUser(null);
        setLogoutNotice(true);

        if (pathname === "/profile" || pathname === "/account") {
            router.push("/");
            return;
        }

        router.refresh();
    };

    const handleSectionNavigation = (sectionId: string) => {
        setOpen(false);

        if (pathname === "/") {
            window.history.pushState({}, "", `/#${sectionId}`);
            smoothScrollToId(sectionId);
            return;
        }

        router.push(`/#${sectionId}`);
    };

    const handleSearchSelect = (id: number, available: boolean) => {
        setSearchFocused(false);

        if (!available) {
            setSearchNotice("This scientist profile is coming soon.");
            return;
        }

        setSearchQuery("");
        router.push(`/scientists/${id}?from=search`);
    };

    const hideNavigation = pathname === "/login" || pathname === "/signup";
    const compactNavigation = pathname === "/profile";

    if (hideNavigation) {
        return null;
    }

        return (
        <>
        <nav className={`border-gray-200 bg-black p-4 left-0 w-full z-[1100] ${compactNavigation ? "relative" : "sticky top-0"}`}>
            <div className="flex items-center justify-between gap-6 mx-auto lg:p-2">
                {compactNavigation ? (
                    <Link href="/" className="text-sm font-semibold tracking-[0.18em] uppercase text-white">
                        Forgotten Scientists
                    </Link>
                ) : (
                    <form className="flex w-full items-center">
                        <div ref={searchRef} className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-900" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                id="site-search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                onInput={(event) => setSearchQuery(event.currentTarget.value)}
                                onClick={() => setSearchFocused(true)}
                                onFocus={() => setSearchFocused(true)}
                                className="block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 pe-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Search scientists"
                            />

                            {showSearchDropdown && (
                                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[1200] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                                    {searchResults.length > 0 ? (
                                        <div className="py-2">
                                            {searchResults.map((scientist) => (
                                                <button
                                                    key={scientist.id}
                                                    type="button"
                                                    onClick={() => handleSearchSelect(scientist.id, scientist.available)}
                                                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50"
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {scientist.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {scientist.available ? "Available now" : "Coming soon"}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                                                            scientist.available
                                                                ? "bg-black text-white"
                                                                : "bg-gray-200 text-gray-700"
                                                        }`}
                                                    >
                                                        {scientist.available ? "Open" : "Soon"}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-4 text-sm text-gray-500">
                                            No scientists found for this search.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                )}


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
                                    <Link onClick={() => setOpen(false)} href="/profile" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">My Profile</Link>
                                ) : (
                                    <>
                                        <Link onClick={() => setOpen(false)} href="/login" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Log in</Link>
                                        <Link onClick={() => setOpen(false)} href="/signup" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">Sign Up</Link>
                                    </>
                                )}
                                <Link onClick={() => setOpen(false)} href="/about" className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800">About Us</Link>
                                <button type="button" onClick={() => handleSectionNavigation("scientists")} className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800 text-left">Scientists</button>
                                <button type="button" onClick={() => handleSectionNavigation("timeline")} className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800 text-left">Timeline</button>
                                <button type="button" onClick={() => handleSectionNavigation("map")} className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800 text-left">Map</button>
                                <button type="button" onClick={() => handleSectionNavigation("quizzes")} className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800 text-left">Quizzes</button>
                                <button type="button" onClick={() => handleSectionNavigation("news")} className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800 text-left">News</button>
                                {user && (
                                    <button
                                        type="button"
                                        onClick={() => setShowLogoutConfirm(true)}
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
        {showLogoutConfirm && (
            <div className="fixed inset-0 z-[1250] flex items-center justify-center bg-black/60 px-4">
                <div className="w-full max-w-sm rounded-lg bg-white p-6 text-black shadow-2xl">
                    <h2 className="text-xl font-bold">Log out?</h2>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                        Are you sure you want to log out of your account?
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowLogoutConfirm(false)}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            No
                        </button>
                        <button
                            type="button"
                            onClick={confirmLogout}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
                        >
                            Yes, log out
                        </button>
                    </div>
                </div>
            </div>
        )}
        {logoutNotice && (
            <div className="fixed right-4 top-24 z-[1260] rounded-md bg-white px-4 py-3 text-sm text-black shadow-xl ring-1 ring-black/10">
                You were successfully logged out.
            </div>
        )}
        {searchNotice && (
            <div className="fixed right-4 top-24 z-[1260] rounded-md bg-white px-4 py-3 text-sm text-black shadow-xl ring-1 ring-black/10">
                {searchNotice}
            </div>
        )}
        </>
    )
}
