import apiClient from "..";

export const getLevel = async () => {
	try {
		const response = await apiClient.get("/level");
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};
