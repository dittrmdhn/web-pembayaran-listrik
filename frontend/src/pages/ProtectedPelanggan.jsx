import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedPelanggan = ({ children }) => {
	const token = Cookies.get("token");

	if (token) {
		try {
			const decodedToken = jwtDecode(token);
			const currentTime = Math.floor(Date.now() / 1000);

			if (decodedToken.exp > currentTime) {
				return <Navigate to="/home" replace />;
			}
		} catch (error) {
			console.log("Error decoding token:", error);
		}
	}

	return children;
};

export default ProtectedPelanggan;
