import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", 
  // baseURL: "vercl route"
});

api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;
