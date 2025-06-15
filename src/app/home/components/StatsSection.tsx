"use client";

import { useEffect, useState } from "react";

export default function StatsSection() {
  const [count, setCount] = useState(0);
  const targetCount = 2457;
  const duration = 2000; // 2 detik
  const increment = targetCount / (duration / 16);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const nextCount = Math.min(
          Math.floor(increment * (progress / 16)),
          targetCount
        );
        setCount(nextCount);
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(targetCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-blue-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 tracking-wide">
            JUMLAH LAPORAN SEKARANG
          </h2>
          <div className="text-white text-6xl md:text-8xl font-bold tracking-wider">
            {count}
          </div>
        </div>
      </div>
    </div>
  );
}