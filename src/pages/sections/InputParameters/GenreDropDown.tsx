import { useParameter } from "@/context/InputParaContext";
import React from "react";

interface DataType {
  data: {
    title: string;
    inner: string[];
  };
}

const GenreDropDown: React.FC<DataType> = ({ data }) => {
  const { setGenre } = useParameter();
  return (
    <>
      <div className="flex flex-col">
        {data.inner.map((data, idx) => {
          const uuid = `genre-value-${idx}`;
          return (
            <div
              key={idx}
              className="flex para cursor-pointer justify-center items-center gap-3 border-b border-white/25"
            >
              <label htmlFor={uuid}>{data}</label>
              <input
                onChange={() => setGenre(data)}
                type="radio"
                name="genre-values"
                id={uuid}
                value={data}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GenreDropDown;
