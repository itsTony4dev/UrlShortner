import validUrl from "valid-url";
import Url from "../Model/urlModel";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

export const shortenUrl = async (originalUrl: string): Promise<string> => {
  if (!validUrl.isUri(baseUrl)) {
    throw new Error("Invalid base URL");
  }

  const urlCode = Date.now().toString(); // 8-character unique code

  // Check if the original URL is valid
  if (validUrl.isUri(originalUrl)) {
    // Check if the URL is already shortened
    let url = await Url.findOne({ originalUrl });
    if (url) return `${baseUrl}/${url.urlCode}`;

    const shortUrl = `${baseUrl}/${urlCode}`;

    url = new Url({ originalUrl, shortUrl, urlCode });
    await url.save();

    return shortUrl;
  } else {
    throw new Error("Invalid original URL");
  }
};

export const getOriginalUrl = async (
  urlCode: string
): Promise<string | null> => {
  const url: any = await Url.findOne({ urlCode });
  return url ? url.originalUrl : null;
};
