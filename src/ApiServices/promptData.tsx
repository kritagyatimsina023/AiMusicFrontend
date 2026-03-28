import { saveMusicEmotion } from "@/lib/saveMusicEmotion";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { generateMusic } from "../../utils/apiPy";
function formattedErrorMessage(msg: string) {
  const cleaned = msg.replace(/^Prompt validation failed:\s*/, "");
  const parts = cleaned.split(",");
  const messages = parts.map((p) => p.split(":"));
  const result = messages[0]
    .map((str) => str.split(","))
    .flat()
    .map((s) => s.trim())
    .filter((s) => s.includes("must be selected"));
  console.log("result", result);
  return result.join(",");
}

export const storeCallApiPrompt = async (
  trimmedName: string,
  promptTxt: string,
  version: string,
  caption: string,
  // genre: string,
  // instruments: string[],
  // key: string,
  // tempo: string,
) => {
  try {
    const response = await api.post("/prompts", {
      name: trimmedName,
      userid: Cookies.get("userId"),
      lyrics: promptTxt,
      version,
      caption,
    });
    const promptResponse = await response.data;
    const promptId = promptResponse.data.prompt._id;
    console.log("THis is promptId", promptId);
    // return promptResponse.data;
    const musicData = await generateMusic(
      {
        lyrics: promptTxt,
        caption: caption,
        cleanup: true,
      },
      version,
    );
    console.log("From form music data", musicData?.data);
    const data = await saveMusicEmotion(musicData?.data, promptId);
    return { promptResponse: promptResponse, musicData: musicData, data: data };
  } catch (error: any) {
    console.log(error);
    const rawMessage = error?.response?.data?.message;
    // console.log(rawMessage);
    if (rawMessage) {
      const message = formattedErrorMessage(rawMessage);
      toast.error(message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
