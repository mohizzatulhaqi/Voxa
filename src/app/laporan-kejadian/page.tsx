"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormContainer } from "./components/FormContainer";
import { HeroSection } from "./components/HeroSection";
import { StepIndicator } from "./components/StepIndicator";
import { TitleSection } from "./components/TittleSection";

export default function LaporanKejadian() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulasi proses pengiriman laporan
    console.log("Form submitted");

    // Pindah ke step 3 (halaman terima kasih)
    setStep(3);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleGoToHistory = () => {
    // Ganti dengan route yang sesuai untuk halaman riwayat
    router.push("/riwayat-laporan");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
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
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          onBackToHome={handleBackToHome}
          onGoToHistory={handleGoToHistory}
        />
      </div>
    </div>
  );
}
