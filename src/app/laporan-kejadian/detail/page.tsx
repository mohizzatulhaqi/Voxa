"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ReportDetail {
  id: number;
  incident_description: string;
  incident_time: string;
  category_id: number;
  incident_location: string;
  incident_date: string;
  violation_description: string;
  status: string;
  created_at: string;
  files?: Array<{
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
    file_size: number;
    mime_type: string;
  }>;
}

export default function DetailLaporan() {
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [debugInfo, setDebugInfo] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");

  useEffect(() => {
    const fetchReportDetail = async () => {
      if (!reportId) {
        setError("ID laporan tidak ditemukan");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/reports/${reportId}`, {
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
          setReport({
            ...result.data.report,
            files: result.data.files ?? []
          });
          
          // Debug: Test file access
          if (result.data.files && result.data.files.length > 0) {
            const debugData: {
              files: any[];
              apiUrl: string;
              testResults: Array<{
                fileName: string;
                originalPath: string;
                relativePath: string;
                fileUrl: string;
                accessible: boolean;
                status?: number;
                error?: string;
              }>;
            } = {
              files: result.data.files,
              apiUrl: "http://localhost:3001",
              testResults: []
            };
            
            console.log("Environment variable NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
            console.log("Using API URL:", debugData.apiUrl);
            console.log("Files to process:", result.data.files);
            
            // Test each file
            for (const file of result.data.files) {
              const pathParts = file.file_path.split(/[\\/]/);
              const uploadsIndex = pathParts.findIndex((part: string) => part === 'uploads');
              let relativePath = '';
              
              if (uploadsIndex !== -1 && uploadsIndex < pathParts.length - 1) {
                relativePath = pathParts.slice(uploadsIndex + 1).join('/');
              } else {
                relativePath = pathParts[pathParts.length - 1];
              }
              
              // Force correct URL format without /api
              const fileUrl = `http://localhost:3001/uploads/${relativePath}`;
              console.log("File URL:", fileUrl);
              console.log("Original path:", file.file_path);
              console.log("Relative path:", relativePath);
              
              try {
                const testRes = await fetch(fileUrl, { method: 'HEAD' });
                debugData.testResults.push({
                  fileName: file.file_name,
                  originalPath: file.file_path,
                  relativePath,
                  fileUrl,
                  accessible: testRes.ok,
                  status: testRes.status
                });
              } catch (err) {
                const error = err as Error;
                debugData.testResults.push({
                  fileName: file.file_name,
                  originalPath: file.file_path,
                  relativePath,
                  fileUrl,
                  accessible: false,
                  error: error.message
                });
              }
            }
            // setDebugInfo(debugData);
          }
        } else {
          setError(result.message || "Gagal mengambil detail laporan");
        }
      } catch (err) {
        console.error("Error fetching report detail:", err);
        setError("Terjadi kesalahan saat mengambil detail laporan");
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetail();
  }, [reportId, router]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p>Memuat detail laporan...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-red-500">{error || "Laporan tidak ditemukan"}</p>
            <Link href="/riwayat">
              <Button className="mt-4">Kembali ke Riwayat</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="font-medium">{report.incident_time}</p>
              </div>

              <div>
                <h2 className="text-gray-500 mb-1">Lokasi kejadian</h2>
                <p className="font-medium">{report.incident_location}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-gray-500 mb-1">Tanggal Kejadian</h2>
                <p className="font-medium">{formatDate(report.incident_date)}</p>
              </div>

              <div>
                <h2 className="text-gray-500 mb-1">Kategori Pelanggaran</h2>
                <p className="font-medium">{getCategoryName(report.category_id)}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-gray-500 mb-1">Deskripsi Pelanggaran</h2>
              <p className="font-medium">{report.violation_description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-gray-500 mb-1">Bukti Foto/Video</h2>
                {report.files && report.files.length > 0 ? (
                  <div className="space-y-4">
                    {report.files.filter(file => file.file_type === "image" || file.file_type === "video").map((file) => {
                      console.log("File data:", file);
                      const pathParts = file.file_path.split(/[\\/]/);
                      const uploadsIndex = pathParts.findIndex(part => part === 'uploads');
                      let relativePath = '';
                      
                      if (uploadsIndex !== -1 && uploadsIndex < pathParts.length - 1) {
                        relativePath = pathParts.slice(uploadsIndex + 1).join('/');
                      } else {
                        relativePath = pathParts[pathParts.length - 1];
                      }
                      
                      const fileUrl = `http://localhost:3001/uploads/${relativePath}`;
                      console.log("File URL:", fileUrl);
                      
                      fetch(fileUrl, { method: 'HEAD' })
                        .then(response => {
                          console.log(`File ${file.file_name} accessible:`, response.ok, response.status);
                        })
                        .catch(error => {
                          console.error(`File ${file.file_name} not accessible:`, error);
                        });
                      
                      return (
                        <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="mb-2">
                            <p className="text-sm text-gray-600 font-medium">{file.file_name}</p>
                            <p className="text-xs text-gray-400">
                              {(file.file_size / 1024 / 1024).toFixed(2)} MB • {file.mime_type}
                            </p>
                          </div>
                          
                          {file.file_type === "image" ? (
                            <div className="relative">
                              {/* Test image display */}
                              {!imageFailed ? (
                              <img
                                src={fileUrl}
                                alt="Bukti foto"
                                className="w-full max-h-64 object-cover rounded border-2 border-gray-200"
                                onLoad={() => {
                                  console.log(`✅ Image loaded successfully: ${file.file_name}`);
                                }}
                                onError={() => {
                                  console.error("❌ Failed to load image:", fileUrl);
                                  setImageFailed(true);
                                }}
                                crossOrigin="anonymous"
                              />
                              ) : (
                              <div className="w-full h-32 bg-gray-100 rounded flex flex-col items-center justify-center text-gray-500 p-4">
                                  <p className="text-sm mb-2">Gagal memuat gambar: {file.file_name}</p>
                                  <div className="space-y-2">
                                    <button onClick={() => window.open(fileUrl, '_blank')} className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                      Coba URL Asli
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : file.file_type === "video" ? (
                            <div className="relative">
                              {/* Test video display */}
                              <div className="mb-2 p-2 bg-blue-50 rounded text-xs">
                                <p><strong>Debug Info:</strong></p>
                                <p>File: {file.file_name}</p>
                                <p>URL: {fileUrl}</p>
                                <p>Type: {file.file_type}</p>
                                <p>MIME: {file.mime_type}</p>
                              </div>
                              
                              <video
                                src={fileUrl}
                                controls
                                className="w-full max-h-64 object-cover rounded border-2 border-gray-200"
                                onLoadStart={() => {
                                  console.log(`🔄 Loading video: ${file.file_name}`);
                                  console.log(`   URL: ${fileUrl}`);
                                }}
                                onCanPlay={() => {
                                  console.log(`✅ Video can play: ${file.file_name}`);
                                  // Remove debug info after successful load
                                  const debugDiv = document.querySelector(`[data-file="${file.id}"]`) as HTMLElement;
                                  if (debugDiv) {
                                    debugDiv.style.display = 'none';
                                  }
                                }}
                                onError={(e) => {
                                  console.error("❌ Failed to load video:", fileUrl);
                                  console.error("   File name:", file.file_name);
                                  console.error("   File type:", file.file_type);
                                  console.error("   MIME type:", file.mime_type);
                                  
                                  e.currentTarget.style.display = 'none';
                                  
                                  // Show fallback with retry option
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-32 bg-gray-100 rounded flex flex-col items-center justify-center text-gray-500 p-4';
                                  fallback.innerHTML = `
                                    <p class="text-sm mb-2">Gagal memuat video: ${file.file_name}</p>
                                    <div class="space-y-2">
                                      <button onclick="window.open('${fileUrl}', '_blank')" class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                        Coba URL Asli
                                      </button>
                                      <button onclick="window.open('${fileUrl.replace('/uploads/', '/api/file/')}', '_blank')" class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                        Coba URL API
                                      </button>
                                    </div>
                                  `;
                                  e.currentTarget.parentNode?.appendChild(fallback);
                                }}
                                crossOrigin="anonymous"
                                data-file={file.id}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                              <p>Format file tidak didukung: {file.file_name}</p>
                            </div>
                          )}
                          
                          <div className="flex mt-4 space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => window.open(fileUrl, '_blank')}
                            >
                              <Download size={14} className="mr-1" />
                              Unduh
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => window.open(fileUrl, '_blank')}
                            >
                              <Eye size={14} className="mr-1" />
                              Lihat
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400">Tidak ada bukti foto/video</p>
                )}
              </div>

              <div>
                <h2 className="text-gray-500 mb-1">Bukti Suara</h2>
                {report.files && report.files.filter(file => file.file_type === "audio").length > 0 ? (
                  <div className="space-y-4">
                    {report.files.filter(file => file.file_type === "audio").map((file) => {
                      const pathParts = file.file_path.split(/[\\/]/);
                      const uploadsIndex = pathParts.findIndex(part => part === 'uploads');
                      let relativePath = '';
                      
                      if (uploadsIndex !== -1 && uploadsIndex < pathParts.length - 1) {
                        relativePath = pathParts.slice(uploadsIndex + 1).join('/');
                      } else {
                        relativePath = pathParts[pathParts.length - 1];
                      }
                      
                      const fileUrl = `http://localhost:3001/uploads/${relativePath}`;
                      
                      return (
                        <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="mb-2">
                            <p className="text-sm text-gray-600 font-medium">{file.file_name}</p>
                            <p className="text-xs text-gray-400">
                              {(file.file_size / 1024 / 1024).toFixed(2)} MB • {file.mime_type}
                            </p>
                          </div>
                          
                          <audio
                            src={fileUrl}
                            controls
                            className="w-full"
                            onError={(e) => {
                              console.error("Failed to load audio:", fileUrl);
                              e.currentTarget.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-16 bg-gray-100 rounded flex items-center justify-center text-gray-500';
                              fallback.innerHTML = `<p>Gagal memuat audio: ${file.file_name}</p>`;
                              e.currentTarget.parentNode?.appendChild(fallback);
                            }}
                          />
                          
                          <div className="flex mt-4 space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => window.open(fileUrl, '_blank')}
                            >
                              <Download size={14} className="mr-1" />
                              Unduh
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400">Tidak ada bukti suara</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-gray-500 mb-1">Status Pelaporan</h2>
              <p className={`font-medium ${getStatusColor(report.status)}`}>
                {report.status === "menunggu" && "Menunggu"}
                {report.status === "proses" && "Diproses"}
                {report.status === "selesai" && "Selesai"}
                {report.status === "ditolak" && "Ditolak"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Debug Section - Only show in development
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-orange-600">Debug Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">API URL:</h4>
                  <p className="text-sm bg-gray-100 p-2 rounded">{debugInfo.apiUrl}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Environment Variables:</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>NEXT_PUBLIC_API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "Not set"}</p>
                    <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
                    <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server side'}</p>
                    <p><strong>Backend URL:</strong> http://localhost:3001</p>
                    <p><strong>File Base URL:</strong> http://localhost:3001/uploads/</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">File Access Test Results:</h4>
                  <div className="space-y-2">
                    {debugInfo.testResults.map((result: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-sm">{result.fileName}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            result.accessible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {result.accessible ? 'Accessible' : 'Not Accessible'}
                          </span>
                        </div>
                        <div className="text-xs space-y-1">
                          <p><strong>Original Path:</strong> {result.originalPath}</p>
                          <p><strong>Relative Path:</strong> {result.relativePath}</p>
                          <p><strong>File URL:</strong> {result.fileUrl}</p>
                          {result.status && <p><strong>Status:</strong> {result.status}</p>}
                          {result.error && <p><strong>Error:</strong> {result.error}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Troubleshooting Tips:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Check if backend is running on port 3001</li>
                    <li>• Verify files exist in uploads directory</li>
                    <li>• Check CORS configuration</li>
                    <li>• Ensure static file middleware is configured correctly</li>
                    <li>• File URL should be: http://localhost:3001/uploads/images/[filename]</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  );
}
