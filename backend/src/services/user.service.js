const prismaClient = require("../application/database");
const bcrypt = require("bcrypt");

const getUserService = async () => {
	return await prismaClient.user.findMany({
		include: {
			level: true,
		},
	});
};

const createUserService = async (payload) => {
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

const updateUserService = async (id_user, payload) => {
	const { username, password, nama_admin, id_level } = payload;

	let hashedPassword = undefined;
	if (password) {
		hashedPassword = await bcrypt.hash(password, 10);
	}

	const existingUser = await prismaClient.user.findFirst({
		where: {
			username,
		},
	});

	if (existingUser && existingUser.id_user !== id_user) {
		throw new Error("Username sudah ada");
	}

	const user = await prismaClient.user.update({
		where: {
			id_user,
		},
		data: {
			username,
			password: hashedPassword !== undefined ? hashedPassword : undefined,
			nama_admin,
			id_level,
		},
	});

	return user;
};

const deleteUserService = async (id_user) => {
	const existingUser = await prismaClient.user.findFirst({
		where: {
			id_user,
		},
	});

	if (!existingUser) {
		throw new Error("Username tidak ditemukan");
	}
	await prismaClient.user.delete({
		where: {
			id_user,
		},
	});
};

module.exports = {
	createUserService,
	updateUserService,
	deleteUserService,
	getUserService,
};
