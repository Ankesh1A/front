import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookies ko bhejne ke liye
});

export default axiosInstance;
