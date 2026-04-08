import { useNavigate } from "react-router-dom";
import slide1 from "../../assets/Indoor/01.webp";
import slide2 from "../../assets/Indoor/02.webp";
import slide3 from "../../assets/Indoor/03.webp";
import slide4 from "../../assets/Indoor/04.webp";
import slide5 from "../../assets/Indoor/05.webp";
import slide6 from "../../assets/Indoor/06.webp";
import SectionTitle from "../../components/SectionTitle";

const slides = [
  { img: slide1, label: "Beautiful Indoor Plant" },
  { img: slide2, label: "Bring Nature Indoors" },
  { img: slide3, label: "Green Your Space" },
  { img: slide4, label: "Indoor Plant Collection" },
  { img: slide5, label: "Fresh & Green Plants" },
  { img: slide6, label: "Fresh & Green Plants" },
];

const Indoor = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 lg:px-12">
      <SectionTitle
        subHeading="Make Your Home a Green Haven"
        heading="Plants For Indoors"
      />
      {/* ← grid-cols-2 on mobile, 3 on md, 6 on lg */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 cursor-pointer"
        onClick={() => navigate('/indoor')}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={slide.img}
              alt={slide.label}
              className="w-full h-40 md:h-60 object-cover group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
              <p className="text-white text-sm md:text-lg font-semibold text-center px-2">{slide.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Indoor;