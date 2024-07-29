import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getTagihan } from "../api/data/tagihan";
import { getPenggunaan } from "../api/data/penggunaan";
import { getPembayaran } from "../api/data/pembayaran";
import { getTarif } from "../api/data/tarif";
import { getUser } from "../api/data/user";
const Dashboard = () => {
	const [totalPelanggan, setTotalPelanggan] = useState(0);
	const [totalPenggunaan, setTotalPenggunaan] = useState(0);
	const [totalPembayaran, setTotalPembayaran] = useState(0);
	const [totalTagihan, setTotalTagihan] = useState(0);
	const [totalUser, setTotalUser] = useState(0);

	const [totalTarif, setTotalTarif] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPenggunaan();
				setTotalPelanggan(data.length);

				const data2 = await getPembayaran();
				setTotalPembayaran(data2.length);

				const data3 = await getTagihan();
				const notPayed = data3.filter((item) => item.status === "Belum Bayar");
				setTotalTagihan(notPayed.length);

				const data4 = await getUser();
				setTotalUser(data4.length);

				const data5 = await getPenggunaan();
				setTotalPenggunaan(data5.length);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const data = {
		labels: ["January", "February", "March", "April", "May", "June"],
		datasets: [
			{
				label: "Monthly Usage",
				data: [30, 45, 50, 60, 70, 80],
				borderColor: "#3b82f6",
				backgroundColor: "rgba(59, 130, 246, 0.2)",
			},
		],
	};
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className=" p-8 xl:ml-64 md:ml-60 md:max-auto mt-16">
				<div className="p-6 bg-gray-100 min-h-screen">
					<header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
						<h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
						<button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
							Add New
						</button>
					</header>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Main Stats */}
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold text-gray-700">
								Total User
							</h2>
							<p className="text-3xl font-bold text-gray-900">{totalUser}</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold text-gray-700">
								Total Pelanggan
							</h2>
							<p className="text-3xl font-bold text-gray-900">
								{totalPelanggan}
							</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold text-gray-700">
								Total Pembayaran
							</h2>
							<p className="text-3xl font-bold text-gray-900">
								{totalPembayaran}
							</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold text-gray-700">
								Total Tagihan
							</h2>
							<p className="text-3xl font-bold text-gray-900">{totalTagihan}</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold text-gray-700">
								Total Penggunaan
							</h2>
							<p className="text-3xl font-bold text-gray-900">
								{totalPenggunaan}
							</p>
						</div>

						{/* Charts */}
						<div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
							<h2 className="text-xl font-semibold text-gray-700 mb-4">
								Usage Trends
							</h2>
							<Line data={data} />
						</div>

						{/* Recent Activity */}
						<div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
							<h2 className="text-xl font-semibold text-gray-700 mb-4">
								Recent Activity
							</h2>
							<ul className="space-y-2">
								<li className="bg-gray-50 p-2 rounded-lg shadow-sm">
									<p className="text-gray-800">User 1 updated their profile.</p>
									<span className="text-gray-500 text-sm">2 hours ago</span>
								</li>
								<li className="bg-gray-50 p-2 rounded-lg shadow-sm">
									<p className="text-gray-800">Bill generated for User 2.</p>
									<span className="text-gray-500 text-sm">1 day ago</span>
								</li>
								{/* More items */}
							</ul>
						</div>

						{/* Quick Actions */}
						<div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
							<h2 className="text-xl font-semibold text-gray-700 mb-4">
								Quick Actions
							</h2>
							<ul className="space-y-2">
								<li>
									<button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 w-full">
										Generate Report
									</button>
								</li>
								<li>
									<button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 w-full">
										Add New User
									</button>
								</li>
								{/* More actions */}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
