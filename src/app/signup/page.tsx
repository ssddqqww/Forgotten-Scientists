"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../lib/auth";

type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpValues>();

  const onSubmit = (data: SignUpValues) => {
    setFormError("");

    const result = registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });

    if (!result.ok) {
      setFormError(result.message ?? "Could not create account.");
      return;
    }

    router.push("/account");
  };

  return (
    <AuthLayout
      title="Join Us!"
      subtitle="Create your account and start exploring the hidden heroes of science."
      eyebrow="Create account"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-black">Create account</h2>
      </div>

      {formError && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Full name
          <input
            type="text"
            placeholder="Your full name"
            {...register("fullName", { required: "Full name is required" })}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
          />
        </label>
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}

        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Email
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
          />
        </label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Password
          <input
            type="password"
            placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
          />
        </label>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Confirm password
          <input
            type="password"
            placeholder="Repeat your password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
          />
        </label>
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="mt-2 rounded-md bg-black py-3 text-white transition hover:bg-gray-800"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-black underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
