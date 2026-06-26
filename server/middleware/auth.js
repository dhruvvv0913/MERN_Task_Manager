const jwt = require("jsonwebtoken");

// Runs before protected routes to check the user is logged in
function auth(req, res, next) {
  // The token is sent in a header like:  Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  // Take just the token part after the word "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    // Check the token is genuine and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Remember which user made the request so later code can use it
    req.userId = decoded.id;
    next(); // let the request continue
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
}

module.exports = auth;
