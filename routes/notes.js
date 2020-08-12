const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");

const User = require("../models/User");
const Note = require("../models/Note");

//Get all notes of logged in user.
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      date: -1,
    }); //most recent first
    res.json({ notes, error: false }); //send array
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Create Note for currently logged in user
router.post(
  "/",
  [
    authMiddleware,
    [
      check("title", "Note title is required").not().isEmpty(),
      check("body", "Note body is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, body } = req.body;
    try {
      const newNote = new Note({
        title,
        body,
        user: req.user.id,
      });
      const note = await newNote.save();
      res.json({ note, error: false }); //return the saved note
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Server Error in creating note and saving to database",
        error: true,
      });
    }
  }
);

//Update selected note for logged in user
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, body } = req.body;

  //Build a note object with whichever fields were changed
  const noteFields = {};
  if (title) noteFields.title = title;
  if (body) noteFields.body = body;

  try {
    //find note you want to update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found", error: true });
    }

    //Make sure user owns note (no hack by postman or curl http client)
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized", error: true });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteFields },
      { new: true }
    ); //if note doesnt exist, create it
    res.json({ note, error: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error in updating note and saving to database",
      error: true,
    });
  }
});

//delete selected note for logged in user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    //find note you want to update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found", error: true });
    }

    //Make sure user owns note (no hack by postman or curl http client)
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized", error: true });
    }

    await Note.findByIdAndRemove(req.params.id);
    res.json({ msg: "Note Removed", error: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error in deleting note",
      error: true,
    });
  }
});

module.exports = router;
