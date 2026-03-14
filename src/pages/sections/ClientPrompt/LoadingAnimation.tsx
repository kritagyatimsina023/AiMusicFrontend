import { useEffect, useState } from "react";

const steps = [
  "Sending request...",
  "Identifying emotion...",
  "Generating music...",
  "Generating links...",
];

const LoadingAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setVisible(true);
      }, 200);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const bars = [
    { delay: "0s", opacity: 1 },
    { delay: "0.15s", opacity: 1 },
    { delay: "0.3s", opacity: 1 },
    { delay: "0.45s", opacity: 1 },
    { delay: "0.6s", opacity: 1 },
    { delay: "0.75s", opacity: 0.6 },
    { delay: "0.9s", opacity: 0.4 },
  ];

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-12 bg-[#111214] rounded-2xl"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Equalizer bars */}
      <div className="flex items-end gap-1 h-10 mb-7">
        {bars.map((b, i) => (
          <div
            key={i}
            className="w-1 rounded-[3px] bg-[#1DB954]"
            style={{
              opacity: b.opacity,
              animation: `eq${(i % 5) + 1} 1.1s ease-in-out infinite`,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Step text */}
      <p
        className="text-[13px] font-medium text-[#aaa] h-5 tracking-tight transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {steps[currentStep]}
      </p>

      {/* Pip indicators */}
      <div className="flex gap-1.5 mt-4">
        {steps.map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: i === currentStep ? "#1DB954" : "#252830",
              transform: i === currentStep ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-44 h-0.5 bg-[#1e2028] rounded-full mt-5 overflow-hidden">
        <div
          className="h-full bg-[#1DB954] rounded-full transition-[width] duration-[1100ms] linear"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
