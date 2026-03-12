"use client";
import { StarIcon } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
// import defaultPic from "@/public/photos/avatar.jpg";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import api from "../../../../utils/api";
import { toast } from "react-toastify";
import { UserAuth } from "@/context/AuthContext";
import { ReviewContext } from "@/context/ReviewContext";
import ReviewModelSectionEdit from "./ReviewModelSectionEdit";
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
  const [review, setReview] = useState<ReviewType | null>(null);
  const [openDelete, setopenDelete] = useState<boolean>(false);
  const contextReview = useContext(ReviewContext);
  if (!contextReview) throw new Error("No review context found");
  const {
    currentUserReview,
    setCurrUserReview,
    loadingReview,
    setLoadingReview,
  } = contextReview;
  const { user } = UserAuth();
  const context = useContext(SignInAndSignUpContext);
  if (!context) {
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  }
  const { reviewOpen, setreviewOpen } = context;
  const handleToogle = () => {
    setreviewOpen(!reviewOpen);
  };
  const formatDate = (date?: string) => {
    if (!date) return "";
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  useEffect(() => {
    if (!loadingReview) return;
    if (!user?.email) {
      setReview(null);
      return;
    }
    const Fetchreview = async () => {
      try {
        const res = await api.get("/reviews");
        const reviews: ReviewType[] = res.data.review;
        console.log(reviews);
        const userReview = reviews.find(
          (items) =>
            items.user.email.toLowerCase() === user?.email?.toLowerCase()
        );
        if (userReview) {
          setCurrUserReview(userReview);
          setReview(userReview);
        } else {
          setReview(null);
        }
      } catch (error) {
        console.log(error);
        setReview(null);
      } finally {
        setLoadingReview(false);
      }
    };
    Fetchreview();
  }, [user, loadingReview]);
  const handleDeleteReview = async () => {
    try {
      const res = await api.delete(`/reviews/${currentUserReview?._id}`);
      if (res.status === 200) {
        toast.success("Review Deleted");
        setLoadingReview(true);
      } else {
        toast.error("Cannot delete review");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting review");
    }
  };

  return (
    <>
      {review && (
        <div className=" mt-10 max-w-[50rem] ease-in-out 0.2s ml-[10rem] relative rounded-2xl border-1 border-gray-400/70">
          <img
            src="/photos/gradient.png"
            className="absolute top-0 right-0 opacity-60 -z-1"
            alt=""
          />
          <div className="h-0 w-[24rem]   absolute top-[25%] left-[-5%] opacity-50 animate-spin-delay shadow-[10px_0_800px_10px_#7afcff]   "></div>
          <div className="h-0 w-[24rem] absolute top-[25%] right-[-5%] opacity-50 animate-spin-delay shadow-[20px_0_800px_10px_#7afcff]   "></div>
          <div className="p-8 ">
            <h1 className="font-bold text-xl">My Reviews</h1>
            <div className="flex justify-between items-center pt-8">
              <div className="flex item-center gap-4">
                <div className="rounded-full w-8 h-8 overflow-hidden">
                  <img
                    alt="img"
                    width={40}
                    height={40}
                    className="object-cover rounded-full w-full h-full"
                    src={user?.photoURL || "/photos/avatar.jpg"}
                  />
                </div>
                <span className="">{review?.user.name}</span>
              </div>

              <div className="relative ">
                <BsThreeDotsVertical
                  onClick={() => setopenDelete(!openDelete)}
                  size={20}
                />
                <div
                  className={` ${
                    openDelete ? "" : "hidden"
                  } absolute w-[8rem] -left-20 top-7`}
                >
                  <button
                    onClick={handleDeleteReview}
                    className="p-2 bg-gray-400/20 rounded-[8px] "
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="flex gap-5">
                <div className="flex items-center">
                  {[...Array(5)].map((item, idx) => {
                    return (
                      <StarIcon
                        className={`${
                          review && idx < review.rating
                            ? "text-green-500 fill-green-500"
                            : "text-gray-300"
                        }`}
                        size={15}
                        key={idx}
                      />
                    );
                  })}
                </div>
                <p className="italic">{formatDate(review?.createdAt)}</p>
              </div>{" "}
              <div>
                <p className="">{review?.review}</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => setreviewOpen(!reviewOpen)}
                className="text-green-400 p-2 rounded-[7px] hover:bg-gray-400/20 cursor-pointer"
              >
                Edit your reviews
              </button>
            </div>
            {reviewOpen && (
              <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-md"
                  onClick={handleToogle}
                ></div>
                <div className="relative z-60 top-10 bg-white rounded-xl shadow-lg transform transition-all duration-300 scale-100 hover:scale-[1.01]">
                  <ReviewModelSectionEdit onReviewUpdated={setReview} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyReview;
