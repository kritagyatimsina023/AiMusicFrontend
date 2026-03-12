import axios from "axios";
const FLASK_BASE_URL = "http://127.0.0.1:5000";
interface dataType {
  lyrics: string;
  genre: string;
  instruments: string[];
  key: string;
  tempo: string;
}

export const generateMusic = async (data: dataType) => {
  const response = await axios.post(`${FLASK_BASE_URL}/generate-music`, data);
  return response;
};
