import Link from "@/components/docs/link";
import Pre from "@/components/docs/pre";
import Image from "@/components/docs/image";
import IncrButton from "@/components/mdx/incr-button";
import ChangeBrandColor from "@/components/mdx/change-brand-color";

export const components = {
  a: Link,
  // img: Image, // FIXME: hydration error because of "p > **div** > img"
  Image: Image,
  pre: Pre,
  IncrButton: IncrButton,
  ChangeBrandColor: ChangeBrandColor,
};
