import { ChatAPI, FriendsAPI } from "./ApiUrl";
export const chatPage = async (credentials) => {
  try {
    const response = await ChatAPI.get("/", {
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
    const response = await FriendsAPI.get("/findFriends", {
      params: { searchTerm: searchTerm },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Chat Page Friends error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
