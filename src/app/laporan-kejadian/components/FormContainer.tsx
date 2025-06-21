"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";
import { Step3ThankYou } from "./Step3ThankYou";

interface FormContainerProps {
  step: number;
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  onSubmit: (data: any) => void;
  onBackToHome: () => void;
  onGoToHistory: () => void;
}

export function FormContainer({
  step,
  onNext,
  onBack,
  onSubmit,
  onBackToHome,
  onGoToHistory,
}: FormContainerProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardContent className="p-8 bg-white">
        {step === 1 ? (
          <Step1Form onNext={onNext} />
        ) : step === 2 ? (
          <Step2Form onSubmit={onSubmit} onBack={onBack} />
        ) : (
          <Step3ThankYou
            onBackToHome={onBackToHome}
            onGoToHistory={onGoToHistory}
          />
        )}
      </CardContent>
    </Card>
  );
}
