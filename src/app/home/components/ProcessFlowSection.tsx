import { FileText, Edit, Send } from "lucide-react";

export default function ProcessFlowSection() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-800 text-2xl md:text-4xl font-bold mb-16 text-center">
          Bagaimana cara melaporkan pelanggaran
        </h2>

        <div className="flex flex-row items-stretch justify-center gap-2 max-w-7xl mx-auto overflow-x-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-1 relative px-2 md:px-4 min-w-[200px]">
            <div className="w-16 h-16 md:w-28 md:h-28 bg-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 relative z-10">
              <FileText className="w-8 h-8 md:w-14 md:h-14 text-white" />
            </div>
            <h3 className="text-gray-800 font-bold text-sm md:text-2xl mb-2 md:mb-4">
              Pergi ke Halaman Laporan Kejadian
            </h3>
            <p className="text-gray-600 text-xs md:text-lg leading-relaxed max-w-[180px] md:max-w-sm">
              Akses halaman laporan kejadian untuk memulai proses pelaporan
            </p>
            {/* Garis penghubung */}
            <div className="absolute top-[32px] md:top-[60px] -right-1 md:-right-4 w-4 md:w-16 h-0.5 md:h-1 bg-gray-300"></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center flex-1 relative px-2 md:px-4 min-w-[200px]">
            <div className="w-16 h-16 md:w-28 md:h-28 bg-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 relative z-10">
              <Edit className="w-8 h-8 md:w-14 md:h-14 text-white" />
            </div>
            <h3 className="text-gray-800 font-bold text-sm md:text-2xl mb-2 md:mb-4">
              Isi Formulir Laporan
            </h3>
            <p className="text-gray-600 text-xs md:text-lg leading-relaxed max-w-[180px] md:max-w-sm">
              Lengkapi formulir dengan detail kejadian yang jelas dan lengkap
            </p>
            {/* Garis penghubung */}
            <div className="absolute top-[32px] md:top-[60px] -right-1 md:-right-4 w-4 md:w-16 h-0.5 md:h-1 bg-gray-300"></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-1 px-2 md:px-4 min-w-[200px]">
            <div className="w-16 h-16 md:w-28 md:h-28 bg-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <Send className="w-8 h-8 md:w-14 md:h-14 text-white" />
            </div>
            <h3 className="text-gray-800 font-bold text-sm md:text-2xl mb-2 md:mb-4">
              Kirim Laporan
            </h3>
            <p className="text-gray-600 text-xs md:text-lg leading-relaxed max-w-[180px] md:max-w-sm">
              Submit laporan Anda dan tunggu konfirmasi dari tim kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}