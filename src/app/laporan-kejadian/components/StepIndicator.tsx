interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: "Deskripsi Kejadian" },
    { number: 2, title: "Bukti Kejadian" },
  ];

  return (
    <div className="flex mb-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex-1 pb-2 ${
            currentStep === step.number
              ? "border-b-4 border-white"
              : currentStep > step.number
              ? "border-b-4 border-green-400"
              : "border-b-4 border-gray-500"
          }`}
        >
          <h2
            className={`text-xl font-bold ${
              currentStep === step.number
                ? "text-white"
                : currentStep > step.number
                ? "text-white"
                : "text-gray-400"
            }`}
          >
            {step.number}. {step.title}
          </h2>
        </div>
      ))}
    </div>
  );
}
