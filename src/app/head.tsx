export default function Head() {
  return (
    <>
      <title>Doxi</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Create your documentations with Next.js and MDX. Powered by Contentlayer."
      />
      <link rel="icon" href="/favicon.ico" />
      {/* <meta
        name="theme-color"
        content="#22c55e"
        // LATER: media="(prefers-color-scheme: light)" or dark!
      /> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://doxi.vercel.app" />
      <meta property="og:image" content={`https://doxi.vercel.app/api/og`} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://doxi.vercel.app" />
      <meta
        property="twitter:image"
        content={`https://doxi.vercel.app/api/og`}
      />
    </>
  );
}
