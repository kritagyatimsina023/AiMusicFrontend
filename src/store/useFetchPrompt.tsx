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
interface VariantType {
  variant_index: number;
  downloads: {
    audio: string;
    midi: string;
  };
  playback: {
    audio: string;
    midi: string;
  };
}

interface OutputType {
  emotion: string;
  downloads: {
    audio: string;
    midi: string;
  };
  playback: {
    audio: string;
    midi: string;
  };
  session_id: string;
  status?: string;
  version_used?: string;
  variants?: VariantType[];
}

interface useFetchProps {
  isLoading: boolean;
  userPrompts: promptType[];
  getUserPrompt: () => Promise<void>;
  outputData: OutputType | null;
  getOutputByPrompt: (userId: string, promptId: string) => Promise<void>;
  createPrompt: (
    promptTxt: string,
    version: string,
    caption: string,
    // genre: string,
    // instruments: string[],
    // key: string,
    // tempo: string,
  ) => Promise<boolean | null>;
}

export const useFetchPrompt = create<useFetchProps>((set, get) => ({
  isLoading: false,
  userPrompts: [],
  outputData: null,

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
  // getOutputByPrompt: async (userId: string, promptId: string) => {
  //   try {
  //     set({ isLoading: true });
  //     const response = await fetch(
  //       `http://localhost:8000/api/v1/outputPrompts/${userId}/${promptId}`,
  //     );
  //     const result = await response.json();
  //     const data = result?.data;
  //     if (!data) throw new Error("No output found");
  //     set({
  //       outputData: {
  //         emotion: data.emotion,
  //         downloads: data.downloads,
  //         playback: data.playback,
  //         session_id: data.session_id,
  //         status: data.status,
  //         version_used: data.version_used,
  //         variants: data.variants || [],
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error fetching output", error);
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
  getOutputByPrompt: async (userId: string, promptId: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `http://localhost:8000/api/v1/outputPrompts/${userId}/${promptId}`,
      );
      const result = await response.json();
      const data = result?.data?.[0];
      console.log("This is data", data);
      if (!data) throw new Error("No output found");
      set({
        outputData: {
          emotion: data.emotion,
          downloads: data.downloads,
          playback: data.playback,
          session_id: data.session_id,
          status: data.status,
          version_used: data.version_used,
          variants: data.variants || [],
        },
      });
    } catch (error) {
      console.error("Error fetching output", error);
    } finally {
      set({ isLoading: false });
    }
  },

  createPrompt: async (promptTxt, version, caption) => {
    try {
      const { getUserPrompt } = get();
      set({ isLoading: true });
      const trimmedName = promptTxt.trim().split(" ").slice(0, 5).join(" ");
      const response = await storeCallApiPrompt(
        trimmedName,
        promptTxt,
        version,
        caption,
      );
      if (!response) return false;
      await getUserPrompt();
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return true;
    } catch (error) {
      console.error("Error while creating prompt", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
