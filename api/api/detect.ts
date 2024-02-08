import { VercelRequest, VercelResponse } from "@vercel/node";
import { URLSearchParams } from "url";
const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;
const VIRUSTOTAL_API_ENDPOINT = "https://www.virustotal.com/api/v3/urls";
export const maxDuration = 20; 
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Checking if the request method is POST
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: "Method not allowed, please use POST" });
    }

    // Getting rqeuest body
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL/Ip is required" });
    }

    const formData = new URLSearchParams();
    formData.append("url", url);

    // Getting Response
    const response = await fetch(VIRUSTOTAL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "x-apikey": VIRUSTOTAL_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const data = await response.json();

    // Getting Links from Response to check for queue
    const link = data.data.links.self;
    
    const finalVirusTotalLink = await fetch(link, {
      headers: {
        "x-apikey": VIRUSTOTAL_API_KEY,
      },
    });
    let websiteMetrics = await finalVirusTotalLink.json();
    
    while (websiteMetrics.data.attributes.status === "queued") {
      await sleep(1000);
      const res = await fetch(link, {
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
        },
      });
      websiteMetrics = await res.json();
    }

    res.status(200).json(websiteMetrics);
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", msg: JSON.stringify(error) });
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
