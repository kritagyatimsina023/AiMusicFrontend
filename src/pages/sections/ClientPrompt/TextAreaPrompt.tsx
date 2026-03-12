import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
// import { usePromptContext } from "@/context/PromtContext";
// import InputDropDown from "../InputParameters/InputDropDown";
// import { useParameter } from "@/context/InputParaContext";
import { Button } from "@/components/ui/button";
import ModelWindow from "@/components/layout/ModelWindow";
import DetailPromptOutput from "./DetailPromptOutput";
// import { useToggleOutput } from "@/context/ToggleOutputContext";
// import { storeCallApiPrompt } from "@/ApiServices/promptData";
import { Loader2 } from "lucide-react";
import { useFetchPrompt } from "@/store/useFetchPrompt";
import { useModelStore } from "@/store/useModelStore";

const TextAreaPrompt = () => {
  // const data = [
  //   {
  //     title: "Genre",
  //     inner: [
  //       "jazz",
  //       "rock",
  //       "electronic",
  //       "folk",
  //       "instrumental",
  //       "classical",
  //       "orchestral",
  //       "orchestra",
  //       "acoustic",
  //       "hip_hop",
  //     ],
  //   },
  //   {
  //     title: "Instruments",
  //     inner: ["drums", "piano", "saxophone", "bass"],
  //   },
  //   {
  //     title: "Key",
  //     inner: [
  //       "c_minor",
  //       "f_sharp",
  //       "d_major",
  //       "c_major",
  //       "f_minor",
  //       "a_major",
  //       "d_minor",
  //       "a_minor",
  //       "g_major",
  //       "b_minor",
  //     ],
  //   },
  //   {
  //     title: "Tempo",
  //     inner: ["slow", "fast", "moderate", "very_fast", "very_slow"],
  //   },
  // ];

  const [promptTxt, setPromptTxt] = useState<string>("");
  // const { setloading, loading } = usePromptContext();
  // const [captionTxt, setCaptionTxt] = useState("");
  // const { genre, instruments, key, tempo } = useParameter();
  // const { openOutputSection } = useToggleOutput();
  const { createPrompt, isLoading } = useFetchPrompt();
  const { openOutputSection } = useModelStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptTxt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    // const trimmedName = promptTxt.trim().split(" ").slice(0, 5).join(" ");
    const response = await createPrompt(
      promptTxt,
      // genre,
      // instruments,
      // key,
      // tempo,
    );
    if (response) {
      toast.success("Prompt was sent");
      setPromptTxt("");
    } else {
      toast.error("Faield to generate prompt");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center ">
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-10 items-center ">
            <div className="flex gap-20 w-240">
              <Textarea
                value={promptTxt}
                onChange={(e) => setPromptTxt(e.target.value)}
                className="border-1 border-gray-400 "
                placeholder="Input lyrics (400 words)"
              />
              <Textarea
                // value={promptTxt}
                // onChange={(e) => setCaptionTxt(e.target.value)}
                className="border-1 border-gray-400 "
                placeholder="Caption (400 words)"
              />
            </div>
            {/* <div className="flex justify-between mt-6">
              {data.map((data, idx) => (
                <InputDropDown data={data} key={idx} />
              ))}
            </div> */}
            <Button
              type="submit"
              className="bg-white w-full cursor-pointer  text-black active:border-gray-400/10"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                " Generate"
              )}
            </Button>
          </div>
        </form>
      </div>
      <div>
        {openOutputSection && (
          <ModelWindow>
            <DetailPromptOutput />
          </ModelWindow>
        )}
      </div>
    </>
  );
};

export default TextAreaPrompt;
