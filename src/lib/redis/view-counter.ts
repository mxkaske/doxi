import { redis } from "../upstash";
import { endOfDay, getUnixTime } from "date-fns";

// DISCUSS: do we actually need async functions for SET actions?
// if that happens in the backend, it will slow down the performance

// TODO: create a separate file with all the different keys!
function getSlug(key: string) {
  return `views:${key}`;
}

function getUniqueSlug(key: string) {
  return `views:${key}:unique`;
}

// FIXME: name `increaseViews`
export async function increaseView(key: string) {
  return await redis.incr(getSlug(key));
}
// FIXME: name `getViews`
export async function getView(key: string) {
  return await redis.get<number | null>(getSlug(key));
}

// TODO: not sure how BUT set cookies or something to store
// informations about iuser to not recall the same function after once!
export async function increaseUniqueViews(key: string, ip: string) {
  await redis.expireat(getUniqueSlug(key), getUnixTime(endOfDay(new Date())));
  return await redis.sadd(getUniqueSlug(key), ip);
}

// DISCUSS: if needed
// isAlreadyInUniqueViews => redis.sismember(key, ip);

export async function getUniqueViews(key: string) {
  return await redis.scard(getUniqueSlug(key));
}
