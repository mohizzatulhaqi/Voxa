import Image from "next/image"
import { Book, Accessibility, Briefcase, Hospital, Scale, Users } from "lucide-react"

export default function InformasiHukum() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end mb-4">
          <div className="text-white">Home / Informasi Hukum</div>
        </div>

        <div className="bg-blue-900 py-12 px-6 md:px-12 mb-12 flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 flex items-center">
              Pusat Pengetahuan Hukum
              <Image
                src="/images/palu.jpg"
                alt="Gavel icon"
                width={360}
                height={360}
                className="ml-4"
              />
            </h1>
          </div>
        </div>

        <h2 className="text-white text-2xl font-bold mb-8">Hak - Hak Penyandang Disabilitas</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-blue-950 p-6 rounded-lg flex flex-col items-center">
            <div className="bg-blue-900 p-4 rounded-lg mb-4">
              <Book size={64} className="text-white" />
            </div>
            <h3 className="text-white text-xl font-medium text-center">Hak Pendidikan</h3>
          </div>

          <div className="bg-blue-950 p-6 rounded-lg flex flex-col items-center">
            <div className="bg-blue-900 p-4 rounded-lg mb-4">
              <Accessibility size={64} className="text-white" />
            </div>
            <h3 className="text-white text-xl font-medium text-center">Hak Aksesibilitas</h3>
          </div>

          <div className="bg-blue-950 p-6 rounded-lg flex flex-col items-center">
            <div className="bg-blue-900 p-4 rounded-lg mb-4">
              <Briefcase size={64} className="text-white" />
            </div>
            <h3 className="text-white text-xl font-medium text-center">Hak Pekerjaan</h3>
          </div>

          <div className="bg-blue-950 p-6 rounded-lg flex flex-col items-center">
            <div className="bg-blue-900 p-4 rounded-lg mb-4">
              <Hospital size={64} className="text-white" />
            </div>
            <h3 className="text-white text-xl font-medium text-center">Hak Pelayanan Kesehatan</h3>
          </div>

          <div className="bg-blue-950 p-6 rounded-lg flex flex-col items-center">
            <div className="bg-blue-900 p-4 rounded-lg mb-4">
              <Scale size={64} className="text-white" />
            </div>
            <h3 className="text-white text-xl font-medium text-center">Hak Perlindungan Hukum</h3>
          </div>

          <div className="bg-blue-950 p-6 rounded-lg flex flex-col items-center">
            <div className="bg-blue-900 p-4 rounded-lg mb-4">
              <Users size={64} className="text-white" />
            </div>
            <h3 className="text-white text-xl font-medium text-center">Hak Berpartisipasi dalam Sosial dan Politik</h3>
          </div>
        </div>

        <h2 className="text-white text-2xl font-bold mb-8">Bagaimana cara melaporkan pelanggaran</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex flex-col items-center">
            <Image src="/images/lapor1.png" alt="Step 1" width={300} height={200} className="mb-4" />
            <h3 className="text-white text-center">Pergi ke halaman laporan kejadian</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/images/lapor1.png"
                alt="Step 2"
                width={300}
                height={200}
                className="mb-4"
              />
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden md:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-white text-center">Isi formulir yang tersedia</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/images/lapor2.png"
                alt="Step 3"
                width={300}
                height={200}
                className="mb-4"
              />
              <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 hidden md:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-white text-center">Kirim laporan</h3>
          </div>
        </div>

        <h2 className="text-white text-2xl font-bold mb-8">Lembaga Bantuan Hukum</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <Image
              src="/images/komnasHAM.png"
              alt="Komnas HAM"
              width={100}
              height={100}
              className="mb-4 rounded-full bg-white p-2"
            />
            <h3 className="text-white text-center">Komnas HAM</h3>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/LPSK.png"
              alt="LPSK"
              width={100}
              height={100}
              className="mb-4 rounded-full bg-white p-2"
            />
            <h3 className="text-white text-center">LPSK</h3>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/Kemensos.png"
              alt="Kemensos RI"
              width={100}
              height={100}
              className="mb-4 rounded-full bg-white p-2"
            />
            <h3 className="text-white text-center">Kemensos RI</h3>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/PSHK.png"
              alt="PSHK"
              width={100}
              height={100}
              className="mb-4 rounded-full bg-white p-2"
            />
            <h3 className="text-white text-center">PSHK</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
