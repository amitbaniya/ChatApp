import User from "../models/User.js";

export const findFriends = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.log("Search term:", searchTerm);
    if (!searchTerm) {
      return res.status(400).json({ message: "No search Term" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { firstname: { $regex: searchTerm, $options: "i" } },
        { lastname: { $regex: searchTerm, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstname", " ", "$lastname"] },
              regex: searchTerm,
              options: "i",
            },
          },
        },
      ],
    });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
