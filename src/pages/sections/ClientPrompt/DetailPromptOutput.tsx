import { UserAuth } from "@/context/AuthContext";

import { RxCross1 } from "react-icons/rx";
import Lottie from "lottie-react";

import download from "../../../../data/Animation/Downloading.json";
import { Button } from "@/components/ui/button";
// import { useToggleOutput } from "@/context/ToggleOutputContext";
import joy from "../../../../data/Animation/3D Success.json";
import anger from "../../../../data/Animation/Angry.json";
import sadness from "../../../../data/Animation/Crying.json";
import neutral from "../../../../data/Animation/Neutral face.json";
import fear from "../../../../data/Animation/Screaming Fear Face.json";
import surprise from "../../../../data/Animation/wow.json";
// import playMusic from "../../../../data/Animation/playMusic.json";
import listenNow from "../../../../data/Animation/listen_now.json";

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useModelStore } from "@/store/useModelStore";

const DetailPromptOutput = () => {
  // const { setOpenOutputSection, openOutputSection, selectedPromtId } =
  //   useToggleOutput();
  const userid = Cookies.get("userId");
  const [emotion, setEmotion] = useState<string>("");
  const [lottie, setLottie] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { selectedPromptId, setOpenOutput } = useModelStore();

  const animationMap: Record<string, object> = {
    sadness,
    joy,
    anger,
    fear,
    neutral,
    surprise,
  };
  const animationData = animationMap[lottie];
  const { user } = UserAuth();
  function handleDownload() {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `music_${selectedPromptId}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/outputPrompts/${userid}/${selectedPromptId}`,
        { method: "GET", headers: { "Content-type": "application/json" } },
      );
      const data = await response.json();
      console.log("From detail output Promt section", data);
      setEmotion(data?.data[0]?.emotion);
      setLottie(data?.data[0]?.lottieEmoji);
      setAudioUrl(`http://127.0.0.1:5000${data?.data[0]?.downloads?.audio}`);
      console.log("audio url file", audioUrl);
      console.log("this is emotion", emotion);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-black/10 w-[40rem] relative px-9 py-4 rounded-xl text-white">
      <img
        src="/photos/gradient.png"
        className="absolute top-0 right-0 opacity-60 -z-1"
        alt=""
      />
      <div className="h-0 w-[40rem] rounded-full absolute top-[40%] right-[-5%] shadow-[10px_20px_900px_10px_#c44104] backdrop-blur-md rotate-[10deg] "></div>
      <div className="py-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold text-white/80 uppercase">
              Detail Output
            </h1>
          </div>
          <div className="rounded-full flex justify-center  items-center overflow-hidden w-15 h-15 hover:bg-gray-200/30 ">
            <RxCross1
              color="white"
              onClick={() => setOpenOutput()}
              className="cursor-pointer rounded-full "
            />
          </div>
        </div>
        <div className="flex items-center gap-3 py-2">
          <div className="rounded-full overflow-hidden w-10 h-10">
            <img
              alt="img"
              width={20}
              height={20}
              className="object-cover rounded-full w-full h-full"
              src={user?.photoURL || "/photos/avatar.jpg"}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-neutral-400 font-semibold">
            {user?.displayName ? user?.displayName : user?.email}
          </span>
        </div>
      </div>
      <div className="text-neutral-300">
        <div className="text-xl flex items-center gap-6 justify-between">
          <span> Emotion: {emotion}</span>
          <div className="rounded-full h-[5rem] w-[5rem] overflow-hidden">
            <Lottie
              className="h-full w-full object-center"
              height={20}
              width={20}
              animationData={animationData}
              loop={true}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <audio ref={audioRef} src={audioUrl} />
        <div className="flex  w-full gap-10 justify-center mt-4">
          {audioUrl && (
            <div className="flex flex-col items-center">
              <div className="rounded-full h-[5rem] w-[5rem] overflow-hidden">
                <Lottie
                  color="white"
                  className="h-20 w-20 object-center"
                  animationData={listenNow}
                  loop={true}
                />
              </div>
              <Button
                className="bg-green-500 text-black max-w-[10rem]"
                onClick={handlePlayPause}
                disabled={!audioUrl}
              >
                {isPlaying ? "Pause Music" : "Play Music"}
              </Button>{" "}
            </div>
          )}

          <div className="flex flex-col items-center">
            <div className="rounded-full h-[5rem] w-[5rem] overflow-hidden">
              <Lottie
                color="white"
                className="h-full w-full object-center"
                animationData={download}
                loop={true}
              />
            </div>
            <Button
              className="bg-white/50 text-black max-w-[10rem]"
              onClick={handleDownload}
            >
              Download Music
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPromptOutput;
