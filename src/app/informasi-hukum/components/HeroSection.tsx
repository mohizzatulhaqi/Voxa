import { Gavel } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="flex items-center mb-16">
      <h1 className="flex-1 pr-4 text-white text-4xl md:text-6xl font-bold leading-tight">
        Pusat Pengetahuan Hukum
      </h1>
      
      <Gavel size={240} className="hidden md:block text-white/90" />
    </div>
  );
};
