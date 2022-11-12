import { withCache } from "@/lib/api-middlewares/with-cache";
import { setRequestCache } from "@/lib/redis/cache-request";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const q = req.query.q as string;
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=20e53cec5f63cb811ee509384ef0c377`
    );
    if (result.ok) {
      const json = await result.json();
      await setRequestCache(req.query, json);
      res.status(200).json(json);
    } else {
      res.status(404).end("Not Found");
    }
  } catch (e) {
    res.status(500).end();
  }
}

// export default withCache(handler, {...options})
// TODO: declare how to set the key!
// Don't forget about chaining!

const schema = z.object({
  q: z.string(),
});

export default withCache(schema, handler);
