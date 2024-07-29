import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
	addPelanggan,
	deletePelanggan,
	getPelanggan,
	updatePelanggan,
} from "../api/data/pelanggan";
import PelangganTable from "../components/TablePelanggan";
import { toast, ToastContainer } from "react-toastify";
import ModalPelanggan from "../components/modal/ModalPelanggan";
import { getTarif } from "./../api/data/tarif";

const Pelanggan = () => {
	const [pelanggan, setPelanggan] = useState([]);
	const [error, setError] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editId, setEditId] = useState(null);
	const [tarif, setTarif] = useState([]);

	useEffect(() => {
		const fetchPelanggan = async () => {
			try {
				const data = await getPelanggan();
				setPelanggan(data);
			} catch (error) {
				setError(error.message);
			}
		};

		const fetchTarif = async () => {
			try {
				const data = await getTarif();
				setTarif(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchTarif();
		fetchPelanggan();
	}, []);

	const handleAddPelanggan = async (e) => {
		e.preventDefault();
		const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } =
			e.target;
		try {
			const newPelanggan = {
				username: username.value,
				password: password.value,
				nomor_kwh: nomor_kwh.value,
				nama_pelanggan: nama_pelanggan.value,
				alamat: alamat.value,
				id_tarif: parseInt(id_tarif.value),
			};
			await addPelanggan(newPelanggan);
			const updatedPelanggan = await getPelanggan();
			setIsModalVisible(false);
			toast.success("Data berhasil ditambahkan!");
			setPelanggan(updatedPelanggan);
		} catch (error) {
			toast.error("Gagal menambahkan data: " + error.message);
		}
	};

	const handleEditPelanggan = async (e) => {
		e.preventDefault();
		const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } =
			e.target;
		try {
			const updatedPelanggan = {
				username: username.value,
				password: password.value,
				nomor_kwh: nomor_kwh.value,
				nama_pelanggan: nama_pelanggan.value,
				alamat: alamat.value,
				id_tarif: parseInt(id_tarif.value),
			};
			await updatePelanggan(editId, updatedPelanggan);
			setPelanggan((prevPelanggan) =>
				prevPelanggan.map((item) =>
					item.id_pelanggan === editId ? { ...item, ...updatedPelanggan } : item
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

	const handleDeletePelanggan = async (id) => {
		try {
			await deletePelanggan(id);
			setPelanggan((prevPelanggan) =>
				prevPelanggan.filter((item) => item.id_pelanggan !== id)
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
				<div className="flex justify-between mb-5">
					<h1 className="text-3xl font-bold ">Data Pelanggan</h1>{" "}
					<button
						onClick={() => setIsModalVisible(true)}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					>
						{" "}
						Tambah Data
					</button>
				</div>
				<PelangganTable
					data={pelanggan}
					onEdit={handleEditButtonClick}
					onDelete={handleDeletePelanggan}
				/>
				<ModalPelanggan
					isVisible={isModalVisible}
					onClose={() => {
						setIsModalVisible(false);
						setEditId(null);
					}}
					onSubmit={editId !== null ? handleEditPelanggan : handleAddPelanggan}
					editId={editId}
					pelangganData={pelanggan.find((item) => item.id_pelanggan === editId)}
					tarif={tarif}
				/>
				<ToastContainer />
			</div>
		</>
	);
};

export default Pelanggan;
