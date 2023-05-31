import Link from "next/link";
import { allPages } from "contentlayer/generated";
import { PathSegments } from "src/contentlayer/utils";

export default function HomeTiles() {
  const docs = allPages
    .filter((d) => d.url.startsWith("/docs/features"))
    .sort((a, b) => {
      const pathA = a.pathSegments as PathSegments;
      const pathB = b.pathSegments as PathSegments;
      return pathA[1].order > pathB[1].order ? -1 : 1;
    });
  return (
    <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
      {docs.map(({ url, title, excerpt }) => (
        <Tile key={url} {...{ url, title, excerpt }} />
      ))}
    </div>
  );
}

interface Props {
  url: string;
  title: string;
  excerpt: string;
}

function Tile({ url, title, excerpt }: Props) {
  return (
    <Link
      href={url}
      className="group overflow-hidden rounded-md border border-gray-100 hover:border-brand-300 not-prose"
    >
      <h2 className="border-b border-gray-100 bg-gray-50 px-4 py-3 font-semibold group-hover:border-brand-100 group-hover:bg-brand-50 group-hover:text-brand-950">
        {title}
      </h2>
      <p className="px-4 py-3">{excerpt}</p>
    </Link>
  );
}
