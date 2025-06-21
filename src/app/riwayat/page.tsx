"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "./components/HeroSection";
import { HistoryItem } from "./components/HistoryItem";

interface Report {
  id: number;
  incident_date: string;
  incident_time: string;
  incident_location: string;
  category_id: number;
  status: string;
  created_at: string;
}

export default function Riwayat() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          alert("Token tidak valid. Silakan login ulang");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        const result = await res.json();
        if (result.success) {
          setReports(result.data);
        } else {
          console.error("Failed to fetch reports:", result.message);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "menunggu":
        return "text-amber-500";
      case "proses":
        return "text-blue-500";
      case "selesai":
        return "text-green-500";
      case "ditolak":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "menunggu":
        return "bg-amber-50";
      case "proses":
        return "bg-blue-50";
      case "selesai":
        return "bg-green-50";
      case "ditolak":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "menunggu":
        return "border-amber-200";
      case "proses":
        return "border-blue-200";
      case "selesai":
        return "border-green-200";
      case "ditolak":
        return "border-red-200";
      default:
        return "border-gray-200";
    }
  };

  const getCategoryName = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return "Membuli";
      case 2:
        return "Diskriminasi";
      case 3:
        return "Kekerasan";
      default:
        return "Lainnya";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 py-8">
          <HeroSection />
          <div className="text-center text-white">
            <p>Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      <div className="container mx-auto px-4 py-8">
        <HeroSection />

        {reports.length === 0 ? (
          <div className="text-center text-white mt-8">
            <p>Belum ada laporan yang dikirim</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <HistoryItem
                key={report.id}
                id={report.id}
                date={formatDate(report.incident_date)}
                time={report.incident_time}
                location={report.incident_location}
                category={getCategoryName(report.category_id)}
                status={report.status}
                statusColor={getStatusColor(report.status)}
                bgColor={getStatusBgColor(report.status)}
                borderColor={getStatusBorderColor(report.status)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
