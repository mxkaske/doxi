import { getView } from "@/lib/redis/view-counter";
import Link from "@/components/ui/link";

export default async function Home() {
  const counter = await getView("root");
  return (
    <div className="prose p-6">
      <h1>Learn Redis with Upstash</h1>
      <Link href="/introduction">Getting Started</Link>
      <p>View Counter: {counter}</p>
    </div>
  );
}
