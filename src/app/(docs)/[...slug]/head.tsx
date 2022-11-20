import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

// TODO: add more infos like reading time to OG - maybe also an excerpt/description?

export default function Head({ params }: { params: { slug: string[] } }) {
  const URL = process.env.NEXT_PUBLICH_DOCUMENTATION_URL;
  const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
  const doc = allDocs.find(
    (c) => c._raw.flattenedPath === `${params.slug.join("/")}`
  );
  if (!doc) {
    notFound();
  }
  // https://github.com/vercel/next.js/discussions/38256
  const title = `${NAME} - ${doc.title}`;
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={doc.excerpt} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${URL}${doc.url}`} />
      <meta
        property="og:image"
        content={`${URL}/api/og?slug=${doc._raw.flattenedPath}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${URL}${doc.url}`} />
      <meta
        property="twitter:image"
        content={`${URL}/api/og?slug=${doc._raw.flattenedPath}`}
      />
    </>
  );
}
