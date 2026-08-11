import axios from "axios";

// Access the Vite environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 120000, // 120 seconds timeout to accommodate Render backend wakeup time
});

export default api;
