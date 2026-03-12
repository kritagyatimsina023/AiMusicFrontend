"use client";
import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

// Define the context type
interface SignInAndSignUpContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  activate: boolean;
  setActivate: (activate: boolean) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  reviewOpen: boolean;
  setreviewOpen: (reviewOpen: boolean) => void;
  userUid: string;
  setUserUid: (userUid: string) => void;
}

// Create context with proper typing
// eslint-disable-next-line react-refresh/only-export-components
export const SignInAndSignUpContext = createContext<
  SignInAndSignUpContextType | undefined
>(undefined);

// Define props type for the provider component
interface SignInAndSignUpProviderProps {
  children: ReactNode;
}

// Provider component
const SignInAndSignUpProvider = ({
  children,
}: SignInAndSignUpProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [reviewOpen, setreviewOpen] = useState<boolean>(false);
  const [userUid, setUserUid] = useState<string>("");

  return (
    <SignInAndSignUpContext.Provider
      value={{
        open,
        setOpen,
        activate,
        setActivate,
        showPassword,
        setShowPassword,
        reviewOpen,
        setreviewOpen,
        userUid,
        setUserUid,
      }}
    >
      {children}
    </SignInAndSignUpContext.Provider>
  );
};

export default SignInAndSignUpProvider;
