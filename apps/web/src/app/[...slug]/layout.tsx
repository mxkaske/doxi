import { getPagefromSlug } from "./utils";
import { Metadata } from "next";

const URL = process.env.NEXT_PUBLIC_DOCUMENTATION_URL;
const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
const DESCRIPTION =
  "Create your Documentation with Next.js and MDX. Powered by Contentlayer.";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const page = getPagefromSlug(params.slug);
  const title = `${NAME} - ${page.title}`;
  return {
    title,
    description: DESCRIPTION,
    openGraph: {
      type: "website",
      url: `${URL}${page.url}`,
      description: DESCRIPTION,
      images: [
        `${URL}/api/og?title=${page.title}&chapter=${page.pathSegments[0].pathName}`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      description: DESCRIPTION,
      images: [
        `${URL}/api/og?title=${page.title}&chapter=${page.pathSegments[0].pathName}`,
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-prose px-4 py-6 lg:px-6">{children}</div>
    </div>
  );
}
