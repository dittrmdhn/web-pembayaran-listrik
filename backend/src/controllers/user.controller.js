const {
	getUserService,
	createUserService,
	updateUserService,
	deleteUserService,
} = require("../services/user.service");

const getUserController = async (req, res) => {
	try {
		const data = await getUserService();
		res.status(200).json({ data: data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createUserController = async (req, res) => {
	try {
		const payload = req.body;
		const data = await createUserService(payload);
		res.status(201).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUserController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const payload = req.body;
		const data = await updateUserService(id, payload);

		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteUserController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		await deleteUserService(id);
		res.status(200).json({ message: "Data user berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getUserController,
	createUserController,
	updateUserController,
	deleteUserController,
};
