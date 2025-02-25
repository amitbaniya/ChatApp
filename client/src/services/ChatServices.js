import ApiInstance from "./ApiInstance";

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

export const newChatRoom = async (userId, friendId) => {
  try {
    const response = await ApiInstance.post("/api/chatPage/chatRoom", {
      userId: userId,
      friendId: friendId,
    });
    console.log(response.data);
    return response.data;
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
