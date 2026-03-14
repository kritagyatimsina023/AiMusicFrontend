import { storeCallApiPrompt } from "@/ApiServices/promptData";
import { fetchUserPrompts } from "@/lib/fetchPrompts";
import { create } from "zustand";

interface promptType {
  ceatedAt: Date;
  name: string;
  lyrics: string;
  user: string;
  version: string;
  // genre: string;
  // key: string;
  // tempo: string;
  // instruments: string[];
  __v: number;
  _id: string;
}

interface useFetchProps {
  isLoading: boolean;
  userPrompts: promptType[];
  getUserPrompt: () => Promise<void>;
  createPrompt: (
    promptTxt: string,
    version: string,
    // genre: string,
    // instruments: string[],
    // key: string,
    // tempo: string,
  ) => Promise<boolean | null>;
}

export const useFetchPrompt = create<useFetchProps>((set, get) => ({
  isLoading: false,
  userPrompts: [],

  getUserPrompt: async () => {
    try {
      // set({ isLoading: true });
      const prompts = await fetchUserPrompts();
      set({ userPrompts: prompts });
    } catch (error) {
      console.error("Error while fetching the user prompts", error);
    } finally {
      // set({ isLoading: false });
    }
  },
  createPrompt: async (promptTxt, version) => {
    try {
      const { getUserPrompt } = get();
      set({ isLoading: true });
      const trimmedName = promptTxt.trim().split(" ").slice(0, 5).join(" ");
      const response = await storeCallApiPrompt(
        trimmedName,
        promptTxt,
        version,
        // genre,
        // instruments,
        // key,
        // tempo,
      );
      if (!response) return false;
      await getUserPrompt();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return true;
    } catch (error) {
      console.error("Error while creating prompt", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
