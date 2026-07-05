const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// Create note
router.post("/", protect, createNote);

// Get notes
router.get("/", protect, getNotes);

// Update note
router.put("/:id", protect, updateNote);

// Delete note
router.delete("/:id", protect, deleteNote);

module.exports = router;