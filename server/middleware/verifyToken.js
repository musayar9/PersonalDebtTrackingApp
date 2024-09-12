const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const verifyToken = async (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res.status(401).json("Authentication Invalid");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json("User Not Authorized");
    }

    req.user = user;

    next();
  });


};
module.exports = verifyToken;
