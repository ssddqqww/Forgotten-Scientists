"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, type StoredUser } from "../lib/auth";

export default function AccountWelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    if (!currentUser) {
      router.push("/login");
    }
  }, [router]);

  if (loading || !user) {
    return (
      <section className="min-h-screen px-10 pt-32">
        <p className="text-gray-600">Loading account...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-10 pt-32 pb-20 md:px-6 lg:px-20">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold text-gray-600">Your account</p>
        <h1 className="mt-2 text-5xl font-bold">Welcome, {user.fullName}</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-700">
          Your profile is saved in this browser, so you can log out and log back in with the same email and password.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border-r border-gray-900 pr-8">
            <h2 className="text-2xl font-bold">Profile details</h2>
            <div className="mt-4 space-y-3 text-gray-800">
              <p>
                <span className="font-semibold">Name:</span> {user.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Continue exploring</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/#scientists" className="w-fit rounded-md bg-black px-4 py-2 text-sm text-white">
                Explore Scientists
              </Link>
              <Link href="/#quizzes" className="w-fit rounded-md bg-black px-4 py-2 text-sm text-white">
                Take Quizzes
              </Link>
              <Link href="/profile" className="w-fit rounded-md border border-gray-900 px-4 py-2 text-sm hover:bg-gray-100">
                Open Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
