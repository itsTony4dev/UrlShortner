import { Router } from "express";
import { createShortUrl, redirectToOriginalUrl } from "../Controller/urlController";

const router = Router();

router.post("/shorten", createShortUrl);
router.get("/:urlCode", redirectToOriginalUrl);

export default router;
