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
    (course: Course) => course.isFeatured,
  );

  return (
    <div id="featured-instruments" className="py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');
      `}</style>

      <div>
        <div className="text-center flex flex-col gap-8">
          <h1
            className="text-[#03a1fc] uppercase leading-2 font-bold text-2xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Featured Instruments
          </h1>
          <h1
            className="text-5xl font-bold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Turn Ideas Into Music
          </h1>
          <TypeWriter />
        </div>
      </div>
      <div className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-center md:px-10 px-32">
          {featuredCourses.map((course: Course, idx: number) => (
            <CometCardCompo course={course} key={idx} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FeaturedSection;
