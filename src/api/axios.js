import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // Change to your backend
});

// Automatically add token from localStorage (if present)
instance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
