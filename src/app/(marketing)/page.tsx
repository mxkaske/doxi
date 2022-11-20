import { getView } from "@/lib/redis/view-counter";
import { allDocs } from "contentlayer/generated";
import GettingStarted from "./getting-started";
import Tile from "./tile";

// TODO: add tiles with features on items

export default async function Home() {
  // const counter = await getView("root");
  const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
  const docs = allDocs.filter((d) => d.url.startsWith("/data-types"));
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
        <GettingStarted />
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {docs.map(({ url, title, excerpt }) => (
          <Tile key={url} {...{ url, title, excerpt }} />
        ))}
      </div>
    </div>
  );
}
