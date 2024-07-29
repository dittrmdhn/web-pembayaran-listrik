// src/Auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = Cookies.get("token");
		console.log("Token from cookies:", token); // Debugging token

		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
			navigate("/login-user");
		}
		setLoading(false);
	}, [navigate]);

	const login = (token) => {
		Cookies.set("token", token, { path: "/" });
		setIsAuthenticated(true);
	};

	const logout = () => {
		Cookies.remove("token");
		setIsAuthenticated(false);
		navigate("/login-user");
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
