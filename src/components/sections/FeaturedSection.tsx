import Data_music from "../../../data/music-courses.json";
import CometCardCompo from "./CometCardCompo";
import TypeWriter from "./TypeWriter";
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

const FeaturedSection = () => {
  const featuredCourses = (Data_music.courses as Course[]).filter(
    (course: Course) => course.isFeatured
  );

  return (
    <div className="py-12">
      <div>
        <div className="text-center flex flex-col gap-8 ">
          <h1 className="text-[#03a1fc] uppercase leading-2 font-bold text-2xl">
            Featured Instruments
          </h1>
          <h1 className="text-5xl font-bold">Turn Ideas Into Music</h1>
          <TypeWriter />
        </div>
      </div>
      <div className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-center  md:px-10  px-32">
          {featuredCourses.map((course: Course, idx: number) => {
            return (
              <CometCardCompo course={course} key={idx} />
              // agghi ko
              // <div key={idx} className="flex justify-center items-center">
              //   <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
              //     <div className=" w-full h-[10rem] rounded-[15px]">
              //       <Image
              //         src={course.image}
              //         alt="jordans"
              //         height="150"
              //         width="150"
              //         className="object-cover w-full h-full rounded-[15px]"
              //       />
              //     </div>
              //     <div className=" mb-2 w-[20rem]">
              //       <p className="text-start sm:text-xl text-black mt-4  dark:text-neutral-200">
              //         {course.title}
              //       </p>
              //     </div>
              //     <div className="mb-2 w-[20rem]">
              //       <p className="text-sm text-neutral-600 dark:text-neutral-400">
              //         {course.description}
              //       </p>
              //     </div>
              //     <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              //       <span>Buy now </span>
              //       <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              //         {course.price}
              //       </span>
              //     </button>
              //   </BackgroundGradient>
              // </div>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FeaturedSection;
