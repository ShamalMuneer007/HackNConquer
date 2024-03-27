import userSlice, { logout } from "@/redux/reducers/userSlice";
import { store } from "@/redux/store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCookie, removeCookie } from "typescript-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getCookie("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config);
  }
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("ERROR : ", error);
    return Promise.reject(error);
  }
);
export default instance;
