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
  const value = body.value;

  fs.writeFile(key, JSON.stringify(value), (err) => {
    if (err) res.status(500).json({ key, value, message: JSON.stringify(err) });
    res.status(200).json({ key, value, message: "success" });
  });
}
