import React from "react";
import { cn } from "@/lib/utils";
interface ContainerType {
  children: React.ReactNode;
  classname?: string;
}

const Container = ({ children, classname }: ContainerType) => {
  return (
    <div className={cn("max-w-xl mx-auto px-10", classname)}>{children}</div>
  );
};

export default Container;
