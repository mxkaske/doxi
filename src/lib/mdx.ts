import Link from "@/components/docs/link";
import { IncrButton } from "@/components/incr-button";
import CacheCityWeather from "@/components/cache-city-weather";
import Pre from "@/components/docs/pre";
import Image from "@/components/docs/image";

export const components = {
  a: Link,
  // img: Image, // FIXME: hydration error
  pre: Pre,
  IncrButton: IncrButton,
  CacheCityWeather: CacheCityWeather,
};
