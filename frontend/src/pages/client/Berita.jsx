import { useInView } from "react-intersection-observer";
import image1 from "../../assets/pln.jpeg";
import image2 from "../../assets/pln2.jpg";
import image3 from "../../assets/pln3.jpg";
import image4 from "../../assets/pln1.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Berita = () => {
	const { ref: beritaRef, inView: isBeritaVisible } = useInView({
		triggerOnce: false,
		threshold: 0.1,
	});

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,

					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div
			ref={beritaRef}
			className={`mt-12 transition-transform duration-500 ${
				isBeritaVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-20"
			}`}
		>
			<h2 className="text-3xl font-bold text-center mb-8">
				Berita dan Pengumuman
			</h2>
			<div className="relative overflow-hidden w-full">
				<Slider {...settings}>
					<div className="p-2">
						<div className="bg-white p-6 shadow-lg rounded-lg min-h-[350px] flex flex-col">
							<img
								src={image1}
								alt="Pemeliharaan Listrik"
								className="mb-4 h-40 w-full object-cover"
							/>
							<h3 className="text-xl font-bold mb-2">Pemeliharaan Listrik</h3>
							<p className="text-gray-700 flex-grow">
								Akan ada pemeliharaan listrik di wilayah Anda pada tanggal 25
								Juli 2024. Mohon maaf atas ketidaknyamanannya.
							</p>
						</div>
					</div>
					<div className="p-2">
						<div className="bg-white p-6 shadow-lg rounded-lg min-h-[350px] flex flex-col">
							<img
								src={image4}
								alt="Penurunan Tarif Listrik"
								className="mb-4 h-40 w-full object-cover"
							/>
							<h3 className="text-xl font-bold mb-2">
								Penurunan Tarif Listrik
							</h3>
							<p className="text-gray-700 flex-grow">
								Mulai bulan depan, tarif listrik akan mengalami penurunan
								sebesar 5%. Informasi lebih lanjut akan diumumkan di website
								kami.
							</p>
						</div>
					</div>
					<div className="p-2">
						<div className="bg-white p-6 shadow-lg rounded-lg min-h-[350px] flex flex-col">
							<img
								src={image2}
								alt="Layanan Baru"
								className="mb-4 h-40 w-full object-cover"
							/>
							<h3 className="text-xl font-bold mb-2">Layanan Baru</h3>
							<p className="text-gray-700 flex-grow">
								Kami memperkenalkan layanan baru untuk pembayaran listrik
								melalui aplikasi mobile. Download sekarang di App Store dan
								Google Play.
							</p>
						</div>
					</div>
					<div className="p-2">
						<div className="bg-white p-6 shadow-lg rounded-lg min-h-[350px] flex flex-col">
							<img
								src={image3}
								alt="Layanan Baru"
								className="mb-4 h-40 w-full object-cover"
							/>
							<h3 className="text-xl font-bold mb-2">Jangkauan Luas</h3>
							<p className="text-gray-700 flex-grow">
								Kami sedang memperluas jangkauan layanan kami. Kami akan
								berkomitmen memberikan layanan yang terbaik untuk pelanggan
								kami.
							</p>
						</div>
					</div>
					{/* Add more news items here */}
				</Slider>
			</div>
		</div>
	);
};

export default Berita;
