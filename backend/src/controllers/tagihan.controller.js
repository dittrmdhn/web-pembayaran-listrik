const {
	createTagihanService,
	getTagihanByIdService,
	getTagihanService,
	getTagihanByNomorKWHService,
	getTagihanBelumLunasByNomorKWH,
	bayarTagihanService,
	deleteTagihanService,
} = require("../services/tagihan.service");

const getTagihanController = async (req, res) => {
	try {
		const data = await getTagihanService();

		const formattedData = data.map((tagihan) => ({
			id_tagihan: tagihan.id_tagihan,
			id_penggunaan: tagihan.id_penggunaan,
			id_pelanggan: tagihan.id_pelanggan,
			bulan: tagihan.bulan,
			tahun: tagihan.tahun,
			jumlah_meter: tagihan.jumlah_meter,
			status: tagihan.status,
			nomor_kwh: tagihan.pelanggan.nomor_kwh,
		}));

		res.status(200).json({ data: formattedData });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createTagihanController = async (req, res) => {
	try {
		const payload = req.body;
		const data = await createTagihanService(payload);
		res.status(201).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTagihanByIdController = async (req, res) => {
	try {
		const id_pelanggan = parseInt(req.params.id_pelanggan);
		const tagihan = await getTagihanByIdService(id_pelanggan);

		if (!tagihan || tagihan.length === 0) {
			return res
				.status(404)
				.json({ error: "Tagihan tidak ditemukan untuk ID pelanggan ini" });
		}
		res.status(200).json({ data: tagihan });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateTagihanController = async (req, res) => {
	try {
		const id_tagihan = parseInt(req.params.id);
		const { status } = req.body; // Hanya status yang diupdate
		if (!status) {
			return res.status(400).json({ error: "Status harus disediakan" });
		}
		const data = await updateTagihanService(id_tagihan, { status });
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const findTagihanByNomorKwhController = async (req, res) => {
	try {
		const { nomor_kwh } = req.query;

		if (!nomor_kwh) {
			return res.status(400).json({ error: "nomor_kwh is required" });
		}

		const tagihan = await getTagihanBelumLunasByNomorKWH(nomor_kwh);

		res.status(200).json(
			tagihan.map((t) => ({
				id_tagihan: t.id_tagihan,
				id_pelanggan: t.pelanggan.id_pelanggan,
				nama_pelanggan: t.pelanggan.nama_pelanggan,
				bulan: t.bulan,
				tahun: t.tahun,
				total_bayar: t.total_bayar,
				status: t.status,
				biaya_admin: t.biaya_admin,
			}))
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const bayarTagihanController = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ error: "id is required" });
		}
		const tagihan = await bayarTagihanService(id);
		res.status(200).json({ data: tagihan });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteTagihanController = async (req, res) => {
	try {
		const { id } = req.params;
		await deleteTagihanService(id);
		res.status(200).json({ message: "Data tagihan berhasil dihapus" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	createTagihanController,
	getTagihanByIdController,
	getTagihanController,
	updateTagihanController,
	findTagihanByNomorKwhController,
	bayarTagihanController,
	deleteTagihanController,
};
