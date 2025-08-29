"use client";
import React, { useState } from "react";
import { Github, Mail } from "lucide-react";
import { supabase } from "@/config/supabase";
import { useAppUtilsContext } from "@/context/AppUtilsProvider";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", formData);
    // 🔗 Call your API here
    const { data: user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (error instanceof Error) {
      console.error(error?.message);
    }
    console.log({ user });
    router.push("/auth/login");
  };

  const { setSession } = useAppUtilsContext();

  // SocialLogin
  const handleSocialLogin = async (provider: "github" | "google") => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error instanceof Error) {
      console.log(error?.message);
    }
    setSession(data);
    localStorage.setItem("session", JSON.stringify(data));
    return router.push("/");
  };

  return (
    // <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Register Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 text-indigo-600 w-full p-3 rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-indigo-600"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-indigo-600"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-2 px-4 text-white font-medium shadow-md hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center">
        <div className="flex-1 border-t border-gray-300" />
        <p className="px-2 text-sm text-gray-500">Or continue with</p>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* OAuth Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => handleSocialLogin("github")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <Github className="w-5 h-5" />
          GitHub
        </button>
        <button
          onClick={() => handleSocialLogin("google")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <Mail className="w-5 h-5 text-red-500" />
          Google
        </button>
      </div>
    </div>
    // </div>
  );
}
