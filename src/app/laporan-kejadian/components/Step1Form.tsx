//src/app/laporan-kejadian/components/Step1Form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale"; 
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { useState } from "react";

interface Step1FormProps {
  onNext: () => void;
}

export function Step1Form({ onNext }: Step1FormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          window.open(
            `https://www.google.com/maps?q=${latitude},${longitude}`,
            "_blank"
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Gagal mendapatkan lokasi. Pastikan izin lokasi diberikan.");
        }
      );
    } else {
      alert("Browser tidak mendukung geolokasi");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Waktu Kejadian - Time Picker */}
        <div className="space-y-3">
          <Label
            htmlFor="waktu"
            className="text-gray-700 font-medium text-base"
          >
            Waktu Kejadian <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="waktu"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="bg-white border-gray-300 text-gray focus:border--500 focus:ring-blue-500 pr-10 h-12 text-base"
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray" />
          </div>
        </div>

        {/* Lokasi Kejadian - Map Integration */}
        <div className="space-y-3">
          <Label
            htmlFor="lokasi"
            className="text-gray-700 font-medium text-base"
          >
            Lokasi Kejadian <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="lokasi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Klik untuk mendapatkan lokasi terkini"
              required
              className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 pr-10 h-12 text-base"
              onClick={() => handleGetCurrentLocation()}
              readOnly
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          <Label
            htmlFor="kategori"
            className="text-gray-700 font-medium text-base"
          >
            Kategori Pelanggaran <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <select
              id="kategori"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none h-12 text-base"
              required
            >
              <option value="membuli">Membuli</option>
              <option value="diskriminasi">Diskriminasi</option>
              <option value="kekerasan">Kekerasan</option>
            </select>
          </div>
          <p className="text-sm text-gray-500">Pilih kategori pelanggaran</p>
        </div>

        {/* Tanggal Kejadian - Date Picker */}
        <div className="space-y-3">
          <Label
            htmlFor="tanggal"
            className="text-gray-700 font-medium text-base"
          >
            Tanggal Kejadian <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal bg-white border-gray-300 hover:bg-gray-50 h-12 px-4 text-base"
              >
                {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                <CalendarIcon className="h-5 w-5 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                required
                initialFocus
                locale={id}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mb-8 space-y-3">
        <Label
          htmlFor="deskripsi"
          className="text-gray-700 font-medium text-base"
        >
          Deskripsi Pelanggaran <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="deskripsi"
          placeholder="Jelaskan kejadian secara detail"
          rows={6}
          required
          className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 text-base min-h-[150px]"
        />
        <p className="text-sm text-gray-500">Deskripsikan dengan jelas</p>
      </div>

      <div className="flex justify-end bg-white pt-6">
        <Button
          variant="outline"
          className="mr-4 bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-12 px-6 text-base"
        >
          Batal
        </Button>
        <Button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white h-12 px-6 text-base"
        >
          Selanjutnya
        </Button>
      </div>
    </form>
  );
}