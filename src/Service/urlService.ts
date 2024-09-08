import validUrl from "valid-url";
import Url from "../Model/urlModel";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import base from "base-x";

dotenv.config();

const baseUrl = process.env.BASE_URL || "http://localhost:5000";
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base62 = base(BASE62);

const generateShortCode = (): string => {
  const uuid = uuidv4();
  const buffer = Buffer.from(uuid.replace(/-/g, ""), "hex");
  return base62.encode(buffer).slice(0, 12);
};

export const shortenUrl = async (originalUrl: string): Promise<string> => {
  if (!validUrl.isUri(baseUrl)) {
    throw new Error("Invalid base URL");
  }

  const urlCode = generateShortCode();

  if (validUrl.isUri(originalUrl)) {
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
