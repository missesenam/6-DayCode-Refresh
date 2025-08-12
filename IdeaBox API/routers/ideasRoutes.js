const {
  createIdeas,
  getAllIdeas,
  getIdeasByTag,
  updateIdeas,
  deleteIdeas,
} = require("../controllers/ideasControllers");

const ideaModel = require("../models/ideasModel");

const {
  ideaValidationRules,
  validator,
} = require("../middleware/ideaValidator");

// rate limit with express-rate-limit
const ideaLimiter = require("../middleware/ideaRateLimit");

// custom rate limit
const customIdeaLimiter = require("../middleware/customIdeaLimiter");

const express = require("express");

const myideaRoute = express.Router();

myideaRoute.get("/tag/:tags", getIdeasByTag);

myideaRoute
  .route("/")
  .post(customIdeaLimiter, ideaValidationRules, validator, createIdeas)
  .get(getAllIdeas);

myideaRoute
  .route("/:id")
  .put(ideaValidationRules, validator, updateIdeas)
  .delete(deleteIdeas);

module.exports = myideaRoute;
