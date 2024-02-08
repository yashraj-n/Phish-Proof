import { VercelRequest, VercelResponse } from "@vercel/node";
const EMAIL_DETECT_API_URL =
  "https://www.ipqualityscore.com/api/json/email/" + process.env.IPQS_API_KEY + "/";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
        return res
          .status(405)
          .json({ error: "Method not allowed, please use POST" });
      }
  
      // Getting rqeuest body
      const {  email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

        const emailMetrics = await (
            await fetch(`${EMAIL_DETECT_API_URL}${encodeURIComponent(email)}`,)
        ).json();
        res.json({ emailMetrics });
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error", msg: error });
  }
}