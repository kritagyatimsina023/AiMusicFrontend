import { create } from "zustand";
interface ModelStoreprops {
  openOutputSection: boolean;
  setOpenOutput: () => void;
  selectedPromptId: string | null;
  setSelectedPromptId: (id: string | null) => void;
}
export const useModelStore = create<ModelStoreprops>((set) => ({
  openOutputSection: false,
  setOpenOutput: () =>
    set((state) => ({
      openOutputSection: !state.openOutputSection,
    })),
  selectedPromptId: null,
  setSelectedPromptId: (id) => set({ selectedPromptId: id }),
}));
