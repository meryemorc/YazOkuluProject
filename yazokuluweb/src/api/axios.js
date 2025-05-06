import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5275", // Swagger portun neyse onu yaz
});

export default axiosInstance;
