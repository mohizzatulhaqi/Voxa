import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function TentangKami() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end mb-4">
          <div className="text-white">Home / Tentang Kami</div>
        </div>

        <div className="bg-blue-950 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                src="/images/justice.jpg"
                alt="Lady Justice statue"
                width={500}
                height={600}
                className="rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">Tentang Kami</h1>
              <h2 className="text-white text-xl md:text-2xl mb-6">Voxa - Hak Hukum bagi Penyandang Disabilitas</h2>

              <div className="text-white mb-8">
                <p className="mb-4">
                  <strong>Voxa</strong> adalah platform web yang dirancang khusus untuk memberdayakan penyandang
                  disabilitas dalam melaporkan pelanggaran hak secara mudah, aman, dan inklusif. Dengan antarmuka yang
                  sepenuhnya aksesibel, Voxa menghadirkan berbagai fitur seperti dokumentasi insiden berbasis teks,
                  suara, dan gambar, pusat pengetahuan hukum, jaringan bantuan hukum, serta dashboard advokasi komunitas
                  berbasis data.
                </p>
                <p>
                  Voxa menghubungkan pengguna dengan organisasi pendukung, memvisualisasikan pola pelanggaran yang
                  terjadi, dan mendorong kolaborasi dalam upaya advokasi hak disabilitas. Kami percaya bahwa setiap
                  individu berhak mendapatkan perlakuan setara dan perlindungan hukum yang adil, dan Voxa hadir untuk
                  menjadi jembatan menuju keadilan tersebut.
                </p>
              </div>

              <div className="flex space-x-6">
                <Link href="https://youtube.com" className="text-white hover:text-gray-300">
                  <Youtube size={24} />
                </Link>
                <Link href="https://twitter.com" className="text-white hover:text-gray-300">
                  <Twitter size={24} />
                </Link>
                <Link href="https://facebook.com" className="text-white hover:text-gray-300">
                  <Facebook size={24} />
                </Link>
                <Link href="https://instagram.com" className="text-white hover:text-gray-300">
                  <Instagram size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
