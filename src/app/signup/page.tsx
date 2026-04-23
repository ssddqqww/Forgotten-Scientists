"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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

    router.push("/profile");
  };

  return (
    <AuthLayout
      title="Join Us!"
      subtitle="Create your account and start exploring the hidden heroes of science."
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>
      {formError && (
        <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName", { required: "Full name is required" })}
          className="p-2 border rounded-lg outline-none"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}

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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          })}
          className="p-2 border rounded-lg outline-none"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className="p-2 border rounded-lg outline-none"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 mt-2"
        >
          Create Account
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600 hover:underline">
          Log in
        </a>
      </p>
    </AuthLayout>
  );
}
