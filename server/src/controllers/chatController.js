import User from "../models/User.js";

export const chatPage = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findOne({ _id: user_id });

    res.status(200).json({ user });
  } catch {
    console.error("Error in chatPage API:", error);
    res.status(500).json({ message: "Server error" });
  }
};
