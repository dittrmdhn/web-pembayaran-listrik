import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedLevels }) => {
	const token = Cookies.get("token");

	if (!token) {
		return <Navigate to="/login-user" replace />;
	}

	try {
		const decodedToken = jwtDecode(token);
		const userLevel = decodedToken.level;
		const currentTime = Math.floor(Date.now() / 1000);

		if (decodedToken.exp < currentTime) {
			return <Navigate to="/login-user" replace />;
		}

		if (!allowedLevels.includes(userLevel)) {
			return <Navigate to="/unauthorized" replace />;
		}

		return children;
	} catch (error) {
		console.log("Error decoding token:", error);
		return <Navigate to="/login-user" replace />;
	}
};

export default ProtectedRoute;
