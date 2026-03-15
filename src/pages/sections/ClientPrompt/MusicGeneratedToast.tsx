// components/MusicGeneratedToast.tsx
import { useEffect, useState } from "react";

interface Props {
  show: boolean;
  onDismiss: () => void;
}

const MusicGeneratedToast = ({ show, onDismiss }: Props) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    setExiting(false);

    const dismissTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        onDismiss();
      }, 300);
    }, 3000);

    return () => clearTimeout(dismissTimer);
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="w-[320px] bg-[#111214] border border-[#1a4a2a] rounded-2xl
        overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        animation: exiting
          ? "none"
          : "toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(8px)" : undefined,
      }}
    >
      <div className="flex items-start gap-3.5 px-[18px] pt-4 pb-5">
        {/* Pulsing icon */}
        <div className="relative flex-shrink-0 mt-0.5">
          <div
            className="absolute inset-[-6px] rounded-full border-[1.5px]
            border-[#1DB954] animate-ping opacity-30"
          />
          <div
            className="w-9 h-9 rounded-full bg-[#0a2016] border border-[#1a4a2a]
            flex items-center justify-center relative z-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1DB954"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#1DB954] font-medium mb-1">
            Success
          </p>
          <p className="text-[14px] font-semibold text-white tracking-tight mb-0.5">
            Music generated!
          </p>
          <p className="text-[12px] text-[#555]">Your track is ready to play</p>

          {/* Mini equalizer */}
          <div className="flex items-end gap-0.5 h-3.5 mt-2">
            {[0, 0.1, 0.2, 0.3, 0.4].map((delay, i) => (
              <div
                key={i}
                className="w-[3px] rounded-sm bg-[#1DB954]"
                style={{
                  animation: `miniEq 0.9s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  opacity: i === 4 ? 0.5 : 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => {
            setExiting(true);
            setTimeout(() => {
              setVisible(false);
              onDismiss();
            }, 300);
          }}
          className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1l9 9M10 1l-9 9" />
          </svg>
        </button>
      </div>

      {/* Progress drain bar */}
      <div className="h-0.5 bg-[#1a1c22]">
        <div
          className="h-full bg-[#1DB954]"
          style={{ animation: show ? "drainBar 3s linear forwards" : "none" }}
        />
      </div>
    </div>
  );
};

export default MusicGeneratedToast;
