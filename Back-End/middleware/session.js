const session = require("express-session");

function sessionMiddleware() {
  return session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false, // set true in production (HTTPS)
    },
  });
}

module.exports = sessionMiddleware;