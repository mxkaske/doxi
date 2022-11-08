import Link from "next/link";
import { IncrButton } from "@/components/incr-button";
import { default as NextImage, ImageProps } from "next/image";

// When using Next.js, I'm getting unintented Layout Shifts.
const Image = (props: ImageProps) => {
  return (
    <div className="relative h-64 w-full">
      <NextImage {...props} alt="" fill={true} />
    </div>
  );
};

export const components = {
  Link: Link,
  Image: Image,
  IncrButton: IncrButton,
};
