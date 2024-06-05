import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// @desc    Register new User
// @route   USER /register
// @access  Public

export const registerUserController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  res.status(200).json({ message: "Verification is successfull", user });
});

// @desc    User Login
// @route   USER /login
// @access  Public

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: "Login Successful",
      _id: user.id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Google Authentication
// @route   USER /google-auth
// @access  Public

export const googleAuthController = asyncHandler(async (req, res) => {
  const { username: name, email, imageUrl } = req.body;
  console.log(name, email, imageUrl);
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      if (userExist.isBlocked) {
        res.status(400);
        throw new Error("User is blocked");
      }

      if (userExist.isGoogle) {
        res.json({
          message: "Login Successful",
          _id: userExist.id,
          name: userExist.name,
          email: userExist.email,
          profileImg: userExist.profileImg,
          token: generateToken(userExist.id),
        });
        return;
      } else {
        res.status(400);
        throw new Error(
          "User already Exist with that email. Try a differeny email"
        );
      }
    }

    const randomPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newUser = await User.create({
      name: name,
      email,
      password: hashedPassword,
      profileImg: imageUrl,
      isGoogle: true,
    });

    const token = generateToken(newUser.id);

    res.status(200).json({
      message: "Login Successful",
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      profileImg: newUser.profileImg,
      token: token,
    });
  } catch (error) {
    console.error("Error in Google authentication:", error);
    res.status(500).json({ message: "Server error" });
  }
});

