const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UnAuthorizedError, BadRequestError } = require("../errors");

const register = async (req, res, next) => {
  await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  res.status(201).json({
    message: "user registered.",
  });
};

const login = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw new BadRequestError("username and password is required");
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    throw new UnAuthorizedError("invalid user name or password");
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(401).json({
      message: "login successful.",
      token,
    });
  } else {
    throw new UnAuthorizedError("invalid user name or password");
  }
};

module.exports = {
  register,
  login,
};
