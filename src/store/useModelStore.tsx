import { create } from "zustand";
interface ModelStoreprops {
  openOutputSection: boolean;
  setOpenOutput: () => void;
  selectedPromptId: string | null;
  setSelectedPromptId: (id: string | null) => void;
  versionSelection: string;
  setVersion: (value: string) => void;
}
export const useModelStore = create<ModelStoreprops>((set) => ({
  openOutputSection: false,
  versionSelection: "version_1",
  setOpenOutput: () =>
    set((state) => ({
      openOutputSection: !state.openOutputSection,
    })),
  selectedPromptId: null,
  setVersion: (value) => set({ versionSelection: value }),
  setSelectedPromptId: (id) => set({ selectedPromptId: id }),
}));
