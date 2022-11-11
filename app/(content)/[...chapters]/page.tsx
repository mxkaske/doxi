import { allChapters } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Content from "./content";
import ViewCounter from "./view-counter";

export async function generateStaticParams() {
  return allChapters.map((c) => ({
    chapters: c._raw.flattenedPath.split("/"),
  }));
}

export default function ChapterSlugPage({
  params,
}: {
  params: { chapters: string[] };
}) {
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.chapters.join("/")}`
  );

  if (!chapter) {
    notFound();
  }

  return (
    <>
      {/* REMINDER: rsc_counter injects the Server Component into a Client Component! */}
      {/* https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components */}
      <Content
        chapter={chapter}
        rsc_counter={<ViewCounter slug={params.chapters.join("/")} />}
      />
    </>
  );
}

// REMINDER: it would be nice to somehow have it in [...chapter], while
// chapter: string[] includes all the subpages /a/b /a /b/c
