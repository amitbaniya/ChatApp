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
