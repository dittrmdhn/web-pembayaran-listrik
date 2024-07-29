import apiClient from "..";

export const getTarif = async () => {
	try {
		const response = await apiClient.get("/tarif");
		console.log(response.data);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Ada kesalahan");
	}
};

export const getTarifPublic = async () => {
	try {
		const response = await apiClient.get("/tarif/public");
		console.log(response.data);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Ada kesalahan");
	}
};

export const addTarif = async (payload) => {
	try {
		const response = await apiClient.post("/tarif", payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const updateTarif = async (id_tarif, payload) => {
	try {
		const response = await apiClient.patch(`/tarif/${id_tarif}`, payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const deleteTarif = async (id_tarif) => {
	try {
		const response = await apiClient.delete(`/tarif/${id_tarif}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
