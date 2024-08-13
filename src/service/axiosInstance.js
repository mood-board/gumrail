import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://651c-95-90-247-131.ngrok-free.app",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can modify the request config here
//     // For example, you can add an auth token
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors here
//     return Promise.reject(error);
//   },
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // You can modify the response data here
//     return response;
//   },
//   (error) => {
//     // Handle response errors here
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("Response error:", error.response.data);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("Request error:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
