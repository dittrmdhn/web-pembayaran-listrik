const prismaClient = require("../application/database");
const bcrypt = require("bcrypt");

const getPelangganService = async () => {
	return await prismaClient.pelanggan.findMany({
		include: {
			tarif: true,
		},
	});
};

const getPelangganByIdService = async (id_pelanggan) => {
	const pelanggan = await prismaClient.pelanggan.findFirst({
		where: {
			id_pelanggan: parseInt(id_pelanggan),
		},

		include: {
			tarif: true,
		},
	});

	if (!pelanggan) {
		throw new Error("Pelanggan tidak ditemukan");
	}

	return pelanggan;
};

const createPelangganService = async (payload) => {
	const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } =
		payload;
	const existingUser = await prismaClient.pelanggan.findFirst({
		where: {
			username: username,
		},
	});
	if (existingUser) {
		throw new Error("Username sudah terdaftar");
	}
	const existingNomorKwh = await prismaClient.pelanggan.findFirst({
		where: {
			nomor_kwh: nomor_kwh,
		},
	});
	if (existingNomorKwh) {
		throw new Error("Nomor KWH sudah terdaftar");
	}

	const existingIdTarif = await prismaClient.tarif.findFirst({
		where: {
			id_tarif: id_tarif,
		},
	});
	if (!existingIdTarif) {
		throw new Error("Id Tarif Tidak ditemukan");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prismaClient.pelanggan.create({
		data: {
			username,
			password: hashedPassword,
			nomor_kwh,
			nama_pelanggan,
			alamat,
			id_tarif,
		},
	});
	return user;
};

const checkPelangganExist = async (nomor_kwh, id_pelanggan) => {
	const existingPelanggan = await prismaClient.pelanggan.findFirst({
		where: {
			nomor_kwh,
		},
	});

	if (existingPelanggan && existingPelanggan.id_pelanggan !== id_pelanggan) {
		throw new Error("Pelanggan sudah terdaftar");
	}
};

const updatePelangganService = async (id_pelanggan, payload) => {
	await checkPelangganExist(payload.nomor_kwh, id_pelanggan);
	const usernameExists = await prismaClient.pelanggan.findFirst({
		where: {
			username: payload.username,
		},
	});

	if (usernameExists && usernameExists.id_pelanggan !== id_pelanggan) {
		throw new Error("Username sudah terdaftar, gunakan username lain!");
	}
	const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } =
		payload;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prismaClient.pelanggan.update({
		where: {
			id_pelanggan,
		},
		data: {
			username,
			password: hashedPassword,
			nomor_kwh,
			nama_pelanggan,
			alamat,
			id_tarif,
		},
	});
	return user;
};

const deletePelangganService = async (id_pelanggan) => {
	const existingPelanggan = await prismaClient.pelanggan.findFirst({
		where: {
			id_pelanggan,
		},
	});

	if (!existingPelanggan) {
		throw new Error("Pelanggan tidak ditemukan");
	}
	const user = await prismaClient.pelanggan.delete({
		where: {
			id_pelanggan,
		},
	});
	return user;
};
module.exports = {
	getPelangganService,
	createPelangganService,
	updatePelangganService,
	deletePelangganService,
	getPelangganByIdService,
};
