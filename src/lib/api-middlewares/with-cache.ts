import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import type { ZodSchema } from "zod";
import { getRequestCache } from "../redis/cache-request";

export function withCache<T extends ZodSchema>(
  schema: T, // query: string[] // list of all queries
  handler: NextApiHandler
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      switch (req.method) {
        case "GET": {
          const result = schema.parse(req.query);
          const cache = await getRequestCache(result);
          if (cache) {
            return res
              .status(200) // or status 304 here?
              .setHeader("Upstash-Redis-Cache", 1) // distinguish response
              .json(cache);
          }
          return handler(req, res);
        }
        default: {
          return handler(req, res);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }
      return res.status(500).end();
    }
  };
}
