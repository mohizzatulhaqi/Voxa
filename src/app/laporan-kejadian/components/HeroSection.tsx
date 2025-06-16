//src/app/laporan-kejadian/components/HeroSection.tsx

"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/Breadcrumb"

export function HeroSection() {
  return (
    <div className="flex justify-end mb-4">
        <Breadcrumb />
    </div>
  )
}