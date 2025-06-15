// Step3ThankYou.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Step3ThankYouProps {
  onBackToHome: () => void;
  onGoToHistory: () => void;
}

export function Step3ThankYou({
  onBackToHome,
  onGoToHistory,
}: Step3ThankYouProps) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Thank You Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Terima Kasih!</h2>

        <p className="text-lg text-gray-600 mb-2">
          Laporan Anda telah berhasil dikirim
        </p>

        <p className="text-gray-500 mb-8">
          Tim kami akan meninjau laporan Anda dan menindaklanjuti sesuai
          prosedur yang berlaku.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={onBackToHome}
          className="bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-12 px-8 text-base font-medium"
        >
          Kembali ke Home
        </Button>

        <Button
          type="button"
          onClick={onGoToHistory}
          className="bg-[#A87C2D] hover:bg-[#c8a047] text-white h-12 px-8 text-base font-medium"
        >
          Lihat Riwayat Laporan
        </Button>
      </div>
    </div>
  );
}
