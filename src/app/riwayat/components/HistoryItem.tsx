
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HistoryItemProps {
  id: number;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  statusColor: string;
  bgColor: string;
  borderColor: string;
}

export function HistoryItem({
  id,
  date,
  time,
  location,
  category,
  status,
  statusColor,
  bgColor,
  borderColor,
}: HistoryItemProps) {
  return (
    <Card
      className={`${bgColor} border ${borderColor} shadow-sm hover:shadow-md transition-shadow`}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <div className="space-y-1">
              <p className="text-gray-600 text-sm font-medium">Tanggal</p>
              <p className="font-semibold">{date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-sm font-medium">Waktu</p>
              <p className="font-semibold">{time}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-sm font-medium">Lokasi</p>
              <p className="font-semibold line-clamp-1">{location}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-sm font-medium">Kategori</p>
              <p className="font-semibold">{category}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-6">
            <div className="space-y-1 min-w-[120px]">
              <p className="text-gray-600 text-sm font-medium">Status</p>
              <p className={`font-semibold ${statusColor}`}>{status}</p>
            </div>
            <Link
              href={`/laporan-kejadian/detail?id=${id}`}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto bg-white hover:bg-gray-50"
              >
                <Eye size={16} />
                <span>Detail</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}