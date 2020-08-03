import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjZmYmU3N2QzNjIzNGI1ZWUyY2ExNCIsInVzZXJuYW1lIjoicmlsZXkiLCJpYXQiOjE1OTYzOTI4NDIsImV4cCI6MTU5NjM5NDY0Mn0.8mBNb-LS38EaoMlsKyFgloLVVWE96kjJVHSY0s6aVlE",
  },
});

export default axiosInstance;
