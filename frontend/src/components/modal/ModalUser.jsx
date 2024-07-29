import React from "react";

const ModalUser = ({
	isVisible,
	onClose,
	onSubmit,
	editId,
	userData,
	levels,
}) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-lg shadow-lg max-w-md md:max-w-lg lg:max-w-full mt-16">
				<div className="flex justify-between items-center pb-2 border-b">
					<h3 className="text-lg font-semibold">
						{editId !== null ? "Edit Data User" : "Tambah Data User"}
					</h3>
					<button onClick={onClose} className="text-red-500">
						✖
					</button>
				</div>
				<form onSubmit={onSubmit} className="mt-4" onReset={onClose}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							defaultValue={userData ? userData.username : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							defaultValue={userData ? userData.password : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="nama_admin"
						>
							Nama Admin
						</label>
						<input
							type="text"
							id="nama_admin"
							name="nama_admin"
							defaultValue={userData ? userData.nama_admin : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="id_level"
						>
							Level
						</label>
						<select
							id="id_level"
							name="id_level"
							defaultValue={userData ? userData.id_level : ""}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						>
							<option value="" disabled>
								Pilih Level
							</option>
							{levels.map((level) => (
								<option key={level.id_level} value={level.id_level}>
									{level.nama_level}
								</option>
							))}
						</select>
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

export default ModalUser;
