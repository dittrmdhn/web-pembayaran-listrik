const jwt = require("jsonwebtoken");
const prismaClient = require("../application/database");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
	const authHeader =
		req.headers["authorization"] || req.headers["Authorization"];
	const token = authHeader?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Token tidak tersedia" });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		let user;
		if (decoded.id_user) {
			user = await prismaClient.user.findUnique({
				where: { id_user: decoded.id_user },
				include: { level: true },
			});
			if (user) {
				req.user = {
					...user,
					level: user.level.nama_level,
				};
			}
		} else if (decoded.id_pelanggan) {
			user = await prismaClient.pelanggan.findUnique({
				where: { id_pelanggan: decoded.id_pelanggan },
			});
			if (user) {
				req.user = {
					...user,
					level: "Pelanggan",
				};
			}
		}

		if (!user) {
			throw new Error("Pengguna tidak ditemukan");
		}

		next();
	} catch (err) {
		console.error(err);
		return res.status(403).json({ error: "Token tidak valid" });
	}
};

const authorize = (allowedLevels) => {
	return (req, res, next) => {
		if (!req.user || !allowedLevels.includes(req.user.level)) {
			return res.status(403).json({ error: "Anda tidak memiliki akses" });
		}
		next();
	};
};

module.exports = { authenticateToken, authorize };
