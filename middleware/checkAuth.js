const jwt = require("jsonwebtoken");
const { UnAuthorizedError } = require("../errors");

const authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthorizedError("no token in the request.");
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.tokenData = { userId: payload.userId, userName: payload.userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid token in the request.");
  }
};

module.exports = authCheck;
