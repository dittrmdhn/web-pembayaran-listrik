const {
	getPelangganService,
	createPelangganService,
	updatePelangganService,
	deletePelangganService,
	getPelangganByIdService,
} = require("../services/pelanggan.service");

const getPelangganController = async (req, res) => {
	try {
		const data = await getPelangganService();

		// const formattedPelanggan = data.map((pelanggan) => {
		// 	return {
		// 		id_pelanggan: pelanggan.id_pelanggan,
		// 		username: pelanggan.username,
		// 		password: pelanggan.password,
		// 		nama_pelanggan: pelanggan.nama_pelanggan,
		// 		nomor_kwh: pelanggan.nomor_kwh,
		// 		alamat: pelanggan.alamat,
		// 		daya: pelanggan.tarif.daya,
		// 	};
		// });

		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPelangganByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getPelangganByIdService(id);
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createPelangganController = async (req, res) => {
	try {
		const payload = req.body;
		const data = await createPelangganService(payload);
		res.status(201).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updatePelangganController = async (req, res) => {
	try {
		const payload = req.body;
		const id = parseInt(req.params.id);
		const data = await updatePelangganService(id, payload);
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deletePelangganController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		await deletePelangganService(id);
		res.status(200).json({ message: "Data pelanggan berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getPelangganController,
	createPelangganController,
	updatePelangganController,
	deletePelangganController,
	getPelangganByIdController,
};
