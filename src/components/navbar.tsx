"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/laporan-kejadian" className="text-white hover:text-gray-300">
            Laporan Kejadian
          </Link>
          <Link href="/informasi-hukum" className="text-white hover:text-gray-300">
            Informasi Hukum
          </Link>
          <Link href="/tentang-kami" className="text-white hover:text-gray-300">
            Tentang Kami
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-white">
            <Search size={20} />
          </button>
          <Link href="/login" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md">
            Log in
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 mt-2 py-2">
          <div className="container mx-auto px-6 flex flex-col space-y-2">
            <Link href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              href="/laporan-kejadian"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Laporan Kejadian
            </Link>
            <Link
              href="/informasi-hukum"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Informasi Hukum
            </Link>
            <Link
              href="/tentang-kami"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              href="/login"
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
