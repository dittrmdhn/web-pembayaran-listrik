import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../assets/pln.jpeg";
import image2 from "../../assets/pln2.jpg";
import image3 from "../../assets/pln3.jpg";

const CarouselImage = () => {
	return (
		<div>
			<Carousel
				autoPlay
				infiniteLoop
				showThumbs={false}
				showStatus={false}
				transitionTime={1000}
				interval={3000}
			>
				<div className="relative overflow-hidden">
					<img
						src={image1}
						alt="Slide 1"
						className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="text-center text-white p-4 ">
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
								Pembayaran Listrik Mudah dan Cepat
							</h2>
							<p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
								Nikmati kemudahan membayar tagihan listrik di mana saja dan
								kapan saja.
							</p>
						</div>
					</div>
				</div>
				<div className="relative overflow-hidden">
					<img
						src={image2}
						alt="Slide 2"
						className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="text-center text-white p-4">
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
								Pelayanan Terbaik untuk Anda
							</h2>
							<p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
								Kami selalu siap melayani kebutuhan listrik Anda dengan
								profesionalisme.
							</p>
						</div>
					</div>
				</div>
				<div className="relative overflow-hidden">
					<img
						src={image3}
						alt="Slide 3"
						className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="text-center text-white p-4">
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
								Aman dan Terpercaya
							</h2>
							<p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
								Transaksi listrik Anda dijamin aman dengan sistem kami yang
								terpercaya.
							</p>
						</div>
					</div>
				</div>
			</Carousel>
		</div>
	);
};

export default CarouselImage;
