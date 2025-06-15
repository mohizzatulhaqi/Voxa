"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div
      className="relative h-[70vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(30, 58, 138, 0.3), rgba(30, 58, 138, 0.3)),
          url('/images/buku.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-white text-xl mb-4 font-medium">
            Selamat Datang di Portal
          </h2>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Pos Pelaporan dan Pusat Informasi Penyandang Disabilitas
          </h1>
          <p className="text-white text-lg mb-8 leading-relaxed max-w-3xl">
            Website inklusif yang mempermudah penyandang disabilitas dalam
            melaporkan tindakan kriminal secara online.
          </p>
          <Button
            className="w-[175px] h-[58px] bg-[#A87C2D] hover:bg-[#c8a047] text-white font-medium rounded-[22.5px] text-lg"
            asChild
          >
            <Link href="/laporan-kejadian">Mulai Lapor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}