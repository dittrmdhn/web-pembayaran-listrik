import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavbarPelanggan = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);

	useEffect(() => {
		let scrollTimeout;

		const handleScroll = () => {
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			setIsScrolling(true);
			scrollTimeout = setTimeout(() => {
				setIsScrolling(false);
			}, 300); // Mengatur delay untuk mendeteksi berhenti scroll

			const scrollTop = window.scrollY;
			if (scrollTop > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}
		};
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/");
	};

	const decodedToken = jwtDecode(Cookies.get("token"));
	const username = decodedToken.username;

	const handleProfile = () => {
		navigate("/profile-pelanggan");
	};

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 text-white ${
				isScrolling
					? "bg-cyan-950"
					: "bg-cyan-950 bg-opacity-50 backdrop-blur-md"
			} ${isScrolled ? "shadow-md" : ""}`}
		>
			<div className="container mx-auto flex justify-between items-center p-4">
				<div className="flex items-center">
					<Link to="/home" className="text-2xl font-bold flex items-center">
						<h2>My Listrik</h2>
						<img
							className="w-8 ms-2  mr-2 rounded-full border-2 border-white"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnWxniTLmHxVUhmxqpSxcfXxkKx4n2LxbNQ&s"
							alt="logo"
						/>
					</Link>
				</div>
				<div className="hidden md:flex items-center space-x-4 font-bold">
					<div className="me-10">
						<Link
							to="/home"
							className="hover:bg-gray-400 hover:text-gray-800 py-2 px-4 rounded"
						>
							Home
						</Link>
						<Link
							to="/cek-tagihan"
							className="hover:bg-gray-400 hover:text-gray-800 py-2 px-4 rounded"
						>
							Tagihan
						</Link>
					</div>
					<div className="relative">
						<button
							onClick={toggleDropdown}
							className="hover:bg-gray-400 hover:text-gray-800 py-2 px-4 items-center rounded flex"
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
							<div className="absolute font-bold right-0 mt-2 w-48 bg-gray-600 text-white rounded shadow-lg transform transition-transform ease-in-out duration-300 origin-top-right">
								<button
									onClick={handleProfile}
									className="block w-full text-left px-4 py-2 hover:text-cyan-500 hover:rounded hover:bg-gray-700"
								>
									Profile
								</button>
								<button
									onClick={handleLogout}
									className="block w-full text-left px-4 py-2 hover:text-cyan-500 hover:rounded hover:bg-gray-700"
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
				<div className="md:hidden container mx-auto px-4 my-3 bg-cyan-900 rounded font-bold py-5">
					<Link
						to="/home"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Home
					</Link>

					<Link
						to="/profile-pelanggan"
						className="block py-2 px-4 hover:bg-gray-800"
						onClick={toggleMenu}
					>
						Profil
					</Link>

					<Link
						to="/login-user"
						className="block mt-5  py-2 px-4 hover:bg-gray-800"
						onClick={handleLogout}
					>
						Logout
					</Link>
				</div>
			)}
		</nav>
	);
};

export default NavbarPelanggan;
