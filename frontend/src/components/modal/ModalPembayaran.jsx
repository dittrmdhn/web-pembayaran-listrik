import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ModalPembayaran = ({
	isVisible,
	onClose,
	onSubmit,
	editId,
	pembayaranData,
}) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const formattedDate = pembayaranData
		? formatDate(pembayaranData.tanggal_pembayaran)
		: "";

	const token = Cookies.get("token");
	const decoded = jwtDecode(token);
	const username = decoded.username;
	const id_user = decoded.id_user;

	if (!isVisible) return null;

	const generateBulanOptions = () => {
		const bulanList = [
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember",
		];

		return bulanList.map((bulan) => (
			<option key={bulan} value={bulan}>
				{bulan}
			</option>
		));
	};

	const generateBiayaAdminOptions = () => {
		const biayaAdminList = [2500, 3000, 5000, 10000, 50000];

		return biayaAdminList.map((biayaAdmin) => (
			<option key={biayaAdmin} value={biayaAdmin}>
				{biayaAdmin}
			</option>
		));
	};

	console.log("pembayaranData:", pembayaranData);
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-lg shadow-lg max-w-md md:max-w-lg lg:max-w-full mt-16">
				<div className="flex justify-between items-center pb-2 border-b">
					<h3 className="text-lg font-semibold">
						{editId !== null
							? "Edit Data Pembayaran"
							: "Tambah Data Pembayaran"}
					</h3>
					<button onClick={onClose} className="text-red-500">
						✖
					</button>
				</div>
				<form onSubmit={onSubmit} className="mt-4" onReset={onClose}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="id_penggunaan"
						>
							ID Penggunaan
						</label>
						<input
							type="number"
							id="id_penggunaan"
							name="id_penggunaan"
							defaultValue={
								pembayaranData
									? pembayaranData?.tagihan?.penggunaan?.id_penggunaan
									: ""
							}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
							{...(editId !== null ? { disabled: true } : {})}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="tanggal_pembayaran"
						>
							Tanggal Pembayaran
						</label>
						<input
							type="date"
							id="tanggal_pembayaran"
							name="tanggal_pembayaran"
							defaultValue={formattedDate}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="bulan_bayar"
						>
							Bulan Pembayaran
						</label>
						<select
							type="text"
							id="bulan_bayar"
							name="bulan_bayar"
							defaultValue={pembayaranData ? pembayaranData.bulan_bayar : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						>
							<option value="">Pilih bulan</option>
							{generateBulanOptions(
								pembayaranData ? pembayaranData.bulan_bayar : ""
							)}
						</select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="biaya_admin"
						>
							Biaya Admin
						</label>
						<select
							type="number"
							id="biaya_admin"
							name="biaya_admin"
							defaultValue={pembayaranData ? pembayaranData.biaya_admin : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						>
							<option value="">Pilih biaya admin</option>
							{generateBiayaAdminOptions(
								pembayaranData ? pembayaranData.biaya_admin : ""
							)}
						</select>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="id_user"
						>
							User Admin
						</label>
						<input
							type="number"
							id="id_user"
							name="id_user"
							defaultValue={id_user}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
							hidden
						/>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder={username}
							disabled
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Simpan
						</button>
						<button
							onClick={onClose}
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Batal
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalPembayaran;
