const prismaClient = require("../application/database");

const createTagihanService = async (payload, id_penggunaan) => {
	const { id_pelanggan, bulan, tahun, status } = payload;

	const penggunaanData = await prismaClient.penggunaan.findFirst({
		where: {
			id_penggunaan,
		},
	});

	if (penggunaanData && penggunaanData.id_penggunaan !== id_penggunaan) {
		throw new Error("Penggunaan tidak ditemukan");
	}

	const jumlah_meter = penggunaanData.meter_akhir - penggunaanData.meter_awal;

	const tagihan = await prismaClient.tagihan.create({
		data: {
			id_penggunaan,
			id_pelanggan,
			bulan,
			tahun,
			jumlah_meter,
			status,
		},
	});

	return tagihan;
};

const getTagihanByIdService = async (id_pelanggan) => {
	const tagihan = await prismaClient.tagihan.findFirst({
		where: {
			id_pelanggan,
		},

		include: {
			pembayaran: true,
			penggunaan: true,
			pelanggan: true,
			tarif: true,
		},
	});

	return tagihan;
};

const getTagihanService = async () => {
	return await prismaClient.tagihan.findMany({
		include: {
			pelanggan: {
				select: {
					nomor_kwh: true,
				},
			},
		},
	});
};

const updateTagihanService = async (id_tagihan, payload) => {
	const tagihan = await prismaClient.tagihan.update({
		where: {
			id_tagihan,
		},
		data: {
			status: payload.status,
		},
	});
	return tagihan;
};

const getTagihanBelumLunasByNomorKWH = async (nomor_kwh) => {
	const tagihan = await prismaClient.tagihan.findMany({
		where: {
			pelanggan: {
				nomor_kwh: nomor_kwh,
			},
			status: "Belum Bayar",
		},
		include: {
			pelanggan: true,
			penggunaan: true,
		},
	});

	if (tagihan.length === 0) {
		return [];
	}

	const tagihanWithTotalBayar = await Promise.all(
		tagihan.map(async (t) => {
			const tarif = await prismaClient.tarif.findFirst({
				where: {
					id_tarif: t.pelanggan.id_tarif,
				},
			});

			if (!tarif) {
				throw new Error("Tarif not found for the customer");
			}

			let biaya_admin = 0;
			if (tarif.daya <= 900) {
				biaya_admin = 3000;
			} else if (tarif.daya <= 1300) {
				biaya_admin = 5000;
			} else {
				biaya_admin = 10000;
			}

			const total_bayar = t.jumlah_meter * tarif.tarifperkwh + biaya_admin;

			return {
				...t,
				total_bayar,
				biaya_admin,
			};
		})
	);

	return tagihanWithTotalBayar;
};

const bayarTagihanService = async (id_tagihan) => {
	const tagihan = await prismaClient.tagihan.update({
		where: {
			id_tagihan: parseInt(id_tagihan),
		},
		data: {
			status: "Lunas",
		},
	});
	return tagihan;
};

const deleteTagihanService = async (id_tagihan) => {
	try {
		// Hapus data terkait di tabel pembayaran
		await prismaClient.pembayaran.deleteMany({
			where: { id_tagihan: parseInt(id_tagihan) },
		});

		// Hapus data di tabel tagihan
		const tagihan = await prismaClient.tagihan.delete({
			where: {
				id_tagihan: parseInt(id_tagihan),
			},
		});
		return tagihan;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	createTagihanService,
	getTagihanByIdService,
	getTagihanService,
	updateTagihanService,
	getTagihanBelumLunasByNomorKWH,
	bayarTagihanService,
	deleteTagihanService,
};
