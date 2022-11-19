import { allChapters } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Content from "./content";
import ViewCounter from "./view-counter";

export async function generateStaticParams() {
  return allChapters.map((c) => ({
    slug: c._raw.flattenedPath.split("/"),
  }));
}

export default function ChapterSlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.slug.join("/")}`
  );

  if (!chapter) {
    notFound();
  }

  return (
    // {/* REMINDER: rsc_counter injects the Server Component into a Client Component! */}
    // {/* https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components */}
    <Content
      chapter={chapter}
      rsc_counter={<ViewCounter slug={params.slug.join("/")} />}
    />
  );
}
