import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/login-user");
	};

	const decodedToken = jwtDecode(Cookies.get("token"));
	const username = decodedToken.username;
	const level = decodedToken.level;

	return (
		<nav className="bg-cyan-800 text-white fixed top-0 left-0 w-full z-50">
			<div className="container mx-auto flex justify-between items-center p-4">
				<div className="flex items-center">
					<Link to="/" className="text-2xl font-bold flex items-center">
						<h2>My Listrik</h2>
						<img
							className="w-8 ms-2  mr-2 rounded-full border-2 border-white"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnWxniTLmHxVUhmxqpSxcfXxkKx4n2LxbNQ&s"
							alt="logo"
						/>
					</Link>
				</div>
				<div className="hidden md:flex items-center space-x-4">
					{/* <Link to="/dashboard" className="hover:bg-gray-800 py-2 px-4 rounded">
						Dashboard
					</Link>
					<Link to="/tarif" className="hover:bg-gray-800 py-2 px-4 rounded">
						Tarif
					</Link> */}
					<div className="relative">
						<button
							onClick={toggleDropdown}
							className="hover:bg-cyan-900 py-2 px-4 items-center rounded flex"
						>
							<p className="text-xl font-bold">{username}</p>
							{isDropdownOpen ? (
								<svg
									className="ml-2 mt-1 h-4 w-4"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M5.5 7.5l4.7 4.7 4.7-4.7z" />
								</svg>
							) : (
								""
							)}
						</button>
						{isDropdownOpen && (
							<div className="absolute font-bold right-0 mt-2 w-48 bg-cyan-900 text-white rounded shadow-lg transform transition-transform ease-in-out duration-300 origin-top-right">
								<p className="px-4 py-2 ">{level}</p>
								<button
									onClick={handleLogout}
									className="block w-full text-left px-4 py-2 hover:text-red-500 hover:rounded hover:bg-gray-700"
								>
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="md:hidden">
					<button onClick={toggleMenu} className="focus:outline-none">
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"
							></path>
						</svg>
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden ml-4 my-3 bg-gray-900">
					<Link
						to="/dashboard"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Dashboard
					</Link>
					{level === "Admin" && (
						<Link
							to="/user"
							className="block py-2 px-4 hover:bg-gray-800"
							onClick={toggleMenu}
						>
							Data User
						</Link>
					)}
					<Link
						to="/pelanggan"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Data Tarif
					</Link>
					<Link
						to="/penggunaan"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Data Penggunaan
					</Link>
					<Link
						to="/tagihan"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Data Tagihan
					</Link>
					<Link
						to="/pembayaran"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Data Pembayaran
					</Link>
					<Link
						to="/login-user"
						className="block mt-3 text-red-500 py-2 px-4 hover:bg-gray-800"
						onClick={handleLogout}
					>
						Logout
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
