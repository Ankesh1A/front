import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://back1-0dbz.onrender.com',
 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookies ko bhejne ke liye
});

export default axiosInstance;
