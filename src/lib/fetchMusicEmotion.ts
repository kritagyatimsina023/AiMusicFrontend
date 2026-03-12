import Cookies from "js-cookie";
import api from "utils/api";
export const fetchMusicEmotion = async (promptId: string) => {
  try {
    const userId = await Cookies.get("userId");
    if (!userId) throw new Error("User ID not found in cookies");
    const response = await api.get(`/${userId}/${promptId}`);
    return response.data;
  } catch (error) {
    console.log("From fetchMusicEmotion function", error);
  }
};
