import axios from "axios";

export default function useAxiosSecure() {
  // Just a normal Axios instance — no JWT headers needed
  const axiosSecure = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://smart-shop-server.vercel.app",
  });

  return axiosSecure;
}
