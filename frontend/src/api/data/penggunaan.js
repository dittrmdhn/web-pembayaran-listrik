import apiClient from "..";

export const getPenggunaan = async () => {
	try {
		const response = await apiClient.get("/penggunaan");
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const addPenggunaan = async (payload) => {
	try {
		const response = await apiClient.post("/penggunaan", payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const updatePenggunaan = async (id, payload) => {
	try {
		const response = await apiClient.patch(`/penggunaan/${id}`, payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const deletePenggunaan = async (id) => {
	try {
		const response = await apiClient.delete(`/penggunaan/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
