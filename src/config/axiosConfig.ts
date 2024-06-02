import axios from "axios";
import { getCookie } from "typescript-cookie";

const instance = axios.create({
  baseURL: "https://www.needus.store",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken") as string;
  console.log("ENCODED TOKEN : {}", token);
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
