"use client";

import Image from "next/image";
import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  illustration?: string;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  illustration = "/login.svg",
}: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg flex max-w-4xl w-full overflow-hidden">
        {/* Left side - Illustration */}
        <div className="hidden md:flex w-1/2 bg-indigo-100 flex-col items-center justify-center p-8 text-center relative">
          <div className="relative w-full h-64 mb-4">
            <Image
              src={illustration}
              alt="auth illustration"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* Right side - Form Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {/* Children (Form) */}
          {children}
        </div>
      </div>
    </div>
  );
}
