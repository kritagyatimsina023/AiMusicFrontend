"use client";
import { create } from "zustand";

interface SignInStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  activate: boolean;
  setActivate: (activate: boolean) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  reviewOpen: boolean;
  setReviewOpen: (reviewOpen: boolean) => void;
  userUid: string;
  setUserUid: (userUid: string) => void;
}

export const useSignInStore = create<SignInStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  activate: false,
  setActivate: (activate) => set({ activate }),
  showPassword: false,
  setShowPassword: (showPassword) => set({ showPassword }),
  reviewOpen: false,
  setReviewOpen: (reviewOpen) => set({ reviewOpen }),
  userUid: "",
  setUserUid: (userUid) => set({ userUid }),
}));
