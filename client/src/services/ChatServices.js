import axios from "axios";
import { ApiInstance } from "./ApiInstance";

export const chatPage = async (credentials) => {
  try {
    const response = await ApiInstance.get("/api/chatPage/", {
      params: credentials,
    });
    return response.data;
  } catch (error) {
    console.error("Chat Page error:", error.response?.data || error.message);
    throw error;
  }
};

export const findFriends = async (searchTerm) => {
  try {
    const response = await ApiInstance.get("/api/friends/findFriends", {
      params: { searchTerm: searchTerm },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Chat Page Users List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFriends = async (userId) => {
  try {
    const response = await ApiInstance.get("/api/friends/getFriends", {
      params: { userId: userId },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Chat Page Friends List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatList = async (userId) => {
  try {
    const response = await ApiInstance.get("/api/chatPage/chats/chatList", {
      params: { userId: userId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Chat Page Friends List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const newChatRoom = async (userId, friendId) => {
  try {
    const response = await ApiInstance.post("/api/chatPage/chatRoom", {
      userId: userId,
      friendId: friendId,
    });
    return response.data.chatRoom;
  } catch (error) {
    console.error(
      "Chat Page Room List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatRoom = async (userId, friendId) => {
  try {
    const response = await ApiInstance.get("/api/chatPage/chatRoom", {
      params: {
        userId: userId,
        friendId: friendId,
      },
    });

    if (!response.data.chatRoom) {
      const chatRoom = newChatRoom(userId, friendId);
      return chatRoom;
    }

    return response.data.chatRoom;
  } catch (error) {
    console.error(
      "Chat Page Room List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatRoomData = async (chatRoomId) => {
  try {
    const response = await ApiInstance.get("/api/chatPage/chatRoom", {
      params: {
        chatRoomId: chatRoomId,
      },
    });

    return response.data.chatRoom;
  } catch (error) {
    console.error(
      "Chat Page Room List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFriend = async (userId) => {
  try {
    const response = await ApiInstance.get("/api/friends/getFriend", {
      params: { userId: userId },
    });

    return response.data.friend;
  } catch (error) {
    console.error(
      "Chat Page Friends List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMessages = async (chatRoomId) => {
  try {
    const response = await ApiInstance.get("/api/chatPage/chatRoom/messages", {
      params: { chatRoomId: chatRoomId },
    });
    return response.data.messages;
  } catch (error) {
    console.error(
      "Chat Page Friends List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const sendMessage = async (chatRoomId, userId, message,imageUrls,socket) => {
  try {
    let uploadedImageUrls = [];
    if (imageUrls.length > 0) {
      uploadedImageUrls = await Promise.all(
        imageUrls.map((imageUrl) => uploadImageToCloud(imageUrl.file))
      );
    }
    socket.emit("sendMessage", {
      chatRoomId,
      userId,
      message,
      uploadedImageUrls
    });
    const successMessage = "Message sent successfully"
    return successMessage

    /* const response = await ApiInstance.post("/api/chatPage/chatRoom/message", {
      chatRoomId: chatRoomId,
      userId: userId,
      message: message,
    });
    return response.data.newMessage; */
  } catch (error) {
    console.error(
      "Chat Page Friends List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const uploadImageToCloud = async (imageFile) => {
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_UPLOAD_PRESET;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
        );
    
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Chat Page Friends List error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


