import React, { useContext, useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const LoginFormUser = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await loginUser(username, password);

			navigate("/dashboard");
		} catch (error) {
			setError(error.message + " !");
		}
	};

	return (
		<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
			<div>
				<p className="text-red-500 text-center">{error}</p>
				<label
					htmlFor="email"
					className="block text-start mb-2 ms-1 text-sm font-medium text-gray-900 dark:text-white"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					id="username"
					className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Masukan username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required=""
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-start ms-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required=""
				/>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-start">
					<div className="flex items-center h-5">
						<input
							id="remember"
							aria-describedby="remember"
							type="checkbox"
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
							required=""
						/>
					</div>
					<div className="ml-3 text-sm">
						<label
							htmlFor="remember"
							className="text-gray-500 dark:text-gray-300"
						>
							Ingat saya
						</label>
					</div>
				</div>
				<a
					href="#"
					className="text-sm font-medium text-white dark:text-green-600 hover:underline dark:text-primary-500"
				>
					Lupa password?
				</a>
			</div>
			<button
				type="submit"
				className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-primary-700 dark:focus:ring-green-500"
			>
				Sign in
			</button>
		</form>
	);
};

export default LoginFormUser;
