import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:5275/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
