import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Content from "./content";
import ViewCounter from "./view-counter";

export async function generateStaticParams() {
  return allDocs.map((c) => ({
    slug: c.url.split("/"),
  }));
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const doc = allDocs.find((c) => c.url === `/${params.slug.join("/")}`);

  if (!doc) {
    notFound();
  }

  return (
    // {/* REMINDER: rsc_counter injects the Server Component into a Client Component! */}
    // {/* https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components */}
    <Content
      doc={doc}
      rsc_counter={<ViewCounter slug={params.slug.join("/")} />}
    />
  );
}
