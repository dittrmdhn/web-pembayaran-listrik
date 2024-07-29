const {
	getTarifService,
	createTarifService,
	updateTarifService,
	deleteTarifService,
} = require("../services/tarif.service");

const getTarifController = async (req, res) => {
	try {
		const data = await getTarifService();
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTarifPublicController = async (req, res) => {
	try {
		const data = await getTarifService();
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createTarifController = async (req, res) => {
	try {
		const payload = req.body;
		const data = await createTarifService(payload);
		res.status(201).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateTarifController = async (req, res) => {
	try {
		const payload = req.body;
		const id = parseInt(req.params.id);
		const data = await updateTarifService(id, payload);
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteTarifController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		await deleteTarifService(id);
		res.status(200).json({ message: "Data tarif berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getTarifController,
	createTarifController,
	updateTarifController,
	deleteTarifController,
	getTarifPublicController,
};
