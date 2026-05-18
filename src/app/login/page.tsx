"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../lib/auth";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit = async (data: LoginValues) => {
    setFormError("");
    const result = await loginUser(data.email, data.password);

    if (!result.ok) {
      setFormError(result.message ?? "Could not log in.");
      return;
    }

    router.push("/account");
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in to continue exploring the hidden heroes of science."
      eyebrow="Member access"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-black">Log in</h2>
      </div>

      {formError && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
          />
        </label>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="mt-2 rounded-md bg-black py-3 text-white transition hover:bg-gray-800"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signup" className="font-medium text-black underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
