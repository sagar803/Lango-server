import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the email already exists, respond with an error
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: passwordHash
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    delete savedUser.password;
    res.status(201).json({ token, user: savedUser});
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};