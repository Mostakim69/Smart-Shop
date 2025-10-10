import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    // const token =
    //   typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
