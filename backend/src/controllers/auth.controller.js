const {
	registerService,
	loginService,
	userRegisterService,
	userLoginService,
} = require("../services/auth.service");

const registerController = async (req, res) => {
	try {
		const payload = req.body;
		const user = await registerService(payload);
		res.status(201).json({ message: "Sukses melakukan pendaftaran", user });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const loginController = async (req, res) => {
	try {
		const payload = req.body;
		const { user, token } = await loginService(payload);

		res.cookie("token", token, {
			httpOnly: false,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const logoutController = async (req, res) => {
	const token = res.clearCookie("token");
	if (!token) {
		const error = new Error("Token tidak tersedia !");
		error.status = 400;
		throw error;
	}

	res.status(200).json({ message: "Berhasil logout" });
};

const userRegisterController = async (req, res) => {
	try {
		const payload = req.body;
		const user = await userRegisterService(payload);

		res.status(201).json({ message: "Sukses melakukan pendaftaran", user });
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: error.message });
	}
};

const userLoginController = async (req, res) => {
	try {
		const payload = req.body;
		const { user, token } = await userLoginService(payload);
		res.cookie("token", token, {
			httpOnly: false,
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const userLogoutController = async (req, res) => {
	const token = res.clearCookie("token");
	if (!token) {
		const error = new Error("Token tidak tersedia !");
		error.status = 400;
		throw error;
	}

	res.status(200).json({ message: "Berhasil logout" });
};

module.exports = {
	registerController,
	loginController,
	logoutController,
	userRegisterController,
	userLoginController,
	userLogoutController,
};
