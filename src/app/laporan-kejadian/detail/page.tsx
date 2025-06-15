import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

export default function DetailLaporan() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/riwayat">
            <Button
              variant="outline"
              size="icon"
              className="bg-white rounded-full h-12 w-12"
            >
              <ArrowLeft className="text-blue-900" />
            </Button>
          </Link>

          <Breadcrumb />
        </div>

        <Card>
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold mb-6">Laporan Kejadian</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-gray-500 mb-1">Waktu Kejadian</h2>
                <p className="font-medium">16.00</p>
              </div>

              <div>
                <h2 className="text-gray-500 mb-1">Lokasi kejadian</h2>
                <p className="font-medium">Surabaya, sukolilo keputih gang 2</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-gray-500 mb-1">Tanggal Kejadian</h2>
                <p className="font-medium">23/05/2005</p>
              </div>

              <div>
                <h2 className="text-gray-500 mb-1">Kategori Pelanggaran</h2>
                <p className="font-medium">Membuli</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-gray-500 mb-1">Deskripsi Pelanggaran</h2>
              <p className="font-medium">
                Pegawai Bernama Hermawan melakukan penipuan mengenai biaya
                pembayaran paket vendor yang di sewa (pungil). Setiap meminta
                pertolongan mengenai paket vendor pelaku selalu meminta bayaran
                lebih dengan alasan biaya paket vendor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-gray-500 mb-1">Bukti Foto</h2>
                <div className="border border-gray-200 rounded-md p-2">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Bukti foto"
                    width={500}
                    height={300}
                    className="w-full"
                  />
                </div>

                <div className="flex mt-4">
                  <Button variant="outline" className="flex items-center mr-4">
                    <Download size={16} className="mr-2" />
                    Unduh
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Eye size={16} className="mr-2" />
                    Lihat Dokumen
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-gray-500 mb-1">Bukti Suara</h2>
                <p className="font-medium">-</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-gray-500 mb-1">Status Pelaporan</h2>
              <p className="text-amber-500 font-medium">Menunggu</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
