const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prismaClient = require("../application/database");
require("dotenv").config();

const registerService = async (payload) => {
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

const loginService = async (payload) => {
	const { username, password } = payload;

	const user = await prismaClient.pelanggan.findFirst({
		where: { username },
	});

	if (!user) {
		throw new Error("Username atau password salah");
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw new Error("Username atau password salah");
	}

	const token = jwt.sign(
		{
			id_pelanggan: user.id_pelanggan,
			username: user.username,
			level: "Pelanggan",
		},
		process.env.SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);

	const { password: _, ...userWithoutPassword } = user;
	return { user: userWithoutPassword, token };
};

const userRegisterService = async (payload) => {
	const { username, password, nama_admin, id_level } = payload;

	const existingUser = await prismaClient.user.findFirst({
		where: {
			username: username,
		},
	});

	if (existingUser) {
		throw new Error("Username sudah terdaftar");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prismaClient.user.create({
		data: {
			username,
			password: hashedPassword,
			nama_admin,
			id_level,
		},
	});

	return user;
};

const userLoginService = async (payload) => {
	const { username, password } = payload;

	const user = await prismaClient.user.findFirst({
		where: { username },
		include: { level: true },
	});
	if (!user) {
		throw new Error("Username atau password salah");
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		throw new Error("Username atau password salah");
	}

	const token = jwt.sign(
		{
			id_user: user.id_user,
			level: user.level.nama_level,
			username: user.username,
		},
		process.env.SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);

	const { password: _, ...userWithoutPassword } = user;
	return { user: userWithoutPassword, token };
};

module.exports = {
	registerService,
	loginService,
	userRegisterService,
	userLoginService,
};
