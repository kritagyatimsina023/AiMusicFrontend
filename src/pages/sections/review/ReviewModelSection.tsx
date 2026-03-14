"use client";
import api from "../../../../utils/api";
import React, { useContext, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import { ReviewContext } from "@/context/ReviewContext";
import { useReviewStore } from "@/store/useReviewStore";

const starLabels = ["", "Terrible", "Poor", "Okay", "Good", "Excellent"];

const ReviewModelSection = () => {
  const contextReview = useContext(ReviewContext);
  if (!contextReview) throw new Error("No review context found");
  const { setLoadingReview } = contextReview;

  const { setOpenReview, openReview, storeReview, currentUserReview } =
    useReviewStore();

  const context = useContext(SignInAndSignUpContext);
  if (!context)
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  // const { reviewOpen, setreviewOpen } = context;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { user } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewRes = storeReview(reviewText, rating);
    console.log("this is user review", reviewRes);
    // if (currentUserReview) {
    //   toast.error("Cannot add another review");
    // }
    // try {
    //   await api.post("/reviews", {
    //     review: reviewText,
    //     rating,
    //     userid: Cookies.get("userId"),
    //   });
    //   toast.success("Review was sent");
    //   setLoadingReview(true);
    //   setreviewOpen(!reviewOpen);
    // } catch {
    //   toast.error("Cannot add another review");
    // }
  };
  const canSubmit = reviewText.trim().length > 0 && rating > 0;

  return (
    <div
      className="bg-[#111214] border border-[#1e2028] rounded-[18px] w-full max-w-[420px] overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top */}
      <div className="px-6 pt-[22px]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#1DB954] font-medium mb-1">
              Review
            </p>
            <h1 className="text-[18px] font-semibold text-white tracking-tight leading-snug">
              AI Music Generator
            </h1>
            <p className="text-[12px] text-[#444] mt-0.5">
              Rate your experience
            </p>
          </div>
          <button
            onClick={setOpenReview}
            className="w-[30px] h-[30px] rounded-[8px] bg-[#1a1c22] border border-[#252830]
              flex items-center justify-center flex-shrink-0 hover:bg-[#2a2d38] transition-colors"
          >
            <X size={13} className="text-[#666]" strokeWidth={2} />
          </button>
        </div>
        {/* User row */}
        <div className="flex items-center gap-2.5 py-3.5 border-t border-[#1a1c22]">
          <img
            src={user?.photoURL || "/photos/avatar.jpg"}
            alt="avatar"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border-[1.5px] border-[#1a4a2a] flex-shrink-0"
          />
          <div>
            <p className="text-[13px] font-medium text-[#e0e0e0]">
              {user?.displayName ?? user?.email}
            </p>
            {user?.displayName && (
              <p className="text-[11px] text-[#444]">{user.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="px-6 pb-6">
        {/* Stars */}
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#444] font-medium mb-2.5">
          Your rating
        </p>
        <div className="flex gap-1.5 mb-5">
          {[...Array(5)].map((_, idx) => {
            const val = idx + 1;
            const filled = val <= (hover || rating);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setRating(val)}
                onMouseEnter={() => setHover(val)}
                onMouseLeave={() => setHover(0)}
                className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
              >
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={filled ? "#1DB954" : "none"}
                    stroke={filled ? "#1DB954" : "#333"}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Rating label */}
        {rating > 0 && (
          <div
            className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1
            bg-[#0a2016] border border-[#1a4a2a] rounded-full"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#1DB954]" />
            <span className="text-[11px] text-[#1DB954] font-medium">
              {starLabels[rating]} · {rating}/5
            </span>
          </div>
        )}

        {/* Textarea */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Describe your experience (mandatory)"
          required
          maxLength={600}
          className="
            w-full min-h-[110px] resize-none bg-[#161719] border border-[#1e2028]
            rounded-xl px-4 py-3 text-[13px] text-[#e0e0e0] leading-relaxed
            placeholder:text-[#2e2e2e] outline-none transition-all duration-200 mb-4
            hover:border-[#2a2d38]
            focus:border-[#1DB954] focus:shadow-[0_0_0_3px_rgba(29,185,84,0.08)]
          "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />

        <p className="text-[11px] text-[#333] leading-relaxed mb-4">
          Your Google Account name and email may be visible to others.
          Developers can see your account info and use it to respond to your
          feedback.
        </p>

        <div className="h-px bg-[#1a1c22] mb-4" />

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={!canSubmit}
            className="
              px-6 py-2.5 rounded-[10px] text-[13px] font-semibold tracking-wide
              transition-all duration-200 bg-[#1DB954] text-black
              hover:bg-[#1ed760] hover:-translate-y-px
              active:scale-[0.97]
              disabled:bg-[#1a3326] disabled:text-[#2d6644] disabled:cursor-not-allowed
              disabled:translate-y-0
            "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModelSection;
