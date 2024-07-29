import React, { useEffect, useState } from "react";
import {
	checkPembayaranStatus,
	confirmPembayaran,
	confirmPembayaranAPI,
	getPembayaran,
} from "../api/data/pembayaran";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const TagihanTable = ({ data, onEdit, onDelete }) => {
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);
	const [confirmedTagihan, setConfirmedTagihan] = useState(new Set());
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		setFilteredData(
			data.filter((item) =>
				[
					item.nomor_kwh,
					item.id_penggunaan,
					item.id_pelanggan,
					item.bulan,
					item.tahun,
					item.status,
				].some((field) =>
					field.toString().toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
		);
	}, [searchTerm, data]);

	useEffect(() => {
		const fetchConfirmedStatuses = async () => {
			try {
				const statuses = await Promise.all(
					data.map((item) => checkPembayaranStatus(item.id_tagihan))
				);

				const confirmedIds = new Set(
					data
						.filter((_, index) => statuses[index].terkonfirmasi)
						.map((item) => item.id_tagihan)
				);

				setConfirmedTagihan(confirmedIds);
			} catch (error) {
				toast.error("Gagal memuat status konfirmasi: " + error.message);
			}
		};

		fetchConfirmedStatuses();
	}, [data]);

	const handleDeleteConfirm = (id_tagihan) => {
		setConfirmDeleteId(id_tagihan);
	};

	const handleCancelDelete = () => {
		setConfirmDeleteId(null);
	};

	const handleDelete = async (id_tagihan) => {
		await onDelete(id_tagihan);
		setConfirmDeleteId(null);
	};

	const formatNumber = (value) => {
		return `${value.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;
	};

	const token = Cookies.get("token");
	const decoded = jwtDecode(token);
	const user = decoded.id_user;

	const handleConfirm = async (id_tagihan) => {
		try {
			const result = await Swal.fire({
				title: "Konfirmasi",
				text: "Apakah Anda yakin ingin mengkonfirmasi pembayaran?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, konfirmasi!",
				cancelButtonText: "Batal",
			});

			if (result.isConfirmed) {
				const newPembayaran = {
					id_user: user, // Gunakan `user` dari token
				};
				await confirmPembayaranAPI(id_tagihan, newPembayaran);

				// Tampilkan SweetAlert sukses
				await Swal.fire({
					title: "Berhasil!",
					text: "Pembayaran telah dikonfirmasi.",
					icon: "success",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "OK",
				});

				// Perbarui status konfirmasi
				setConfirmedTagihan((prev) => new Set(prev.add(id_tagihan)));
			} else {
				toast.info("Konfirmasi pembayaran dibatalkan");
			}
		} catch (error) {
			toast.error("Gagal mengkonfirmasi pembayaran: " + error.message);
		}
	};

	return (
		<div className="overflow-x-auto ">
			<div className="mb-4 relative">
				<input
					type="text"
					placeholder="Cari Data..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border border-gray-300 p-2 rounded-lg w-1/4 pl-10"
				/>
				<span className="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6 text-gray-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</span>
			</div>
			{filteredData.length > 0 ? (
				<table className="min-w-full bg-white border border-gray-300 text-center">
					<thead>
						<tr className="bg-cyan-800 text-white">
							<th className="border border-gray-300 px-4 py-2">#</th>
							<th className="border border-gray-300 px-4 py-2">No KWH</th>
							<th className="border border-gray-300 px-4 py-2">
								ID Penggunaan
							</th>
							<th className="border border-gray-300 px-4 py-2">ID Pelanggan</th>
							<th className="border border-gray-300 px-4 py-2">Bulan</th>
							<th className="border border-gray-300 px-4 py-2">Tahun</th>
							<th className="border border-gray-300 px-4 py-2">Jumlah Meter</th>
							<th className="border border-gray-300 px-4 py-2">Status</th>
							<th className="border border-gray-300 px-4 py-2">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item, index) => (
							<tr
								key={item.id_tagihan}
								className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
							>
								<td className="border border-gray-300 px-2 py-2">
									{index + 1}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{item?.nomor_kwh}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{item.id_penggunaan}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{item.id_pelanggan}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{item.bulan}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{item.tahun}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{formatNumber(item.jumlah_meter)}
								</td>
								<td className="border font-bold border-gray-300 px-2 py-2">
									<p
										className={
											item.status === "Lunas"
												? "text-green-500"
												: "text-red-500"
										}
									>
										{item.status}
									</p>
								</td>

								<td className="border border-gray-300 px-4 py-2">
									{item.status === "Lunas" &&
										!confirmedTagihan.has(item.id_tagihan) && (
											<button
												onClick={() => handleConfirm(item.id_tagihan)}
												className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-lg m-1"
											>
												Konfirmasi
											</button>
										)}
									{item.status === "Lunas" ? (
										confirmedTagihan.has(item.id_tagihan) && (
											<span className="text-green-500 font-bold">
												Terkonfirmasi
											</span>
										)
									) : (
										<div className="group justify-center items-center">
											<p className="text-gray-500 italic group-hover:hidden">
												menunggu
											</p>
											<button
												onClick={() => handleDeleteConfirm(item.id_tagihan)}
												className="hidden group-hover:block mx-auto bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-lg m-1"
											>
												Hapus
											</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-center italic mt-10 text-gray-500">
					Tidak ada data yang ditemukan
				</p>
			)}

			{confirmDeleteId && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-4 rounded-lg shadow-lg">
						<p className="text-lg font-semibold mb-4">
							Yakin ingin menghapus data ini?
						</p>
						<div className="flex justify-center">
							<button
								onClick={() => handleDelete(confirmDeleteId)}
								className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
							>
								Ya
							</button>
							<button
								onClick={handleCancelDelete}
								className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg ml-4"
							>
								Tidak
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TagihanTable;
