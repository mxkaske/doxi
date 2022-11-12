import { redis } from "../upstash";
import crypto from "crypto";

type Query = Record<string, unknown>;

function getKey(slug: string) {
  return `cache:${slug}`;
}

function createHash(value: Query) {
  return crypto
    .createHash("md5")
    .update(JSON.stringify(value))
    .digest("hex")
    .substring(0, 8);
}

export async function setRequestCache<T>(query: Query, value: T) {
  const p = redis.pipeline();
  const hash = createHash(query);
  const key = getKey(hash);
  p.set(key, value);
  p.expire(key, 600); // 10 min
  return await p.exec<[T, 1 | 0]>();
}

export async function getRequestCache<T>(query: Query) {
  const hash = createHash(query);
  const key = getKey(hash);
  return await redis.get<T>(key);
}
