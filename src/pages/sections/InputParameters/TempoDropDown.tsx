import { useParameter } from "@/context/InputParaContext";
import React from "react";

interface DataType {
  data: {
    title: string;
    inner: string[];
  };
}

const TempoDropDown: React.FC<DataType> = ({ data }) => {
  const { setTempo } = useParameter();
  return (
    <>
      <div className="flex flex-col">
        {data.inner.map((data, idx) => {
          const uuid = `tempo-value-${idx}`;
          return (
            <div
              key={idx}
              className="flex para cursor-pointer justify-center items-center gap-3 border-b border-white/25"
            >
              <label htmlFor={uuid}>{data}</label>
              <input
                onChange={() => setTempo(data)}
                type="radio"
                name="tempo-values"
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

export default TempoDropDown;
