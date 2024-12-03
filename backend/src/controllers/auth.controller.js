import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "all fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      return;
    } else {
      res.status(400).json({ error: "Invalid user data" });
      return;
    }
  } catch (error) {
    console.error(`error from the signup route ${error.message} `);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilPic: user.profilePic,
    });
    return;
  } catch (error) {
    console.error(`error in login controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log(`error in logout controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;

  try {
    if (!profilePic) {
      return res.status(400).json({ error: "profile pic is required" });
    }
    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`error in updateProfile controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
