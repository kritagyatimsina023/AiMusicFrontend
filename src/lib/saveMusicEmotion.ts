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
}

// function filterAnimation(data: string) {
//   const filterEmotion = animations.find((item) => item?.title === data);
//   return filterEmotion?.link;
// }
export const saveMusicEmotion = async (
  data: MusicGenerationData,
  promptId: string
) => {
  // const animationLink = filterAnimation(data?.emotion);
  try {
    const response = await api.post("/outputPrompts", {
      emotion: data.emotion,
      userId: Cookies.get("userId"),
      promptId: promptId,
      emoji: data?.emotion,
      session_id: data?.session_id,
      downloads: { audio: data?.downloads?.audio, midi: data?.downloads?.midi },
      playback: { audio: data?.playback?.audio, midi: data?.playback?.midi },
    });
    if (!response) throw Error("No response");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
