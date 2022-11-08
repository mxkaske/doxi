import Content from "./Content";
import ViewCounter from "./ViewCounter";

export default function ChapterSlugPage({
  params,
}: {
  params: { chapters: string[] };
}) {
  const url = `/${params.chapters.join("/")}`;
  return (
    <>
      {/* REMINDER: rsc_counter injects the Server Component into a Client Component! */}
      {/* https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components */}
      <Content url={url} rsc_counter={<ViewCounter url={url} />} />
    </>
  );
}

// REMINDER: it would be nice to somehow have it in [...chapter], while
// chapter: string[] includes all the subpages /a/b /a /b/c
