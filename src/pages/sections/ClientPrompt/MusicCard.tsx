import { useRef, useState } from "react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import listenNow from "../../../../data/Animation/listen_now.json";
import download from "../../../../data/Animation/Downloading.json";

interface MusicCardProps {
  title: string;
  audioUrl: string;
  downloadUrl: string;
  score?: number;
}

// const FLASK_BASE_URL = "http://localhost:5000";

const MusicCard = ({ title, audioUrl, downloadUrl, score }: MusicCardProps) => {
  console.log("This is audioURL", audioUrl, downloadUrl);
  console.log("This is audioUrl from props", audioUrl);
  console.log("This is download URL", downloadUrl);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fullAudioUrl = `${audioUrl}`;
  const fullDownloadUrl = `${downloadUrl}`;
  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fullDownloadUrl;
    link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex flex-col items-center gap-3 min-w-[220px]">
      <h3 className="text-white/80 font-semibold text-sm">{title}</h3>

      {score !== undefined && (
        <p className="text-sm text-white/70 mt-2">
          Score: <span className="text-green-400 font-semibold">{score}</span>
        </p>
      )}
      <audio
        ref={audioRef}
        src={fullAudioUrl}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="rounded-full h-[5rem] w-[5rem] overflow-hidden">
        <Lottie
          className="h-full w-full object-center"
          animationData={listenNow}
          loop={true}
        />
      </div>

      <Button
        className="bg-green-500 text-black w-full"
        onClick={handlePlayPause}
        disabled={!audioUrl}
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </Button>

      <div className="rounded-full h-[4rem] w-[4rem] overflow-hidden">
        <Lottie
          className="h-full w-full object-center"
          animationData={download}
          loop={true}
        />
      </div>

      <Button
        className="bg-white/70 text-black w-full"
        onClick={handleDownload}
      >
        Download Music
      </Button>
    </div>
  );
};

export default MusicCard;
