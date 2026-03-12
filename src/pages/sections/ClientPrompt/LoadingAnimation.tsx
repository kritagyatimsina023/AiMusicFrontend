import { useEffect, useState } from "react";

const LoadingAnimation = () => {
  const steps = [
    "Sending request...",
    "Identifying emotion...",
    "Generating music...",
    "Generating links...",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1200); // change message every 1.2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center h-full py-10 bg-black rounded-lg">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mb-6"></div>

      {/* Step message */}
      <p className="text-gray-400 text-sm h-6">{steps[currentStep]}</p>

      {/* Optional: little bouncing dots */}
      <div className="flex gap-1 mt-2">
        <span
          className={`w-2 h-2 bg-blue-500 rounded-full animate-bounce ${currentStep === 0 ? "delay-75" : ""}`}
        ></span>
        <span
          className={`w-2 h-2 bg-blue-500 rounded-full animate-bounce ${currentStep === 1 ? "delay-150" : ""}`}
        ></span>
        <span
          className={`w-2 h-2 bg-blue-500 rounded-full animate-bounce ${currentStep === 2 ? "delay-200" : ""}`}
        ></span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
