import { getView } from "@/lib/redis/view-counter";
import GettingStarted from "./getting-started";

// TODO: add tiles with features on items

export default async function Home() {
  const counter = await getView("root");
  return (
    <div className="container mx-auto space-y-12 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-1 text-2xl font-bold text-brand-500">Doxi</h1>
        <h1 className="mb-6 text-4xl font-extrabold text-gray-700">
          Create your Documentation with{" "}
          <span className="text-black">Next.js</span> and{" "}
          <span className="text-[#FCB32C]">MDX</span>. Powered by{" "}
          <span className="text-[#7C3AED]">Contentlayer</span>.
        </h1>
        <GettingStarted />
      </div>
      <div className="text-center">
        <p className="text-sm font-extralight">View Counter: {counter}</p>
      </div>
    </div>
  );
}
