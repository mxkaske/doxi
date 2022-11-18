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
        "hover:text-green-900",
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

const Link = ({ className, intent, href, ...props }: LinkProps) => {
  const internalLink = href.toString().startsWith("/");
  const internalHash = href.toString().startsWith("#");
  const externalLinkProps =
    !internalLink && !internalHash
      ? { target: "_blank", rel: "noreferrer" }
      : undefined;

  const Anchor = internalHash ? "a" : NextLink;

  return (
    <Anchor
      className={link({ intent, className })}
      // @ts-ignore FIXME: Url only works in NextLink
      href={href}
      {...externalLinkProps}
      {...props}
    />
  );
};

export default Link;
