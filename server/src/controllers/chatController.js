import ChatRoom from "../models/ChatRoom.js";

export const getChatRoom = async (req, res) => {
  try {
    const { userId, friendId } = req.query;

    if (!userId || !friendId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const chatRoom = await ChatRoom.findOne({
      isGroupChat: false,
      members: { $all: [userId, friendId] },
    });

    if (!chatRoom) {
      return res.status(200).json({ message: "Chat room not found", chatRoom });
    }

    return res.status(200).json({ chatRoom });
  } catch (err) {
    console.error("Error in chatPage API:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createChatRoom = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
      return res
        .status(400)
        .json({ message: "User ID and Friend ID are required" });
    }

    let chatRoom = await ChatRoom.findOne({
      isGroupChat: false,
      members: { $all: [userId, friendId] },
    });

    if (chatRoom) {
      return res
        .status(200)
        .json({ message: "Chat room already exists", chatRoom });
    }

    chatRoom = await ChatRoom.create({
      isGroupChat: false,
      members: [userId, friendId],
    });

    return res.status(201).json({ message: "Chat room created", chatRoom });
  } catch (err) {
    console.error("Error in createChatRoom API:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
