import Cookies from "js-cookie";
import api from "../../utils/api";
// interface AnimationType {
//   title: string;
//   link: object; // JSON FILE TYPE
// }

interface MusicGenerationData {
  confidence: number;

  downloads: {
    audio: string;
    midi: string;
  };

  emotion: string;

  playback: {
    audio: string;
    midi: string;
  };

  session_id: string;

  status: "completed" | "pending" | string; // optional union

  steps: string[];
  version_used: number;
}

// function filterAnimation(data: string) {
//   const filterEmotion = animations.find((item) => item?.title === data);
//   return filterEmotion?.link;
// }
const BASE = "http://127.0.0.1:5000";

export const saveMusicEmotion = async (
  data: MusicGenerationData,
  promptId: string,
) => {
  try {
    const response = await api.post("/outputPrompts", {
      emotion: data?.emotion,
      userId: Cookies.get("userId"),
      promptId: promptId,
      // emoji: data?.emotion,
      session_id: data?.session_id,
      downloads: {
        audio: BASE + data?.downloads?.audio,
        midi: BASE + data?.downloads?.midi,
      },
      playback: {
        audio: BASE + data?.playback?.audio,
        midi: data?.playback?.midi ? BASE + data?.playback?.midi : null,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
