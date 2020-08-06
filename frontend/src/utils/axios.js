import axios from "axios";

const token = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: "https://fake-gram.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
