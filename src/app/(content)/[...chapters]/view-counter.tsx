import { asyncComponent } from "@/lib/hack";
import { getView, increaseView } from "@/lib/redis/view-counter";

async function ViewCounter({ slug }: { slug: string }) {
  const counter = await getView(slug);
  return <span>{counter || 0} views</span>;
}

export default asyncComponent(ViewCounter);
