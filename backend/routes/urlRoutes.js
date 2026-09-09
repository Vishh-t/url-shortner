const express = require("express");
const router = express.Router();
const { shortenUrl, redirectToOriginal, getStats } = require("../controllers/urlController");


router.post("/shorten", shortenUrl);
router.get("/stats/:shortCode", getStats);

module.exports = router;


module.exports.redirectToOriginal = redirectToOriginal;
