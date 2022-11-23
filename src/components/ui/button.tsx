import React from "react";
import { twMerge } from "tailwind-merge";

const styles = {
  base: "rounded-md border border-transparent py-1 px-2 text-sm",
  variant: {
    primary: "bg-black text-white hover:shadow-md", // DISCUSS shadow color with hover:shadow-brand-100
    secondary: "bg-white text-black border-gray-100 hover:bg-gray-50",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles["variant"];
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => (
  <button
    className={twMerge(styles.base, styles.variant[variant], className)}
    {...props}
  />
);
