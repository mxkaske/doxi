import { allPages } from "contentlayer/generated";
import { notFound } from "next/navigation";

export function getPagesBySlug(slug?: string[]) {
  const doc = allPages.find((c) => {
    if (slug) {
      return c.url === `/${slug.join("/")}`;
    } else {
      return c.url === "/"
    }
  });
  if (!doc) {
    notFound();
  }
  return doc;
}
