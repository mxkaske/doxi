import { allPages } from "contentlayer/generated";
import Content from "@/components/layout/content";
import { getPagefromSlug } from "./utils";

export async function generateStaticParams() {
  return allPages.map((c) => ({
    slug: c.url.split("/").slice(1),
  }));
}

export default function StaticPage({ params }: { params: { slug: string[] } }) {
  const page = getPagefromSlug(params.slug);
  return <Content content={page} />;
}
