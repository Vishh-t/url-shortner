const { customAlphabet } = require("nanoid");
const validUrl = require("valid-url");
const Url = require("../models/Url");


const nanoid = customAlphabet(
  "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  6
);

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";


async function generateUniqueShortCode() {
  let code;
  let exists = true;

  while (exists) {
    code = nanoid();
    exists = await Url.exists({ shortCode: code });
  }

  return code;
}


async function shortenUrl(req, res) {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== "string") {
      return res.status(400).json({ error: "originalUrl is required." });
    }

    const trimmedUrl = originalUrl.trim();

    if (!validUrl.isWebUri(trimmedUrl)) {
      return res.status(400).json({
        error: "Please provide a valid http(s) URL, e.g. https://example.com/page",
      });
    }

    
    const existing = await Url.findOne({ originalUrl: trimmedUrl });
    if (existing) {
      return res.status(200).json({
        originalUrl: existing.originalUrl,
        shortCode: existing.shortCode,
        shortUrl: `${BASE_URL}/${existing.shortCode}`,
        clicks: existing.clicks,
        reused: true,
      });
    }

    const shortCode = await generateUniqueShortCode();

    const newUrl = await Url.create({
      originalUrl: trimmedUrl,
      shortCode,
    });

    return res.status(201).json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `${BASE_URL}/${newUrl.shortCode}`,
      clicks: newUrl.clicks,
      reused: false,
    });
  } catch (error) {
    console.error("Error in shortenUrl:", error.message);
    return res.status(500).json({ error: "Something went wrong on our end. Please try again." });
  }
}


async function redirectToOriginal(req, res) {
  try {
    const { shortCode } = req.params;

    const urlDoc = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!urlDoc) {
      return res.status(404).json({ error: "Short link not found." });
    }

   
    return res.redirect(302, urlDoc.originalUrl);
  } catch (error) {
    console.error("Error in redirectToOriginal:", error.message);
    return res.status(500).json({ error: "Something went wrong on our end. Please try again." });
  }
}


async function getStats(req, res) {
  try {
    const { shortCode } = req.params;

    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short link not found." });
    }

    return res.status(200).json({
      originalUrl: urlDoc.originalUrl,
      shortCode: urlDoc.shortCode,
      clicks: urlDoc.clicks,
      createdAt: urlDoc.createdAt,
    });
  } catch (error) {
    console.error("Error in getStats:", error.message);
    return res.status(500).json({ error: "Something went wrong on our end. Please try again." });
  }
}

module.exports = {
  shortenUrl,
  redirectToOriginal,
  getStats,
};
