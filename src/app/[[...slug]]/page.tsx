import Content from "@/components/layout/content";
import { allPages } from "contentlayer/generated";
import { getPagesBySlug } from "./utils";

export async function generateStaticParams() {
  return allPages.map((c) => {
    const slug = c.url.split("/").slice(1);
    return { slug };
  });
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const doc = getPagesBySlug(params.slug);
  return <Content page={doc} />;
}