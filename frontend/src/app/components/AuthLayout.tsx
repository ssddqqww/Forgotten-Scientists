"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  illustration?: string;
  showSocial?: boolean; // enable/disable social login
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  illustration = "/login.svg",
  showSocial = true,
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
          {/* Social Login */}
          {showSocial && (
            <>
              <div className="flex gap-3 mb-5">
                <button className="flex items-center justify-center gap-2 border rounded-lg w-1/2 py-2 hover:bg-gray-50">
                  <FcGoogle size={20} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 border rounded-lg w-1/2 py-2 hover:bg-gray-50">
                  <FaFacebook size={20} className="text-blue-600" /> Facebook
                </button>
              </div>

              <div className="flex items-center gap-2 my-3">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
            </>
          )}

          {/* Children (Form) */}
          {children}
        </div>
      </div>
    </div>
  );
}