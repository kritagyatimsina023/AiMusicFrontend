// store/authStore.ts
"use client";
import { create } from "zustand";
import { auth } from "@/firebase/config";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from "firebase/auth";
import Cookies from "js-cookie";
import api from "../../utils/api";
import { toast } from "react-toastify";

interface AuthStore {
  user: User | null;
  userId: string | null; // from API/db
  loading: boolean;
  setUser: (user: User | null) => void;
  setUserId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  emailSignUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userId: null,
  loading: true,

  setUser: (user) => set({ user }),
  setUserId: (userId) => set({ userId }),
  setLoading: (loading) => set({ loading }),

  googleSignIn: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      if (!firebaseUser) return;

      // API call to create/store user in backend
      const res = await api.post("/users/create-user", {
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0],
        email: firebaseUser.email,
        photoUrl: firebaseUser.photoURL,
      });

      const userId = res.data.user._id;
      Cookies.set("userId", userId, { expires: 7 });

      set({ user: firebaseUser, userId });
      toast.success(
        `Welcome ${firebaseUser.displayName || firebaseUser.email}`,
      );
    } catch (error) {
      toast.error("Error on pop up signin");
      console.error("Error while sign in", error);
      //   if (
      //     error.code === "auth/cancelled-popup-request" ||
      //     error.code === "auth/popup-closed-by-user"
      //   ) {
      //     console.log("User closed popup, no action needed");
      //   } else {
      //     toast.error("Google Sign-in failed");
      //     console.error(error);
      //   }
    }
  },

  emailSignIn: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      if (!firebaseUser) throw new Error("Invalid login");

      // API call
      const res = await api.post("/users/create-user", {
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0],
        email: firebaseUser.email,
        photoUrl: firebaseUser.photoURL,
      });

      const userId = res.data.user._id;
      Cookies.set("userId", userId, { expires: 7 });

      set({ user: firebaseUser, userId });
      toast.success(`Logged in as ${firebaseUser.email}`);
    } catch (error) {
      toast.error("Email login failed");
      console.error(error);
    }
  },

  emailSignUp: async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = result.user;
      if (!firebaseUser) throw new Error("Signup failed");

      // API call
      const res = await api.post("/users/create-user", {
        name: firebaseUser.email?.split("@")[0],
        email: firebaseUser.email,
        photoUrl: "/photos/avatar.jpg",
      });

      const userId = res.data.user._id;
      Cookies.set("userId", userId, { expires: 7 });

      set({ user: firebaseUser, userId });
      toast.success("Registered successfully");
    } catch (error) {
      toast.error("Signup failed");
      console.error(error);
    }
  },

  logOut: async () => {
    await signOut(auth);
    Cookies.remove("authToken");
    Cookies.remove("userId");
    set({ user: null, userId: null });
    toast.success("Logged out successfully");
  },
}));

// Listen to Firebase auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  const store = useAuthStore.getState();
  if (currentUser) {
    store.setUser(currentUser);
    const token = await currentUser.getIdToken();
    Cookies.set("authToken", token, {
      secure: true,
      sameSite: "strict",
      expires: 7,
    });
  } else {
    store.setUser(null);
    store.setUserId(null);
    Cookies.remove("authToken");
    Cookies.remove("userId");
  }
  store.setLoading(false);
});
