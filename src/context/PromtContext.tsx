"use client";
import React, { createContext, useContext, useState } from "react";

interface PromptContextType {
  loading: boolean;
  setloading: (loading: boolean) => void;
}

const PromptContext = createContext<PromptContextType | null>(null);

export const PromptProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setloading] = useState(false);

  return (
    <PromptContext.Provider value={{ loading, setloading }}>
      {children}
    </PromptContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const usePromptContext = () => {
  const context = useContext(PromptContext);
  if (!context)
    throw new Error("usePromptContext must be used within PromptProvider");
  return context;
};
