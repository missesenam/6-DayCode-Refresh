const {
  createSecretNote,
  getAllSecretNote,
  updateSecretNote,
  deleteSecretNote,
} = require("../controllers/secretNotes");

const noteModel = require("../models/secretNotes");

const express = require("express");

const {
  noteValidationRules,
  validator,
} = require("../middleware/noteValidator");

const myNotesRoute = express.Router();

myNotesRoute
  .route("/")
  .post(noteValidationRules, validator, createSecretNote)
  .get(getAllSecretNote);

myNotesRoute
  .route("/:id")
  .put(noteValidationRules, validator, updateSecretNote)
  .delete(deleteSecretNote);

module.exports = myNotesRoute;
