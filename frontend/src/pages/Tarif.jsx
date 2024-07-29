import { useEffect, useState } from "react";
import {
	addTarif,
	deleteTarif,
	getTarif,
	updateTarif,
} from "../api/data/tarif";
import TarifTable from "../components/TableTarif";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalTarif from "../components/modal/ModalTarif";

const Tarif = () => {
	const [tarif, setTarif] = useState([]);
	const [error, setError] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		const fetchTarif = async () => {
			try {
				const data = await getTarif();
				setTarif(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchTarif();
	}, []);

	const handleAddTarif = async (e) => {
		e.preventDefault();
		const { daya, tarifperkwh } = e.target;
		try {
			const newTarif = {
				daya: parseInt(daya.value),
				tarifperkwh: parseInt(tarifperkwh.value),
			};
			await addTarif(newTarif);
			const updatedTarifList = await getTarif();
			setTarif(updatedTarifList);
			setIsModalVisible(false);
			toast.success("Data berhasil ditambahkan!");
		} catch (error) {
			toast.error("Gagal menambahkan data: " + error.message);
		}
	};

	const handleEditTarif = async (e) => {
		e.preventDefault();
		const { daya, tarifperkwh } = e.target;
		try {
			const updatedTarif = {
				daya: parseInt(daya.value),
				tarifperkwh: parseInt(tarifperkwh.value),
			};
			await updateTarif(editId, updatedTarif);
			setTarif((prevTarif) =>
				prevTarif.map((item) =>
					item.id_tarif === editId ? { ...item, ...updatedTarif } : item
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

	const handleDeleteTarif = async (id) => {
		try {
			await deleteTarif(id);
			setTarif((prevTarif) => prevTarif.filter((item) => item.id_tarif !== id));
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
					<h1 className="text-3xl font-bold mb-5">Data Tarif</h1>{" "}
					<button
						onClick={() => setIsModalVisible(true)}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					>
						{" "}
						Tambah Data
					</button>
				</div>
				<TarifTable
					data={tarif}
					onEdit={handleEditButtonClick}
					onDelete={handleDeleteTarif}
				/>
				<ModalTarif
					isVisible={isModalVisible}
					onClose={() => {
						setIsModalVisible(false);
						setEditId(null);
					}}
					onSubmit={editId !== null ? handleEditTarif : handleAddTarif}
					editId={editId}
					tarifData={tarif.find((item) => item.id_tarif === editId)}
				/>
				<ToastContainer />
			</div>
		</>
	);
};

export default Tarif;
