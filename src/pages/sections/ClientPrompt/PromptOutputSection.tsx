import { useEffect, useRef } from "react";
import { useFetchPrompt } from "@/store/useFetchPrompt";
import { MusicToggleButton } from "@/components/sections/MusicToggleButton";
// import { useToggleOutput } from "@/context/ToggleOutputContext";
import { useModelStore } from "@/store/useModelStore";
import LoadingAnimation from "./LoadingAnimation";

const PromptOutputSection = () => {
  // const userPrompts = useFetchPrompt((state) => state.userPrompts);
  // const isLoading = useFetchPrompt((state) => state.isLoading);
  // const getUserPrompt = useFetchPrompt((state) => state.getUserPrompt);
  const { userPrompts, isLoading, getUserPrompt } = useFetchPrompt();
  const { setOpenOutput, setSelectedPromptId } = useModelStore();
  // const { setOpenOutputSection, setSelectedPromptId } = useToggleOutput();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevLength = useRef(0);

  useEffect(() => {
    getUserPrompt();
  }, [getUserPrompt]);
  // useEffect(() => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [userPrompts]);
  useEffect(() => {
    if (userPrompts.length > prevLength.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }

    prevLength.current = userPrompts.length;
  }, [userPrompts]);
  const handleViewDetails = (id: string) => {
    setSelectedPromptId(id);
    setOpenOutput();
  };
  return (
    <div
      ref={containerRef}
      className="w-[50rem] max-h-[30rem] py-3 flex flex-col items-end group overflow-y-auto hide-scrollbar"
    >
      {isLoading ? (
        <LoadingAnimation />
      ) : userPrompts?.length === 0 ? (
        <p>Prompt has not loaded yet...</p>
      ) : (
        userPrompts?.map((data) => (
          <div
            key={data._id}
            className="duration-300 py-4 ease-out group-hover:translate-y-[-10px] 
             w-full flex flex-col gap-3"
          >
            <div className="w-full flex justify-end">
              <div className="border-1 max-w-[30rem] rounded-xl border-white/30">
                <p className="p-2 text-gray-300/70">{data.lyrics}</p>
              </div>
            </div>
            <p>{data.version}</p>

            <div className="w-full flex justify-start">
              <div className="flex flex-col max-w-[40rem]">
                {/* <div className="flex px-4 py-2 flex-col border rounded-[10px] border-white/30 text-white/90">
                  <span>Genre: {data.genre}</span>
                  <span>Key: {data.key}</span>
                  <span>Tempo: {data.tempo}</span>

                  <p className="flex gap-3">
                    Instruments:
                    {data.instruments.map((item, idx) => (
                      <span key={idx}>{item},</span>
                    ))}
                  </p>
                </div> */}

                <div className="flex items-center justify-between gap-3">
                  <MusicToggleButton />

                  <span
                    onClick={() => handleViewDetails(data._id)}
                    className="text-blue-400/80 cursor-pointer"
                  >
                    View Details
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b border-white/30" />
          </div>
        ))
      )}
    </div>
  );
};

export default PromptOutputSection;
