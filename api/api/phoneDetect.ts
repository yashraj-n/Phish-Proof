import { VercelRequest, VercelResponse } from "@vercel/node";
const PHONE_DETECT_API_URL =
  "https://www.ipqualityscore.com/api/json/phone/" + process.env.IPQS_API_KEY + "/";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
        return res
          .status(405)
          .json({ error: "Method not allowed, please use POST" });
      }
  
      // Getting rqeuest body
      const {  phone } = req.body;
      if (!phone) {
        return res.status(400).json({ error: "Email is required" });
      }

        const emailMetrics = await (
            await fetch(`${PHONE_DETECT_API_URL}${encodeURIComponent(phone)}`)
        ).json();
        res.json({ emailMetrics });
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error", msg: error });
  }
}