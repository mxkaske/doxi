import Content from "@/components/layout/content";
import { allDocs } from "contentlayer/generated";
import { getDocBySlug } from "./utils";

export async function generateStaticParams() {
  return allDocs.map((c) => {
    // REMINDER: removing leading "/" as a url is `/chapter/slug`
    const slug = c.url.split("/").slice(1);
    return { slug };
  });
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const doc = getDocBySlug(params.slug);
  return <Content content={doc} />;
}

// {/* REMINDER: rsc_counter injects the Server Component into a Client Component! */}
// {/* https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components */}
