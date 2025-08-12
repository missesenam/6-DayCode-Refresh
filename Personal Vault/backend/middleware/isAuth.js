const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token found");
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("User info from token:", req.user);
    next();
  } catch (error) {
    console.log("❌ Invalid token error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAuth;
