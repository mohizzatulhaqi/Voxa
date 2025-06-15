"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, History } from "lucide-react";

interface SuccessPageProps {
  onBack: () => void;
  onViewHistory: () => void;
}

export function SuccessPage({ onBack, onViewHistory }: SuccessPageProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="text-center py-12">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Laporan Berhasil Terkirim!
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Terima kasih telah mengirimkan laporan Anda. Tim kami akan segera
          menindaklanjuti laporan yang Anda berikan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-12 px-8 text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>

          <Button
            onClick={onViewHistory}
            className="bg-amber-600 hover:bg-amber-700 text-white h-12 px-8 text-base"
          >
            <History className="h-4 w-4 mr-2" />
            Lihat Riwayat
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Nomor Referensi:</strong> #RPT
            {Date.now().toString().slice(-6)}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Simpan nomor referensi ini untuk melacak status laporan Anda
          </p>
        </div>
      </div>
    </div>
  );
}
