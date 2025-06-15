import { HeroSection } from "./components/HeroSection";
import { HistoryItem } from "./components/HistoryItem";


export default function Riwayat() {
  // Sample data for history items
  const historyItems = [
    {
      id: 1,
      date: "26 Mei 2025",
      time: "16:00",
      location: "Surabaya, Sukolilo",
      category: "Membuli",
      status: "Menunggu",
      statusColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      id: 2,
      date: "15 April 2025",
      time: "10:30",
      location: "Jakarta, Menteng",
      category: "Diskriminasi",
      status: "Diproses",
      statusColor: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 3,
      date: "2 April 2025",
      time: "14:15",
      location: "Bandung, Dago",
      category: "Kekerasan",
      status: "Selesai",
      statusColor: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      <div className="container mx-auto px-4 py-8">
        <HeroSection />

        <div className="space-y-4">
          {historyItems.map((item) => (
            <HistoryItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
