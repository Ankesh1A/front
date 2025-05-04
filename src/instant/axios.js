import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://back1-0dbz.onrender.com',
  // baseURL: 'http://localhost:8080',  Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookies ko bhejne ke liye
});

export default axiosInstance;
