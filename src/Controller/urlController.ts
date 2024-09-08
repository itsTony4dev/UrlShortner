import { Request, Response } from "express";
import { shortenUrl, getOriginalUrl } from "../Service/urlService";

export const createShortUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  try {
    const shortUrl = await shortenUrl(originalUrl);
    return res.status(200).json({ shortUrl });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  const { urlCode } = req.params;

  try {
    const originalUrl = await getOriginalUrl(urlCode);

    if (originalUrl) {
      return res.redirect(originalUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
