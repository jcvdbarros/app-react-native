import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-19w2.onrender.com",
});

export default api;
