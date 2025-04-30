import axios from "axios";
import { socket } from "./socket";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (socket && socket.id) {
    config.headers["x-socket-id"] = socket.id;
  }
  return config;
});

export default api;
