import axios from "axios";
import Cookies from "js-cookie";
const apiClient = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

apiClient.interceptors.request.use(
	(config) => {
		const token = Cookies.get("token"); // Ambil token dari cookies
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;
