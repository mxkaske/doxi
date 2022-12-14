import { allPages } from "contentlayer/generated";
import Content from "@/components/mdx/content";
import { getPagefromSlug } from "./utils";

export async function generateStaticParams() {
  return allPages.map((c) => ({
    slug: c.url.split("/").slice(1),
  }));
}

export default function StaticPage({ params }: { params: { slug: string[] } }) {
  const page = getPagefromSlug(params.slug);
  return (
    <div className="container mx-auto">
      {/* REMOVED: border-gray-100 lg:border-l lg:border-r */}
      <div className="mx-auto max-w-prose px-4 py-6 lg:px-6">
        <Content content={page} />
      </div>
    </div>
  );
}

// {/* REMINDER: rsc_counter injects the Server Component into a Client Component! */}
// {/* https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components */}
