import apiClient from "..";

export const getPelanggan = async () => {
	try {
		const response = await apiClient.get("/pelanggan");
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const addPelanggan = async (payload) => {
	try {
		const response = await apiClient.post("/pelanggan", payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const updatePelanggan = async (id, payload) => {
	try {
		const response = await apiClient.patch(`/pelanggan/${id}`, payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const deletePelanggan = async (id) => {
	try {
		const response = await apiClient.delete(`/pelanggan/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const getPelangganById = async (id) => {
	try {
		const response = await apiClient.get(`/pelanggan/${id}`);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
