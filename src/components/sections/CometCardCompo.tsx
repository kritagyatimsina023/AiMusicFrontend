import React from "react";
import { CometCard } from "@/components/ui/comet-card";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
  image: string;
}
interface CometCardCompoProps {
  course: Course;
}

const CometCardCompo: React.FC<CometCardCompoProps> = ({ course }) => {
  if (!course) {
    return <div>No course data</div>;
  }
  return (
    <div className="h-[full] max-w-[25rem]">
      <CometCard rotateDepth={20.7} className="px-10">
        <div className="flex flex-col overflow-hidden items-center justify-start">
          <div className="rounded-xl h-[10rem] w-[20rem] py-4 px-4 overflow-hidden">
            <img
              className="h-full w-full rounded-xl object-cover"
              width={150}
              height={150}
              alt="Challange"
              src={course?.image}
            />
          </div>
          <div className="text-start px-4 py-6">
            <h1 className="text-[0.989em] font-bold ">{course?.title}</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {course?.description}
            </p>
          </div>
        </div>
      </CometCard>
    </div>
  );
};

export default CometCardCompo;
