import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, type = "text", className, ...props }: Props) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      className={twMerge(
        `border-gray-300 px-2 py-1 text-sm text-gray-800`,
        className
      )}
      {...props}
    />
  );
};

export default Input;
