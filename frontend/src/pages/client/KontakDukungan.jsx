import React from "react";
import { useInView } from "react-intersection-observer";

const KontakDukungan = () => {
	const { ref: kontakRef, inView: isKontakVisible } = useInView({
		triggerOnce: false,
		threshold: 0.1,
	});

	return (
		<div
			ref={kontakRef}
			className={`mt-12 transition-transform duration-300 ${
				isKontakVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-20"
			}`}
		>
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-8">
					Kontak dan Dukungan
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Kontak */}
					<div className="bg-white p-6 shadow-lg rounded-lg">
						<h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
						<p className="text-gray-700 mb-4">
							Untuk pertanyaan atau bantuan, jangan ragu untuk menghubungi kami
							melalui salah satu saluran berikut:
						</p>
						<ul className="space-y-2">
							<li className="flex items-center text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 mr-2 text-blue-500"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M3 10h4v4H3z" />
									<path d="M7 3h2v2H7zM7 7h2v2H7zM7 11h2v2H7z" />
									<path d="M11 13h10v2H11z" />
								</svg>
								<span>Email: support@pln.com</span>
							</li>
							<li className="flex items-center text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 mr-2 text-blue-500"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M4 2H20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 4h16v16H4V4z" />
								</svg>
								<span>Telepon: (021) 123-4567</span>
							</li>
							<li className="flex items-center text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 mr-2 text-blue-500"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 5H3v4H5V5zM11 5H9v4h2V5zM17 5h-2v4h2V5zM5 11H3v4h2v-4zM11 11H9v4h2v-4zM17 11h-2v4h2v-4zM5 17H3v4h2v-4zM11 17H9v4h2v-4zM17 17h-2v4h2v-4z" />
								</svg>
								<span>Alamat: Jl. Contoh No. 123, Jakarta</span>
							</li>
						</ul>
					</div>

					{/* Dukungan */}
					<div className="bg-white p-6 shadow-lg rounded-lg">
						<h3 className="text-xl font-bold mb-4">Dukungan Pelanggan</h3>
						<p className="text-gray-700 mb-4">
							Kami siap membantu Anda dengan berbagai masalah dan pertanyaan
							terkait layanan kami. Hubungi tim dukungan kami untuk mendapatkan
							bantuan.
						</p>
						<div className="flex flex-col space-y-4">
							<div className="bg-cyan-700 text-white p-4 rounded-lg text-center">
								<h4 className="text-lg font-bold mb-2">FAQ</h4>
								<p>Temukan jawaban untuk pertanyaan yang sering diajukan.</p>
								<a href="/faq" className="text-blue-100 hover:underline">
									Kunjungi FAQ
								</a>
							</div>
							<div className="bg-gray-500 text-white p-4 rounded-lg text-center">
								<h4 className="text-lg font-bold mb-2">Live Chat</h4>
								<p>Dapatkan bantuan secara langsung melalui chat.</p>
								<a href="/live-chat" className="text-blue-100 hover:underline">
									Mulai Live Chat
								</a>
							</div>
							<div className="bg-orange-400 text-white p-4 rounded-lg text-center">
								<h4 className="text-lg font-bold mb-2">Bantuan Teknis</h4>
								<p>Hubungi tim teknis kami untuk masalah teknis.</p>
								<a
									href="/technical-support"
									className="text-blue-100 hover:underline"
								>
									Hubungi Bantuan Teknis
								</a>
							</div>
						</div>
					</div>

					{/* Formulir Kontak */}
					<div className="bg-white p-6 shadow-lg rounded-lg">
						<h3 className="text-xl font-bold mb-4">Formulir Kontak</h3>
						<p className="text-gray-700 mb-4">
							Isi formulir di bawah ini dan kami akan menghubungi Anda sesegera
							mungkin.
						</p>
						<form action="#" method="post" className="space-y-4">
							<div>
								<label htmlFor="name" className="block text-gray-700">
									Nama:
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									required
								/>
							</div>
							<div>
								<label htmlFor="email" className="block text-gray-700">
									Email:
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									required
								/>
							</div>
							<div>
								<label htmlFor="message" className="block text-gray-700">
									Pesan:
								</label>
								<textarea
									id="message"
									name="message"
									rows="4"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									required
								></textarea>
							</div>
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
							>
								Kirim
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default KontakDukungan;
