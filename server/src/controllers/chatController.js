import ChatRoom from "../models/ChatRoom.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getChatRoom = async (req, res) => {
  try {
    const { userId, friendId, chatRoomId } = req.query;
    if (chatRoomId) {
      const chatRoom = await ChatRoom.findById(chatRoomId);
      return res.status(200).json({ chatRoom });
    }

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

export const sendMessage = async (req, res) => {
  try {
    const { message, userId, chatRoomId } = req.body;

    if (!message || !userId || !chatRoomId) {
      return res
        .status(400)
        .json({ message: "message, userId, chatRoom all are required" });
    }

    const newMessage = await Message.create({
      sender: userId,
      chatRoom: chatRoomId,
      message: message,
    });

    await ChatRoom.findByIdAndUpdate(
      chatRoomId,
      { lastMessage: newMessage._id },
      { new: true }
    );

    return res.status(201).json({ message: "Message Sent", newMessage });
  } catch (err) {
    console.error("Error in new message API:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.query;
    if (!chatRoomId) {
      return res.status(400).json({ message: " chatRoom id are required" });
    }

    const messages = await Message.find({
      chatRoom: chatRoomId,
    }).sort({ createdAt: 1 });

    return res.status(201).json({ messages });
  } catch (err) {
    console.error("Error in get message API:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const chatList = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).populate("friends");
    const friends = user.friends;
    const chatRooms = await ChatRoom.find({
      members: { $in: [userId] },
    })
      .populate("lastMessage")
      .sort({ updateAt: -1 });

    const users = await Promise.all(
      chatRooms.map(async (chatRoom) => {
        const otherMemberId = chatRoom.members.find(
          (member) => member.toString() !== userId
        );
        const otherMember = await User.findById(otherMemberId);

        return {
          _id: otherMember._id,
          firstname: otherMember.firstname,
          lastname: otherMember.lastname,
          username: otherMember.username,
          profilePicture: otherMember.profilePicture,
          lastMessage: chatRoom.lastMessage,
        };
      })
    );

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error in get message API:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
