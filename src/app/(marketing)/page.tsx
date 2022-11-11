import { getView } from "@/lib/redis/view-counter";
import Link from "next/link";

export default async function Home() {
  const counter = await getView("root");
  return (
    <div className="prose">
      <h1>Learn Redis with Upstash</h1>
      <Link href="/introduction">Getting Started</Link>
      <p>View Counter: {counter}</p>
    </div>
  );
}
