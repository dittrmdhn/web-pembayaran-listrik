const express = require("express");
const {
	registerController,
	loginController,
	logoutController,
	userRegisterController,
	userLoginController,
	userLogoutController,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const authRoutes = express.Router();
authRoutes.post("/register-pelanggan", registerController);
authRoutes.post("/login-pelanggan", loginController);
authRoutes.delete("/logout-pelanggan", authenticateToken, logoutController);
authRoutes.post("/register-user", userRegisterController);
authRoutes.post("/login-user", userLoginController);
authRoutes.delete("/logout-user", userLogoutController);

module.exports = authRoutes;
