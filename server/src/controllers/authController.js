import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  const errors = {};
  try {
    const { firstname, lastname, username, email, phoneNumber, password } =
      req.body;

    const existingEmail = await User.findOne({
      email,
    });
    const existingUsername = await User.findOne({
      username,
    });
    const existingPhoneNumber = await User.findOne({
      phoneNumber,
    });

    if (existingEmail) errors.email("Email");
    if (existingUsername) errors.username("Username");
    if (existingPhoneNumber) errors.phoneNumber("Phone number");

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
