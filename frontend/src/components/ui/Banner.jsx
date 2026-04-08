import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/home/01.webp";
import img2 from "../../assets/home/02.webp";
import img3 from "../../assets/home/03.webp";
import img4 from "../../assets/home/04.webp";
import img5 from "../../assets/home/05.webp";
import img6 from "../../assets/home/06.webp";

const slides = [
  { img: img1, text: "Welcome to Our Plant Shop" },
  { img: img2, text: "Bring Nature into Your Home" },
  { img: img3, text: "Indoor & Outdoor Plants" },
  { img: img4, text: "Brighten Your Space with Greenery" },
  { img: img5, text: "Explore Our Plant Collection" },
  { img: img6, text: "Plants for Every Environment" },
];

const Banner = () => (
  <div className="relative touch-pan-y"> {/* ← fixes mobile swipe */}
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      transitionTime={800}
      swipeable={true}        // ← enable swipe
      emulateTouch={true}     // ← enable touch on mobile
    >
      {slides.map((slide, i) => (
        <div key={i} className="relative h-[350px] md:h-[500px] lg:h-[600px]">
          <img src={slide.img} className="w-full h-full object-cover" alt={`Banner ${i + 1}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-2xl md:text-5xl font-bold">{slide.text}</h2>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default Banner;