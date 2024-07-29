import apiClient from "..";

export const getUser = async () => {
	try {
		const response = await apiClient.get("/user");
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const addUser = async (payload) => {
	try {
		const response = await apiClient.post("/user", payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const updateUser = async (id, payload) => {
	try {
		const response = await apiClient.patch(`/user/${id}`, payload);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export const deleteUser = async (id) => {
	try {
		const response = await apiClient.delete(`/user/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Ada kesalahan");
	}
};

export default { getUser, addUser, updateUser, deleteUser };
