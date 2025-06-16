import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";

export function HeroSection() {
  return (
    <>
      <div className="flex justify-end mb-4">
          <Breadcrumb />
        </div>
        

      <div className="text-center mb-12">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
          Riwayat Laporan
        </h1>
        <p className="text-blue-100">Daftar laporan yang telah Anda buat</p>
      </div>
    </>
  );
}