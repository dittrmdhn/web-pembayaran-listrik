import apiClient from "..";

export const getTagihan = async () => {
	try {
		const response = await apiClient.get("/tagihan");
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const findTagihanByNomorKwh = async (nomor_kwh) => {
	try {
		const response = await apiClient.get("/tagihan/nomor_kwh", {
			params: { nomor_kwh },
		});
		return response;
	} catch (error) {
		console.log(error);
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const bayarTagihan = async (id_tagihan) => {
	try {
		const response = await apiClient.patch(`/tagihan/bayar/${id_tagihan}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const deleteTagihan = async (id_tagihan) => {
	try {
		const response = await apiClient.delete(`/tagihan/${id_tagihan}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
