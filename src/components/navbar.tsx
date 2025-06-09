"use client"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
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
          <Button variant="ghost" size="icon" className="text-white">
            <Search size={20} />
          </Button>
          <Link href="/login">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">Log in</Button>
          </Link>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-800 text-white">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                  Home
                </Link>
                <Link href="/laporan-kejadian" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                  Laporan Kejadian
                </Link>
                <Link href="/informasi-hukum" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                  Informasi Hukum
                </Link>
                <Link href="/tentang-kami" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                  Tentang Kami
                </Link>
                <Link href="/login">
                  <Button className="bg-amber-600 hover:bg-amber-700 w-full">Log in</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
