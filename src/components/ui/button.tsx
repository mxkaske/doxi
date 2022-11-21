import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => (
  <button
    className={twMerge(
      `rounded-md border border-transparent bg-black py-1 px-2 text-sm text-white hover:shadow-md`,
      className
    )}
    {...props}
  />
);
