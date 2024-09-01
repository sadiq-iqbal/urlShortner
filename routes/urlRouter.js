const express = require("express");
const router = express.Router();


router.post('/', handleGenerateShortUrl);
router.get("/:id", handleRedirectToOriginalUrl);
router.get("/analytics/:id", handleGetAnalytics);


module.exports = router;
