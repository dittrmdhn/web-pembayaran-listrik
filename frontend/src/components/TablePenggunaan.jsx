import React, { useEffect, useState } from "react";

const PenggunaanTable = ({ data, onEdit, onDelete }) => {
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		setFilteredData(
			data.filter((item) =>
				[
					item.id_penggunaan,
					item.id_pelanggan,
					item.bulan,
					item.tahun,
					item.meter_awal,
					item.meter_akhir,
				].some((field) =>
					field.toString().toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
		);
	}, [searchTerm, data]);

	const handleDeleteConfirm = (id_penggunaan) => {
		setConfirmDeleteId(id_penggunaan);
	};

	const handleCancelDelete = () => {
		setConfirmDeleteId(null);
	};

	const handleDelete = async (id_penggunaan) => {
		await onDelete(id_penggunaan);
		setConfirmDeleteId(null);
	};

	const formatNumber = (value) => {
		return `${value.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;
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
							<th className="border border-gray-300 px-4 py-2">ID</th>
							<th className="border border-gray-300 px-4 py-2">ID Pelanggan</th>
							<th className="border border-gray-300 px-4 py-2">Bulan</th>
							<th className="border border-gray-300 px-4 py-2">Tahun</th>
							<th className="border border-gray-300 px-4 py-2">Meter Awal</th>
							<th className="border border-gray-300 px-4 py-2">Meter Akhir</th>
							<th className="border border-gray-300 px-4 py-2">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item, index) => (
							<tr
								key={item.id_penggunaan}
								className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
							>
								<td className="border border-gray-300 px-2 py-2">
									{index + 1}
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
									{formatNumber(item.meter_awal)}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{formatNumber(item.meter_akhir)}
								</td>

								<td className="border border-gray-300 px-4 py-2">
									<button
										onClick={() => onEdit(item.id_penggunaan)}
										className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-lg m-1"
									>
										Edit
									</button>
									<button
										onClick={() => handleDeleteConfirm(item.id_penggunaan)}
										className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-lg ml-2"
									>
										Hapus
									</button>
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

export default PenggunaanTable;
