const { body, validationResult } = require("express-validator");

const ideaValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("tags")
    .notEmpty()
    .withMessage("Tags are required")
    .bail()
    .isArray({ min: 2 })
    .withMessage("Please provide at least 2 tags"),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { ideaValidationRules, validator };
