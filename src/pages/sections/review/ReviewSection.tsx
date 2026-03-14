import React, { useContext, useState } from "react";
import { StarIcon } from "lucide-react";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import ReviewModelSection from "./ReviewModelSection";
import { useReviewStore } from "@/store/useReviewStore";
// interface Review {
//   _id: string;
//   review: string;
//   rating: number;
//   createdAt: string;
// }

const ReviewSection = () => {
  //   const [reviews, setreviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  //   const [reviewText, setReviewText] = useState<string>("");
  const context = useContext(SignInAndSignUpContext);
  if (!context) {
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  }
  const { openReview, setOpenReview } = useReviewStore();
  const { reviewOpen, setreviewOpen } = context;

  const handleToogle = () => {
    setreviewOpen(!reviewOpen);
  };
  const handlerStarButton = (starValue: number) => {
    setRating(starValue);
    setreviewOpen(!reviewOpen);
  };

  return (
    <div>
      <div className="text-neutral-600 dark:text-neutral-400 flex flex-col py-3">
        <h1 className="text-xl">Rate this App</h1>
        <span className="leading-3 text-[0.789em]">
          Tell others what you think
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex space-x-2">
          {[...Array(5)].map((_, idx) => {
            const starValue = idx + 1;
            return (
              <button
                key={idx}
                type="button"
                value={rating}
                onClick={() => handlerStarButton(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <StarIcon
                  size={24}
                  fill={starValue <= (hover || rating) ? "green" : "none"}
                  color={starValue <= (hover || rating) ? "green" : "gray"}
                />
              </button>
            );
          })}
        </div>
        <button
          onClick={setOpenReview}
          className="bg-green-500/50 px-7 rounded-[8px] text-[0.989em] py-2"
        >
          Write a Review
        </button>
      </div>

      {openReview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleToogle}
          ></div>
          <div className="relative z-60 top-10 bg-white rounded-xl shadow-lg transform transition-all duration-300 scale-100 hover:scale-[1.01]">
            <ReviewModelSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
