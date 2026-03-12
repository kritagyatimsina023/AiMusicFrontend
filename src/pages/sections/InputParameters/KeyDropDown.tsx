import { useParameter } from "@/context/InputParaContext";
import React from "react";

interface DataType {
  data: {
    title: string;
    inner: string[];
  };
}

const KeyDropDown: React.FC<DataType> = ({ data }) => {
  const { setKey } = useParameter();
  return (
    <div className="flex flex-col">
      {data.inner.map((value, idx) => {
        const uniqueId = `key-value-${idx}`;
        return (
          <div
            key={idx}
            className="flex para cursor-pointer justify-center items-center gap-3 border-b border-white/25"
          >
            <label htmlFor={uniqueId}>{value}</label>
            <input
              onChange={() => setKey(value)}
              type="radio"
              name="key-values"
              id={uniqueId}
              value={value}
            />
          </div>
        );
      })}
    </div>
  );
};

export default KeyDropDown;
