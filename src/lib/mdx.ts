import Link from "@/components/mdx-overwrite/link";
import Pre from "@/components/mdx-overwrite/pre";
import Image from "@/components/mdx-overwrite/image";
import IncrButton from "@/components/mdx-custom/incr-button";
import ChangeBrandColor from "@/components/mdx-custom/change-brand-color";
import HomeTiles from "@/components/mdx-custom/home-tiles";

export const components = {
  a: Link,
  pre: Pre,
  // img: Image, // FIXME: hydration error because of "p > **div** > img"
  Image,
  IncrButton,
  ChangeBrandColor,
  HomeTiles
};