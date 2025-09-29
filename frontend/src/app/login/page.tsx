"use client";

import { useForm } from "react-hook-form";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit = (data: LoginValues) => {
    console.log("Login Data:", data);
    alert("Logged in successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-gray-50 rounded-2xl shadow-lg flex max-w-3xl w-full p-6">
        {/* Left side - Illustration */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img
            src="/login.svg"
            alt="login illustration"
            className="rounded-lg"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold mb-4">Log in</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {/* Email */}
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: "Email is required" })}
              className="p-2 rounded-lg outline-none"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="p-2 rounded-lg outline-none"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white rounded-full py-2 hover:bg-gray-900 mt-2"
            >
              Log in
            </button>
          </form>

          <p className="text-sm mt-3">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-700 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}