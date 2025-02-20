import axios from "axios";

const AuthAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
export default AuthAPI;
