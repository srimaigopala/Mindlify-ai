const Note = require("../models/Note");

// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check note exists
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update note
    note.title = req.body.title || note.title;

    note.content = req.body.content || note.content;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check note exists
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete note
    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};