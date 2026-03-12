import { useParameter } from "@/context/InputParaContext";
import React from "react";

interface DataType {
  data: {
    title: string;
    inner: string[];
  };
}

const InstrumentsDropDown: React.FC<DataType> = ({ data }) => {
  const { instruments, setInstruments } = useParameter();

  const handleToggle = (value: string) => {
    if (instruments.includes(value)) {
      setInstruments(instruments.filter((item) => item !== value));
    } else {
      setInstruments([...instruments, value]);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {data.inner.map((data, idx) => {
          const uuid = `instruments-value-${idx}`;
          return (
            <div
              key={idx}
              className="flex para cursor-pointer justify-center items-center gap-3 border-b border-white/25"
            >
              <label htmlFor={uuid}>{data}</label>
              <input
                onChange={() => handleToggle(data)}
                type="checkbox"
                name="instruments-values"
                value={data}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InstrumentsDropDown;
