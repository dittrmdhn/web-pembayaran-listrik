import React, { useState, useEffect } from "react";
import NavbarPelanggan from "../../components/NavbarPelanggan";
import { getPelangganById, updatePelanggan } from "../../api/data/pelanggan";

const ProfilePelanggan = () => {
	const [profile, setProfile] = useState({
		id_pelanggan: "",
		username: "",
		nomor_kwh: "",
		nama_pelanggan: "",
		alamat: "",
		id_tarif: "",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [updateError, setUpdateError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getPelangganById(1); // Ganti 1 dengan ID pelanggan yang sesuai
				setProfile(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	// const handleUpdateProfile = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		await updatePelanggan(profile.id_pelanggan, profile);
	// 		alert("Profil berhasil diperbarui");
	// 	} catch (err) {
	// 		setUpdateError(err.message);
	// 	}
	// };

	// const handleChange = (e) => {
	// 	const { id, value } = e.target;
	// 	setProfile((prevProfile) => ({
	// 		...prevProfile,
	// 		[id]: value,
	// 	}));
	// };

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<NavbarPelanggan />
			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-extrabold mb-6 mt-20 text-center text-cyan-600">
					Profil Pelanggan
				</h1>
				<div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
					<h2 className="text-2xl font-bold mb-4 text-gray-800">
						Informasi Profil
					</h2>
					<form action="/home">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
							<div>
								<label
									htmlFor="username"
									className="block mb-2 text-lg font-medium text-gray-700"
								>
									Username
								</label>
								<input
									type="text"
									id="username"
									value={profile.username}
									// onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
									readOnly
								/>
							</div>
							<div>
								<label
									htmlFor="nomor_kwh"
									className="block mb-2 text-lg font-medium text-gray-700"
								>
									Nomor KWH
								</label>
								<input
									type="text"
									id="nomor_kwh"
									value={profile.nomor_kwh}
									// onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
									readOnly
								/>
							</div>
							<div>
								<label
									htmlFor="nama_pelanggan"
									className="block mb-2 text-lg font-medium text-gray-700"
								>
									Nama Pelanggan
								</label>
								<input
									type="text"
									id="nama_pelanggan"
									value={profile.nama_pelanggan}
									// onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
									readOnly
								/>
							</div>
							<div>
								<label
									htmlFor="alamat"
									className="block mb-2 text-lg font-medium text-gray-700"
								>
									Alamat
								</label>
								<input
									type="text"
									id="alamat"
									value={profile.alamat}
									// onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
									readOnly
								/>
							</div>
							<div>
								<label
									htmlFor="id_tarif"
									className="block mb-2 text-lg font-medium text-gray-700"
								>
									Daya
								</label>
								<input
									type="number"
									id="id_tarif"
									value={profile.tarif.daya}
									// onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
									readOnly
								/>
							</div>
						</div>
						<button
							type="submit"
							className="w-full bg-cyan-800 text-white py-3 rounded-lg font-semibold hover:bg-cyan-900 transition duration-300"
						>
							Kembali ke Beranda
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ProfilePelanggan;
