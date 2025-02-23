import { ChatAPI } from "./ApiUrl";
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
