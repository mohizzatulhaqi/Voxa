"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Semua field wajib diisi");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, password })
      });
      const data = await res.json();
      if (data.success) {
        alert("Registrasi berhasil, silakan login!");
        router.push("/login");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat registrasi");
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Daftar</h1>
          <p className="text-gray-600 text-base text-l">Buat Akun Anda</p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-amber-600"
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-amber-600"
              >
                {showConfirmPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#A87C2D] hover:bg-[#c8a047] text-white font-medium py-4 px-4 rounded-[16px] transition duration-200 flex items-center justify-center text-base"
          >
            Daftar
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sudah memiliki akun?{" "}
            <a
              href="/login"
              className="text-[#A87C2D] hover:text-[#c8a047] font-medium"
            >
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
