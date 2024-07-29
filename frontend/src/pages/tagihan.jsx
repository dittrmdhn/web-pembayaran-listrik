import { useEffect, useState } from "react";
import { deleteTagihan, getTagihan } from "../api/data/tagihan";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TagihanTable from "../components/TableTagihan";
import { toast, ToastContainer } from "react-toastify";

const Tagihan = () => {
	const [tagihan, setTagihan] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchTagihan = async () => {
			try {
				const data = await getTagihan();

				setTagihan(data);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchTagihan();
	}, []);

	const handleDeleteTagihan = async (id) => {
		try {
			await deleteTagihan(id);
			const updatedTagihanList = await getTagihan();
			setTagihan(updatedTagihanList);
			toast.success("Data tagihan berhasil dihapus!");
		} catch (error) {
			setError(error.message);
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
					<h1 className="text-3xl font-bold mb-5">Data Tagihan</h1>{" "}
				</div>
				<TagihanTable
					data={tagihan}
					// onEdit={handleEditButtonClick}
					onDelete={handleDeleteTagihan}
				/>
				<ToastContainer />
			</div>
		</>
	);
};

export default Tagihan;
