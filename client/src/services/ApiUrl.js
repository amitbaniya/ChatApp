import axios from "axios";

export const AuthAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ProfilePictureAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/uploads/profiles", // example URL
  headers: {
    "Content-Type": "application/json",
  },
});
