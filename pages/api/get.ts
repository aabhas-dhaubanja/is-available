import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type Data = {
  message?: string;
  key?: string;
  value?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") res.status(400).json({ message: "invalid method" });
  const body = JSON.parse(req.body);
  const key = body.key;
  fs.readFile(`${key}`, (err, data) => {
    if (err) return res.status(404).json({ message: "file not found" });
    res
      .status(200)
      .json({ key, value: data.toString() || undefined, message: "success" });
  });
}
