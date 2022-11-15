import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const link = cva(["underline"], {
  variants: {
    intent: {
      primary: [
        "text-gray-700",
        "decoration-gray-300",
        "hover:decoration-green-500",
        "hover:bg-green-50",
      ],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface LinkProps extends NextLinkProps, VariantProps<typeof link> {
  className?: string;
  children?: React.ReactNode;
}

const Link = ({ className, intent, ...props }: LinkProps) => {
  return <NextLink className={link({ intent, className })} {...props} />;
};

export default Link;
