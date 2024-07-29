import NavbarPelanggan from "../../components/NavbarPelanggan";
import { useInView } from "react-intersection-observer";
import KontakDukungan from "./KontakDukungan";
import Berita from "./Berita";
import CarouselImage from "./CarouselImage";

const HomePelanggan = () => {
	const { ref: tagihanRef, inView: isTagihanVisible } = useInView({
		triggerOnce: false,
		threshold: 0.1,
	});
	return (
		<>
			<div className="container mx-auto">
				<div className="w-full overflow-hidden">
					<NavbarPelanggan />
					<CarouselImage />

					<div className="container mx-auto px-4 bg-gray-100">
						<div className="flex flex-col items-center justify-center mt-5 mb-5">
							<div className="mt-12 bg-gradient-to-r w-full from-gray-600 via-cyan-700 to-gray-600 text-white py-12 px-6 rounded-tr-full rounded-bl-full shadow-lg">
								<div
									ref={tagihanRef}
									className={`mt-12 transition-transform duration-300 ${
										isTagihanVisible
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-20"
									}`}
								>
									<div className="container mx-auto text-center xl:text-3xl text-xs  ">
										<h2 className="font-bold mb-4 px-14">
											Cek Tagihan Listrik Anda Sekarang!
										</h2>
										<p className="lg:text-sm mb-6 px-10">
											Temukan detail tagihan listrik Anda dengan mudah dan
											cepat. Tidak perlu repot, semuanya ada di sini.
										</p>
										<a
											href="/cek-tagihan"
											className="inline-block lg:ms-0 lg:text-xl  ms-32 mt-5 bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 hover:text-gray-900 transition duration-300"
										>
											Cek Tagihan
										</a>
									</div>
								</div>
							</div>
						</div>

						{<Berita />}
						{<KontakDukungan />}
					</div>
				</div>
			</div>
			<div className="fixed-bottom mt-5 bg-gray-300 font-bold w-full text-gray-800 text-center py-4">
				&copy; Copyright 2024
			</div>
		</>
	);
};

export default HomePelanggan;
