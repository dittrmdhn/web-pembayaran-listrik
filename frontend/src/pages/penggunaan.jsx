import { useEffect, useState } from "react";
import {
	addPenggunaan,
	deletePenggunaan,
	getPenggunaan,
	updatePenggunaan,
} from "../api/data/penggunaan";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PenggunaanTable from "../components/TablePenggunaan";
import ModalPenggunaan from "../components/modal/ModalPenggunaan";

const Penggunaan = () => {
	const [penggunaan, setPenggunaan] = useState([]);
	const [error, setError] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		const fetchPenggunaan = async () => {
			try {
				const data = await getPenggunaan();
				setPenggunaan(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchPenggunaan();
	}, []);

	const handleAddPenggunaan = async (e) => {
		e.preventDefault();
		const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = e.target;
		try {
			const newPenggunaan = {
				id_pelanggan: parseInt(id_pelanggan.value),
				bulan: bulan.value,
				tahun: tahun.value,
				meter_awal: parseInt(meter_awal.value),
				meter_akhir: parseInt(meter_akhir.value),
			};
			await addPenggunaan(newPenggunaan);
			const updatedPenggunaanList = await getPenggunaan();
			setPenggunaan(updatedPenggunaanList);
			setIsModalVisible(false);
			toast.success("Data berhasil ditambahkan!");
		} catch (error) {
			toast.error("Gagal menambahkan data: " + error.message);
			throw new Error(error.response.data.message || "Ada kesalahan");
		}
	};

	const handleEditPenggunaaan = async (e) => {
		e.preventDefault();
		const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = e.target;
		try {
			const updatedPenggunaan = {
				id_pelanggan: parseInt(id_pelanggan.value),
				bulan: bulan.value,
				tahun: tahun.value,
				meter_awal: parseInt(meter_awal.value),
				meter_akhir: parseInt(meter_akhir.value),
			};
			await updatePenggunaan(editId, updatedPenggunaan);
			setPenggunaan((prevPenggunaan) =>
				prevPenggunaan.map((item) =>
					item.id_penggunaan === editId
						? { ...item, ...updatedPenggunaan }
						: item
				)
			);
			toast.success("Data berhasil diupdate!");
			setIsModalVisible(false);
			setEditId(null);
		} catch (error) {
			toast.error("Gagal update data: " + error.message);
			throw new Error(error.response.data.message || "Ada kesalahan");
		}
	};

	const handleEditButtonClick = (id) => {
		setEditId(id);
		setIsModalVisible(true);
	};

	const handleDeletePenggunaan = async (id) => {
		try {
			await deletePenggunaan(id);
			setPenggunaan((prevPenggunaan) =>
				prevPenggunaan.filter((item) => item.id_penggunaan !== id)
			);
			toast.success("Data berhasil dihapus!");
		} catch (error) {
			toast.error("Gagal menghapus data: " + error.message);
		}
	};

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className=" p-8 xl:ml-64 md:ml-60 md:max-auto mt-16">
				{" "}
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex justify-between">
					<h1 className="text-3xl font-bold">Data Penggunaan</h1>{" "}
					<button
						onClick={() => setIsModalVisible(true)}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					>
						{" "}
						Tambah Data
					</button>
				</div>
				<PenggunaanTable
					data={penggunaan}
					onEdit={handleEditButtonClick}
					onDelete={handleDeletePenggunaan}
				/>
				{
					<ModalPenggunaan
						isVisible={isModalVisible}
						onClose={() => {
							setIsModalVisible(false);
							setEditId(null);
						}}
						onSubmit={
							editId !== null ? handleEditPenggunaaan : handleAddPenggunaan
						}
						editId={editId}
						penggunaanData={penggunaan.find(
							(item) => item.id_penggunaan === editId
						)}
					/>
				}
				<ToastContainer />
			</div>
		</>
	);
};
export default Penggunaan;
