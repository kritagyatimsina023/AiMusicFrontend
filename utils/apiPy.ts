import axios from "axios";
const FLASK_BASE_URL = "http://localhost:5000";
interface dataType {
  lyrics: string;
  caption: string;
  cleanup?: boolean;
  // genre: string;
  // instruments: string[];
  // key: string;
  // tempo: string;
}

export const generateMusic = async (data: dataType, version: string) => {
  const response = await axios.post(
    `${FLASK_BASE_URL}/api/${version}/generate-music`,
    data,
  );
  return response;
};
