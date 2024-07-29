import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
			navigate("/login-user");
		}
		setLoading(false);
	}, [navigate]);

	return { isAuthenticated, loading };
};

export default useAuth;
