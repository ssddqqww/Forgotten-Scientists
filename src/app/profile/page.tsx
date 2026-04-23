"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, updateCurrentUser, type StoredUser } from "../lib/auth";
import { scientists } from "../../../data/scientistsData";
import { newsItems } from "../../../data/news";

const favoriteFields = [
  "Astronomy",
  "Biology",
  "Chemistry",
  "Computer Science",
  "Engineering",
  "Geology",
  "Mathematics",
  "Physics",
];

const pronounOptions = ["She / her", "He / him", "They / them", "Prefer not to say"];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveNotice, setSaveNotice] = useState("");
  const [formState, setFormState] = useState({
    fullName: "",
    username: "",
    pronouns: "",
    phone: "",
    bio: "",
    favoriteField: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setFormState({
      fullName: currentUser.fullName,
      username: currentUser.username ?? "",
      pronouns: currentUser.pronouns ?? "",
      phone: currentUser.phone ?? "",
      bio: currentUser.bio ?? "",
      favoriteField: currentUser.favoriteField ?? "",
    });
  }, [router]);

  useEffect(() => {
    if (!saveNotice) return;
    const timer = window.setTimeout(() => setSaveNotice(""), 2500);
    return () => window.clearTimeout(timer);
  }, [saveNotice]);

  const stats = useMemo(
    () => [
      { label: "Scientist profiles", value: String(scientists.length).padStart(2, "0") },
      { label: "News updates", value: String(newsItems.length).padStart(2, "0") },
      { label: "Member since", value: user ? new Date(user.createdAt).getFullYear().toString() : "—" },
    ],
    [user]
  );

  const handleSave = () => {
    const result = updateCurrentUser({
      fullName: formState.fullName,
      username: formState.username.trim(),
      pronouns: formState.pronouns,
      phone: formState.phone.trim(),
      bio: formState.bio,
      favoriteField: formState.favoriteField,
    });

    if (!result.ok) {
      setSaveNotice("Could not save changes.");
      return;
    }

    setUser(result.user ?? null);
    setSaveNotice("Profile updated successfully.");
  };

  if (loading || !user) {
    return (
      <section className="min-h-screen px-10 pt-32">
        <p className="text-gray-600">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf9f6] px-10 pb-20 pt-32 md:px-6 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-8 py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-semibold text-white">
                  {formState.fullName.slice(0, 1).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                    My account
                  </p>
                  <h1 className="mt-2 text-3xl font-bold text-black md:text-4xl">
                    {formState.fullName}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    @{formState.username || user.username || "scientist.member"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md bg-black px-5 py-3 text-sm text-white hover:bg-gray-800"
                >
                  Save changes
                </button>
                <Link
                  href="/#scientists"
                  className="rounded-md border border-gray-300 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Explore scientists
                </Link>
              </div>
            </div>

            {saveNotice && (
              <p className="mt-4 text-sm font-medium text-green-700">{saveNotice}</p>
            )}
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="border-b border-gray-200 lg:border-b-0 lg:border-r">
              <section className="border-b border-gray-200 px-8 py-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Profile
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-black">Edit profile</h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Display name
                    <input
                      type="text"
                      value={formState.fullName}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, fullName: event.target.value }))
                      }
                      className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Username
                    <input
                      type="text"
                      value={formState.username}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, username: event.target.value }))
                      }
                      className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Pronouns
                    <select
                      value={formState.pronouns}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, pronouns: event.target.value }))
                      }
                      className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    >
                      <option value="">Not set</option>
                      {pronounOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Favorite field
                    <select
                      value={formState.favoriteField}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          favoriteField: event.target.value,
                        }))
                      }
                      className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    >
                      <option value="">Not set</option>
                      {favoriteFields.map((field) => (
                        <option key={field} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="md:col-span-2 flex flex-col gap-2 text-sm text-gray-700">
                    Bio
                    <textarea
                      value={formState.bio}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, bio: event.target.value }))
                      }
                      rows={4}
                      className="resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                      placeholder="Add a short note about your interests in science."
                    />
                  </label>
                </div>
              </section>

              <section className="px-8 py-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Account information
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-black">Login and contact</h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-md border border-gray-200 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                      Email address
                    </p>
                    <p className="mt-2 text-sm font-medium text-black">{user.email}</p>
                  </div>

                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Phone number
                    <input
                      type="text"
                      value={formState.phone}
                      onChange={(event) =>
                        setFormState((current) => ({ ...current, phone: event.target.value }))
                      }
                      placeholder="Not set"
                      className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                  </label>
                </div>
              </section>
            </div>

            <div className="bg-[#fbfaf7]">
              <section className="border-b border-gray-200 px-8 py-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Password & authentication
                </p>
                <h2 className="mt-2 text-2xl font-bold text-black">Security</h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-md border border-gray-200 bg-white px-4 py-4">
                    <p className="text-sm font-semibold text-black">Password</p>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      Your password is currently stored locally in this browser for this demo
                      flow.
                    </p>
                  </div>

                  <div className="rounded-md border border-gray-200 bg-white px-4 py-4">
                    <p className="text-sm font-semibold text-black">Authentication status</p>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      Your account is active and available on this device.
                    </p>
                  </div>
                </div>
              </section>

              <section className="border-b border-gray-200 px-8 py-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Quick access
                </p>
                <h2 className="mt-2 text-2xl font-bold text-black">Shortcuts</h2>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/account"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Open welcome page
                  </Link>
                  <Link
                    href="/#scientists"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Explore scientists
                  </Link>
                  <Link
                    href="/#news"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Read latest news
                  </Link>
                </div>
              </section>

              <section className="px-8 py-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Overview
                </p>
                <h2 className="mt-2 text-2xl font-bold text-black">Account at a glance</h2>
                <div className="mt-6 grid gap-3">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-md border border-gray-200 bg-white px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-black">{item.value}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
