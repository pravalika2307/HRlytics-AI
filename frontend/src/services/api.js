import axios from "axios";

const api = axios.create({
  baseURL: "https://hrlytics-ai.onrender.com/"
});

export default api;