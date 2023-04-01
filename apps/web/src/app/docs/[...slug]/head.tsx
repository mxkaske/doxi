import { getDocBySlug } from "./utils";

// TODO: add more infos like reading time to OG - maybe also an excerpt/description?
const URL = process.env.NEXT_PUBLIC_DOCUMENTATION_URL;
const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;

export default function Head({ params }: { params: { slug: string[] } }) {
  const doc = getDocBySlug(params.slug);
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
        content={`${URL}/api/og?title=${doc.title}&excerpt=${doc.excerpt}&chapter=${doc.pathSegments[0].pathName}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${URL}${doc.url}`} />
      <meta
        property="twitter:image"
        content={`${URL}/api/og?title=${doc.title}&excerpt=${doc.excerpt}&chapter=${doc.pathSegments[0].pathName}`}
      />
    </>
  );
}
