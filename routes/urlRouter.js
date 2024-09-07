const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlControllers");

router.post('/', urlController.handleGenerateShortUrl);
router.get('/', urlController.renderUrlPage);
router.get("/:id", urlController.handleRedirectToOriginalUrl);
router.get("/analytics/:id", urlController.handleGetAnalytics);

module.exports = router;
