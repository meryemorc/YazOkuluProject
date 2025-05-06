import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5275/api/',  // Backend API URL
});

export default axiosInstance;