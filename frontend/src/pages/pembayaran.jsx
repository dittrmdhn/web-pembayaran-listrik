import { useEffect, useState } from "react";
import {
	addPembayaran,
	deletePembayaran,
	getPembayaran,
	updatePembayaran,
} from "../api/data/pembayaran";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PembayaranTable from "../components/TablePembayaran";
import { toast, ToastContainer } from "react-toastify";
import ModalPembayaran from "../components/modal/ModalPembayaran";

const Pembayaran = () => {
	const [pembayaran, setPembayaran] = useState([]);
	const [error, setError] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		const fetchPembayaran = async () => {
			try {
				const data = await getPembayaran();
				setPembayaran(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchPembayaran();
	}, []);

	const handleAddPembayaran = async (e) => {
		e.preventDefault();
		const {
			id_penggunaan,
			tanggal_pembayaran,
			bulan_bayar,
			biaya_admin,
			id_user,
		} = e.target;
		try {
			const newPembayaran = {
				id_penggunaan: parseInt(id_penggunaan.value),
				tanggal_pembayaran: tanggal_pembayaran.value,
				bulan_bayar: bulan_bayar.value,
				biaya_admin: parseInt(biaya_admin.value),
				id_user: parseInt(id_user.value),
			};
			await addPembayaran(newPembayaran);
			const updatedPembayaranList = await getPembayaran();
			setPembayaran(updatedPembayaranList);
			setIsModalVisible(false);
			toast.success("Data pembayaran berhasil ditambahkan!");
		} catch (error) {
			toast.error("Gagal menambahkan data: " + error.message);
			setError(error.message);
		}
	};

	const handleEditPembayaran = async (e) => {
		e.preventDefault();
		const {
			id_penggunaan,
			tanggal_pembayaran,
			bulan_bayar,
			biaya_admin,
			id_user,
		} = e.target;
		try {
			const updatedPembayaran = {
				id_penggunaan: parseInt(id_penggunaan.value),
				tanggal_pembayaran: tanggal_pembayaran.value,
				bulan_bayar: bulan_bayar.value,
				biaya_admin: parseInt(biaya_admin.value),
				id_user: parseInt(id_user.value),
			};
			await updatePembayaran(editId, updatedPembayaran);
			setPembayaran((prevPembayaran) =>
				prevPembayaran.map((item) =>
					item.id_pembayaran === editId
						? { ...item, ...updatedPembayaran }
						: item
				)
			);
			toast.success("Data berhasil diupdate!");
			setIsModalVisible(false);
			setEditId(null);
		} catch (error) {
			toast.error("Gagal menambahkan data: " + error.message);
		}
	};

	const handleEditButtonClick = (id) => {
		setEditId(id);
		setIsModalVisible(true);
	};

	const handleDeletePembayaran = async (id) => {
		try {
			await deletePembayaran(id);
			setPembayaran((prevPembayaran) =>
				prevPembayaran.filter((item) => item.id_pembayaran !== id)
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
					<h1 className="text-3xl font-bold mb-5">Data Pembayaran</h1>{" "}
					<button
						onClick={() => setIsModalVisible(true)}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					>
						{" "}
						Tambah Data
					</button>
				</div>
				<PembayaranTable
					data={pembayaran}
					onEdit={handleEditButtonClick}
					onDelete={handleDeletePembayaran}
				/>
				<ModalPembayaran
					isVisible={isModalVisible}
					onClose={() => {
						setIsModalVisible(false);
						setEditId(null);
					}}
					onSubmit={
						editId !== null ? handleEditPembayaran : handleAddPembayaran
					}
					editId={editId}
					pembayaranData={pembayaran.find(
						(item) => item.id_pembayaran === editId
					)}
				/>
				<ToastContainer />
			</div>
		</>
	);
};

export default Pembayaran;
