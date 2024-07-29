const { logger } = require("../application/logging");
const {
	createPenggunaanService,
	getPenggunaanService,
	updatePenggunaanService,
	deletePenggunaanService,
} = require("../services/penggunaan.service");

const createPenggunaanController = async (req, res) => {
	try {
		const payload = req.body;
		const data = await createPenggunaanService(payload);
		res.status(201).json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getPenggunaanController = async (req, res) => {
	try {
		const startTime = performance.now(); 
		const data = await getPenggunaanService(); 

		const endTime = performance.now(); 
		const executionTime = endTime - startTime; 

		res.status(200).json({ data });
		logger.info(`getPenggunaanController executed in ${executionTime}ms`);
		logger.info(data); 
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const updatePenggunaanController = async (req, res) => {
	try {
		const payload = req.body;
		const id = parseInt(req.params.id);
		const data = await updatePenggunaanService(id, payload);
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deletePenggunaanController = async (req, res) => {
	try {
		const { id } = req.params;
		await deletePenggunaanService(id);
		res.status(200).json({ message: "Data penggunaan berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createPenggunaanController,
	getPenggunaanController,
	updatePenggunaanController,
	deletePenggunaanController,
};
