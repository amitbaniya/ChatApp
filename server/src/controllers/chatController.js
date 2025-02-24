import ChatRoom from "../models/ChatRoom.js";
import User from "../models/User.js";

export const messages = async (req, res) => {
  try {
    const { userId, friendId } = req.query;

    if (!userId || !friendId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const chatRoomExists = await ChatRoom.exists({
      isGroupChat: false,
      members: { $all: [userId, friendId] },
    });

    if (!chatRoomExists) {
      ChatRoom.create({
        isGroupChat: false,
        members: [userId, friendId],
      });
    }
    res.status(200).json({ user });
  } catch {
    console.error("Error in chatPage API:", error);
    res.status(500).json({ message: "Server error" });
  }
};
