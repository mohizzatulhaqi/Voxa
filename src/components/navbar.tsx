"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-blue-900 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="text-white text-2xl font-bold flex items-center">
            <span>logo</span>
            <div className="relative w-8 h-8 mx-1">
              <div className="absolute inset-0 border-2 border-white rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-white rounded-full transform rotate-45"></div>
              <div className="absolute inset-0 border-t-2 border-white rounded-full transform -rotate-45"></div>
            </div>
            <span>ipsum</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`hover:text-gray-300 ${
              isActive("/")
                ? "text-amber-400 font-medium border-b-2 border-amber-400"
                : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/laporan-kejadian"
            className={`hover:text-gray-300 ${
              isActive("/laporan-kejadian")
                ? "text-amber-400 font-medium border-b-2 border-amber-400"
                : "text-white"
            }`}
          >
            Laporan Kejadian
          </Link>
          <Link
            href="/informasi-hukum"
            className={`hover:text-gray-300 ${
              isActive("/informasi-hukum")
                ? "text-amber-400 font-medium border-b-2 border-amber-400"
                : "text-white"
            }`}
          >
            Informasi Hukum
          </Link>
          <Link
            href="/tentang-kami"
            className={`hover:text-gray-300 ${
              isActive("/tentang-kami")
                ? "text-amber-400 font-medium border-b-2 border-amber-400"
                : "text-white"
            }`}
          >
            Tentang Kami
          </Link>
          <Link
            href="/riwayat"
            className={`hover:text-gray-300 ${
              isActive("/riwayat")
                ? "text-amber-400 font-medium border-b-2 border-amber-400"
                : "text-white"
            }`}
          >
            Riwayat
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Search size={20} />
          </Button>
          <Button
            className="bg-[#A87C2D] hover:bg-[#c8a047] text-white"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-800 text-white">
             
              <SheetHeader>
                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                <Link
                  href="/home"
                  className={`px-3 py-2 rounded ${
                    isActive("/home")
                      ? "bg-[#A87C2D] text-white font-medium"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/laporan-kejadian"
                  className={`px-3 py-2 rounded ${
                    isActive("/laporan-kejadian")
                      ? "bg-[#A87C2D] text-white font-medium"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Laporan Kejadian
                </Link>
                <Link
                  href="/informasi-hukum"
                  className={`px-3 py-2 rounded ${
                    isActive("/informasi-hukum")
                      ? "bg-[#A87C2D] text-white font-medium"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Informasi Hukum
                </Link>
                <Link
                  href="/tentang-kami"
                  className={`px-3 py-2 rounded ${
                    isActive("/tentang-kami")
                      ? "bg-[#A87C2D] text-white font-medium"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/riwayat"
                  className={`px-3 py-2 rounded ${
                    isActive("/riwayat")
                      ? "bg-[#A87C2D] text-white font-medium"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Riwayat
                </Link>
                <Button
                  className="bg-[#A87C2D] hover:bg-[#c8a047] w-full"
                  asChild
                >
                  <Link href="/login">Log in</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
