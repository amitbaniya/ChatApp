import axios from "axios";
import { API_URL } from "./Constants";

const ApiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const setupInterceptors = (logout) => {
  ApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Token expired, logging out...");
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export { ApiInstance, setupInterceptors };
