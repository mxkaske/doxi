import { asyncComponent } from "@/lib/hack";
import { getView, increaseView } from "@/lib/redis/view-counter";

async function ViewCounter({ url }: { url: string }) {
  await increaseView(url);
  const counter = await getView(url);
  return <span>{counter || 0} views</span>;
}

export default asyncComponent(ViewCounter);
