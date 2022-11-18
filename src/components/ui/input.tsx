import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const input = cva(["rounded-md border"], {
  variants: {
    intent: {
      primary: ["border-gray-300", "text-gray-800"],
    },
    // `<input />` already has a size attribute
    // REMINDER: same values as `<Button />` to allow sam height
    _size: {
      small: ["text-sm px-2 py-1"],
      medium: ["text-base", "py-2", "px-4"],
    },
    fullWidth: {
      true: ["w-full"],
      false: [],
    },
  },
  defaultVariants: {
    intent: "primary",
    _size: "small",
  },
});

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

const Input = ({
  name,
  className,
  _size,
  intent,
  fullWidth,
  type = "text",
  ...props
}: Props) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      className={input({ intent, _size, fullWidth, className })}
      {...props}
    />
  );
};

export default Input;
