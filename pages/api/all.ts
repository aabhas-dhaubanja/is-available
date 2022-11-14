import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});
client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

type Data = {
  message?: string;
  key?: string;
  value?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const key = body.key;
    const value = body.value;

    await client.set(key, value);
    const savedValue = await client.get(key);
    res
      .status(200)
      .json({ key, value: savedValue || undefined, message: "success" });
  } else if (req.method === "GET") {
    let key = req.query.key;
    key = String(key);
    const value = await client.get(key);
    res
      .status(200)
      .json({ key, value: value || undefined, message: "success" });
  }
}
