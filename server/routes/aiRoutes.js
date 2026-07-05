const express = require("express");

const router = express.Router();

const {
  summarizeNote,
} = require("../controllers/aiController");

router.post("/summarize", summarizeNote);

module.exports = router;