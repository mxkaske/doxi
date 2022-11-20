import { allChapters } from "contentlayer/generated";
import { notFound } from "next/navigation";

// TODO: add more infos like reading time to OG - maybe also an excerpt/description?

export default function Head({ params }: { params: { slug: string[] } }) {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.slug.join("/")}`
  );
  if (!chapter) {
    notFound();
  }
  // https://github.com/vercel/next.js/discussions/38256
  const title = `${NAME} - ${chapter.title}`;
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={chapter.excerpt} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${URL}${chapter.url}`} />
      <meta
        property="og:image"
        content={`${URL}/api/og?slug=${chapter._raw.flattenedPath}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${URL}${chapter.url}`} />
      <meta
        property="twitter:image"
        content={`${URL}/api/og?slug=${chapter._raw.flattenedPath}`}
      />
    </>
  );
}
