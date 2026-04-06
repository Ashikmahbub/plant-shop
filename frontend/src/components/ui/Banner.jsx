import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/home/01.webp";
import img2 from "../../assets/home/02.webp";
import img3 from "../../assets/home/03.webp";
import img4 from "../../assets/home/04.webp";
import img5 from "../../assets/home/05.webp";
import img6 from "../../assets/home/06.webp";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        className="carousel-container"
      >
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img src={img1} className="w-full h-full object-cover" alt="Banner 1" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">Welcome to Our Plant Shop</h2>
          </div>
        </div>
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img src={img2} className="w-full h-full object-cover" alt="Banner 2" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">Bring Nature into Your Home</h2>
          </div>
        </div>
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img src={img3} className="w-full h-full object-cover" alt="Banner 3" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">Indoor & Outdoor Plants</h2>
          </div>
        </div>
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img src={img4} className="w-full h-full object-cover" alt="Banner 4" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">Brighten Your Space with Greenery</h2>
          </div>
        </div>
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img src={img5} className="w-full h-full object-cover" alt="Banner 5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">Explore Our Plant Collection</h2>
          </div>
        </div>
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img src={img6} className="w-full h-full object-cover" alt="Banner 6" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">Plants for Every Environment</h2>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
