const express = require("express");
const router = express.Router();
const { createCV, getCV, updateCV, downloadCV } = require("../controllers/cvController");
const auth = require("../middleware/authMiddleware")
router.post("/", auth, createCV);
router.get("/:id/pdf", auth, downloadCV);
router.get("/:id", auth, getCV);
router.put("/:id", auth, updateCV);

module.exports = router;