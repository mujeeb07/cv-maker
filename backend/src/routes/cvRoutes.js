const express = require("express");
const router = express.Router();
const { createCV, getCV, updateCV, downloadCV } = require("../controllers/cvController");

router.post("/", createCV);
router.get("/:id/pdf", downloadCV);
router.get("/:id", getCV);
router.put("/:id", updateCV);

module.exports = router;