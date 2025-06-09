"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function LaporanKejadian() {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" size="icon" className="bg-white rounded-full h-12 w-12">
              <ArrowLeft className="text-blue-900" />
            </Button>
          </Link>

          <div className="text-white">Home / Laporan Kejadian</div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-white text-4xl font-bold mb-4">Laporan Kejadian</h1>
          <p className="text-white">isi deskripsi kejadian dengan sesuai</p>
        </div>

        <div className="flex mb-8">
          <div className={`flex-1 pb-2 ${step === 1 ? "border-b-4 border-white" : "border-b-4 border-gray-500"}`}>
            <h2 className={`text-xl font-bold ${step === 1 ? "text-white" : "text-gray-400"}`}>
              1. Deskripsi Kejadian
            </h2>
          </div>
          <div className={`flex-1 pb-2 ${step === 2 ? "border-b-4 border-white" : "border-b-4 border-gray-500"}`}>
            <h2 className={`text-xl font-bold ${step === 2 ? "text-white" : "text-gray-400"}`}>2. Bukti Kejadian</h2>
          </div>
        </div>

        {/* Form dengan background putih */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardContent className="p-8 bg-white">
            {step === 1 ? (
              <form onSubmit={handleNext} className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="waktu" className="text-gray-700 font-medium">
                      Waktu Kejadian <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="waktu"
                      placeholder="content"
                      required
                      className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500">16:00</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lokasi" className="text-gray-700 font-medium">
                      Lokasi Kejadian <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lokasi"
                      placeholder="content"
                      required
                      className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500">Surabaya</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="kategori" className="text-gray-700 font-medium">
                      Kategori Pelanggaran <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="kategori"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Placeholder</option>
                      <option value="membuli">Membuli</option>
                      <option value="diskriminasi">Diskriminasi</option>
                      <option value="kekerasan">Kekerasan</option>
                    </select>
                    <p className="text-sm text-gray-500">Menindas</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tanggal" className="text-gray-700 font-medium">
                      Tanggal Kejadian <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tanggal"
                      placeholder="Placeholder"
                      required
                      className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500">01/01/2000</p>
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  <Label htmlFor="deskripsi" className="text-gray-700 font-medium">
                    Deskripsi Pelanggaran <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="deskripsi"
                    placeholder="Placeholder"
                    rows={4}
                    required
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500">Menindas</p>
                </div>

                <div className="flex justify-end bg-white">
                  <Button variant="outline" className="mr-4 bg-white text-blue-900 border-blue-900 hover:bg-gray-50">
                    Batal
                  </Button>
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                    Selanjutnya
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Bukti Foto <span className="text-red-500">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-white">
                      <p className="text-gray-500 text-center mb-4">Seret atau Tarik foto kesini atau</p>
                      <Button variant="outline" className="bg-white text-blue-900 border-blue-900 hover:bg-gray-50">
                        Upload Dari Komputer
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Ukuran maksimum file 3 Mb dengan format .png .jpg</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Bukti Suara</Label>
                    <div className="border border-gray-300 rounded-md p-4 bg-white">
                      <Button
                        variant="outline"
                        className="w-full bg-white text-blue-900 border-blue-900 hover:bg-gray-50"
                      >
                        Pilih Audio
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">Tidak ada audio dipilih</p>
                    </div>
                    <p className="text-sm text-gray-500">Ukuran maksimum audio 3 Mb dengan format .mp3 .wav</p>
                  </div>
                </div>

                <div className="flex justify-end bg-white">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="mr-4 bg-white text-blue-900 border-blue-900 hover:bg-gray-50"
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                    Kirim
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
