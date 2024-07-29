import React, { useState } from "react";
import { bayarTagihan, findTagihanByNomorKwh } from "../../api/data/tagihan";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarPelanggan from "../../components/NavbarPelanggan";

const CekTagihan = () => {
	const [nomorKwh, setNomorKwh] = useState("");
	const [tagihan, setTagihan] = useState(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await findTagihanByNomorKwh(nomorKwh);
			console.log("Full response:", response);

			if (response.data.length === 0) {
				Swal.fire({
					title: "Opps",
					text: "Tagihan tidak ditemukan!",
					icon: "info",
					iconColor: "orange",
					confirmButtonText: "OK",
				});
				setError(response.data.message);
				setTagihan([]);
			} else {
				setTagihan(response.data);
				setError("");
			}
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Gagal memuat tagihan terbaru.";
			setError(errorMessage);

			setTagihan([]);
		}
	};

	const handleBayarTagihan = async (id_tagihan) => {
		try {
			const tagihanResponse = await findTagihanByNomorKwh(nomorKwh);
			const tagihan = tagihanResponse.data.find(
				(tagihan) => tagihan.id_tagihan === id_tagihan
			);

			if (!tagihan) {
				throw new Error("Tagihan tidak ditemukan.");
			}

			const { isConfirmed } = await Swal.fire({
				title: "Konfirmasi Pembayaran",
				html: `
                <p>Nama Pelanggan: ${tagihan.nama_pelanggan}</p>
                <p>Bulan: ${tagihan.bulan}</p>
                <p>Tahun: ${tagihan.tahun}</p> <br>
                <p style="font-weight: bold; font-size: 20px;">Total Bayar: Rp ${
									tagihan.total_bayar
										? tagihan.total_bayar.toLocaleString()
										: "N/A"
								}</p>
            `,
				icon: "info",
				showCancelButton: true,
				confirmButtonText: "Bayar",
				cancelButtonText: "Batal",
				reverseButtons: true,
			});

			if (isConfirmed) {
				// Lakukan pembayaran
				await bayarTagihan(id_tagihan);

				// Tampilkan SweetAlert dengan pesan sukses
				await Swal.fire({
					title: "Pembayaran Berhasil!",
					text: "Pembayaran tagihan berhasil dilakukan.",
					icon: "success",
					confirmButtonText: "OK",
				});

				// Cek dan perbarui data tagihan setelah pembayaran
				try {
					const updatedTagihan = await findTagihanByNomorKwh(nomorKwh);
					if (updatedTagihan.data.length === 0) {
						// Jika tidak ada tagihan lagi
						setTagihan([]);
						setNomorKwh("");
						navigate("/cek-tagihan");
					} else {
						// Perbarui data tagihan di frontend
						setTagihan(updatedTagihan.data);
					}
				} catch (err) {
					console.error("Error fetching updated tagihan:", err);
					toast.error("Gagal memuat tagihan terbaru. " + err.message);
				}
			} else {
				// Jika pengguna membatalkan
				Swal.fire({
					title: "Pembayaran Dibatalkan",
					text: "Pembayaran tidak dilakukan.",
					icon: "info",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			console.log("handleBayarTagihan error", error);
			toast.error("Tagihan gagal dibayar! " + error.message);
		}
	};

	console.log("Tagihan state updated:", tagihan);

	return (
		<>
			<NavbarPelanggan />
			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-extrabold mt-20 mb-6 text-center text-cyan-600">
					Cek Tagihan Listrik
				</h1>
				<form
					onSubmit={handleSearch}
					className="bg-white shadow-lg rounded-lg p-6 mb-8"
				>
					<label
						htmlFor="nomor_kwh"
						className="block mb-4 text-lg font-medium text-gray-800"
					>
						Nomor KWH
					</label>
					<input
						type="number"
						id="nomor_kwh"
						value={nomorKwh}
						onChange={(e) => setNomorKwh(e.target.value)}
						placeholder="Masukkan nomor KWH"
						className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4"
						required
					/>
					<button
						type="submit"
						className="w-full bg-cyan-800 text-white py-3 rounded-lg hover:bg-cyan-900 font-bold transition duration-300"
					>
						Cari Tagihan
					</button>
				</form>

				{tagihan && tagihan.length > 0 ? (
					tagihan.map((item) => (
						<div
							key={item.id_tagihan}
							className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
						>
							<h2 className="text-2xl font-bold mb-4 text-gray-800">
								Detail Tagihan
							</h2>
							<p className="text-lg text-gray-700 mb-2">
								<strong>ID Tagihan:</strong> {item.id_tagihan}
							</p>
							<p className="text-lg text-gray-700 mb-2">
								<strong>ID Pelanggan:</strong> {item.id_pelanggan}
							</p>
							<p className="text-lg text-gray-700 mb-2">
								<strong>Nama Pelanggan:</strong> {item.nama_pelanggan}
							</p>
							<p className="text-lg text-gray-700 mb-2">
								<strong>Periode:</strong> {item.bulan} {item.tahun}
							</p>
							<p className="text-lg text-gray-900 mb-4">
								<strong>Total Bayar:</strong> Rp{" "}
								{item.total_bayar ? item.total_bayar.toLocaleString() : "N/A"}
								<span className="text-sm text-gray-600">
									{` (Termasuk biaya admin: Rp ${item.biaya_admin.toLocaleString()})`}
								</span>
							</p>

							{item.status === "Belum Bayar" && (
								<button
									className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
									onClick={() => handleBayarTagihan(item.id_tagihan)}
								>
									Bayar Tagihan
								</button>
							)}
						</div>
					))
				) : (
					<p className="text-center text-gray-500">
						Tidak ada tagihan untuk ditampilkan.
					</p>
				)}
			</div>
		</>
	);
};

export default CekTagihan;
