import { Navigate } from "react-router-dom";
import apiClient from ".";
import Cookies from "js-cookie";

export const loginUser = async (username, password) => {
	try {
		const response = await apiClient.post("/auth/login-user", {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const loginPelanggan = async (username, password) => {
	try {
		const response = await apiClient.post("/auth/login-pelanggan", {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const registerPelanggan = async (payload) => {
	try {
		const response = await apiClient.post("/auth/register-pelanggan", payload);
		return response.data;
	} catch (error) {
		console.error("Error in registerPelanggan:", error.response.data);
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const logout = async () => {
	try {
		const response = await apiClient.get("/auth/logout-user");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
