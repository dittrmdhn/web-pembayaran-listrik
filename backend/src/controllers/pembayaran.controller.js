const {
	createPembayaranService,
	getPembayaranService,
	updatePembayaranService,
	deletePembayaranService,
	confirmPembayaranService,
	findPembayaranByIdTagihanService,
	checkPembayaranStatusService,
} = require("../services/pembayaran.service");

const getPembayaranController = async (req, res) => {
	try {
		const data = await getPembayaranService();
		res.status(200).json({ data: data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createPembayaranController = async (req, res) => {
	try {
		const payload = req.body;
		const data = await createPembayaranService(payload);
		res.status(201).json({
			message: "Pembayaran Berhasil",
			data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const confirmPembayaranController = async (req, res) => {
	const { id_tagihan } = req.params;
	const { id_user } = req.body; // id_user diambil dari request body

	try {
		if (!id_user) {
			return res.status(400).json({ error: "ID User diperlukan" });
		}

		const pembayaran = await confirmPembayaranService(
			parseInt(id_tagihan),
			id_user
		);
		res.json(pembayaran);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	confirmPembayaranController,
};

const updatePembayaranController = async (req, res) => {
	try {
		const payload = req.body;
		const id = parseInt(req.params.id);
		const data = await updatePembayaranService(id, payload);
		res.status(201).json({
			message: "Pembayaran Berubah",
			data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const deletePembayaranController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		await deletePembayaranService(id);
		res.status(200).json({ message: "Pembayaran Berhasil" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const checkPembayaranStatusController = async (req, res) => {
	const { id_tagihan } = req.params;

	try {
		const isConfirmed = await checkPembayaranStatusService(id_tagihan);
		return res.json({ terkonfirmasi: isConfirmed });
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	createPembayaranController,
	getPembayaranController,
	updatePembayaranController,
	deletePembayaranController,
	confirmPembayaranController,
	checkPembayaranStatusController,
};
