const prismaClient = require("../application/database");

const createPenggunaanService = async (payload) => {
	const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = payload;

	const mustPelangganExist = await prismaClient.pelanggan.findUnique({
		where: { id_pelanggan },
	});

	if (!mustPelangganExist) {
		throw new Error("Pelanggan tidak ditemukan");
	}

	const penggunaan = await prismaClient.penggunaan.create({
		data: {
			id_pelanggan,
			bulan,
			tahun,
			meter_awal,
			meter_akhir,
		},
	});

	return penggunaan;
};

const getPenggunaanService = async () => {
	return await prismaClient.penggunaan.findMany();
};

const getPenggunaanByIdService = async (id_penggunaan) => {
	return await prismaClient.penggunaan.count({
		where: {
			id_penggunaan,
		},
	});
};

const updatePenggunaanService = async (id_penggunaan, payload) => {
	const mustPelangganExist = await prismaClient.pelanggan.findFirst({
		where: { id_pelanggan: payload.id_pelanggan },
	});

	if (!mustPelangganExist) {
		throw new Error("Pelanggan tidak ditemukan");
	}

	const penggunaan = await prismaClient.penggunaan.update({
		where: {
			id_penggunaan,
		},
		data: {
			...payload,
		},
	});

	return penggunaan;
};

const deletePenggunaanService = async (id_penggunaan) => {
	const relatedTagihan = await prismaClient.tagihan.findMany({
		where: {
			id_penggunaan: parseInt(id_penggunaan),
		},
	});

	// Jika tidak ditemukan data terkait di tagihan, lanjutkan dengan penghapusan
	if (relatedTagihan.length === 0) {
		const penggunaan = await prismaClient.penggunaan.delete({
			where: {
				id_penggunaan: parseInt(id_penggunaan),
			},
		});
		return penggunaan;
	} else {
		throw new Error(
			"Data terkait di tagihan. Tidak bisa menghapus data penggunaan ini (hapus tagihan terlebih dahulu)."
		);
	}
};

module.exports = {
	createPenggunaanService,
	getPenggunaanService,
	updatePenggunaanService,
	deletePenggunaanService,
};
