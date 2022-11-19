import { allChapters } from "contentlayer/generated";
import { notFound } from "next/navigation";

// TODO: add more infos like reading time to OG - maybe also an excerpt/description?

export default function Head({ params }: { params: { slug: string[] } }) {
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.slug.join("/")}`
  );
  if (!chapter) {
    notFound();
  }
  // https://github.com/vercel/next.js/discussions/38256
  const title = `Doxi - ${chapter.title}`;
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={chapter.excerpt} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://doxi.vercel.app" />
      <meta
        property="og:image"
        content={`https://doxi.vercel.app/api/og?title=${chapter.title}&excerpt=${chapter.excerpt}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://doxi.vercel.app" />
      <meta
        property="twitter:image"
        content={`https://doxi.vercel.app/api/og?title=${chapter.title}&excerpt=${chapter.excerpt}`}
      />
    </>
  );
}
