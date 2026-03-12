import React, { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

interface OutputProviderType {
  openOutputSection: boolean;
  setOpenOutputSection: (loadingReview: boolean) => void;
  selectedPromtId: string;
  setSelectedPromptId: (value: string) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const ToggleOutputContext = createContext<
  OutputProviderType | undefined
>(undefined);

interface ReviewProviderProps {
  children: ReactNode;
}

export const ToggleOutputProvider = ({ children }: ReviewProviderProps) => {
  const [openOutputSection, setOpenOutputSection] = useState<boolean>(false);
  const [selectedPromtId, setSelectedPromptId] = useState<string>("");

  return (
    <ToggleOutputContext.Provider
      value={{
        openOutputSection,
        setOpenOutputSection,
        selectedPromtId,
        setSelectedPromptId,
      }}
    >
      {children}
    </ToggleOutputContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToggleOutput = () => {
  const context = useContext(ToggleOutputContext);
  if (!context) throw Error("No context found");
  return context;
};
