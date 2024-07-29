import React from "react";
import RegisterFormPelanggan from "../components/RegisterFormPelanggan";

const RegisterPelanggan = () => {
	const handlePelangganSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirm-password");
		const terms = formData.get("terms");

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		// Perform registration logic here
		console.log({
			email,
			password,
			terms,
		});
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white"
				>
					<img
						className="w-11  mt-2 mr-2 rounded-full"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnWxniTLmHxVUhmxqpSxcfXxkKx4n2LxbNQ&s"
						alt="logo"
					/>
					My Listrik
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<RegisterFormPelanggan onSubmit={handlePelangganSubmit} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterPelanggan;
