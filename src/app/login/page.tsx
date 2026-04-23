"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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

  const onSubmit = (data: LoginValues) => {
    setFormError("");
    const result = loginUser(data.email, data.password);

    if (!result.ok) {
      setFormError(result.message ?? "Could not log in.");
      return;
    }

    router.push("/profile");
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in to continue exploring the hidden heroes of science."
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log in</h2>
      {formError && (
        <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          className="p-2 border rounded-lg outline-none"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="p-2 border rounded-lg outline-none"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 mt-2"
        >
          Log in
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-600">
        Don’t have an account?{" "}
        <a href="/signup" className="text-indigo-600 hover:underline">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
}
