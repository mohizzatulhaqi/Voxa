"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormContainer } from "./components/FormContainer";
import { HeroSection } from "./components/HeroSection";
import { StepIndicator } from "./components/StepIndicator";
import { TitleSection } from "./components/TittleSection";

export default function LaporanKejadian() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<any>({});
  const [step2Data, setStep2Data] = useState<any>({});
  const router = useRouter();

  // Handler untuk step1
  const handleStep1Next = (data: any) => {
    setStep1Data(data);
    setStep(2);
  };
  // Handler untuk step2
  const handleStep2Submit = async (data: any) => {
    setStep2Data(data);
    // Kirim ke backend
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("incident_description", step1Data.incident_description);
    formData.append("incident_time", step1Data.incident_time);
    formData.append("category_id", step1Data.category_id);
    formData.append("incident_location", step1Data.incident_location);
    formData.append("incident_date", step1Data.incident_date);
    formData.append("violation_description", step1Data.violation_description);
    // File
    (data.files || []).forEach((file: File) => {
      formData.append("files", file);
    });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/reports`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setStep(3);
      } else {
        alert(result.message || "Gagal mengirim laporan");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim laporan");
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleGoToHistory = () => {
    router.push("/riwayat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section - hanya tampil di step 1 dan 2 */}
        {step < 3 && <HeroSection />}

        {/* Title Section - ubah teks untuk step 3 */}
        {step < 3 ? (
          <TitleSection />
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl font-bold mb-4">
              Laporan Berhasil Dikirim
            </h1>
            <p className="text-white">
              Terima kasih atas laporan yang Anda berikan
            </p>
          </div>
        )}

        <StepIndicator currentStep={step} />

        <FormContainer
          step={step}
          onNext={handleStep1Next}
          onBack={() => setStep(1)}
          onSubmit={handleStep2Submit}
          onBackToHome={handleBackToHome}
          onGoToHistory={handleGoToHistory}
        />
      </div>
    </div>
  );
}
