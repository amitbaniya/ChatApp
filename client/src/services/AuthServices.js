import { AuthAPI } from "./ApiUrl";

export const loginUser = async (credentials) => {
  try {
    const response = await AuthAPI.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

