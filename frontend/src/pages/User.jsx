import { useEffect, useState } from "react";
import { addUser, deleteUser, getUser, updateUser } from "../api/data/user";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/TableUser";
import ModalUser from "../components/modal/ModalUser";
import { getLevel } from "../api/data/level";

const User = () => {
	const [user, setUser] = useState([]);
	const [error, setError] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editId, setEditId] = useState(null);
	const [levels, setLevels] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUser();
				setUser(data);
			} catch (error) {
				setError(error.message);
			}
		};
		const fetchLevel = async () => {
			try {
				const data = await getLevel();
				setLevels(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchUser();
		fetchLevel();
	}, [levels]);

	const handleAddUser = async (e) => {
		e.preventDefault();
		const { username, password, nama_admin, id_level } = e.target;
		try {
			const newUser = {
				username: username.value,
				password: password.value,
				nama_admin: nama_admin.value,
				id_level: parseInt(id_level.value),
			};
			await addUser(newUser);
			const updatedUser = await getUser();
			setUser(updatedUser);
			setIsModalVisible(false);
			toast.success("Data user berhasil ditambahkan!");
		} catch (error) {
			toast.error("Gagal menambahkan data: " + error.message);
		}
	};

	const handleEditUser = async (e) => {
		e.preventDefault();
		const { username, password, nama_admin, id_level } = e.target;
		try {
			const updatedUser = {
				username: username.value,
				password: password.value,
				nama_admin: nama_admin.value,
				id_level: parseInt(id_level.value),
			};
			await updateUser(editId, updatedUser);
			setUser((prevUser) =>
				prevUser.map((item) =>
					item.id_user === editId ? { ...item, ...updatedUser } : item
				)
			);
			toast.success("Data user berhasil diupdate!");
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

	const handleDeleteUser = async (id) => {
		try {
			await deleteUser(id);
			setUser((prevUser) => prevUser.filter((item) => item.id_user !== id));
			toast.success("Data user berhasil dihapus!");
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
					<h1 className="text-3xl font-bold">Data User</h1>{" "}
					<button
						onClick={() => setIsModalVisible(true)}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					>
						{" "}
						Tambah Data
					</button>
				</div>
				<UserTable
					data={user}
					onEdit={handleEditButtonClick}
					onDelete={handleDeleteUser}
				/>
				<ModalUser
					isVisible={isModalVisible}
					onClose={() => {
						setIsModalVisible(false);
						setEditId(null);
					}}
					onSubmit={editId !== null ? handleEditUser : handleAddUser}
					editId={editId}
					userData={user.find((item) => item.id_user === editId)}
					levels={levels}
				/>
				<ToastContainer />
			</div>
		</>
	);
};

export default User;
