import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();

      const token = generateToken(newUser._id);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const logout = (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxage: 0 });
//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const userID = req.user?._id;
    const { profilePic } = req.body;

    if (!profilePic) {
      return res
        .status(400)
        .json({ message: "Please provide a profile picture" });
    }

    if (profilePic.length > 5_000_000) { // ~5MB base64 string
      return res.status(413).json({ message: "Image is too large" });
    }

    // Get the current user
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imageUrl = user.profilePic;
    const publicIdMatch = imageUrl.match(/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    const oldPublicId = publicIdMatch ? publicIdMatch[1] : null;

    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    // Upload image to Cloudinary under a specific folder
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "chat-app", // cloudinary folder path
      transformation: [
        { width: 800, crop: "limit" }, // Resize if too large
        { quality: "auto" }, // Automatic compression
      ],
    });

    // Update user profilePic in the database
    user.profilePic = uploadResponse.secure_url;
    user.profilePicPublicId = uploadResponse.public_id;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
