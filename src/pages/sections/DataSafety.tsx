import DataSafetyInfo from "../../../data/Data-safety";

const DataSafety = () => {
  return (
    <div className="text-base relative max-w-[50rem] ml-[10rem] mt-10 text-neutral-600 dark:text-neutral-400">
      <img
        className="absolute top-0 right-0 opacity-60 -z-1"
        src="/photos/gradient.png"
        alt=""
      />
      <div className="h-0 w-[24rem] absolute top-[55%] left-[-5%] animate-spin-delay shadow-[0_0_900px_10px_#7afcff] rotate-[45deg]   "></div>
      <h1 className="font-bold text-2xl">Data Safety</h1>
      <div className="py-6">
        <p className="">
          Safety starts with understanding how developers collect and share your
          data. Data privacy and security practices may vary based on your use,
          region, and age. The developer provided this information and may
          update it over time.
        </p>
      </div>
      <div className="border  rounded-xl">
        {DataSafetyInfo.map((item, idx) => (
          <div className="flex items-center gap-3 py-3 px-3" key={idx}>
            <div className="pl-3">
              <item.logo
                size={18}
                className="text-neutral-600 dark:text-neutral-400"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="">{item.heading}</h3>
              <p className="text-[0.789em] leading-3">{item?.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSafety;
