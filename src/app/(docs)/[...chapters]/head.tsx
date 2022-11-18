import { allChapters } from "contentlayer/generated";
import { notFound } from "next/navigation";

// TODO: add more infos like reading time to OG - maybe also an excerpt/description?

export default function Head({ params }: { params: { chapters: string[] } }) {
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.chapters.join("/")}`
  );
  if (!chapter) {
    notFound();
  }
  return (
    <>
      <title>Doxi</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta
        name="description"
        content="An open source application built using the new router, server components and everything new in Next.js 13."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://doxi.vercel.app" />
      <meta
        property="og:image"
        content={`https://doxi.vercel.app/api/og?title=${chapter.title}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://doxi.vercel.app" />
      <meta
        property="twitter:image"
        content={`https://doxi.vercel.app/api/og?title=${chapter.title}`}
      />
    </>
  );
}
