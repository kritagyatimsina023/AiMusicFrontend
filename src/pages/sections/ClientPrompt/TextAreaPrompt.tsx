import React, { useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Sparkles } from "lucide-react";
import ModelWindow from "@/components/layout/ModelWindow";
import DetailPromptOutput from "./DetailPromptOutput";
import { useFetchPrompt } from "@/store/useFetchPrompt";
import { useModelStore } from "@/store/useModelStore";
import MusicGeneratedToast from "./MusicGeneratedToast";

const MAX = 2000;

const TextAreaPrompt = () => {
  const [promptTxt, setPromptTxt] = useState("");
  const [captionTxt, setCaptionTxt] = useState("");
  const { createPrompt, isLoading } = useFetchPrompt();
  const { versionSelection, openOutputSection } = useModelStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptTxt || !versionSelection || !captionTxt) {
      toast.error(
        `${!promptTxt ? "Prompt Field cannot be empty" : "Caption field cannot be empty"}`,
      );
      return;
    }
    const response = await createPrompt(
      promptTxt,
      versionSelection,
      captionTxt,
    );
    if (response) {
      setShowSuccess(true);
      // toast.success("Prompt was sent");
      setPromptTxt("");
      setCaptionTxt("");
    } else {
      toast.error("Failed to generate prompt");
      setShowSuccess(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <MusicGeneratedToast
          show={showSuccess}
          onDismiss={() => setShowSuccess(false)}
        />
      </div>
      <div
        className="w-full flex justify-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-[700px]">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Lyrics */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#444] font-medium">
                Lyrics
              </span>
              <textarea
                value={promptTxt}
                onChange={(e) => setPromptTxt(e.target.value)}
                maxLength={MAX}
                placeholder="Input lyrics (400 words)"
                className="
                  min-h-[160px] resize-none bg-[#161719] border border-[#1e2028]
                  rounded-xl px-4 py-3.5 text-[13.5px] text-[#e0e0e0] leading-relaxed
                  placeholder:text-[#333] outline-none transition-all duration-200
                  hover:border-[#2a2d38]
                  focus:border-[#1DB954] focus:shadow-[0_0_0_3px_rgba(29,185,84,0.08)]
                "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <span
                className={`text-[11px] text-right transition-colors ${
                  promptTxt.length > MAX * 0.85
                    ? "text-[#e2963a]"
                    : "text-[#333]"
                }`}
              >
                {promptTxt.length} / {MAX}
              </span>
            </div>

            {/* Caption */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#444] font-medium">
                Caption
              </span>
              <textarea
                value={captionTxt}
                onChange={(e) => setCaptionTxt(e.target.value)}
                maxLength={MAX}
                placeholder="Describe the mood or scene..."
                className="
                  min-h-[160px] resize-none bg-[#161719] border border-[#1e2028]
                  rounded-xl px-4 py-3.5 text-[13.5px] text-[#e0e0e0] leading-relaxed
                  placeholder:text-[#333] outline-none transition-all duration-200
                  hover:border-[#2a2d38]
                  focus:border-[#1DB954] focus:shadow-[0_0_0_3px_rgba(29,185,84,0.08)]
                "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <span
                className={`text-[11px] text-right transition-colors ${
                  captionTxt.length > MAX * 0.85
                    ? "text-[#e2963a]"
                    : "text-[#333]"
                }`}
              >
                {captionTxt.length} / {MAX}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1e2028] mb-5" />

          {/* Generate button */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full py-3.5 rounded-xl font-semibold text-[14px] tracking-wide
              flex items-center justify-center gap-2 transition-all duration-200
              bg-[#1DB954] text-black
              hover:bg-[#1ed760] hover:-translate-y-px
              active:scale-[0.98] active:bg-[#17a349]
              disabled:bg-[#1a3326] disabled:text-[#2d6644] disabled:cursor-not-allowed
              disabled:translate-y-0
            "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={15} />
            )}
            {isLoading ? "Generating..." : "Generate"}
          </button>

          {/* Hint */}
          <div className="flex items-center justify-center gap-1.5 mt-3.5">
            <span className="w-[5px] h-[5px] rounded-full bg-[#1DB954]" />
            <span className="text-[11px] text-[#333]">
              Powered by Musica AI · {versionSelection}
            </span>
          </div>
        </form>
      </div>

      {openOutputSection && (
        <ModelWindow>
          <DetailPromptOutput />
        </ModelWindow>
      )}
    </>
  );
};

export default TextAreaPrompt;
