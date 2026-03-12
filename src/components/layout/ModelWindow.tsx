import React from "react";

interface childrenPropsType {
  children: React.ReactNode;
}

const ModelWindow = ({ children }: childrenPropsType) => {
  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      <div className="relative z-60 -top-11 bg-black/40 rounded-xl shadow-lg transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        {children}
      </div>
    </div>
  );
};

export default ModelWindow;
