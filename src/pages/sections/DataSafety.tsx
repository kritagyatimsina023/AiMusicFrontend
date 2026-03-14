import DataSafetyInfo from "../../../data/Data-safety";

const DataSafety = () => {
  return (
    <div
      className="max-w-[560px] mx-auto mt-10 px-1"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Label + title */}
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#1DB954] font-medium mb-2">
        Privacy
      </p>
      <h1 className="text-[22px] font-semibold text-white tracking-tight mb-3.5">
        Data Safety
      </h1>
      <p className="text-[13px] text-[#555] leading-[1.7] mb-7">
        Safety starts with understanding how developers collect and share your
        data. Data privacy and security practices may vary based on your use,
        region, and age. The developer provided this information and may update
        it over time.
      </p>

      {/* Card list */}
      <div className="bg-[#111214] border border-[#1e2028] rounded-2xl overflow-hidden">
        {DataSafetyInfo.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 px-[18px] py-3.5 border-b border-[#1a1c22]
              last:border-b-0 transition-colors hover:bg-[#161719]"
          >
            {/* Icon */}
            <div
              className="w-9 h-9 rounded-[10px] bg-[#0a2016] border border-[#1a4a2a]
                flex items-center justify-center flex-shrink-0"
            >
              <item.logo
                size={16}
                className="text-[#1DB954]"
                strokeWidth={1.8}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <h3 className="text-[13px] font-medium text-[#e0e0e0] tracking-tight">
                {item.heading}
              </h3>
              {item?.paragraph && (
                <p className="text-[11px] text-[#444] mt-0.5 leading-[1.5]">
                  {item.paragraph}
                </p>
              )}

              {/* Optional verified pill — add `verified: true` to your data items */}
              {item?.verified && (
                <div
                  className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5
                  bg-[#0a2016] border border-[#1a4a2a] rounded-full w-fit"
                >
                  <span className="w-1 h-1 rounded-full bg-[#1DB954]" />
                  <span className="text-[10px] text-[#1DB954] font-medium tracking-wide">
                    Verified
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSafety;
