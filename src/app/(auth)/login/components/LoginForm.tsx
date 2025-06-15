"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  //props
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    //logika submit
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-8">
            <span className="text-black text-xl font-medium">logo</span>
            <div className="mx-2 w-6 h-6 relative">
              <div className="absolute inset-0 border-2 border-black rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-3 h-3 border-t-2 border-l-2 border-black transform -translate-x-1/2 rotate-45"></div>
            </div>
            <span className="text-black text-xl font-medium">ipsum</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Login</h1>
          <p className="text-gray-600 text-base text-l">
            Selamat Datang Kembali
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password <span className="text-red-500">*</span>
            </label>

            {/* wrapper agar ikon bisa absolute di dalamnya */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-amber-500
                 focus:border-transparent text-base"
                required
              />

              {/* ikon di kanan‑tengah */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2
                 text-gray-600 hover:text-amber-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Ingat saya
              </label>
            </div>
            <a href="#" className="text-sm text-[#A87C2D] hover:text-amber-500">
              Lupa Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#A87C2D] hover:bg-[#c8a047] text-white font-medium py-4 px-4 rounded-[16px] transition duration-200 flex items-center justify-center text-base"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Masuk
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sudah memiliki akun?{" "}
            <a
              href="/register"
              className="text-[#A87C2D] hover:text-[#c8a047] font-medium"
            >
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
