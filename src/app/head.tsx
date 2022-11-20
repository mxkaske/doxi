export default function Head() {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
  return (
    <>
      <title>{NAME}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Create your documentations with Next.js and MDX. Powered by Contentlayer."
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicons/16x16.png"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicons/32x32.png"
        sizes="32x32"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${URL}`} />
      <meta property="og:image" content={`${URL}/api/og`} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:image" content={`${URL}/api/og`} />
    </>
  );
}
