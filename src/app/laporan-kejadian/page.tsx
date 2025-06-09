"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
          <Link href="/" className="bg-white rounded-full p-4 inline-block">
            <ArrowLeft className="text-blue-900" />
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

        <div className="bg-white rounded-lg p-8">
          {step === 1 ? (
            <form onSubmit={handleNext}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="waktu" className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu Kejadian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="waktu"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="content"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">16:00</p>
                </div>

                <div>
                  <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi Kejadian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lokasi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="content"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Surabaya</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori Pelanggaran <span className="text-red-500">*</span>
                  </label>
                  <select id="kategori" className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    <option value="">Placeholder</option>
                    <option value="membuli">Membuli</option>
                    <option value="diskriminasi">Diskriminasi</option>
                    <option value="kekerasan">Kekerasan</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Menindas</p>
                </div>

                <div>
                  <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Kejadian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="tanggal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Placeholder"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">01/01/2000</p>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Pelanggaran <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="deskripsi"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Placeholder"
                  required
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Menindas</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white text-blue-900 border border-blue-900 px-6 py-2 rounded-md mr-4"
                >
                  Batal
                </button>
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md">
                  Selanjutnya
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bukti Foto <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <p className="text-gray-500 text-center mb-4">Seret atau Tarik foto kesini atau</p>
                    <button
                      type="button"
                      className="bg-white text-blue-900 border border-blue-900 px-4 py-2 rounded-md"
                    >
                      Upload Dari Komputer
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Ukuran maksimum file 3 Mb dengan format .png .jpg</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bukti Suara</label>
                  <div className="border border-gray-300 rounded-md p-4">
                    <button
                      type="button"
                      className="bg-white text-blue-900 border border-blue-900 px-4 py-2 rounded-md w-full"
                    >
                      Pilih Audio
                    </button>
                    <p className="text-sm text-gray-500 mt-2">Tidak ada audio dipilih</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Ukuran maksimum audio 3 Mb dengan format .mp3 .wav</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white text-blue-900 border border-blue-900 px-6 py-2 rounded-md mr-4"
                >
                  Batal
                </button>
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md">
                  Kirim
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
