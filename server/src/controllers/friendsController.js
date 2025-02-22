import User from "../models/User.js";

export const findUsers = async (req, res) => {
  try {
    const { query } = req.body;
    const textUsers = await User.find({
      $text: { $search: query },
    }).sort({ score: { $meta: "textScore" } });

    const regexUsers = await User.find({
      username: { $regex: query, $options: "i" },
    });

    const users = [...textUsers, ...regexUsers].filter(
      (user, index, self) =>
        index ===
        self.findIndex((u) => u._id.toString() === user._id.toString())
    );

    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }

    res.status(201).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
