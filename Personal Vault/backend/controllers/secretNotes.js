const asyncHandler = require("express-async-handler");
const SecretNote = require("../models/secretNotes");

const createSecretNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const createdNote = await SecretNote.create({ title, description });

  res.status(200).json({
    message: "Note created",
    entry: createdNote,
  });
});

const updateSecretNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const updatedNote = await SecretNote.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  res.status(200).json({
    message: "Note updated",
    note: updatedNote,
  });
});

const deleteSecretNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedNote = await SecretNote.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted",
    note: deletedNote,
  });
});

const getAllSecretNote = asyncHandler(async (req, res) => {
  const getSecretNote = await SecretNote.find();

  const SecretNoteList = getSecretNote.map((note) => ({
    title: note.title,
    description: note.description,
    _id: note._id,
  }));

  res.status(200).json({
    message: "Secret Note retrieved",
    idea: SecretNoteList,
  });
});

module.exports = {
  createSecretNote,
  getAllSecretNote,
  updateSecretNote,
  deleteSecretNote,
};
