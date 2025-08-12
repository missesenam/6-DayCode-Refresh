// middleware/customIdeaLimiter.js
const { isRateLimited, incrementRequest } = require("./customRateLimiter");

function customIdeaLimiter(req, res, next) {
  const ip = req.ip;

  if (isRateLimited(ip)) {
    return res.status(429).json({
      message: "Too many requests. Please wait a while before trying again.",
    });
  }

  incrementRequest(ip);
  next();
}

module.exports = customIdeaLimiter;
