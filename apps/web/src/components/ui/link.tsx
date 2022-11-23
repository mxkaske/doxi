import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface LinkProps extends NextLinkProps {
  className?: string;
  children?: React.ReactNode;
}

const Link = ({ className, href, ...props }: LinkProps) => {
  const internalLink = href.toString().startsWith("/");
  const internalHash = href.toString().startsWith("#");
  const externalLinkProps =
    !internalLink && !internalHash
      ? { target: "_blank", rel: "noreferrer" }
      : undefined;

  const Anchor = internalHash ? "a" : NextLink;

  return (
    <Anchor
      className={twMerge(
        "text-gray-700 underline decoration-gray-300 hover:bg-brand-50 hover:text-brand-900 hover:decoration-brand-500",
        className
      )}
      // @ts-ignore FIXME: Url only works in NextLink
      href={href}
      {...externalLinkProps}
      {...props}
    />
  );
};

export default Link;
