import axios from "axios";
const Backend=import.meta.env.VITE_BACKEND_URL
const API = axios.create({
 baseURL: `${Backend}/api`,
 withCredentials: true
});

export default API;