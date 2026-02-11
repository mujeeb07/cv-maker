const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createCV, getCV, updateCV, downloadCV } = require("../controllers/cvController");
const { downloadFromHTML } = require("../controllers/pdfController");

router.post("/", auth, createCV);
router.get("/:id/pdf", auth, downloadCV);
router.get("/:id", auth, getCV);
router.put("/:id", auth, updateCV);
router.post("/download-html", auth, downloadFromHTML)

module.exports = router;