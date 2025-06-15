"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export const FlipCard = ({
  icon: Icon,
  description,
}: {
  icon: any;
  description: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-64 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Depan Card */}
      <div
        className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180 opacity-0" : "opacity-100"
        }`}
      >
        <Card className="bg-[#072759] border-none backdrop-blur-sm w-full h-full">
          <CardContent className="p-8 h-full flex items-center justify-center">
            <div className="p-6">
              <Icon size={140} className="text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Belakang Card */}
      <div
        className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "opacity-100" : "rotate-y-180 opacity-0"
        }`}
      >
        <Card className="bg-[#072759] border-none backdrop-blur-sm w-full h-full">
          <CardContent className="p-8 h-full flex items-center justify-center">
            <p className="text-white text-center">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};