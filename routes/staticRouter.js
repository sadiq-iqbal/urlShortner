const express = require("express")
const router = express.Router();
const urlController = require("../controllers/urlControllers");

router.get("/login", urlController.renderLoginPage);
router.get("/signup", urlController.renderSignupPage);
router.post('/signup', urlController.handleSignup);
router.post('/login', urlController.handleLoginControl);

module.exports = router;