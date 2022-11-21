import Link from "@/components/docs/link";
import Pre from "@/components/docs/pre";
import Image from "@/components/docs/image";
import IncrButton from "@/components/mdx/incr-button";

export const components = {
  a: Link,
  // img: Image, // FIXME: hydration error because of "p > **div** > img"
  Image: Image,
  pre: Pre,
  IncrButton: IncrButton,
};
