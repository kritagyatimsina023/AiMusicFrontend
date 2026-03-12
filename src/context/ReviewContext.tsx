import React, { useState, createContext } from "react";
import type { ReactNode } from "react";

interface UserType {
  name: string;
  email: string;
  profileImg: string;
}

interface ReviewContextType {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: UserType;
}

interface ReviewProviderType {
  currentUserReview: ReviewContextType | null;
  setCurrUserReview: React.Dispatch<
    React.SetStateAction<ReviewContextType | null>
  >;
  loadingReview: boolean;
  setLoadingReview: (loadingReview: boolean) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const ReviewContext = createContext<ReviewProviderType | undefined>(
  undefined
);

interface ReviewProviderProps {
  children: ReactNode;
}

const ReviewProvider = ({ children }: ReviewProviderProps) => {
  const [currentUserReview, setCurrUserReview] =
    useState<ReviewContextType | null>(null);
  const [loadingReview, setLoadingReview] = useState<boolean>(true);

  return (
    <ReviewContext.Provider
      value={{
        currentUserReview,
        setCurrUserReview,
        loadingReview,
        setLoadingReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
