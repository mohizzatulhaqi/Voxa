"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function StatsSection() {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/dashboard/public-stats`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setTargetCount(data.data.total_reports);
          }
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Keep targetCount at 0 or a fallback value
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (targetCount === 0 && count === 0) return;

    let startTime: number;
    let animationFrameId: number;
    const startCount = count;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressFraction = Math.min(progress / duration, 1);
      
      const newCount = Math.floor(startCount + (targetCount - startCount) * progressFraction);
      setCount(newCount);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(targetCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetCount]);

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