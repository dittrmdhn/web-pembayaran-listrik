import { jwtDecode } from "jwt-decode";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
	const location = useLocation();

	const userAccess = jwtDecode(Cookies.get("token"));
	const level = userAccess.level;

	return (
		<div className="bg-cyan-800 mt-8 text-white h-screen w-56 fixed top-0 left-0 overflow-y-auto hidden md:block">
			<div className=" font-semibold">
				<h2 className="text-xl font-bold mb-4">Dashboard</h2>
				<ul>
					<li>
						<Link
							to="/dashboard"
							className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
								location.pathname === "/dashboard" ? "bg-cyan-950" : ""
							}`}
						>
							<svg
								className="h-5 w-5 inline-block mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12h18M3 6h18M3 18h18"
								/>
							</svg>
							Dashboard
						</Link>
					</li>

					{level === "Admin" && (
						<li>
							<Link
								to="/user"
								className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
									location.pathname === "/user" ? "bg-cyan-950" : ""
								}`}
							>
								<svg
									className="h-5 w-5 inline-block mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
									/>
								</svg>
								Data User
							</Link>
						</li>
					)}
					<li>
						<Link
							to="/pelanggan"
							className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
								location.pathname === "/pelanggan" ? "bg-cyan-950" : ""
							}`}
						>
							<svg
								className="h-5 w-5 inline-block mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
								/>
							</svg>
							Data Pelanggan
						</Link>
					</li>
					<li>
						<Link
							to="/tarif"
							className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
								location.pathname === "/tarif" ? "bg-cyan-950" : ""
							}`}
						>
							<svg
								className="h-5 w-5 inline-block mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							Data Tarif
						</Link>
					</li>
					<li>
						<Link
							to="/penggunaan"
							className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
								location.pathname === "/penggunaan" ? "bg-cyan-950" : ""
							}`}
						>
							<svg
								className="h-5 w-5 inline-block mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
								/>
							</svg>
							Data Penggunaan
						</Link>
					</li>
					<li>
						<Link
							to="/tagihan"
							className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
								location.pathname === "/tagihan" ? "bg-cyan-950" : ""
							}`}
						>
							<svg
								className="h-5 w-5 inline-block mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
								/>
							</svg>
							Data Tagihan
						</Link>
					</li>
					<li>
						<Link
							to="/pembayaran"
							className={`block py-2.5 px-4 text-white hover:bg-gray-800 ${
								location.pathname === "/pembayaran" ? "bg-cyan-950" : ""
							}`}
						>
							<svg
								className="h-5 w-5 inline-block mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
								/>
							</svg>
							Data Pembayaran
						</Link>
					</li>

					{/* Tambahkan menu sidebar lainnya sesuai kebutuhan */}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
