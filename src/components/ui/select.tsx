import React from "react";
import { twMerge } from "tailwind-merge";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ className, ...props }) => (
  <select
    className={twMerge(
      "rounded-md border border-gray-300 py-1 pl-2 pr-7 text-sm text-gray-800",
      className
    )}
    {...props}
  />
);
