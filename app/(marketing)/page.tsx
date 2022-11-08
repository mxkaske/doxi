import { getView, increaseView } from "@/lib/redis/view-counter";
import Link from "next/link";

export default async function Home() {
  await increaseView("/");
  const counter = await getView("/");
  return (
    <div className="prose">
      <h1>Learn Redis with Upstash</h1>
      <Link href="/introduction">Getting Started</Link>
      <p>View Counter: {counter}</p>
    </div>
  );
}
