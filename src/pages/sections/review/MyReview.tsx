"use client";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import { toast } from "react-toastify";
import { UserAuth } from "@/context/AuthContext";
import { ReviewContext } from "@/context/ReviewContext";
import ReviewModelSectionEdit from "./ReviewModelSectionEdit";
import { useReviewStore } from "@/store/useReviewStore";

const starLabels = ["", "Terrible", "Poor", "Okay", "Good", "Excellent"];

interface UserType {
  name: string;
  email: string;
  profileImg: string;
}

interface ReviewType {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: UserType;
}

const MyReview = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const contextReview = useContext(ReviewContext);
  if (!contextReview) throw new Error("No review context found");
  const { setLoadingReview } = contextReview;

  const { user } = UserAuth();

  const context = useContext(SignInAndSignUpContext);
  if (!context)
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  const { reviewOpen, setreviewOpen } = context;

  const {
    fetchCurrentUserReview,
    currentUserReview,
    deleteReview,
    setOpenReview,
    openReview,
  } = useReviewStore();

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchCurrentUserReview();
  }, [fetchCurrentUserReview]);

  const handleDeleteReview = async () => {
    if (!currentUserReview?._id) {
      toast.error("No review to delete");
      return;
    }

    try {
      await deleteReview(currentUserReview._id);
      toast.success("Review deleted successfully");
      setMenuOpen(false);
      // Refresh the review list
      fetchCurrentUserReview();
    } catch (error) {
      toast.error("Failed to delete review");
      console.error("Delete error:", error);
    }
  };

  const handleReviewUpdated = (updatedReview: ReviewType) => {
    // This will trigger a re-fetch or you can update the store directly
    fetchCurrentUserReview();
  };

  // Don't render if no review
  if (!currentUserReview) return null;

  // Safely access nested properties with optional chaining
  const userName = currentUserReview.user?.name || user?.displayName || "User";
  const userRating = currentUserReview.rating || 0;
  const userReview = currentUserReview.review || "";
  const createdAt = currentUserReview.createdAt || "";

  return (
    <>
      <div
        className="max-w-[520px] mx-auto mt-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="bg-[#111214] border border-[#1e2028] rounded-[18px] overflow-visible relative">
          <div className="p-6">
            {/* Header */}
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#1DB954] font-medium mb-1">
              Your feedback
            </p>
            <h1 className="text-[17px] font-semibold text-white tracking-tight mb-5">
              My Review
            </h1>

            {/* User row + menu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={user?.photoURL || "/photos/avatar.jpg"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="w-[34px] h-[34px] rounded-full object-cover border-[1.5px] border-[#1a4a2a] flex-shrink-0"
                />
                <span className="text-[13px] font-medium text-[#e0e0e0]">
                  {userName}
                </span>
              </div>

              {/* Three-dot menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="w-7 h-7 rounded-lg bg-[#1a1c22] border border-[#252830]
                    flex items-center justify-center hover:bg-[#2a2d38] transition-colors"
                >
                  <MoreVertical size={13} className="text-[#555]" />
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 top-9 w-[140px] bg-[#1a1c22] border
                    border-[#252830] rounded-[10px] overflow-hidden z-30"
                  >
                    <button
                      onClick={() => {
                        setOpenReview();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2.5 text-[12px]
                        text-[#1DB954] hover:bg-[#0a2016] transition-colors"
                    >
                      <Pencil size={11} />
                      Edit review
                    </button>
                    <button
                      onClick={handleDeleteReview}
                      className="w-full flex items-center gap-2 px-3.5 py-2.5 text-[12px]
                        text-[#e24b4a] hover:bg-[#2a0a0a] transition-colors"
                    >
                      <Trash2 size={11} />
                      Delete review
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#1a1c22] my-4" />

            {/* Stars + rating + date */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <svg key={idx} width="14" height="14" viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill={idx < userRating ? "#1DB954" : "none"}
                      stroke={idx < userRating ? "#1DB954" : "#333"}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                ))}
              </div>

              {/* Rating pill */}
              <div
                className="inline-flex items-center gap-1 px-2 py-0.5
                bg-[#0a2016] border border-[#1a4a2a] rounded-full"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#1DB954]" />
                <span className="text-[11px] text-[#1DB954] font-medium">
                  {userRating}/5 · {starLabels[userRating]}
                </span>
              </div>

              {/* Date badge */}
              <div
                className="inline-flex items-center px-2 py-0.5
                bg-[#161719] border border-[#1e2028] rounded-full"
              >
                <span className="text-[11px] text-[#444]">
                  {formatDate(createdAt)}
                </span>
              </div>
            </div>

            {/* Review body */}
            <p className="text-[13px] text-[#aaa] leading-[1.7] mb-5">
              {userReview}
            </p>

            {/* Edit button */}
            <button
              onClick={() => setOpenReview()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[9px]
                bg-[#0a2016] border border-[#1a4a2a] text-[#1DB954] text-[12px]
                font-medium hover:bg-[#0f3020] transition-colors"
            >
              <Pencil size={11} />
              Edit your review
            </button>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {openReview && currentUserReview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenReview()}
          />
          <div className="relative z-50">
            <ReviewModelSectionEdit
              onReviewUpdated={handleReviewUpdated}
              existingReview={currentUserReview}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyReview;
