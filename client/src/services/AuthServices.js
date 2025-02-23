import ApiInstance from "./ApiInstance";

export const loginUser = async (credentials) => {
  try {
    const response = await ApiInstance.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (credentials) => {
  try {
    const response = await ApiInstance.post("/api/auth/register", credentials);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};
