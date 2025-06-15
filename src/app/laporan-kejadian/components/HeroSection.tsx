//src/app/laporan-kejadian/components/HeroSection.tsx

"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/Breadcrumb"

export function HeroSection() {
  return (
    <div className="flex justify-between items-center mb-8">
      <Link href="/">
        <Button variant="outline" size="icon" className="bg-white rounded-full h-12 w-12">
          <ArrowLeft className="text-blue-900" />
        </Button>
      </Link>
      <Breadcrumb  />
    </div>
  )
}