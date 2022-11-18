import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const select = cva(["rounded-md border"], {
  variants: {
    intent: {
      primary: ["border-gray-300", "text-gray-800"],
    },
    _size: {
      small: ["text-sm", "py-1", "pl-2 pr-7"],
      medium: ["text-base", "py-2", "pl-4 pr-9"],
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

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof select> {}

export const Select: React.FC<SelectProps> = ({
  className,
  intent,
  _size,
  fullWidth,
  ...props
}) => (
  <select
    className={select({ intent, _size, fullWidth, className })}
    {...props}
  />
);
