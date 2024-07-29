import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tarif from "./pages/Tarif";
import Pelanggan from "./pages/pelanggan";
import Penggunaan from "./pages/penggunaan";
import Tagihan from "./pages/tagihan";
import Pembayaran from "./pages/pembayaran";
import LoginPelanggan from "./pages/LoginPelanggan";
import ProtectedRoute from "./pages/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import User from "./pages/User";
import PublicRoute from "./pages/PublicRoute";
import RegisterPelanggan from "./pages/RegisterPelangan";
import { ToastContainer } from "react-toastify";
import ViewPelanggan from "./pages/client/CekTagihan";
import ProtectedPelanggan from "./pages/ProtectedPelanggan";
import LoginUser from "./pages/LoginUser";
import HomePelanggan from "./pages/client/HomePelanggan";
import CekTagihan from "./pages/client/CekTagihan";
import ProfilePelanggan from "./pages/client/ProfilePelanggan";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/login-user"
					element={
						<PublicRoute>
							<LoginUser />
						</PublicRoute>
					}
				/>
				<Route
					path="/register-pelanggan"
					element={
						<PublicRoute>
							<RegisterPelanggan />
						</PublicRoute>
					}
				/>
				<Route path="/home" element={<HomePelanggan />} />
				<Route
					path="/"
					element={
						<ProtectedPelanggan>
							<LoginPelanggan />
						</ProtectedPelanggan>
					}
				/>
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute allowedLevels={["Admin", "Operator"]}>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tarif"
					element={
						<ProtectedRoute allowedLevels={["Admin", "Operator"]}>
							<Tarif />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/pelanggan"
					element={
						<ProtectedRoute allowedLevels={["Admin", "Operator"]}>
							<Pelanggan />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/penggunaan"
					element={
						<ProtectedRoute allowedLevels={["Admin", "Operator"]}>
							<Penggunaan />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tagihan"
					element={
						<ProtectedRoute allowedLevels={["Admin", "Operator"]}>
							<Tagihan />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/pembayaran"
					element={
						<ProtectedRoute allowedLevels={["Admin", "Operator"]}>
							<Pembayaran />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user"
					element={
						<ProtectedRoute allowedLevels={["Admin"]}>
							<User />
						</ProtectedRoute>
					}
				/>
				<Route path="/cek-tagihan" element={<CekTagihan />} />
				<Route path="/profile-pelanggan" element={<ProfilePelanggan />} />
			</Routes>
			<ToastContainer />
		</Router>
	);
};

export default App;
