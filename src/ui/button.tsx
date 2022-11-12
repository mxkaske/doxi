import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["rounded-md border"], {
  variants: {
    intent: {
      primary: [
        "bg-black",
        "text-white",
        "border-transparent",
        "hover:shadow-md",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
    fullWidth: {
      true: ["w-full"],
      false: [],
    },
  },
  compoundVariants: [
    { intent: "primary", size: "medium", className: "uppercase" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  fullWidth,
  ...props
}) => (
  <button
    className={button({ intent, size, fullWidth, className })}
    {...props}
  />
);
