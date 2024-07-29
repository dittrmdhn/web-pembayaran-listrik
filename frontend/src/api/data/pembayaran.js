import apiClient from "..";

export const getPembayaran = async () => {
	try {
		const response = await apiClient.get("/pembayaran");
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const addPembayaran = async (payload) => {
	try {
		const response = await apiClient.post("/pembayaran", payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const confirmPembayaran = async (id) => {
	try {
		await apiClient.post("/pembayaran/konfirmasi", +{ id });
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const updatePembayaran = async (id, payload) => {
	try {
		const response = await apiClient.patch(`/pembayaran/${id}`, payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const deletePembayaran = async (id) => {
	try {
		const response = await apiClient.delete(`/pembayaran/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const getPembayaranByPenggunaanId = async (id) => {
	try {
		const response = await apiClient.get(`/pembayaran/penggunaan/${id}`);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const confirmPembayaranAPI = async (id, data) => {
	try {
		const response = await apiClient.post(`/pembayaran/konfirmasi/${id}`, data);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const checkPembayaranStatus = async (id_tagihan) => {
	try {
		const response = await apiClient.get(`/pembayaran/status/${id_tagihan}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
