"use client";

import {
  AUTH_CHANGE_EVENT,
  getCurrentUser,
  logoutUser,
  type StoredUser,
} from "../../lib/auth";
import { archiveSections } from "../../lib/archiveSections";
import {
  ChevronRight,
  FlaskConical,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { scientistDirectory } from "../../../../data/scientistDirectory";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchNotice, setSearchNotice] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return scientistDirectory
      .filter((scientist) => scientist.name.toLowerCase().includes(query))
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const syncUser = async () => setUser(await getCurrentUser());
    syncUser();
    window.addEventListener(AUTH_CHANGE_EVENT, syncUser);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncUser);
  }, []);

  useEffect(() => {
    const closeSearch = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !desktopSearchRef.current?.contains(target) &&
        !mobileSearchRef.current?.contains(target)
      ) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", closeSearch);
    return () => document.removeEventListener("mousedown", closeSearch);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  const selectScientist = (id: number, available: boolean) => {
    setSearchFocused(false);

    if (!available) {
      setSearchNotice("This scientist profile is coming soon.");
      window.setTimeout(() => setSearchNotice(""), 2600);
      return;
    }

    setSearchQuery("");
    router.push(`/scientists/${id}?from=search`);
  };

  const confirmLogout = async () => {
    await logoutUser();
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const hideNavigation = pathname === "/login" || pathname === "/signup";
  if (hideNavigation) return null;

  const searchBox = (mobile = false) => (
    <div
      ref={mobile ? mobileSearchRef : desktopSearchRef}
      className="relative w-full"
    >
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        aria-hidden="true"
      />
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onFocus={() => setSearchFocused(true)}
        placeholder="Search scientists"
        aria-label="Search scientists"
        className="h-11 w-full rounded-full border border-white/15 bg-white px-11 pr-4 text-sm text-gray-950 outline-none ring-white/20 transition placeholder:text-gray-500 focus:ring-4"
      />
      {searchFocused && searchQuery.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-[1300] overflow-hidden rounded-2xl border border-black/10 bg-white py-2 text-black shadow-2xl">
          {searchResults.length ? (
            searchResults.map((scientist) => (
              <button
                key={scientist.id}
                type="button"
                onClick={() =>
                  selectScientist(scientist.id, scientist.available)
                }
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50"
              >
                <span>
                  <span className="block text-sm font-semibold">
                    {scientist.name}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {scientist.available ? "Open profile" : "Coming soon"}
                  </span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              No scientists found.
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-[1200] border-b border-white/10 bg-[#070b14]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
              <FlaskConical size={18} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="hidden text-sm font-bold tracking-[0.12em] sm:block">
              FORGOTTEN SCIENTISTS
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {archiveSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  pathname === section.href
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden w-full max-w-xs md:block lg:ml-3">
            {searchBox()}
          </div>

          <button
            type="button"
            onClick={() => setMobileSearchOpen((open) => !open)}
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            aria-label="Search"
          >
            <Search size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileSearchOpen && (
          <div className="border-t border-white/10 px-4 py-3 md:hidden">
            {searchBox(true)}
          </div>
        )}
      </header>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[1210] bg-black/45"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <aside className="fixed bottom-3 right-3 top-[80px] z-[1220] flex w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-[1.75rem] bg-white p-4 text-black shadow-2xl">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f5f2eb] p-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-white">
                <User size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{user?.fullName ?? "Guest visitor"}</p>
                <p className="truncate text-xs text-gray-500">
                  {user?.email ?? "Explore the science archive"}
                </p>
              </div>
            </div>

            <nav className="mt-4 grid gap-1">
              <Link href="/" className="rounded-xl px-4 py-3 font-semibold hover:bg-gray-100">
                Home
              </Link>
              {archiveSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-semibold hover:bg-gray-100"
                >
                  {section.label}
                  <ChevronRight size={17} aria-hidden="true" />
                </Link>
              ))}
              <Link href="/about" className="rounded-xl px-4 py-3 font-semibold hover:bg-gray-100">
                About us
              </Link>
            </nav>

            <div className="mt-auto grid gap-2 pt-5">
              {user ? (
                <>
                  <Link href="/profile" className="rounded-full bg-black px-5 py-3 text-center text-sm font-bold text-white">
                    My profile
                  </Link>
                  <button type="button" onClick={confirmLogout} className="rounded-full border border-black/15 px-5 py-3 text-sm font-bold">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signup" className="rounded-full bg-black px-5 py-3 text-center text-sm font-bold text-white">
                    Create account
                  </Link>
                  <Link href="/login" className="rounded-full border border-black/15 px-5 py-3 text-center text-sm font-bold">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {searchNotice && (
        <div className="fixed right-4 top-20 z-[1400] rounded-xl bg-white px-4 py-3 text-sm text-black shadow-xl ring-1 ring-black/10">
          {searchNotice}
        </div>
      )}
    </>
  );
}
