"use client";

import Image from "next/image";
import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  illustration?: string;
  eyebrow?: string;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  illustration = "/login.svg",
  eyebrow = "Forgotten Scientists",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f5ef] px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.08)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="bg-[#eef1ff] px-8 py-10 md:px-12 md:py-14">
            <div className="flex h-full flex-col">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                  {eyebrow}
                </p>
                <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-tight text-black md:text-5xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#dfe5ff] p-6">
                <Image
                  src={illustration}
                  alt="auth illustration"
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-black">80</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gray-500">
                    Names indexed
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-black">40</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gray-500">
                    Profiles live
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-black">1</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gray-500">
                    Personal account
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-[#fcfbf8] px-6 py-8 md:px-10 md:py-12">
            <div className="mx-auto w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
