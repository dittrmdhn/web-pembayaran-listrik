import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPelanggan } from "../api/auth";
import { toast } from "react-toastify";
import { getTarifPublic } from "../api/data/tarif";

const RegisterFormPelanggan = () => {
	const [usernameError, setUsernameError] = useState("");
	const [nomorKwhError, setNomorKwhError] = useState("");
	const [tarifOptions, setTarifOptions] = useState([]);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const loadTarifOptions = async () => {
			try {
				const options = await getTarifPublic();
				setTarifOptions(options);
			} catch (error) {
				setError(error.message);
			}
		};

		loadTarifOptions();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUsernameError("");
		setNomorKwhError("");
		const payload = {
			username: e.target.username.value,
			password: e.target.password.value,
			nomor_kwh: e.target.nomor_kwh.value,
			nama_pelanggan: e.target.nama_pelanggan.value,
			alamat: e.target.alamat.value,
			id_tarif: parseInt(e.target.id_tarif.value),
		};

		try {
			await registerPelanggan(payload);
			navigate("/login-pelanggan");
			toast.success("Akun pelanggan berhasil dibuat!");
		} catch (error) {
			if (error.message.includes("Username sudah terdaftar")) {
				setUsernameError("Username sudah terdaftar.");
			}
			if (error.message.includes("Nomor KWH sudah terdaftar")) {
				setNomorKwhError("Nomor KWH sudah terdaftar.");
			}
			toast.error("Gagal membuat akun pelanggan: " + error.message);
		}
	};

	return (
		<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
				Daftar akun
			</h1>
			<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="username"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Username
					</label>
					{usernameError && (
						<p className="text-red-500 text-sm mb-1">{usernameError}</p>
					)}
					<input
						type="text"
						name="username"
						id="username"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="contoh: Barja"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="nomor_kwh"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Nomor KWH
					</label>
					{nomorKwhError && (
						<p className="text-red-500 text-sm mb-1">{nomorKwhError}</p>
					)}
					<input
						type="text"
						name="nomor_kwh"
						id="nomor_kwh"
						placeholder="contoh: 978698237"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="nama_pelanggan"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Nama Lengkap
					</label>
					<input
						type="text"
						name="nama_pelanggan"
						id="nama_pelanggan"
						placeholder="contoh: Budi"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="alamat"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Alamat Lengkap
					</label>
					<input
						type="text"
						name="alamat"
						id="alamat"
						placeholder="contoh: Jl. Pegangsaan Raya"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="id_tarif"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Daya Listrik
					</label>
					<select
						name="id_tarif"
						id="id_tarif"
						className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					>
						{tarifOptions.map((tarif) => (
							<option key={tarif.id_tarif} value={tarif.id_tarif}>
								{tarif.daya} VA
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Buat akun
				</button>
				<p className="text-sm font-light text-gray-500 dark:text-gray-400">
					Sudah punya akun?{" "}
					<Link
						to="/"
						className="font-medium text-primary-600 hover:underline dark:text-primary-500"
					>
						Login disini
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegisterFormPelanggan;
