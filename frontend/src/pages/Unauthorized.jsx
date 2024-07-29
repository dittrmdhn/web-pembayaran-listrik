import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
				<h1 className="text-4xl font-bold text-red-500 mb-4 text-center">
					403 Forbidden!
				</h1>
				<p className="text-lg text-gray-700 mb-8 text-center italic">
					Anda tidak memiliki izin untuk mengakses halaman ini.
				</p>
				<div className="flex justify-center">
					<Link
						to="/dashboard"
						className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Kembali ke Beranda
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Unauthorized;
