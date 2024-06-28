const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/generateToken");

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //204 no content
    return res.status(204).json({
      success:false,
      message: "Insufficient data",
    });
  }

  let user = await User.findOne({ email });

  if (user) {
    //409 conflict
    return res.status(409).json({
      success:false,
      message: `${name} is already a user`,
    });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  let newUser = await user.save();

  if (newUser) {
    res.status(200).json({
      success: true,
      message: `Welcome to our world`,
    });
  }
});

const signIn = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!req.body) {
    return res.status(204).json({
      success:false,
      message: "Insufficient data",
    });
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success:false,
      message: "Please register",
    });
  }

  let isPassword = await bcrypt.compare(req.body.password, user.password);

  if (!isPassword) {
    return res.status(401).json({
      success:false,
      message: "Invalid credentials",
    });
  }

  let token = generateToken(user);

  const { password, __v, createdAt, updatedAt, ...rest } = user._doc;

  res.status(200).json({
    success:true,
    message: "Successfully login",
    data: {
      ...rest,
    },
    token,
  });
});

module.exports = {
  signUp,
  signIn,
};
