import axios from "axios";
import { API_URL } from "./Constants";

export const AuthAPI = axios.create({
  baseURL: API_URL + "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ProfilePictureAPI = axios.create({
  baseURL: API_URL + "/uploads/profiles", // example URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const ChatAPI = axios.create({
  baseURL: API_URL + "/api/chatPage",
  headers: {
    "Content-Type": "application/json",
  },
});

export const FriendsAPI = axios.create({
  baseURL: API_URL + "/api/friends",
  headers: {
    "Content-Type": "application/json",
  },
});
