import { getView, increaseView } from "@/lib/redis/view-counter";
import Link from "next/link";

const VIEW_KEY = "root";

export default async function Home() {
  await increaseView(VIEW_KEY);
  const counter = await getView(VIEW_KEY);
  return (
    <div className="prose">
      <h1>Learn Redis with Upstash</h1>
      <Link href="/introduction">Getting Started</Link>
      <p>View Counter: {counter}</p>
    </div>
  );
}
