const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
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

  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   const user = User.findById(payload.id).select("-password");
  //   req.user = user;
  //   req.user = { userId: payload.userId, name: payload.name };
  //   next();
  // } catch (err) {
  //   throw new UnauthenticatedError("Authentication failed");
  // }
};
module.exports = verifyToken;
