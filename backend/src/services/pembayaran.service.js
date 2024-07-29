const prismaClient = require("../application/database");

const createPembayaranService = async (payload) => {
	const {
		id_penggunaan,
		tanggal_pembayaran,
		bulan_bayar,
		biaya_admin,
		id_user,
	} = payload;

	const penggunaan = await prismaClient.penggunaan.findFirst({
		where: {
			id_penggunaan: id_penggunaan,
		},
		select: {
			id_pelanggan: true,
		},
	});

	if (!penggunaan) {
		throw new Error("Penggunaan tidak ditemukan");
	}

	const id_pelanggan = penggunaan.id_pelanggan;

	const tagihan = await prismaClient.tagihan.findFirst({
		where: {
			id_penggunaan: id_penggunaan,
		},
	});

	if (!tagihan) {
		throw new Error("Tagihan tidak ditemukan");
	}

	const pelanggan = await prismaClient.pelanggan.findUnique({
		where: {
			id_pelanggan: id_pelanggan,
		},
		select: {
			id_tarif: true,
		},
	});

	if (!pelanggan) {
		throw new Error("Pelanggan tidak ditemukan");
	}

	const tarif = await prismaClient.tarif.findUnique({
		where: {
			id_tarif: pelanggan.id_tarif,
		},
	});

	if (!tarif) {
		throw new Error("Tarif tidak ditemukan");
	}

	const total_bayar = tarif.tarifperkwh * tagihan.jumlah_meter + biaya_admin;

	const userExists = await prismaClient.user.findFirst({
		where: {
			id_user: id_user,
		},
	});

	if (!userExists) {
		throw new Error("User not found");
	}

	const pembayaran = await prismaClient.pembayaran.create({
		data: {
			id_tagihan: tagihan.id_tagihan,
			id_pelanggan,
			tanggal_pembayaran,
			bulan_bayar,
			biaya_admin,
			total_bayar,
			id_user,
		},
	});

	return pembayaran;
};

const confirmPembayaranService = async (id_tagihan, id_user) => {
	try {
		// Dapatkan detail tagihan dan pelanggan terkait
		const tagihan = await prismaClient.tagihan.findUnique({
			where: { id_tagihan: id_tagihan },
			include: { pelanggan: true },
		});

		if (!tagihan) {
			throw new Error("Tagihan tidak ditemukan");
		}

		if (tagihan.status !== "Lunas") {
			throw new Error("Tagihan belum lunas");
		}

		// Ambil tarif dari database
		const tarif = await prismaClient.tarif.findFirst({
			where: {
				pelanggan: {
					some: {
						id_pelanggan: tagihan.id_pelanggan,
					},
				},
			},
		});

		if (!tarif) {
			throw new Error("Tarif tidak ditemukan");
		}

		// Hitung biaya_admin
		let biaya_admin = 0;
		if (tarif.daya <= 900) {
			biaya_admin = 3000;
		} else if (tarif.daya <= 1300) {
			biaya_admin = 5000;
		} else {
			biaya_admin = 10000;
		}

		// Hitung total_bayar
		const total_bayar = tagihan.jumlah_meter * tarif.tarifperkwh;

		// Buat data pembayaran baru
		const pembayaran = await prismaClient.pembayaran.create({
			data: {
				id_tagihan: id_tagihan,
				id_pelanggan: tagihan.id_pelanggan,
				tanggal_pembayaran: new Date().toISOString(),
				bulan_bayar: tagihan.bulan,
				biaya_admin: biaya_admin,
				total_bayar: total_bayar + biaya_admin,
				id_user: id_user,
			},
		});

		return pembayaran;
	} catch (error) {
		throw new Error(error.message);
	}
};

const checkPembayaranStatusService = async (id_tagihan) => {
	try {
		const pembayaran = await prismaClient.pembayaran.findFirst({
			where: { id_tagihan: parseInt(id_tagihan) },
		});

		return !!pembayaran;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	confirmPembayaranService,
};

const createPembayaranByNomorKwhService = async (payload) => {
	const { nomor_kwh, tanggal_pembayaran, bulan_bayar, biaya_admin, id_user } =
		payload;

	const tagihan = await getTagihanByNomorKWH(nomor_kwh);

	if (!tagihan) {
		throw new Error("Tidak ada tagihan");
	}

	const tarif = await prismaClient.tarif.findFirst({
		where: {
			pelanggan: {
				some: {
					id_pelanggan: tagihan.id_pelanggan,
				},
			},
		},
	});

	if (!tarif) {
		throw new Error("Tarif tidak ditemukan");
	}

	const total_bayar = tagihan.jumlah_meter * tarif.tarifperkwh;

	const data = {
		id_penggunaan: tagihan.id_penggunaan,
		tanggal_pembayaran,
		bulan_bayar,
		biaya_admin,
		total_bayar,
		id_user,
	};

	return data;
};

const getPembayaranService = async () => {
	return await prismaClient.pembayaran.findMany({
		include: {
			tagihan: {
				include: {
					penggunaan: true,
				},
			},
			user: {
				include: {
					level: true,
				},
			},
		},
	});
};

const updatePembayaranService = async (id_pembayaran, payload) => {
	const {
		id_penggunaan,
		tanggal_pembayaran,
		bulan_bayar,
		biaya_admin,
		id_user,
	} = payload;

	// Cari data pembayaran berdasarkan id_pembayaran
	const pembayaran = await prismaClient.pembayaran.findUnique({
		where: {
			id_pembayaran: id_pembayaran,
		},
	});

	if (!pembayaran) {
		throw new Error("Pembayaran tidak ditemukan");
	}

	// Validasi jika id_penggunaan berbeda dari yang ada di pembayaran saat ini
	if (id_penggunaan !== pembayaran.id_penggunaan) {
		const penggunaan = await prismaClient.penggunaan.findFirst({
			where: {
				id_penggunaan: id_penggunaan,
			},
			select: {
				id_pelanggan: true,
			},
		});

		if (!penggunaan) {
			throw new Error("Penggunaan tidak ditemukan");
		}

		const id_pelanggan = penggunaan.id_pelanggan;

		const tagihan = await prismaClient.tagihan.findFirst({
			where: {
				id_penggunaan: id_penggunaan,
			},
		});

		if (!tagihan) {
			throw new Error("Tagihan tidak ditemukan");
		}

		const pelanggan = await prismaClient.pelanggan.findUnique({
			where: {
				id_pelanggan: id_pelanggan,
			},
			select: {
				id_tarif: true,
			},
		});

		if (!pelanggan) {
			throw new Error("Pelanggan tidak ditemukan");
		}

		const tarif = await prismaClient.tarif.findUnique({
			where: {
				id_tarif: pelanggan.id_tarif,
			},
		});

		if (!tarif) {
			throw new Error("Tarif tidak ditemukan");
		}

		const total_bayar = tarif.tarifperkwh * tagihan.jumlah_meter;

		// Update data pembayaran
		const updatedPembayaran = await prismaClient.pembayaran.update({
			where: {
				id_pembayaran: id_pembayaran,
			},
			data: {
				id_tagihan: tagihan.id_tagihan,
				id_pelanggan,
				tanggal_pembayaran,
				bulan_bayar,
				biaya_admin,
				total_bayar,
				id_user,
			},
		});

		return updatedPembayaran;
	} else {
		// Update data pembayaran tanpa perubahan id_penggunaan
		const updatedPembayaran = await prismaClient.pembayaran.update({
			where: {
				id_pembayaran: id_pembayaran,
			},
			data: {
				tanggal_pembayaran,
				bulan_bayar,
				biaya_admin,
				id_user,
			},
		});

		return updatedPembayaran;
	}
};

const deletePembayaranService = async (id_pembayaran) => {
	await prismaClient.pembayaran.delete({
		where: {
			id_pembayaran,
		},
	});
};

module.exports = {
	createPembayaranService,
	createPembayaranByNomorKwhService,
	getPembayaranService,
	updatePembayaranService,
	deletePembayaranService,
	confirmPembayaranService,
	checkPembayaranStatusService,
};
