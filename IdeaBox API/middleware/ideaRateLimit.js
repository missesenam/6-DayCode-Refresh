const rateLimit = require("express-rate-limit");

const ideaLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2, // limit each IP to 2 requests
  message: {
    error: "Too many idea submissions. Please try again later.",
  },
});

module.exports = ideaLimiter;
