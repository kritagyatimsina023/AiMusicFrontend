import api from "../../utils/api";
import { create } from "zustand";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Define UserType interface
interface UserType {
  name: string;
  email: string;
  profileImg: string;
}

// Update Review interface to match what's coming from the backend
interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: UserType; // Add this
  userId?: string; // Keep this optional for backward compatibility
}

interface ReviewProps {
  openReview: boolean;
  currentUserReview: Review | null;
  setOpenReview: () => void;
  fetchCurrentUserReview: () => Promise<void>;
  storeReview: (
    review: string,
    rating: number,
  ) => Promise<Review | null | undefined>;
  editReview: (
    reviewId: string,
    review: string,
    rating: number,
  ) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
}

export const useReviewStore = create<ReviewProps>((set) => ({
  openReview: false,
  currentUserReview: null,

  setOpenReview: () =>
    set((state) => ({
      openReview: !state.openReview,
    })),

  fetchCurrentUserReview: async () => {
    try {
      const userId = Cookies.get("userId");
      if (!userId) return;

      const response = await api.get(`/reviews/user/${userId}`);
      console.log("Response from fetchcurrent user review", response.data);
      set({ currentUserReview: response.data });
    } catch (error) {
      console.error("Error while fetching review", error);
      set({ currentUserReview: null });
    }
  },

  storeReview: async (review, rating) => {
    try {
      const userId = Cookies.get("userId");
      console.log("Store review user uid", userId);
      if (!userId) throw new Error("User ID not found");

      const response = await api.post("/reviews", {
        review,
        rating,
        userid: userId,
      });

      if (response.data) {
        set({ currentUserReview: response.data });
        set({ openReview: false });
        toast.success("Review added");
        return response.data;
      }
      return null;
    } catch (error) {
      toast.error("Cannot add another review");
      console.error("Error while creating review", error);
      return null;
    }
  },

  editReview: async (reviewId, review, rating) => {
    try {
      const userId = Cookies.get("userId");
      if (!userId) throw new Error("User ID not found");
      const response = await api.patch(`/reviews/${reviewId}`, {
        review,
        rating,
        userId: userId,
      });

      if (response.data) {
        set({ currentUserReview: response.data });
        toast.success("Review updated successfully");
      }
    } catch (error) {
      console.error("Error while editing review", error);
      toast.error("Error while editing review");
      throw error;
    }
  },

  deleteReview: async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      set({ currentUserReview: null });
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Error while deleting review", error);
      toast.error("Error while deleting review");
      throw error;
    }
  },
}));
