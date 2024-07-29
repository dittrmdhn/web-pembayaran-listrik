import React from "react";

const ModalPenggunaan = ({
	isVisible,
	onClose,
	onSubmit,
	editId,
	penggunaanData,
}) => {
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

	const generateTahunOptions = () => {
		const tahunList = [
			"2015",
			"2016",
			"2017",
			"2018",
			"2019",
			"2020",
			"2021",
			"2022",
			"2023",
			"2024",
		];

		const reversedTahunList = [...tahunList].reverse();

		return reversedTahunList.map((tahun) => (
			<option key={tahun} value={tahun}>
				{tahun}
			</option>
		));
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-lg shadow-lg max-w-md md:max-w-lg lg:max-w-full mt-16">
				<div className="flex justify-between items-center pb-2 border-b">
					<h3 className="text-lg font-semibold">
						{editId !== null
							? "Edit Data Penggunaan"
							: "Tambah Data Penggunaan"}
					</h3>
					<button onClick={onClose} className="text-red-500">
						✖
					</button>
				</div>
				<form onSubmit={onSubmit} className="mt-4" onReset={onClose}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="id_pelanggan"
						>
							ID Pelanggan
						</label>
						<input
							type="number"
							id="id_pelanggan"
							name="id_pelanggan"
							defaultValue={penggunaanData ? penggunaanData.id_pelanggan : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="bulan"
						>
							Bulan
						</label>
						<select
							type="text"
							id="bulan"
							name="bulan"
							defaultValue={penggunaanData ? penggunaanData.bulan : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						>
							<option value="">Pilih Bulan</option>
							{generateBulanOptions(penggunaanData ? penggunaanData.bulan : "")}
						</select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="tahun"
						>
							Tahun
						</label>
						<select
							type="text"
							id="tahun"
							name="tahun"
							defaultValue={penggunaanData ? penggunaanData.tahun : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						>
							<option value="">Pilih Tahun</option>
							{generateTahunOptions(penggunaanData ? penggunaanData.tahun : "")}
						</select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="meter_awal"
						>
							Meter Awal
						</label>
						<input
							type="number"
							id="meter_awal"
							name="meter_awal"
							defaultValue={penggunaanData ? penggunaanData.meter_awal : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="meter_akhir"
						>
							Meter Akhir
						</label>
						<input
							type="number"
							id="meter_akhir"
							name="meter_akhir"
							defaultValue={penggunaanData ? penggunaanData.meter_akhir : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
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

export default ModalPenggunaan;
