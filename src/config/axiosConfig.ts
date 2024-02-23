import axios from "axios";
import { getCookie } from "typescript-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getCookie("userToken");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config);
  }
  return config;
});
export default instance;
