import React from "react";

const ModalTarif = ({ isVisible, onClose, onSubmit, editId, tarifData }) => {
	if (!isVisible) return null;
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-lg shadow-lg  max-w-md">
				<div className="flex justify-between items-center pb-2 border-b">
					<h3 className="text-lg font-semibold">
						{editId !== null ? "Edit Data Tarif" : "Tambah Data Tarif"}
					</h3>
					<button onClick={onClose} className="text-red-500">
						✖
					</button>
				</div>
				<form onSubmit={onSubmit} className="mt-4" onReset={onClose}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="daya"
						>
							Daya
						</label>
						<input
							type="text"
							id="daya"
							name="daya"
							defaultValue={tarifData ? tarifData.daya : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="tarifperkwh"
						>
							Tarif Per KWH
						</label>
						<input
							type="text"
							id="tarifperkwh"
							name="tarifperkwh"
							defaultValue={tarifData ? tarifData.tarifperkwh : ""}
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

export default ModalTarif;
