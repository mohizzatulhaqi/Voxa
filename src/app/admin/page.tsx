"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

interface Report {
  id: number;
  user_id: number;
  incident_description: string;
  incident_time: string;
  category_id: number;
  incident_location: string;
  incident_date: string;
  violation_description: string;
  status: "menunggu" | "proses" | "selesai" | "ditolak";
  created_at: string;
  updated_at: string;
  image_url?: string;
  files?: Array<{
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
    mime_type: string;
  }>;
}

interface DashboardStats {
  total_reports: number;
  recent_reports: number;
  user_reports: number;
  status_breakdown: {
    menunggu: number;
    proses: number;
    selesai: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/reports/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setError("Token tidak valid");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (data.success) {
        setReports(data.data || []);
      } else {
        setError(data.message || "Gagal mengambil data");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    const fetchAndSet = async () => {
      await Promise.all([fetchReports(), fetchStats()]);
    };
    fetchAndSet();

    // Auto-refresh stats every 30 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/reports/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh both reports and stats after status update
        await Promise.all([fetchReports(), fetchStats()]);
      } else {
        alert(data.message || "Gagal update status");
      }
    } catch (err) {
      alert("Gagal update status");
    }
    setUpdatingId(null);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 w-full">
        <Sidebar className="bg-white border-r min-h-screen w-64 flex-shrink-0">
          <div className="p-6">
            <div className="text-2xl font-bold mb-8 text-blue-900">Admin Panel</div>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" className="block py-2 px-3 rounded hover:bg-blue-50">Dashboard</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin" className="block py-2 px-3 rounded hover:bg-blue-50">Data Laporan</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <button onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }} className="block w-full text-left py-2 px-3 rounded hover:bg-red-50 text-red-600">Logout</button>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </Sidebar>
        <main className="flex-1 p-0 m-0 w-full pl-4 pr-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 px-8 pt-8 w-full">Dashboard Admin - Verifikasi Laporan</h1>
          
          {/* Statistics Section */}
          <div className="px-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Statistik Dashboard</h2>
              <Button
                onClick={async () => {
                  setLoading(true);
                  await Promise.all([fetchReports(), fetchStats()]);
                  setLoading(false);
                }}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Memuat..." : "Refresh Data"}
              </Button>
            </div>
            
            {loading && !stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-300 animate-pulse">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-gray-200 w-12 h-12"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Reports */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Jumlah Laporan Sekarang</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total_reports}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Laporan 7 Hari Terakhir</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.recent_reports}</p>
                    </div>
                  </div>
                </div>

                {/* Pending Reports */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-amber-100">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Menunggu Verifikasi</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.status_breakdown.menunggu}</p>
                    </div>
                  </div>
                </div>

                {/* Completed Reports */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Selesai Diproses</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.status_breakdown.selesai}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">Tidak dapat memuat statistik dashboard. Silakan coba refresh halaman.</p>
              </div>
            )}
          </div>

          {/* Debug Section */}
          <div className="px-8 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔍 Debug Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Backend URL:</strong> {API_URL}</p>
                  <p><strong>Total Reports:</strong> {reports.length}</p>
                  <p><strong>Reports with Files:</strong> {reports.filter(r => r.files && r.files.length > 0).length}</p>
                  <p><strong>Total Media Files:</strong> {reports.reduce((total, r) => total + (r.files?.length || 0), 0)}</p>
                </div>
                <div>
                  <p><strong>File Types Found:</strong></p>
                  <ul className="list-disc list-inside ml-2">
                    {(() => {
                      const types = new Set<string>();
                      reports.forEach(r => {
                        r.files?.forEach(f => types.add(f.file_type));
                      });
                      return Array.from(types).map(type => (
                        <li key={type}>{type}: {reports.reduce((total, r) => total + (r.files?.filter(f => f.file_type === type).length || 0), 0)} files</li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <button 
                  onClick={() => {
                    console.log('=== ADMIN DEBUG INFO ===');
                    console.log('API URL:', API_URL);
                    console.log('Reports:', reports);
                    console.log('Stats:', stats);
                    reports.forEach((r, i) => {
                      if (r.files && r.files.length > 0) {
                        console.log(`Report ${r.id} files:`, r.files);
                        r.files.forEach(f => {
                          console.log(`  File: ${f.file_name}`);
                          console.log(`  URL: http://localhost:3001/uploads/${f.file_path}`);
                        });
                      }
                    });
                    alert('Debug info logged to console!');
                  }}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Log Debug Info
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-blue-900 px-8">Memuat data...</div>
          ) : error ? (
            <div className="text-red-400 px-8">{error}</div>
          ) : (
            <div className="overflow-x-auto w-full px-8 pb-8 pr-8 bg-white rounded-lg shadow">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-200 text-blue-900 font-bold rounded-t-xl border-b border-blue-300">
                    <th className="p-4">ID</th>
                    <th className="p-4">User ID</th>
                    <th className="p-4">Waktu</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Lokasi</th>
                    <th className="p-4">Deskripsi</th>
                    <th className="p-4">File Media</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id} className="border-b">
                      <td className="p-4">{r.id}</td>
                      <td className="p-4">{r.user_id}</td>
                      <td className="p-4">{r.incident_time}</td>
                      <td className="p-4">{r.incident_date}</td>
                      <td className="p-4">{r.incident_location}</td>
                      <td className="p-4 max-w-xs truncate">{r.incident_description}</td>
                      <td className="p-4">
                        {r.files && r.files.length > 0 ? (
                          <div className="space-y-2">
                            {r.files.map((file, index) => {
                              const fileUrl = `http://localhost:3001/uploads/${file.file_path}`;
                              return (
                                <div key={file.id} className="border rounded p-2 bg-gray-50">
                                  <div className="text-xs text-gray-600 mb-1">
                                    <strong>File {index + 1}:</strong> {file.file_name}
                                  </div>
                                  <div className="text-xs text-gray-600 mb-1">
                                    <strong>Type:</strong> {file.file_type} ({file.mime_type})
                                  </div>
                                  <div className="text-xs text-gray-600 mb-2">
                                    <strong>Path:</strong> {file.file_path}
                                  </div>
                                  <div className="text-xs text-blue-600 mb-2 break-all">
                                    <strong>URL:</strong> {fileUrl}
                                  </div>
                                  
                                  {/* Preview */}
                                  <div className="mb-2">
                                    {file.file_type === "image" ? (
                                      <div className="relative">
                                        <img 
                                          src={fileUrl} 
                                          alt={file.file_name}
                                          className="w-16 h-16 object-cover rounded border"
                                          onLoad={() => console.log(`✅ Admin: Image loaded: ${file.file_name}`)}
                                          onError={(e) => {
                                            console.error(`❌ Admin: Failed to load image: ${file.file_name}`);
                                            e.currentTarget.style.display = 'none';
                                            const errorDiv = document.createElement('div');
                                            errorDiv.className = 'text-xs text-red-500 bg-red-50 p-1 rounded';
                                            errorDiv.textContent = '❌ Failed to load';
                                            e.currentTarget.parentNode?.appendChild(errorDiv);
                                          }}
                                        />
                                      </div>
                                    ) : file.file_type === "video" ? (
                                      <video 
                                        src={fileUrl} 
                                        className="w-16 h-16 object-cover rounded border"
                                        onLoadStart={() => console.log(`🔄 Admin: Loading video: ${file.file_name}`)}
                                        onCanPlay={() => console.log(`✅ Admin: Video can play: ${file.file_name}`)}
                                        onError={() => console.error(`❌ Admin: Failed to load video: ${file.file_name}`)}
                                      />
                                    ) : file.file_type === "audio" ? (
                                      <audio 
                                        src={fileUrl} 
                                        className="w-16 h-8"
                                        onLoadStart={() => console.log(`🔄 Admin: Loading audio: ${file.file_name}`)}
                                        onCanPlay={() => console.log(`✅ Admin: Audio can play: ${file.file_name}`)}
                                        onError={() => console.error(`❌ Admin: Failed to load audio: ${file.file_name}`)}
                                      />
                                    ) : (
                                      <div className="text-xs text-gray-500">Unsupported type</div>
                                    )}
                                  </div>
                                  
                                  {/* Test buttons */}
                                  <div className="flex gap-1">
                                    <button 
                                      onClick={() => window.open(fileUrl, '_blank')}
                                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                      Test URL
                                    </button>
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(fileUrl);
                                        alert('URL copied to clipboard!');
                                      }}
                                      className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                                    >
                                      Copy URL
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : r.image_url ? (
                          <div className="border rounded p-2 bg-gray-50">
                            <div className="text-xs text-gray-600 mb-1">
                              <strong>Legacy Image URL:</strong>
                            </div>
                            <div className="text-xs text-blue-600 mb-2 break-all">
                              {r.image_url}
                            </div>
                            <img 
                              src={r.image_url} 
                              alt="Legacy Bukti" 
                              className="w-16 h-16 object-cover rounded border"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const errorDiv = document.createElement('div');
                                errorDiv.className = 'text-xs text-red-500 bg-red-50 p-1 rounded';
                                errorDiv.textContent = '❌ Failed to load legacy image';
                                e.currentTarget.parentNode?.appendChild(errorDiv);
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4 font-semibold">
                        {r.status === "menunggu" && <span className="text-amber-500">Menunggu</span>}
                        {r.status === "proses" && <span className="text-blue-500">Diproses</span>}
                        {r.status === "selesai" && <span className="text-green-500">Selesai</span>}
                        {r.status === "ditolak" && <span className="text-red-500">Ditolak</span>}
                      </td>
                      <td className="p-2 space-x-2">
                        {r.status === "menunggu" && (
                          <>
                            <Button
                              size="sm"
                              disabled={updatingId === r.id}
                              onClick={() => updateStatus(r.id, "proses")}
                            >
                              Setujui
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={updatingId === r.id}
                              onClick={() => updateStatus(r.id, "ditolak")}
                            >
                              Tolak
                            </Button>
                          </>
                        )}
                        {r.status === "proses" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={updatingId === r.id}
                            onClick={() => updateStatus(r.id, "selesai")}
                          >
                            Tutup/Selesai
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
} 