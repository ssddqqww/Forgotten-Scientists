"use client";

import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    alert("Signed up successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-400 rounded-2xl shadow-lg flex max-w-3xl w-full p-6">
        {/* Left side - Illustration */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/chemist-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--science-lab-scientist-experiment-profession-pack-illustrations-3650510.png"
            alt="signup illustration"
            className="rounded-lg"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {/* Email */}
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: "Email is required" })}
              className="p-2 rounded-lg outline-none"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Nickname */}
            <input
              type="text"
              placeholder="Choose nickname"
              {...register("nickname", { required: "Nickname is required" })}
              className="p-2 rounded-lg outline-none"
            />
            {errors.nickname && <p className="text-red-500">{errors.nickname.message}</p>}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="p-2 rounded-lg outline-none"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="p-2 rounded-lg outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white rounded-full py-2 hover:bg-gray-900 mt-2"
            >
              Sign up
            </button>
          </form>

          <p className="text-sm mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-700 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}