import User from "../models/User.js";

export const findFriends = async (req, res) => {
  try {
    const { searchTerm } = req.query;
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

export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
      return res.status(400).json({ message: "No user ID provided" });
    }
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);
    await user.save();
    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "No user ID provided" });
    }

    const user = await User.findById(userId).populate(
      "friends",
      "_id firstname lastname username profilePicture"
    );

    const friends = user.friends.map((friend) => ({
      _id: friend._id,
      firstname: friend.firstname,
      lastname: friend.lastname,
      username: friend.username,
      profilePicture: friend.profilePicture,
    }));

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFriend = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "No user ID provided" });
    }

    const friend = await User.findById(userId).select(
      "_id firstname lastname profilePicture"
    );

    res.status(200).json({ friend });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
