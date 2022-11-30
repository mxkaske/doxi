import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

export function getDocBySlug(slug: string[]) {
  const doc = allDocs.find((c) => {
    console.log(c.url);
    return c.url === `/docs/${slug.join("/")}`;
  });
  if (!doc) {
    notFound();
  }
  return doc;
}
