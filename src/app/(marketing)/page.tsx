import Link from "@/components/docs/link";
import Callout from "@/components/ui/callout";
import { allDocs } from "contentlayer/generated";
import { PathSegments } from "src/contentlayer/utils";
import ForkNow from "./fork-now";
import GettingStarted from "./getting-started";
import Tile from "./tile";

export default async function Home() {
  const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
  const docs = allDocs
    .filter((d) => d.url.startsWith("/docs/features"))
    .sort((a, b) => {
      const pathA = a.pathSegments as PathSegments;
      const pathB = b.pathSegments as PathSegments;
      return pathA[1].order > pathB[1].order ? 1 : -1;
    });
  return (
    <div className="container mx-auto space-y-12 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-1 text-2xl font-bold text-brand-500">{NAME}</h1>
        <h1 className="mb-6 text-4xl font-extrabold text-gray-700">
          Create your Documentation with{" "}
          <span className="text-black">Next.js</span> and{" "}
          <span className="text-[#FCB32C]">MDX</span>. Powered by{" "}
          <span className="text-[#7C3AED]">Contentlayer</span>.
        </h1>
        <div className="space-x-4">
          <GettingStarted />
          <ForkNow />
        </div>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {docs.map(({ url, title, excerpt }) => (
          <Tile key={url} {...{ url, title, excerpt }} />
        ))}
      </div>
      <div className="mx-auto max-w-2xl">
        <Callout>
          <p className="text-sm font-medium">
            This is a work in progress Next.js 13 project. I invite you to read,
            review or contribute to it however you want!{" "}
            <Link href={process.env.NEXT_PUBLIC_GITHUB_URL}>GitHub</Link>
          </p>
        </Callout>
      </div>
    </div>
  );
}
