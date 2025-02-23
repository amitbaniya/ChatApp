import User from "../models/User.js";

export const findFriends = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.log(req.query);
    if (!searchTerm) {
      return res.status(400).json({ message: "No search Term" });
    }

    const textUsers = await User.find({
      $text: { $search: searchTerm },
    }).sort({ score: { $meta: "textScore" } });

    const regexUsers = await User.find({
      username: { $regex: searchTerm, $options: "i" },
    });

    const users = [...textUsers, ...regexUsers].filter(
      (user, index, self) =>
        index ===
        self.findIndex((u) => u._id.toString() === user._id.toString())
    );

    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
