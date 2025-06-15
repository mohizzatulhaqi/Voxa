"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { HeroSection } from "./components/HeroSection";
import { LembagaBantuanHukum } from "./components/LembagaBantuanHukum";
import { HakCard } from "./components/HakCard";

export default function InformasiHukum() {
  return (
    <div className="min-h-screen bg-blue-900 pt-12">
      {/* Header Navigation */}
      <div className="container mx-auto px-6">
         <Breadcrumb  />
        

        <HeroSection />
        <HakCard />
        <LembagaBantuanHukum />
      </div>
    </div>
  );
}