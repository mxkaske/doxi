import { redis } from "../upstash";

// TODO: create a separate file with all the different keys!
function getSlug(key: string) {
  return `views:${key}`;
}

export async function increaseView(key: string) {
  return await redis.incr(getSlug(key));
}

export async function getView(key: string) {
  return await redis.get<number | null>(getSlug(key));
}
