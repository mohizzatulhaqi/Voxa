import Breadcrumb from "@/components/Breadcrumb";
import { HeroSection } from "./components/HeroSection";

export default function TentangKami() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end mb-4">
          <Breadcrumb />
        </div>

        <HeroSection />
      </div>
    </div>
  )
}