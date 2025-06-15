import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";

export function HeroSection() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-white rounded-full h-12 w-12 hover:bg-gray-100"
          >
            <ArrowLeft className="text-blue-900" />
          </Button>
        </Link>
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