"use client";
import api from "../../../../utils/api";
import React, { useContext, useState } from "react";
import { Textarea } from "../../../components/ui/textarea";
import { UserAuth } from "@/context/AuthContext";
// import defaultPic from "@/public/photos/avatar.jpg";
import { StarIcon, X } from "lucide-react";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import { ReviewContext } from "@/context/ReviewContext";
// interface Review {
//   _id: string;
//   review: string;
//   rating: number;
//   createdAt: string;
// }
// interface Data {
//   message: string;
//   status: string;
// }
// interface Errors {
//   data: Data;
// }
// interface usersIdType {
//   usersId: string;
// }

const ReviewModelSection = () => {
  //   const [reviews, setreviews] = useState<Review[]>([]);
  const contextReview = useContext(ReviewContext);
  if (!contextReview) throw new Error("No review context found");
  const { setLoadingReview } = contextReview;
  const context = useContext(SignInAndSignUpContext);
  if (!context) {
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  }
  const { reviewOpen, setreviewOpen } = context;
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const { user } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/reviews", {
        review: reviewText,
        rating,
        userid: Cookies.get("userId"),
      });
      toast.success("Review was sent");
      setLoadingReview(true);
      setreviewOpen(!reviewOpen);
    } catch (error) {
      toast.error(`Cannot add another review`);
      console.log(error);
    }
  };

  return (
    <div className="bg-black/10 max-w-[40rem] px-9 py-4 rounded-xl text-black">
      <div className="py-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold">AI Music generator</h1>
            <span className="text-gray-700">Rate this App</span>
          </div>
          <div className="rounded-full flex justify-center  items-center overflow-hidden w-15 h-15 hover:bg-gray-200/30 ">
            <X
              onClick={() => setreviewOpen(!reviewOpen)}
              className="cursor-pointer rounded-full "
            />
          </div>
        </div>
        <div className="flex items-center gap-3 py-2">
          <div className="rounded-full overflow-hidden w-12 h-12">
            <img
              alt="img"
              width={40}
              height={40}
              className="object-cover rounded-full w-full h-full"
              src={user?.photoURL || "/photos/avatar.jpg"}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-black font-semibold">
            {user?.displayName ? user?.displayName : user?.email}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, idx) => {
            const starValue = idx + 1;
            return (
              <button
                key={idx}
                type="button"
                value={rating}
                onClick={() => setRating(starValue)}
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
          {/* <span className="ml-2 text-sm text-gray-700">Rating: {rating}</span> */}
        </div>
        <div className="py-8">
          <Textarea
            placeholder="Describe your experience (mandatory)"
            className="border"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            name="review"
            required
            id="r"
          />
        </div>
        <div>
          <p className="text-neutral-600 dark:text-neutral-500">
            Your Google Account name and email may be visible to others.
            Developers can see your account info and use it to respond to your
            feedback. Past edits to your review are also visible unless you
            delete the review.
          </p>
        </div>
        <div className="w-full h-[0.02rem] my-4 bg-gray-400" />
        <div className="mt-3 flex justify-end  ">
          <button
            type="submit"
            className="bg-gray-300  rounded-[10px] px-10 py-2 text-black/30"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModelSection;
